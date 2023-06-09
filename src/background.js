const DECODER = new TextDecoder("utf-8");
const ENCODER = new TextEncoder("utf-8");

const POSITIVE_VOTE_IDENTIFIER = "[+]";
const NEGATIVE_VOTE_IDENTIFIER = "[-]";

let EXTENSION_CONFIGURATION = null

browser.commands.onCommand.addListener((command) => {
  if (command === "open-options") {
    browser.runtime.openOptionsPage();
  }
});

browser.webRequest.onCompleted.addListener(
  showProfileListener,
  { urls: [
    "https://bumble.com/*SERVER_ENCOUNTERS_VOTE",
    "https://*.bumble.com/*SERVER_ENCOUNTERS_VOTE",
    "https://bumble.com/*SERVER_GET_ENCOUNTERS",
    "https://*.bumble.com/*SERVER_GET_ENCOUNTERS",
    ]
  },
  []
)

browser.webRequest.onBeforeRequest.addListener(
  loadProfilesListener,
  { urls: [
    "https://bumble.com/*SERVER_GET_ENCOUNTERS",
    "https://*.bumble.com/*SERVER_GET_ENCOUNTERS"
    ]
  },
  ["blocking"]
)


function showProfileListener() {
  browser.tabs.query({
    currentWindow: true,
    active: true,
    })
    .then(formatProfile);
}

function formatProfile(tabs) {
  for (const tab of tabs) {
    browser.tabs
      .sendMessage(tab.id, {})
      .then((response) => console.debug(response.response))
      .catch((error) => console.debug("Failed to format a profile."));
  }
}

function loadProfilesListener(details) {
  loadMatchingCriteria();

  let responseBody = "";

  let filter = browser.webRequest.filterResponseData(details.requestId);

  // Build the complete response body from multiple chunks.
  filter.ondata = (event) => {
    try {
      responseBody += DECODER.decode(event.data, { stream: true });
    } catch (error) {
      console.debug("Failed to intercept loading profiles (cannot decode response chunk).");
      filter.close();
    }
  }

  // Read, manipulate and write the response body.
  filter.onstop = (event) => {
    console.debug("Started rating profiles.")
    try {
      const json = JSON.parse(responseBody);

      // Prefix the user name with the profile rating and
      // remove non-matching profiles if the request contains at least one match.
      json.body.forEach((message) => {
        message.client_encounters.results.forEach((result) => {
          result.user.name = `${getProfileRating(result.user)} ${result.user.name}`;
        });

        const firstProfile = message.client_encounters.results[0];

        // Remove non-matching profiles.
        message.client_encounters.results.reduceRight(function(accumulator, result, index, object) {
          if (!(isMatching(result.user) || votedPositive(result.user))) {
            object.splice(index, 1);
          }
        }, []);

        if (message.client_encounters.results.length === 0) {
            message.client_encounters.results = [firstProfile];
        }
      });

      filter.write(ENCODER.encode(JSON.stringify(json)));
    } catch(error) {
      filter.write(ENCODER.encode(responseBody));
      console.debug("Failed to intercept loading profiles (cannot parse response body).");
    } finally {
      filter.close();
    }
  };

  return {};
}

function loadMatchingCriteria() {
  browser.storage.sync.get('extensionConfiguration')
    .then((result) => {
      EXTENSION_CONFIGURATION = result.extensionConfiguration;
      console.debug("Loaded configuration.");
    })
    .catch((error) => {
      console.debug("Failed to load configuration.");
    });
}

function getProfileRating(user) {
  if ( isMatching(user) || votedPositive(user) ) {
    return POSITIVE_VOTE_IDENTIFIER;
  }

  return NEGATIVE_VOTE_IDENTIFIER;
}

function isMatching(user) {
  for (const propertyKey in EXTENSION_CONFIGURATION) {
    const property = EXTENSION_CONFIGURATION[propertyKey];
    const profileField = user.profile_fields.filter(field => field.id === property.id)[0]

    if (!profileField) {
      const isRequired = property.checkbox;
      if (isRequired) {
        return false;
      }

      continue;
    }

    const matchingValues = JSON.parse(`[${property.text}]`);
    if (matchingValues.length > 0 && !matchingValues.includes(profileField.display_value)) {
      return false;
    }
  }

  return true;
}

function votedPositive(user) {
  const votedPositiveIdentifier = 2
  return user.their_vote === votedPositiveIdentifier;
}
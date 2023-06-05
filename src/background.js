const DECODER = new TextDecoder("utf-8");
const ENCODER = new TextEncoder("utf-8");

const POSITIVE_VOTE_IDENTIFIER = "[+]";
const NEGATIVE_VOTE_IDENTIFIER = "[-]";

let EXTENSION_CONFIGURATION = null

browser.webRequest.onBeforeRequest.addListener(
  loadWebAppListener,
  { urls: ["https://bumble.com/app"] },
  ["blocking"]
)

browser.webRequest.onBeforeRequest.addListener(
  loadProfilesListener,
  { urls: ["https://bumble.com/*SERVER_GET_ENCOUNTERS"] },
  ["blocking"]
)

browser.pageAction.onClicked.addListener(() => {
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then(voteProfiles);
})

function loadWebAppListener(details) {
  browser.storage.sync.get('extensionConfiguration')
    .then((result) => {
      EXTENSION_CONFIGURATION = result.extensionConfiguration;
      console.debug("Loaded configuration.");
    })
    .catch((error) => {
      console.debug("Failed to load configuration.");
    });
}

function loadProfilesListener(details) {
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
    try {
      // Parse the response body and prefix the user name with the profile rating.
      const json = JSON.parse(responseBody);
      json.body.forEach((message) => {
        message.client_encounters.results.forEach((result) => {
          result.user.name = `${getProfileRating(result.user)} ${result.user.name}`;
        });
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
    if (!matchingValues.includes(profileField.display_value)) {
      return false;
    }
  }

  return true;
}

function votedPositive(user) {
  const votedPositiveIdentifier = 2
  return user.their_vote === votedPositiveIdentifier;
}

function voteProfiles(tabs) {
  console.debug("Started voting profiles.");
  for (const tab of tabs) {
    browser.tabs
      .sendMessage(tab.id, {
        positiveVoteIdentifier: POSITIVE_VOTE_IDENTIFIER,
        negativeVoteIdentifier: NEGATIVE_VOTE_IDENTIFIER
      })
      .then((response) => console.debug(response.response))
      .catch((error) => console.debug("Stopped voting profiles (cannot run voting routine)."));
  }
}
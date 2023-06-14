const EXTENSION_CONFIGURATION_ATTRIBUTES = {
  family: {
    id: 'lifestyle_family_plans',
    text: '#familyText',
    checkbox: '#familyCheckbox'
  },
  smoking: {
    id: 'lifestyle_smoking',
    text: '#smokingText',
    checkbox: '#smokingCheckbox'
  },
  relationship: {
    id: 'lifestyle_dating_intentions',
    text: '#relationshipText',
    checkbox: '#relationshipCheckbox'
  },
  education: {
    id: 'lifestyle_education',
    text: '#educationText',
    checkbox: '#educationCheckbox'
  },
  drinking: {
    id: 'lifestyle_drinking',
    text: '#drinkingText',
    checkbox: '#drinkingCheckbox'
  }
}

function saveConfiguration(event) {
  console.debug("Saving configuration.");

  let extensionConfiguration = {};

  for (const propertyKey in EXTENSION_CONFIGURATION_ATTRIBUTES) {
    extensionConfiguration[propertyKey] = {}
    extensionConfiguration[propertyKey].id = EXTENSION_CONFIGURATION_ATTRIBUTES[propertyKey].id;
    extensionConfiguration[propertyKey].text =
      document.querySelector(EXTENSION_CONFIGURATION_ATTRIBUTES[propertyKey].text).value,
    extensionConfiguration[propertyKey].checkbox =
      document.querySelector(EXTENSION_CONFIGURATION_ATTRIBUTES[propertyKey].checkbox).checked
  }

  browser.storage.sync.set({
    extensionConfiguration: extensionConfiguration
  });
  event.preventDefault();

  browser.notifications.create({
    type: "basic",
    title: "bumble filter",
    message: "Configuration saved successfully."
  });
}

function restoreConfiguration() {
  console.debug("Restoring configuration.")

  const extensionConfiguration = browser.storage.sync.get('extensionConfiguration');
  extensionConfiguration.then((result) => {
    for (const propertyKey in EXTENSION_CONFIGURATION_ATTRIBUTES) {
      document.querySelector(EXTENSION_CONFIGURATION_ATTRIBUTES[propertyKey].text).value =
        result.extensionConfiguration[propertyKey].text || '';
      document.querySelector(EXTENSION_CONFIGURATION_ATTRIBUTES[propertyKey].checkbox).checked =
        result.extensionConfiguration[propertyKey].checkbox || false;
    }
  });
}

document.addEventListener('DOMContentLoaded', restoreConfiguration);
document.querySelector("form").addEventListener("submit", saveConfiguration);
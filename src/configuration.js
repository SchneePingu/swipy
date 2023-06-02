const EXTENSION_CONFIGURATION_ATTRIBUTES = {
  family: {
    text: '#familyText',
    checkbox: '#familyCheckbox'
  },
  smoking: {
    text: '#smokingText',
    checkbox: '#smokingCheckbox'
  }
}

function saveConfiguration(event) {
  console.debug("Saving configuration.");

  browser.storage.sync.set({
    extensionConfiguration: {
      family: {
        id: 'lifestyle_family_plans',
        text: document.querySelector(EXTENSION_CONFIGURATION_ATTRIBUTES.family.text).value,
        checkbox: document.querySelector(EXTENSION_CONFIGURATION_ATTRIBUTES.family.checkbox).checked
      },
      smoking: {
        id: 'lifestyle_smoking',
        text: document.querySelector(EXTENSION_CONFIGURATION_ATTRIBUTES.smoking.text).value,
        checkbox: document.querySelector(EXTENSION_CONFIGURATION_ATTRIBUTES.smoking.checkbox).checked
      }
    }
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
    document.querySelector(EXTENSION_CONFIGURATION_ATTRIBUTES.family.text).value =
      result.extensionConfiguration.family.text || '';
    document.querySelector(EXTENSION_CONFIGURATION_ATTRIBUTES.family.checkbox).checked =
      result.extensionConfiguration.family.checkbox || false;
    document.querySelector(EXTENSION_CONFIGURATION_ATTRIBUTES.smoking.text).value =
      result.extensionConfiguration.smoking.text || '';
    document.querySelector(EXTENSION_CONFIGURATION_ATTRIBUTES.smoking.checkbox).checked =
      result.extensionConfiguration.smoking.checkbox || false;
  });
}

document.addEventListener('DOMContentLoaded', restoreConfiguration);
document.querySelector("form").addEventListener("submit", saveConfiguration);
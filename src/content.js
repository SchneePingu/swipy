const PROFILE_SECTION_SELECTOR = '.encounters-story-profile';
const ABOUT_PROFILE_SECTION_SELECTOR = '.encounters-story-section--about';

function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

waitForElement(PROFILE_SECTION_SELECTOR).then((profileSection) => {
    profileSection.insertAdjacentElement('afterend', document.querySelector(ABOUT_PROFILE_SECTION_SELECTOR));
})
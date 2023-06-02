const PROFILE_HEADER_SELECTOR = '.encounters-story-profile__header';
const VOTE_POSITIVE_BUTTON_SELECTOR = '.encounters-action--like';
const VOTE_NEGATIVE_BUTTON_SELECTOR = '.encounters-action--dislike';

const POSITIVE_VOTE_IDENTIFIER = "[+]";
const NEGATIVE_VOTE_IDENTIFIER = "[-]";

function getProfileRating() {
  const profileHeader = document.querySelector(PROFILE_HEADER_SELECTOR);

  return profileHeader?.textContent?.substring(0, 3);
}

function getVotePositiveButton() {
  return document.querySelector(VOTE_POSITIVE_BUTTON_SELECTOR);
}

function getVoteNegativeButton() {
  return document.querySelector(VOTE_NEGATIVE_BUTTON_SELECTOR);
}

function clickButton(button) {
  const clickEvent = document.createEvent('Events');
  clickEvent.initEvent('click', true, false);

  button.dispatchEvent(clickEvent);
}

async function waitUntilNextVoting() {
  const millisecondsToWait = 50;
  await new Promise(resolve => {
    setTimeout(resolve, millisecondsToWait);
  });
}

function message(content) {
  return Promise.resolve({
    response: content
  });
}

async function voteProfiles() {
  let votePositiveButton = null;
  let voteNegativeButton = null;

  while (true) {
    const profileRating = getProfileRating();
    if (!profileRating) {
      return message("Stopped voting profiles (profile rating not found).");
    }

    votePositiveButton = getVotePositiveButton();
    if (!votePositiveButton) {
      return message("Stopped voting profiles (button for voting positive not found).");
    }

    voteNegativeButton = getVoteNegativeButton();
    if (!voteNegativeButton) {
       return message("Stopped voting profiles (button for voting negative not found).");
    }

    switch (profileRating) {
      case POSITIVE_VOTE_IDENTIFIER:
        clickButton(votePositiveButton);
        break;
      case NEGATIVE_VOTE_IDENTIFIER:
        clickButton(voteNegativeButton);
        break;
      default:
        return message("Stopped voting profiles (profile rating is unknown).");
    }

    await waitUntilNextVoting();
  }
}

browser.runtime.onMessage.addListener(() => voteProfiles());
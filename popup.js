let viewSwitch = document.getElementById("changeView");
let analyticSwitch = document.getElementById("changeAnalytic");
let shareSwitch = document.getElementById("changeShare");
let prTweetSwitch = document.getElementById("changePromotedTweet");
let prAccountSwitch = document.getElementById("changePromotedAccount");

//on init update ui
chrome.storage.sync.get(null, (e) => {
  console.log(e);
  viewSwitch.checked = e.view;
  analyticSwitch.checked = e.analytic;
  shareSwitch.checked = e.share;
  prTweetSwitch.checked = e.promotedTweet;
  prAccountSwitch.checked = e.promotedAccount;
});

[
  viewSwitch,
  analyticSwitch,
  shareSwitch,
  prTweetSwitch,
  prAccountSwitch,
].forEach((input) => {
  input.onchange = (e) => {
    const newSetting = {};
    newSetting[e.target.name] = e.target.checked;
    console.log(newSetting);
    // update storage
    chrome.storage.sync.set(newSetting);
  };
});

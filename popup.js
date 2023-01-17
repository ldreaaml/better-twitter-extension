let viewSwitch = document.getElementById("changeView");
let analyticSwitch = document.getElementById("changeAnalytic");
let shareSwitch = document.getElementById("changeShare");
let prTweetSwitch = document.getElementById("changePromotedTweet");
let prAccountSwitch = document.getElementById("changePromotedAccount");
let youMightLikeSwitch = document.getElementById("changeYouMightLike");

//on init update ui
chrome.storage.sync.get(null, (e) => {
  viewSwitch.checked = e.view;
  analyticSwitch.checked = e.analytic;
  shareSwitch.checked = e.share;
  prTweetSwitch.checked = e.promotedTweet;
  prAccountSwitch.checked = e.promotedAccount;
  youMightLikeSwitch.checked = e.youMightLike;
});

[
  viewSwitch,
  analyticSwitch,
  shareSwitch,
  prTweetSwitch,
  prAccountSwitch,
  youMightLikeSwitch,
].forEach((input) => {
  input.onchange = (e) => {
    const newSetting = {};
    newSetting[e.target.name] = e.target.checked;
    // update storage
    chrome.storage.sync.set(newSetting);
  };
});

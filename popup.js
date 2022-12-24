let viewSwitch = document.getElementById("changeView");
let shareSwitch = document.getElementById("changeShare");
let prTweetSwitch = document.getElementById("changePromotedTweet");
let prAccountSwitch = document.getElementById("changePromotedAccount");

//on init update ui
chrome.storage.sync.get(null, (e) => {
  console.log(e);
  viewSwitch.checked = e.view;
  shareSwitch.checked = e.share;
  prTweetSwitch.checked = e.promotedTweet;
  prAccountSwitch.checked = e.promotedAccount;
});

viewSwitch.onchange = (e) => {
  console.log(e.target.checked);
  chrome.storage.sync.set({ view: e.target.checked });
  chrome.storage.sync.get(null, function (result) {
    console.log(result);
  });
};

shareSwitch.onchange = (e) => {
  console.log(e.target.checked);
  chrome.storage.sync.set({ share: e.target.checked });
  chrome.storage.sync.get(null, function (result) {
    console.log(result);
  });
};

prTweetSwitch.onchange = (e) => {
  console.log(e.target.checked);
  chrome.storage.sync.set({ promotedTweet: e.target.checked });
  chrome.storage.sync.get(null, function (result) {
    console.log(result);
  });
};

prAccountSwitch.onchange = (e) => {
  console.log(e.target.checked);
  chrome.storage.sync.set({ promotedAccount: e.target.checked });
  chrome.storage.sync.get(null, function (result) {
    console.log(result);
  });
};

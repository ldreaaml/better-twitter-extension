chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(
    {
      view: false,
      share: false,
      promotedTweet: false,
      promotedAccount: false,
    },
    () => {
      console.log("init setting");
    }
  );
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(
    {
      view: true,
      share: true,
      promotedTweet: true,
      promotedAccount: true,
    },
    () => {
      console.log("init setting");
    }
  );
});

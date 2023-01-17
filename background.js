chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(
    {
      view: true,
      analytic: true,
      share: true,
      promotedTweet: true,
      promotedAccount: true,
      youMightLike: false,
    },
    () => {
      console.log("init setting");
    }
  );
});

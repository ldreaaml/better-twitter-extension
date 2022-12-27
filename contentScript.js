(() => {
  const fetchSetting = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (currentSetting) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          console.log("failed to fetch setting");
        } else {
          resolve(currentSetting);
        }
      });
    });
  };

  const HideElements = async () => {
    var currentSetting = await fetchSetting();
    const targetNode = document.querySelector("body");
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (Object.values(currentSetting).includes(true)) {
          let xpath = getXpath(currentSetting);
          let elements = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
            null
          );
          let targetedElement = elements.iterateNext();
          while (targetedElement) {
            if (
              targetedElement.tagName == "ARTICLE" ||
              targetedElement.getAttribute("role") == "button"
            ) {
              targetedElement.style.display = "none";
            }
            if (targetedElement.getAttribute("aria-label") == "Share Tweet") {
              let parent = targetedElement.parentElement.parentElement;
              if (parent) {
                if (parent.style.display != "none") {
                  parent.style.display = "none";
                }
              } else {
                if (targetedElement.style.display != "none") {
                  targetedElement.style.display = "none";
                }
              }
            } else {
              while (targetedElement && targetedElement.tagName != "A") {
                targetedElement = targetedElement.parentElement;
              }
              if (
                targetedElement &&
                targetedElement.getAttribute("role") != "menuitem"
              ) {
                var testid = targetedElement.getAttribute("data-testid");
                if (!testid || testid != "analyticsButton") {
                  let parent = targetedElement.parentElement;
                  if (parent) {
                    if (parent.style.display != "none") {
                      parent.style.display = "none";
                    }
                  } else {
                    if (targetedElement.style.display != "none") {
                      targetedElement.style.display = "none";
                    }
                  }
                }
              }
            }
            targetedElement = elements.iterateNext();
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  };

  HideElements();
})();

const getXpath = (currentSetting) => {
  let viewXPath =
    "//a[contains(@href, '/analytics')]//span[contains(text(), 'View')] | //a[contains(@aria-label, 'View Tweet analytics')]"; //hide views
  let shareXPath = "//*[contains(@aria-label, 'Share Tweet')]";
  let promotedTweetXPath =
    "//span[contains(text(), 'Promoted') and not (../@data-testid = 'tweetText')]/ancestor::article"; //hide promoted tweets
  let promotedAccountXPath =
    "//*[local-name()='aside']//div[@role='button'  and  descendant::span[contains(text(), 'Promoted')]]"; //hide promoted accounts

  let xpath = [];
  if (currentSetting.view) {
    xpath.push(viewXPath);
  }
  if (currentSetting.share) {
    xpath.push(shareXPath);
  }
  if (currentSetting.promotedTweet) {
    xpath.push(promotedTweetXPath);
  }
  if (currentSetting.promotedAccount) {
    xpath.push(promotedAccountXPath);
  }
  xpath = xpath.join(" | ");
  return xpath;
};

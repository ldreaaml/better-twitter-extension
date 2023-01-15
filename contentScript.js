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
              targetedElement.textContent == "Views" ||
              targetedElement.getAttribute("aria-label") == "Share Tweet"
            ) {
              let parent = targetedElement.parentElement.parentElement;
              parent.style.display = "none";
            } else if (
              targetedElement.tagName == "ARTICLE" ||
              targetedElement.getAttribute("role") == "button"
            ) {
              targetedElement.style.display = "none";
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
                    parent.style.display = "none";
                  } else {
                    targetedElement.style.display = "none";
                  }
                } else {
                  targetedElement.parentElement.style.display = "none";
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
  const elementXpath = {
    view: "//span[text()='Views' and not(ancestor::*[@role='textbox']) and not (../@data-testid = 'tweetText')] | //a[contains(@aria-label, 'View Tweet analytics')]",
    analytic:
      "//span[text()='View Tweet analytics' and not(ancestor::*[@role='menuitem'])]",
    share: "//*[contains(@aria-label, 'Share Tweet')]",
    promotedTweet:
      "//span[contains(text(), 'Promoted') and not (../@data-testid = 'tweetText')]/ancestor::article",
    promotedAccount:
      "//*[local-name()='aside']//div[@role='button'  and  descendant::span[contains(text(), 'Promoted')]]",
  };
  const xpath = Object.entries(elementXpath)
    .filter(([key]) => currentSetting[key])
    .map(([_, value]) => value)
    .join(" | ");
  return xpath;
};

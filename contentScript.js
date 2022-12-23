(() => {
  const targetNode = document.querySelector("body");
  const config = { attributes: true, childList: true, subtree: true };
  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      let xpath =
        "//a[contains(@href, '/analytics')]//span[contains(text(), 'View')] | //a[contains(@aria-label, 'View Tweet analytics')]"; //hide views
      xpath += "| //*[contains(@aria-label, 'Share Tweet')]"; //hide share buttons
      xpath +=
        "| //span[contains(text(), 'Promoted') and not (../@data-testid = 'tweetText')]/ancestor::article"; //hide promoted tweets
      xpath +=
        "| //*[local-name()='aside']//div[@role='button'  and  descendant::span[contains(text(), 'Promoted')]]"; //hide promoted accounts

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
          if (targetedElement) {
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
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
})();

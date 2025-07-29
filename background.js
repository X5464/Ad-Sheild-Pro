// AdBlock Shield Pro Background v3.1 – handle openOptions
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'openOptions') {
    chrome.runtime.openOptionsPage();
    sendResponse();
  }
  // … other handlers …
});

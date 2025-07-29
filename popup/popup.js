// AdBlock Shield Pro Popup v3.1 – FIXED settings opening
document.addEventListener('DOMContentLoaded', async () => {
  // … load stats & settings …
  document.getElementById('settingsBtn').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'openOptions' }, () => window.close());
  });
});

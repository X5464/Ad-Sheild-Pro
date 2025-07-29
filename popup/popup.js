// AdBlock Shield Pro Popup Script
// Created by Rajarshi Chakraborty

document.addEventListener('DOMContentLoaded', function() {
  // Load and display stats
  chrome.storage.local.get(['stats'], function(result) {
    if (result.stats) {
      document.getElementById('totalBlocked').textContent = result.stats.totalBlocked || 0;
      document.getElementById('adsBlocked').textContent = result.stats.adsBlocked || 0;
      document.getElementById('trackersBlocked').textContent = result.stats.trackersBlocked || 0;
    }
  });
  
  // Handle settings button
  document.getElementById('openOptions').addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
  });
  
  // Handle whitelist button
  document.getElementById('whitelistSite').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const url = new URL(tabs[0].url);
      const domain = url.hostname;
      
      chrome.storage.local.get(['whitelist'], function(result) {
        const whitelist = result.whitelist || [];
        if (!whitelist.includes(domain)) {
          whitelist.push(domain);
          chrome.storage.local.set({whitelist: whitelist});
          alert('Site added to whitelist: ' + domain);
        }
      });
    });
  });
});

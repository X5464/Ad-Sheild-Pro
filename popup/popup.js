// AdBlock Shield Pro Popup Script
// Created by Rajarshi Chakraborty

document.addEventListener('DOMContentLoaded', async function() {
  // Load and display stats
  const result = await chrome.storage.local.get(['stats', 'settings']);
  
  if (result.stats) {
    document.getElementById('totalBlocked').textContent = result.stats.totalBlocked || 0;
    document.getElementById('adsBlocked').textContent = result.stats.adsBlocked || 0;
    document.getElementById('trackersBlocked').textContent = result.stats.trackersBlocked || 0;
  }
  
  // Load settings
  if (result.settings) {
    document.getElementById('enableBlocking').checked = result.settings.enabled !== false;
    document.getElementById('blockAds').checked = result.settings.blockAds !== false;
    document.getElementById('blockTrackers').checked = result.settings.blockTrackers !== false;
  }
  
  // Handle toggle changes
  document.getElementById('enableBlocking').addEventListener('change', function(e) {
    updateSetting('enabled', e.target.checked);
  });
  
  document.getElementById('blockAds').addEventListener('change', function(e) {
    updateSetting('blockAds', e.target.checked);
  });
  
  document.getElementById('blockTrackers').addEventListener('change', function(e) {
    updateSetting('blockTrackers', e.target.checked);
  });
  
  // Handle buttons
  document.getElementById('openOptions').addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
  });
  
  document.getElementById('whitelistSite').addEventListener('click', async function() {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    if (tabs[0]) {
      const url = new URL(tabs[0].url);
      const domain = url.hostname;
      
      const result = await chrome.storage.local.get(['whitelist']);
      const whitelist = result.whitelist || [];
      
      if (!whitelist.includes(domain)) {
        whitelist.push(domain);
        await chrome.storage.local.set({whitelist: whitelist});
        
        // Update UI to show whitelisted
        const button = document.getElementById('whitelistSite');
        button.textContent = 'Whitelisted!';
        button.style.background = '#27ae60';
        button.style.color = 'white';
        
        setTimeout(() => {
          button.textContent = 'Whitelist Site';
          button.style.background = '';
          button.style.color = '';
        }, 2000);
      }
    }
  });
  
  async function updateSetting(key, value) {
    const result = await chrome.storage.local.get(['settings']);
    const settings = result.settings || {};
    settings[key] = value;
    await chrome.storage.local.set({settings: settings});
    
    // Notify background script
    chrome.runtime.sendMessage({type: 'settingsChanged', settings: settings});
  }
});

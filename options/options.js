// AdBlock Shield Pro Options Script
// Created by Rajarshi Chakraborty

document.addEventListener('DOMContentLoaded', async function() {
  // Tab switching functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.dataset.tab;
      
      // Remove active class from all tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab
      button.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Load saved settings
  await loadSettings();
  await loadWhitelist();
  await loadStats();
  
  // Settings event listeners
  document.getElementById('enableBlocking').addEventListener('change', saveSetting);
  document.getElementById('blockAds').addEventListener('change', saveSetting);
  document.getElementById('blockTrackers').addEventListener('change', saveSetting);
  document.getElementById('blockSocial').addEventListener('change', saveSetting);
  document.getElementById('showBadge').addEventListener('change', saveSetting);
  document.getElementById('showNotifications').addEventListener('change', saveSetting);
  
  // Custom rules
  document.getElementById('saveRules').addEventListener('click', saveCustomRules);
  
  // Whitelist functionality
  document.getElementById('addWhitelist').addEventListener('click', addToWhitelist);
  document.getElementById('whitelistInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addToWhitelist();
    }
  });
  
  // Reset stats
  document.getElementById('resetStats').addEventListener('click', resetStats);
});

async function loadSettings() {
  const result = await chrome.storage.local.get(['settings']);
  const settings = result.settings || {};
  
  document.getElementById('enableBlocking').checked = settings.enabled !== false;
  document.getElementById('blockAds').checked = settings.blockAds !== false;
  document.getElementById('blockTrackers').checked = settings.blockTrackers !== false;
  document.getElementById('blockSocial').checked = settings.blockSocial !== false;
  document.getElementById('showBadge').checked = settings.showBadge !== false;
  document.getElementById('showNotifications').checked = settings.showNotifications === true;
}

async function saveSetting(event) {
  const result = await chrome.storage.local.get(['settings']);
  const settings = result.settings || {};
  
  settings[event.target.id] = event.target.checked;
  await chrome.storage.local.set({settings: settings});
  
  // Notify background script
  chrome.runtime.sendMessage({type: 'settingsChanged', settings: settings});
  
  // Show saved feedback
  showSavedFeedback(event.target);
}

async function saveCustomRules() {
  const rules = document.getElementById('customRules').value;
  await chrome.storage.local.set({customRules: rules});
  
  showSavedFeedback(document.getElementById('saveRules'));
}

async function loadWhitelist() {
  const result = await chrome.storage.local.get(['whitelist']);
  const whitelist = result.whitelist || [];
  
  const listContainer = document.getElementById('whitelistList');
  listContainer.innerHTML = '';
  
  if (whitelist.length === 0) {
    listContainer.innerHTML = '<p style="color: #6c757d; text-align: center;">No whitelisted sites</p>';
    return;
  }
  
  whitelist.forEach(domain => {
    const item = document.createElement('div');
    item.className = 'whitelist-item';
    item.innerHTML = `
      <span>${domain}</span>
      <button class="btn btn-remove" data-domain="${domain}">Remove</button>
    `;
    
    item.querySelector('.btn-remove').addEventListener('click', function() {
      removeFromWhitelist(domain);
    });
    
    listContainer.appendChild(item);
  });
}

async function addToWhitelist() {
  const input = document.getElementById('whitelistInput');
  const domain = input.value.trim();
  
  if (!domain) return;
  
  const result = await chrome.storage.local.get(['whitelist']);
  const whitelist = result.whitelist || [];
  
  if (!whitelist.includes(domain)) {
    whitelist.push(domain);
    await chrome.storage.local.set({whitelist: whitelist});
    input.value = '';
    loadWhitelist();
  }
}

async function removeFromWhitelist(domain) {
  const result = await chrome.storage.local.get(['whitelist']);
  const whitelist = result.whitelist || [];
  
  const index = whitelist.indexOf(domain);
  if (index > -1) {
    whitelist.splice(index, 1);
    await chrome.storage.local.set({whitelist: whitelist});
    loadWhitelist();
  }
}

async function loadStats() {
  const result = await chrome.storage.local.get(['stats']);
  const stats = result.stats || {};
  
  document.getElementById('totalBlockedStat').textContent = stats.totalBlocked || 0;
  document.getElementById('adsBlockedStat').textContent = stats.adsBlocked || 0;
  document.getElementById('trackersBlockedStat').textContent = stats.trackersBlocked || 0;
  document.getElementById('dataSavedStat').textContent = `${(stats.dataSaved || 0)} MB`;
}

async function resetStats() {
  if (confirm('Are you sure you want to reset all statistics? This cannot be undone.')) {
    await chrome.storage.local.set({
      stats: {
        totalBlocked: 0,
        adsBlocked: 0,
        trackersBlocked: 0,
        dataSaved: 0
      }
    });
    loadStats();
  }
}

function showSavedFeedback(element) {
  const originalText = element.textContent;
  element.textContent = 'Saved!';
  element.style.background = '#27ae60';
  
  setTimeout(() => {
    element.textContent = originalText;
    element.style.background = '';
  }, 1500);
}

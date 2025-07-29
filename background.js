// AdBlock Shield Pro Background Script
// Created by Rajarshi Chakraborty

class AdBlockShieldPro {
  constructor() {
    this.stats = {
      totalBlocked: 0,
      adsBlocked: 0,
      trackersBlocked: 0
    };
    this.init();
  }
  
  async init() {
    console.log('AdBlock Shield Pro initialized by Rajarshi Chakraborty');
    
    // Set badge
    chrome.action.setBadgeBackgroundColor({color: '#FF0000'});
    chrome.action.setBadgeText({text: '0'});
    
    // Load saved stats
    const result = await chrome.storage.local.get(['stats']);
    if (result.stats) {
      this.stats = result.stats;
      this.updateBadge();
    }
  }
  
  updateBadge() {
    chrome.action.setBadgeText({
      text: this.stats.totalBlocked.toString()
    });
  }
  
  async saveStats() {
    await chrome.storage.local.set({stats: this.stats});
  }
}

// Initialize the extension
new AdBlockShieldPro();

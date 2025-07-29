// AdBlock Shield Pro Background Service Worker
// Created by Rajarshi Chakraborty

class AdBlockShieldPro {
  constructor() {
    this.stats = {
      totalBlocked: 0,
      adsBlocked: 0,
      trackersBlocked: 0,
      dataSaved: 0
    };
    
    this.settings = {
      enabled: true,
      blockAds: true,
      blockTrackers: true,
      blockSocial: true,
      showBadge: true,
      showNotifications: false
    };
    
    this.init();
  }
  
  async init() {
    console.log('🛡️ AdBlock Shield Pro initialized by Rajarshi Chakraborty');
    
    // Load saved data
    await this.loadData();
    
    // Setup badge
    if (this.settings.showBadge) {
      chrome.action.setBadgeBackgroundColor({color: '#e74c3c'});
      this.updateBadge();
    }
    
    // Setup context menu
    this.setupContextMenu();
    
    // Setup message listener
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
    });
    
    // Setup alarms for periodic tasks
    chrome.alarms.create('updateFilters', {periodInMinutes: 60});
    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === 'updateFilters') {
        this.updateFilterLists();
      }
    });
    
    // Track installation
    chrome.runtime.onInstalled.addListener((details) => {
      if (details.reason === 'install') {
        this.onFirstInstall();
      }
    });
  }
  
  async loadData() {
    const result = await chrome.storage.local.get(['stats', 'settings']);
    if (result.stats) this.stats = {...this.stats, ...result.stats};
    if (result.settings) this.settings = {...this.settings, ...result.settings};
  }
  
  async saveData() {
    await chrome.storage.local.set({
      stats: this.stats,
      settings: this.settings
    });
  }
  
  setupContextMenu() {
    chrome.contextMenus.create({
      id: 'toggleBlocking',
      title: 'Toggle AdBlock Shield Pro',
      contexts: ['page']
    });
    
    chrome.contextMenus.create({
      id: 'whitelistSite',
      title: 'Whitelist this site',
      contexts: ['page']
    });
    
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === 'toggleBlocking') {
        this.toggleBlocking();
      } else if (info.menuItemId === 'whitelistSite') {
        this.whitelistCurrentSite(tab);
      }
    });
  }
  
  async toggleBlocking() {
    this.settings.enabled = !this.settings.enabled;
    await this.saveData();
    
    if (this.settings.showNotifications) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'AdBlock Shield Pro',
        message: `Blocking ${this.settings.enabled ? 'enabled' : 'disabled'}`
      });
    }
  }
  
  async whitelistCurrentSite(tab) {
    if (!tab || !tab.url) return;
    
    const url = new URL(tab.url);
    const domain = url.hostname;
    
    const result = await chrome.storage.local.get(['whitelist']);
    const whitelist = result.whitelist || [];
    
    if (!whitelist.includes(domain)) {
      whitelist.push(domain);
      await chrome.storage.local.set({whitelist: whitelist});
      
      if (this.settings.showNotifications) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon48.png',
          title: 'AdBlock Shield Pro',
          message: `${domain} added to whitelist`
        });
      }
    }
  }
  
  handleMessage(message, sender, sendResponse) {
    switch (message.type) {
      case 'settingsChanged':
        this.settings = {...this.settings, ...message.settings};
        this.saveData();
        this.updateBadge();
        break;
        
      case 'getStats':
        sendResponse(this.stats);
        break;
        
      case 'blocked':
        this.recordBlock(message.category, message.url);
        break;
    }
  }
  
  recordBlock(category, url) {
    this.stats.totalBlocked++;
    
    if (category === 'ad') {
      this.stats.adsBlocked++;
    } else if (category === 'tracker') {
      this.stats.trackersBlocked++;
    }
    
    // Estimate data saved (average 50KB per blocked request)
    this.stats.dataSaved += 0.05;
    
    this.updateBadge();
    this.saveData();
  }
  
  updateBadge() {
    if (this.settings.showBadge) {
      chrome.action.setBadgeText({
        text: this.stats.totalBlocked > 999 ? '999+' : this.stats.totalBlocked.toString()
      });
    } else {
      chrome.action.setBadgeText({text: ''});
    }
  }
  
  async updateFilterLists() {
    // This would update filter lists from remote sources
    console.log('🔄 Updating filter lists...');
  }
  
  async onFirstInstall() {
    // Open welcome page on first install
    chrome.tabs.create({
      url: chrome.runtime.getURL('options/options.html')
    });
  }
}

// Initialize the extension
new AdBlockShieldPro();

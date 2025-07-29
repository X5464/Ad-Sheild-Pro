// AdBlock Shield Pro - Professional Background Service Worker v4.0
// Created by Rajarshi Chakraborty

class AdBlockShieldPro {
    constructor() {
        this.stats = {
            totalBlocked: 0,
            adsBlocked: 0,
            trackersBlocked: 0,
            youtubeAdsBlocked: 0,
            dataSaved: 0
        };
        
        this.settings = {
            enabled: true,
            showBadge: true,
            showNotifications: false
        };
        
        this.init();
    }
    
    async init() {
        console.log('🛡️ AdBlock Shield Pro v4.0 - Professional Grade Blocker');
        
        // Load saved data
        await this.loadData();
        
        // Setup declarativeNetRequest feedback
        chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((details) => {
            this.recordBlock(details);
        });
        
        // Setup badge
        this.updateBadge();
        
        // Setup message listener
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.handleMessage(message, sender, sendResponse);
            return true;
        });
        
        // Setup context menu
        await this.setupContextMenu();
        
        // Schedule periodic updates
        chrome.alarms.create('updateStats', { periodInMinutes: 1 });
        chrome.alarms.onAlarm.addListener((alarm) => {
            if (alarm.name === 'updateStats') {
                this.updateBadge();
            }
        });
    }
    
    async loadData() {
        try {
            const result = await chrome.storage.local.get(['stats', 'settings']);
            if (result.stats) this.stats = {...this.stats, ...result.stats};
            if (result.settings) this.settings = {...this.settings, ...result.settings};
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }
    
    async saveData() {
        try {
            await chrome.storage.local.set({
                stats: this.stats,
                settings: this.settings
            });
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }
    
    recordBlock(details) {
        this.stats.totalBlocked++;
        
        const url = details.request.url;
        if (url.includes('youtube.com') || url.includes('googlevideo.com')) {
            this.stats.youtubeAdsBlocked++;
        } else if (url.includes('doubleclick') || url.includes('googlesyndication') || url.includes('amazon-adsystem')) {
            this.stats.adsBlocked++;
        } else {
            this.stats.trackersBlocked++;
        }
        
        // Estimate data saved (average 100KB per blocked request)
        this.stats.dataSaved += 0.1;
        
        this.updateBadge();
        this.saveData();
    }
    
    updateBadge() {
        if (this.settings.showBadge && this.settings.enabled) {
            const count = this.stats.totalBlocked;
            chrome.action.setBadgeText({
                text: count > 9999 ? '9999+' : count.toString()
            });
            chrome.action.setBadgeBackgroundColor({color: '#e74c3c'});
        } else {
            chrome.action.setBadgeText({text: ''});
        }
    }
    
    async handleMessage(message, sender, sendResponse) {
        try {
            switch (message.type) {
                case 'openOptions':
                    chrome.runtime.openOptionsPage();
                    sendResponse({success: true});
                    break;
                    
                case 'getStats':
                    sendResponse(this.stats);
                    break;
                    
                case 'settingsChanged':
                    this.settings = {...this.settings, ...message.settings};
                    await this.saveData();
                    this.updateBadge();
                    sendResponse({success: true});
                    break;
                    
                default:
                    sendResponse({error: 'Unknown message type'});
            }
        } catch (error) {
            sendResponse({error: error.message});
        }
    }
    
    async setupContextMenu() {
        try {
            await chrome.contextMenus.removeAll();
            
            chrome.contextMenus.create({
                id: 'toggleBlocking',
                title: '🛡️ Toggle AdBlock Shield Pro',
                contexts: ['page', 'action']
            });
            
            chrome.contextMenus.create({
                id: 'openOptions',
                title: '⚙️ Settings',
                contexts: ['page', 'action']
            });
            
            chrome.contextMenus.onClicked.addListener(async (info) => {
                if (info.menuItemId === 'toggleBlocking') {
                    this.settings.enabled = !this.settings.enabled;
                    await this.saveData();
                    this.updateBadge();
                } else if (info.menuItemId === 'openOptions') {
                    chrome.runtime.openOptionsPage();
                }
            });
        } catch (error) {
            console.error('Error setting up context menu:', error);
        }
    }
}

// Initialize
new AdBlockShieldPro();

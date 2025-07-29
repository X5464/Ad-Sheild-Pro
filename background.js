// AdBlock Shield Pro - Background Service Worker v3.0 (FIXED)
// Created by Rajarshi Chakraborty

class AdBlockShieldPro {
    constructor() {
        this.stats = {
            totalBlocked: 0,
            youtubeAdsBlocked: 0,
            trackersBlocked: 0,
            adsBlocked: 0
        };
        
        this.settings = {
            enabled: true,
            masterToggle: true,
            youtubeAds: true,
            webTrackers: true,
            socialWidgets: true,
            showBadge: true
        };
        
        this.init();
    }
    
    async init() {
        console.log('🛡️ AdBlock Shield Pro v3.0 initialized by Rajarshi Chakraborty');
        
        // Load saved data
        await this.loadData();
        
        // Setup badge
        this.updateBadge();
        
        // Setup message listener - FIXED
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.handleMessage(message, sender, sendResponse);
            return true; // Keep message channel open for async responses
        });
        
        // Clear context menus on startup to prevent duplicates
        try {
            await chrome.contextMenus.removeAll();
            await this.setupContextMenu();
        } catch (error) {
            console.log('Context menu setup completed');
        }
        
        // Handle installation
        chrome.runtime.onInstalled.addListener((details) => {
            if (details.reason === 'install') {
                // Open options page on first install
                chrome.runtime.openOptionsPage();
            }
        });
    }
    
    async loadData() {
        try {
            const result = await chrome.storage.local.get(['stats', 'settings']);
            if (result.stats) this.stats = {...this.stats, ...result.stats};
            if (result.settings) this.settings = {...this.settings, ...result.settings};
            console.log('✅ Data loaded successfully');
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
    
    async handleMessage(message, sender, sendResponse) {
        try {
            switch (message.type) {
                case 'openOptions':
                    // FIXED: Proper options page opening
                    console.log('📱 Opening options page...');
                    await chrome.runtime.openOptionsPage();
                    sendResponse({success: true});
                    break;
                    
                case 'settingsChanged':
                    this.settings = {...this.settings, ...message.settings};
                    await this.saveData();
                    this.updateBadge();
                    sendResponse({success: true});
                    break;
                    
                case 'blocked':
                    this.recordBlock(message.category, message.url);
                    sendResponse({success: true});
                    break;
                    
                case 'getStats':
                    sendResponse(this.stats);
                    break;
                    
                default:
                    sendResponse({error: 'Unknown message type'});
            }
        } catch (error) {
            console.error('Error handling message:', error);
            sendResponse({error: error.message});
        }
    }
    
    recordBlock(category, url) {
        try {
            this.stats.totalBlocked++;
            
            if (category === 'youtube' || (url && url.includes('youtube.com'))) {
                this.stats.youtubeAdsBlocked++;
            } else if (category === 'ad') {
                this.stats.adsBlocked++;
            } else if (category === 'tracker') {
                this.stats.trackersBlocked++;
            }
            
            this.updateBadge();
            this.saveData();
            
            console.log(`🚫 Blocked ${category} on ${url || 'unknown'}`);
        } catch (error) {
            console.error('Error recording block:', error);
        }
    }
    
    updateBadge() {
        try {
            if (this.settings.showBadge && this.settings.enabled) {
                const count = this.stats.totalBlocked;
                chrome.action.setBadgeText({
                    text: count > 999 ? '999+' : count.toString()
                });
                chrome.action.setBadgeBackgroundColor({color: '#e74c3c'});
            } else {
                chrome.action.setBadgeText({text: ''});
            }
        } catch (error) {
            console.error('Error updating badge:', error);
        }
    }
    
    async setupContextMenu() {
        try {
            const items = [
                {
                    id: 'toggleBlocking',
                    title: '🛡️ Toggle AdBlock Shield Pro',
                    contexts: ['page', 'action']
                },
                {
                    id: 'whitelistSite',
                    title: '✅ Whitelist this site',
                    contexts: ['page']
                },
                {
                    id: 'openOptions',
                    title: '⚙️ Settings',
                    contexts: ['page', 'action']
                }
            ];
            
            for (const item of items) {
                await new Promise((resolve, reject) => {
                    chrome.contextMenus.create(item, () => {
                        if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                        } else {
                            resolve();
                        }
                    });
                });
            }
            
            // Setup click handler
            chrome.contextMenus.onClicked.addListener(async (info, tab) => {
                try {
                    switch (info.menuItemId) {
                        case 'toggleBlocking':
                            this.settings.enabled = !this.settings.enabled;
                            await this.saveData();
                            this.updateBadge();
                            break;
                        case 'whitelistSite':
                            if (tab && tab.url) {
                                const domain = new URL(tab.url).hostname;
                                const result = await chrome.storage.local.get(['whitelist']);
                                const whitelist = result.whitelist || [];
                                if (!whitelist.includes(domain)) {
                                    whitelist.push(domain);
                                    await chrome.storage.local.set({whitelist: whitelist});
                                }
                            }
                            break;
                        case 'openOptions':
                            await chrome.runtime.openOptionsPage();
                            break;
                    }
                } catch (error) {
                    console.error('Context menu error:', error);
                }
            });
            
            console.log('✅ Context menus created successfully');
        } catch (error) {
            console.error('Error setting up context menu:', error);
        }
    }
}

// Initialize the extension with comprehensive error handling
try {
    new AdBlockShieldPro();
} catch (error) {
    console.error('Failed to initialize AdBlock Shield Pro:', error);
}

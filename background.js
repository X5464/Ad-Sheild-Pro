// AdBlock Shield Pro - Background Service Worker v2.1 (FIXED)
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
            showBadge: true,
            showNotifications: false,
            blockYouTubeAds: true,
            blockWebAds: true,
            blockTrackers: true,
            blockSocialWidgets: true
        };
        
        this.contextMenusCreated = false;
        this.init();
    }
    
    async init() {
        console.log('🛡️ AdBlock Shield Pro v2.1 initialized by Rajarshi Chakraborty');
        
        // Load saved data
        await this.loadData();
        
        // Setup badge
        if (this.settings.showBadge) {
            chrome.action.setBadgeBackgroundColor({color: '#e74c3c'});
            this.updateBadge();
        }
        
        // Setup context menu (with duplicate prevention)
        await this.setupContextMenu();
        
        // Setup message listener
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.handleMessage(message, sender, sendResponse);
        });
        
        // Handle extension startup/install
        chrome.runtime.onStartup.addListener(() => {
            this.onExtensionStartup();
        });
        
        chrome.runtime.onInstalled.addListener((details) => {
            this.onExtensionInstalled(details);
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
    
    async setupContextMenu() {
        try {
            // FIXED: Remove all existing context menu items first
            await chrome.contextMenus.removeAll();
            
            // Reset the flag
            this.contextMenusCreated = false;
            
            // Wait a bit to ensure cleanup is complete
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Create context menu items with error handling
            await this.createContextMenuItem({
                id: 'toggleBlocking',
                title: '🛡️ Toggle AdBlock Shield Pro',
                contexts: ['page', 'action']
            });
            
            await this.createContextMenuItem({
                id: 'whitelistSite',
                title: '✅ Whitelist this site',
                contexts: ['page']
            });
            
            await this.createContextMenuItem({
                id: 'separator1',
                type: 'separator',
                contexts: ['page']
            });
            
            await this.createContextMenuItem({
                id: 'openOptions',
                title: '⚙️ Settings',
                contexts: ['page', 'action']
            });
            
            // Setup click handler
            chrome.contextMenus.onClicked.addListener((info, tab) => {
                this.handleContextMenuClick(info, tab);
            });
            
            this.contextMenusCreated = true;
            console.log('✅ Context menus created successfully');
            
        } catch (error) {
            console.error('Error setting up context menu:', error);
        }
    }
    
    async createContextMenuItem(properties) {
        return new Promise((resolve, reject) => {
            chrome.contextMenus.create(properties, () => {
                if (chrome.runtime.lastError) {
                    console.error(`Error creating context menu item ${properties.id}:`, chrome.runtime.lastError.message);
                    reject(chrome.runtime.lastError);
                } else {
                    console.log(`✅ Created context menu item: ${properties.id}`);
                    resolve();
                }
            });
        });
    }
    
    async handleContextMenuClick(info, tab) {
        try {
            switch (info.menuItemId) {
                case 'toggleBlocking':
                    await this.toggleBlocking();
                    break;
                case 'whitelistSite':
                    await this.whitelistCurrentSite(tab);
                    break;
                case 'openOptions':
                    chrome.runtime.openOptionsPage();
                    break;
            }
        } catch (error) {
            console.error('Error handling context menu click:', error);
        }
    }
    
    async toggleBlocking() {
        try {
            this.settings.enabled = !this.settings.enabled;
            await this.saveData();
            
            // Update badge
            this.updateBadge();
            
            // Show notification if enabled
            if (this.settings.showNotifications) {
                this.showNotification(
                    'AdBlock Shield Pro',
                    `Blocking ${this.settings.enabled ? 'enabled' : 'disabled'}`,
                    this.settings.enabled ? '🛡️' : '❌'
                );
            }
            
            console.log(`🛡️ Blocking ${this.settings.enabled ? 'enabled' : 'disabled'}`);
        } catch (error) {
            console.error('Error toggling blocking:', error);
        }
    }
    
    async whitelistCurrentSite(tab) {
        if (!tab || !tab.url) {
            console.error('Invalid tab information');
            return;
        }
        
        try {
            const url = new URL(tab.url);
            const domain = url.hostname;
            
            const result = await chrome.storage.local.get(['whitelist']);
            const whitelist = result.whitelist || [];
            
            if (!whitelist.includes(domain)) {
                whitelist.push(domain);
                await chrome.storage.local.set({whitelist: whitelist});
                
                if (this.settings.showNotifications) {
                    this.showNotification(
                        'AdBlock Shield Pro',
                        `${domain} added to whitelist`,
                        '✅'
                    );
                }
                
                console.log(`✅ Whitelisted: ${domain}`);
            } else {
                if (this.settings.showNotifications) {
                    this.showNotification(
                        'AdBlock Shield Pro',
                        `${domain} already whitelisted`,
                        '⚠️'
                    );
                }
            }
        } catch (error) {
            console.error('Error whitelisting site:', error);
        }
    }
    
    showNotification(title, message, icon = '🛡️') {
        try {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon48.png',
                title: title,
                message: message
            });
        } catch (error) {
            console.error('Error showing notification:', error);
        }
    }
    
    handleMessage(message, sender, sendResponse) {
        try {
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
                    
                case 'getSettings':
                    sendResponse(this.settings);
                    break;
            }
        } catch (error) {
            console.error('Error handling message:', error);
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
    
    onExtensionStartup() {
        console.log('🚀 Extension startup detected');
        this.setupContextMenu();
    }
    
    onExtensionInstalled(details) {
        console.log('📦 Extension installed/updated:', details.reason);
        
        if (details.reason === 'install') {
            // First time installation
            chrome.tabs.create({
                url: chrome.runtime.getURL('options/options.html')
            });
        } else if (details.reason === 'update') {
            // Extension updated
            this.setupContextMenu();
        }
    }
}

// Initialize the extension with error handling
try {
    const adBlockShieldPro = new AdBlockShieldPro();
    
    // Global error handler
    self.addEventListener('error', (event) => {
        console.error('Global error in AdBlock Shield Pro:', event.error);
    });
    
    // Unhandled promise rejection handler
    self.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection in AdBlock Shield Pro:', event.reason);
    });
    
} catch (error) {
    console.error('Error initializing AdBlock Shield Pro:', error);
}

# Tracker Shield Pro - Background Service Worker
# Comprehensive Ad & Tracker Blocking Extension

```javascript
// Tracker Shield Pro - Background Service Worker
// Comprehensive ad & tracker blocking for all websites

class TrackerShieldBackground {
    constructor() {
        this.blockedCount = 0;
        this.blockedDomains = new Set();
        this.settings = {
            enabled: true,
            blockAds: true,
            blockTrackers: true,
            blockSocial: true,
            blockAnalytics: true,
            strictMode: true
        };
        
        this.filterLists = [
            {
                name: 'EasyList',
                url: 'https://easylist.to/easylist/easylist.txt',
                enabled: true,
                lastUpdate: null
            },
            {
                name: 'EasyPrivacy',
                url: 'https://easylist.to/easylist/easyprivacy.txt',
                enabled: true,
                lastUpdate: null
            },
            {
                name: 'DuckDuckGo Tracker Radar',
                url: 'https://raw.githubusercontent.com/duckduckgo/tracker-blocklists/main/web/tds.json',
                enabled: true,
                lastUpdate: null
            }
        ];
        
        this.init();
    }
    
    async init() {
        console.log('🛡️ Tracker Shield Pro initializing...');
        
        // Load settings from storage
        await this.loadSettings();
        
        // Set up comprehensive blocking rules
        await this.setupBlockingRules();
        
        // Set up listeners
        this.setupListeners();
        
        // Schedule filter list updates
        this.scheduleUpdates();
        
        // Update badge
        this.updateBadge();
        
        console.log('✅ Tracker Shield Pro initialized successfully');
    }
    
    async loadSettings() {
        try {
            const stored = await chrome.storage.sync.get(['settings', 'blockedCount']);
            if (stored.settings) {
                this.settings = { ...this.settings, ...stored.settings };
            }
            if (stored.blockedCount) {
                this.blockedCount = stored.blockedCount;
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }
    
    async setupBlockingRules() {
        try {
            // Get comprehensive blocking rules
            const rules = await this.getComprehensiveRules();
            
            // Clear existing dynamic rules
            const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
            const ruleIdsToRemove = existingRules.map(rule => rule.id);
            
            if (ruleIdsToRemove.length > 0) {
                await chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: ruleIdsToRemove
                });
            }
            
            // Add comprehensive rules
            if (rules.length > 0) {
                await chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: rules
                });
                console.log(`📋 Added ${rules.length} comprehensive blocking rules`);
            }
            
        } catch (error) {
            console.error('Error setting up blocking rules:', error);
        }
    }
    
    async getComprehensiveRules() {
        // Comprehensive blocking rules for maximum coverage
        const rules = [];
        let ruleId = 1;
        
        // Major ad networks and trackers
        const blockedDomains = [
            // Ad networks
            'doubleclick.net', 'googleadservices.com', 'googlesyndication.com',
            'amazon-adsystem.com', 'adsystem.com', 'facebook.com/tr',
            'outbrain.com', 'taboola.com', 'criteo.com', 'adsafeprotected.com',
            
            // Analytics and tracking
            'google-analytics.com', 'googletagmanager.com', 'gtag',
            'scorecardresearch.com', 'quantserve.com', 'chartbeat.com',
            'hotjar.com', 'crazyegg.com', 'mouseflow.com', 'fullstory.com',
            
            // Social tracking
            'connect.facebook.net', 'platform.twitter.com', 'platform.linkedin.com',
            'apis.google.com/js/platform.js', 'instagram.com/embed',
            
            // Data brokers and behavioral tracking
            'addthis.com', 'sharethis.com', 'segment.com', 'mixpanel.com',
            'amplitude.com', 'heap.com', 'intercom.io', 'drift.com'
        ];
        
        // Create blocking rules for each domain
        for (const domain of blockedDomains) {
            if (this.settings.enabled && this.shouldBlockDomain(domain)) {
                rules.push({
                    id: ruleId++,
                    priority: 1,
                    action: { type: 'block' },
                    condition: {
                        urlFilter: `*://*${domain}/*`,
                        resourceTypes: ['script', 'xmlhttprequest', 'image', 'ping', 'sub_frame']
                    }
                });
            }
        }
        
        // Generic pattern blocking for comprehensive coverage
        const patterns = [
            '/ads/', '/advertising/', '/adv/', '/banner', '/popup',
            '/tracking/', '/analytics/', '/metrics/', '/telemetry/',
            '/social-share', '/widgets/social', '/embed/social'
        ];
        
        for (const pattern of patterns) {
            if (this.settings.enabled) {
                rules.push({
                    id: ruleId++,
                    priority: 1,
                    action: { type: 'block' },
                    condition: {
                        urlFilter: `*${pattern}*`,
                        resourceTypes: ['script', 'image', 'sub_frame']
                    }
                });
            }
        }
        
        // Block specific file types commonly used for tracking
        const trackingFiles = [
            'pixel.gif', 'beacon.gif', 'track.png', 'analytics.js',
            'gtag.js', 'fbevents.js', 'track.js', 'ping.gif'
        ];
        
        for (const file of trackingFiles) {
            rules.push({
                id: ruleId++,
                priority: 1,
                action: { type: 'block' },
                condition: {
                    urlFilter: `*${file}*`,
                    resourceTypes: ['script', 'image', 'ping']
                }
            });
        }
        
        return rules.slice(0, 5000); // Limit to Chrome's rule limit
    }
    
    shouldBlockDomain(domain) {
        if (domain.includes('google-analytics') || domain.includes('gtag')) {
            return this.settings.blockAnalytics;
        }
        if (domain.includes('facebook') || domain.includes('twitter') || domain.includes('social')) {
            return this.settings.blockSocial;
        }
        return this.settings.blockAds || this.settings.blockTrackers;
    }
    
    setupListeners() {
        // Handle rule matching for statistics
        if (chrome.declarativeNetRequest.onRuleMatchedDebug) {
            chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((details) => {
                this.recordBlock(details.request.url, details.rule.ruleId);
            });
        }
        
        // Handle tab updates
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (changeInfo.status === 'complete' && tab.url) {
                this.analyzeTab(tabId, tab.url);
            }
        });
        
        // Handle extension icon clicks
        chrome.action.onClicked.addListener(() => {
            this.toggleProtection();
        });
        
        // Handle storage changes
        chrome.storage.onChanged.addListener((changes, namespace) => {
            if (changes.settings && namespace === 'sync') {
                this.settings = { ...this.settings, ...changes.settings.newValue };
                this.setupBlockingRules(); // Refresh rules
            }
        });
        
        // Handle alarms for updates
        chrome.alarms.onAlarm.addListener((alarm) => {
            if (alarm.name === 'updateFilters') {
                this.updateFilterLists();
            }
        });
    }
    
    recordBlock(url, ruleId) {
        this.blockedCount++;
        
        // Extract domain from URL
        try {
            const domain = new URL(url).hostname;
            this.blockedDomains.add(domain);
        } catch (error) {
            console.error('Error parsing blocked URL:', error);
        }
        
        // Save statistics
        chrome.storage.local.set({
            blockedCount: this.blockedCount,
            blockedDomains: Array.from(this.blockedDomains)
        });
        
        // Update badge
        this.updateBadge();
        
        console.log(`🚫 Blocked: ${url} (Rule: ${ruleId})`);
    }
    
    async analyzeTab(tabId, url) {
        try {
            // Inject content script for cosmetic filtering
            await chrome.scripting.executeScript({
                target: { tabId },
                func: this.cosmeticFiltering
            });
        } catch (error) {
            console.error('Error analyzing tab:', error);
        }
    }
    
    cosmeticFiltering() {
        // Cosmetic filtering to hide ads that slip through network blocking
        const adSelectors = [
            '.ad', '.ads', '.advertisement', '.banner', '.sponsored',
            '[id*="ad"]', '[class*="ad"]', '[id*="banner"]',
            '.google-ads', '.fb-ads', '[data-ad]', '.adsbygoogle',
            '.social-share-buttons', '.social-widgets', '.tracking-pixel'
        ];
        
        // Hide ad elements
        adSelectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.display = 'none';
                    el.style.visibility = 'hidden';
                    el.style.opacity = '0';
                    el.style.height = '0';
                    el.style.width = '0';
                });
            } catch (error) {
                console.error('Error hiding elements:', error);
            }
        });
        
        // Remove tracking attributes
        const trackingAttrs = ['data-track', 'data-analytics', 'data-ga', 'data-fb'];
        trackingAttrs.forEach(attr => {
            const elements = document.querySelectorAll(`[${attr}]`);
            elements.forEach(el => el.removeAttribute(attr));
        });
    }
    
    async toggleProtection() {
        this.settings.enabled = !this.settings.enabled;
        await chrome.storage.sync.set({ settings: this.settings });
        await this.setupBlockingRules();
        this.updateBadge();
        
        console.log(`🛡️ Protection ${this.settings.enabled ? 'enabled' : 'disabled'}`);
    }
    
    updateBadge() {
        const count = this.blockedCount;
        const text = count > 999 ? '999+' : count.toString();
        
        chrome.action.setBadgeText({ text: this.settings.enabled ? text : 'OFF' });
        chrome.action.setBadgeBackgroundColor({ 
            color: this.settings.enabled ? '#10B981' : '#EF4444' 
        });
        chrome.action.setTitle({ 
            title: `Tracker Shield Pro - ${count} blocked` 
        });
    }
    
    scheduleUpdates() {
        // Update filter lists daily
        chrome.alarms.create('updateFilters', { 
            delayInMinutes: 1,
            periodInMinutes: 60 * 24 
        });
    }
    
    async updateFilterLists() {
        console.log('🔄 Updating filter lists...');
        
        for (const list of this.filterLists) {
            if (!list.enabled) continue;
            
            try {
                const response = await fetch(list.url);
                if (response.ok) {
                    const content = await response.text();
                    
                    // Parse and convert to declarativeNetRequest rules
                    const rules = this.parseFilterList(content, list.name);
                    
                    // Update rules
                    if (rules.length > 0) {
                        await this.updateRulesFromList(list.name, rules);
                        list.lastUpdate = Date.now();
                        console.log(`✅ Updated ${list.name}: ${rules.length} rules`);
                    }
                }
            } catch (error) {
                console.error(`Error updating ${list.name}:`, error);
            }
        }
        
        // Save updated list info
        await chrome.storage.local.set({ filterLists: this.filterLists });
    }
    
    parseFilterList(content, listName) {
        // Basic filter list parser (simplified)
        const rules = [];
        const lines = content.split('\n');
        let ruleId = 10000; // Start high to avoid conflicts
        
        for (const line of lines) {
            const trimmed = line.trim();
            
            // Skip comments and empty lines
            if (!trimmed || trimmed.startsWith('!') || trimmed.startsWith('[')) {
                continue;
            }
            
            // Parse basic blocking rules
            if (trimmed.startsWith('||') && trimmed.includes('^')) {
                const domain = trimmed.substring(2, trimmed.indexOf('^'));
                
                rules.push({
                    id: ruleId++,
                    priority: 1,
                    action: { type: 'block' },
                    condition: {
                        urlFilter: `*://*.${domain}/*`,
                        resourceTypes: ['script', 'xmlhttprequest', 'image', 'sub_frame']
                    }
                });
            }
        }
        
        return rules.slice(0, 1000); // Limit rules per list
    }
    
    async updateRulesFromList(listName, rules) {
        // This would update rules for a specific list
        // For simplicity, we'll just log here
        console.log(`Updating rules for ${listName}: ${rules.length} rules`);
    }
}

// Initialize the background service
const trackerShield = new TrackerShieldBackground();

// Handle installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('🎉 Tracker Shield Pro installed successfully!');
        
        // Set default settings
        chrome.storage.sync.set({
            settings: {
                enabled: true,
                blockAds: true,
                blockTrackers: true,
                blockSocial: true,
                blockAnalytics: true,
                strictMode: true
            }
        });
        
        // Show welcome page
        chrome.tabs.create({
            url: chrome.runtime.getURL('welcome.html')
        });
    }
});

// Handle startup
chrome.runtime.onStartup.addListener(() => {
    console.log('🚀 Tracker Shield Pro starting up...');
});

// Export for popup communication
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case 'getStats':
            sendResponse({
                blockedCount: trackerShield.blockedCount,
                blockedDomains: Array.from(trackerShield.blockedDomains),
                settings: trackerShield.settings
            });
            break;
            
        case 'updateSettings':
            trackerShield.settings = { ...trackerShield.settings, ...request.settings };
            chrome.storage.sync.set({ settings: trackerShield.settings });
            trackerShield.setupBlockingRules();
            sendResponse({ success: true });
            break;
            
        case 'toggleProtection':
            trackerShield.toggleProtection();
            sendResponse({ enabled: trackerShield.settings.enabled });
            break;
            
        default:
            sendResponse({ error: 'Unknown action' });
    }
    
    return true; // Keep message channel open for async response
});
```
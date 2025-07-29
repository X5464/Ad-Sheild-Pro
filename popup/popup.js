// AdBlock Shield Pro Popup Script v3.0 - FIXED
// Created by Rajarshi Chakraborty

document.addEventListener('DOMContentLoaded', async function() {
    console.log('🛡️ AdBlock Shield Pro Popup v3.0 loaded');
    
    // Load and display stats with animation
    await loadAndDisplayStats();
    
    // Load settings
    await loadSettings();
    
    // Setup event listeners
    setupEventListeners();
});

async function loadAndDisplayStats() {
    try {
        const result = await chrome.storage.local.get(['stats']);
        const stats = result.stats || {
            totalBlocked: 0,
            adsBlocked: 0,
            trackersBlocked: 0,
            youtubeAdsBlocked: 0
        };
        
        // Animate counters
        animateCounter('totalBlocked', stats.totalBlocked || 0);
        animateCounter('adsBlocked', stats.adsBlocked || 0);
        animateCounter('trackersBlocked', stats.trackersBlocked || 0);
        
        // Calculate data saved (50KB per blocked item)
        const dataSaved = Math.round((stats.totalBlocked || 0) * 0.05);
        document.getElementById('dataSaved').textContent = `${dataSaved}MB`;
        
    } catch (error) {
        console.error('Error loading stats:', error);
        // Set default values on error
        document.getElementById('totalBlocked').textContent = '0';
        document.getElementById('adsBlocked').textContent = '0';
        document.getElementById('trackersBlocked').textContent = '0';
        document.getElementById('dataSaved').textContent = '0MB';
    }
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let currentValue = 0;
    const increment = Math.max(1, Math.ceil(targetValue / 20));
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = currentValue.toLocaleString();
    }, 50);
}

async function loadSettings() {
    try {
        const result = await chrome.storage.local.get(['settings']);
        const settings = result.settings || {};
        
        // Set toggle states
        const toggles = ['masterToggle', 'youtubeAds', 'webTrackers', 'socialWidgets'];
        toggles.forEach(toggleId => {
            const element = document.getElementById(toggleId);
            if (element) {
                element.checked = settings[toggleId] !== false;
            }
        });
        
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

function setupEventListeners() {
    // Settings toggles
    const toggles = ['masterToggle', 'youtubeAds', 'webTrackers', 'socialWidgets'];
    toggles.forEach(toggleId => {
        const element = document.getElementById(toggleId);
        if (element) {
            element.addEventListener('change', function(e) {
                saveSetting(toggleId, e.target.checked);
            });
        }
    });
    
    // Settings button - FIXED METHOD
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            // Send message to background script to open options
            chrome.runtime.sendMessage({
                type: 'openOptions'
            }).then(() => {
                console.log('✅ Settings request sent to background script');
                window.close(); // Close popup after sending message
            }).catch(error => {
                console.error('❌ Error opening settings:', error);
                // Fallback method
                chrome.tabs.create({
                    url: chrome.runtime.getURL('options/options.html')
                });
            });
        });
    }
    
    // Whitelist button
    const whitelistBtn = document.getElementById('whitelistBtn');
    if (whitelistBtn) {
        whitelistBtn.addEventListener('click', async function() {
            try {
                const tabs = await chrome.tabs.query({active: true, currentWindow: true});
                if (tabs[0]) {
                    const url = new URL(tabs[0].url);
                    const domain = url.hostname;
                    
                    const result = await chrome.storage.local.get(['whitelist']);
                    const whitelist = result.whitelist || [];
                    
                    if (!whitelist.includes(domain)) {
                        whitelist.push(domain);
                        await chrome.storage.local.set({whitelist: whitelist});
                        
                        // Update button to show success
                        const originalText = whitelistBtn.querySelector('.btn-text').textContent;
                        whitelistBtn.querySelector('.btn-text').textContent = 'Added!';
                        whitelistBtn.style.background = '#22c55e';
                        
                        setTimeout(() => {
                            whitelistBtn.querySelector('.btn-text').textContent = originalText;
                            whitelistBtn.style.background = '';
                        }, 2000);
                    } else {
                        // Already whitelisted
                        whitelistBtn.querySelector('.btn-text').textContent = 'Already Added';
                        setTimeout(() => {
                            whitelistBtn.querySelector('.btn-text').textContent = 'Whitelist Site';
                        }, 2000);
                    }
                }
            } catch (error) {
                console.error('Error whitelisting site:', error);
            }
        });
    }
}

async function saveSetting(settingId, value) {
    try {
        const result = await chrome.storage.local.get(['settings']);
        const settings = result.settings || {};
        
        settings[settingId] = value;
        await chrome.storage.local.set({settings: settings});
        
        // Notify background script
        chrome.runtime.sendMessage({
            type: 'settingsChanged',
            settings: settings
        }).catch(() => {}); // Ignore messaging errors
        
        console.log(`✅ Setting ${settingId} saved:`, value);
        
    } catch (error) {
        console.error('Error saving setting:', error);
    }
}

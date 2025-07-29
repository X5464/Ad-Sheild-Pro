// AdBlock Shield Pro - Options Page Script v2.0
// Created by Rajarshi Chakraborty

document.addEventListener('DOMContentLoaded', async function() {
    console.log('🛡️ AdBlock Shield Pro Options loaded - Rajarshi Chakraborty');
    
    // Initialize tabs
    initializeTabs();
    
    // Load settings and data
    await loadSettings();
    await loadWhitelist();
    await loadStatistics();
    
    // Setup event listeners
    setupEventListeners();
});

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Remove active classes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active classes
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

async function loadSettings() {
    try {
        const result = await chrome.storage.local.get(['settings']);
        const settings = result.settings || {};
        
        // Set toggle states
        document.getElementById('masterToggle').checked = settings.enabled !== false;
        document.getElementById('showBadge').checked = settings.showBadge !== false;
        document.getElementById('showNotifications').checked = settings.showNotifications === true;
        document.getElementById('blockYouTubeAds').checked = settings.blockYouTubeAds !== false;
        document.getElementById('blockWebAds').checked = settings.blockWebAds !== false;
        document.getElementById('blockTrackers').checked = settings.blockTrackers !== false;
        document.getElementById('blockSocialWidgets').checked = settings.blockSocialWidgets !== false;
        
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

async function loadWhitelist() {
    try {
        const result = await chrome.storage.local.get(['whitelist']);
        const whitelist = result.whitelist || [];
        
        const listContainer = document.getElementById('whitelistList');
        
        if (whitelist.length === 0) {
            listContainer.innerHTML = `
                <div class="empty-state">
                    <p>🔓 No whitelisted sites yet</p>
                    <p>Add sites where you want to allow ads</p>
                </div>
            `;
            return;
        }
        
        listContainer.innerHTML = '';
        whitelist.forEach(domain => {
            const item = document.createElement('div');
            item.className = 'whitelist-item';
            item.innerHTML = `
                <span>${domain}</span>
                <button class="remove-btn" data-domain="${domain}">Remove</button>
            `;
            
            item.querySelector('.remove-btn').addEventListener('click', function() {
                removeFromWhitelist(domain);
            });
            
            listContainer.appendChild(item);
        });
        
    } catch (error) {
        console.error('Error loading whitelist:', error);
    }
}

async function loadStatistics() {
    try {
        const result = await chrome.storage.local.get(['stats']);
        const stats = result.stats || {};
        
        // Animate counters
        animateCounter('totalBlockedStat', stats.totalBlocked || 0);
        animateCounter('youtubeAdsStat', stats.youtubeAdsBlocked || 0);
        animateCounter('trackersStat', stats.trackersBlocked || 0);
        
        // Data saved calculation
        const dataSaved = Math.round((stats.totalBlocked || 0) * 0.05); // 50KB per blocked item
        document.getElementById('dataSavedStat').textContent = `${dataSaved} MB`;
        
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    let currentValue = 0;
    const increment = Math.ceil(targetValue / 30);
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = currentValue.toLocaleString();
    }, 50);
}

function setupEventListeners() {
    // Settings toggles
    const settingIds = [
        'masterToggle', 'showBadge', 'showNotifications',
        'blockYouTubeAds', 'blockWebAds', 'blockTrackers', 'blockSocialWidgets'
    ];
    
    settingIds.forEach(id => {
        document.getElementById(id).addEventListener('change', saveSetting);
    });
    
    // Whitelist functionality
    document.getElementById('addSiteBtn').addEventListener('click', addToWhitelist);
    document.getElementById('whitelistInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addToWhitelist();
        }
    });
    
    // Reset statistics
    document.getElementById('resetStatsBtn').addEventListener('click', resetStatistics);
}

async function saveSetting(event) {
    try {
        const result = await chrome.storage.local.get(['settings']);
        const settings = result.settings || {};
        
        settings[event.target.id] = event.target.checked;
        await chrome.storage.local.set({settings: settings});
        
        // Show saved feedback
        showSavedFeedback(event.target);
        
        // Notify background script
        if (chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.sendMessage({
                type: 'settingsChanged',
                settings: settings
            });
        }
        
    } catch (error) {
        console.error('Error saving setting:', error);
    }
}

async function addToWhitelist() {
    const input = document.getElementById('whitelistInput');
    const domain = input.value.trim().toLowerCase();
    
    if (!domain) {
        showNotification('Please enter a domain', 'error');
        return;
    }
    
    // Basic domain validation
    if (!isValidDomain(domain)) {
        showNotification('Please enter a valid domain (e.g., example.com)', 'error');
        return;
    }
    
    try {
        const result = await chrome.storage.local.get(['whitelist']);
        const whitelist = result.whitelist || [];
        
        if (whitelist.includes(domain)) {
            showNotification('Domain already whitelisted', 'warning');
            return;
        }
        
        whitelist.push(domain);
        await chrome.storage.local.set({whitelist: whitelist});
        
        input.value = '';
        showNotification(`${domain} added to whitelist`, 'success');
        loadWhitelist();
        
    } catch (error) {
        console.error('Error adding to whitelist:', error);
        showNotification('Error adding domain', 'error');
    }
}

async function removeFromWhitelist(domain) {
    try {
        const result = await chrome.storage.local.get(['whitelist']);
        const whitelist = result.whitelist || [];
        
        const index = whitelist.indexOf(domain);
        if (index > -1) {
            whitelist.splice(index, 1);
            await chrome.storage.local.set({whitelist: whitelist});
            showNotification(`${domain} removed from whitelist`, 'success');
            loadWhitelist();
        }
        
    } catch (error) {
        console.error('Error removing from whitelist:', error);
    }
}

async function resetStatistics() {
    if (confirm('Are you sure you want to reset all statistics? This action cannot be undone.')) {
        try {
            await chrome.storage.local.set({
                stats: {
                    totalBlocked: 0,
                    youtubeAdsBlocked: 0,
                    trackersBlocked: 0,
                    adsBlocked: 0
                }
            });
            
            showNotification('Statistics reset successfully', 'success');
            loadStatistics();
            
        } catch (error) {
            console.error('Error resetting statistics:', error);
            showNotification('Error resetting statistics', 'error');
        }
    }
}

function showSavedFeedback(element) {
    const originalBg = element.parentElement.style.background;
    element.parentElement.style.background = '#d4edda';
    element.parentElement.style.borderColor = '#c3e6cb';
    
    setTimeout(() => {
        element.parentElement.style.background = originalBg;
        element.parentElement.style.borderColor = '';
    }, 1000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function isValidDomain(domain) {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain) || domain === 'localhost';
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

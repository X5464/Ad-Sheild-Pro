// AdBlock Shield Pro - Enhanced Content Script v4.0
// Created by Rajarshi Chakraborty

(function() {
    'use strict';
    
    console.log('🛡️ AdBlock Shield Pro content script v4.0 active');
    
    class ContentBlocker {
        constructor() {
            this.blockedCount = 0;
            this.domain = window.location.hostname;
            this.init();
        }
        
        async init() {
            // Load settings
            try {
                const result = await chrome.storage.local.get(['settings', 'whitelist']);
                this.settings = result.settings || {};
                this.whitelist = result.whitelist || [];
                
                // Check if current site is whitelisted
                if (this.isWhitelisted()) {
                    console.log('🔓 Site whitelisted, skipping blocking');
                    return;
                }
                
                // Start blocking
                this.blockAds();
                this.blockTrackers();
                this.setupMutationObserver();
                
            } catch (error) {
                console.error('Error initializing content blocker:', error);
            }
        }
        
        isWhitelisted() {
            return this.whitelist.some(domain => this.domain.includes(domain));
        }
        
        blockAds() {
            const adSelectors = [
                // Generic ad selectors
                '[class*="ad-"]', '[class*="ads-"]', '[class*="_ad_"]',
                '[id*="ad-"]', '[id*="ads-"]', '[id*="_ad_"]',
                '.advertisement', '.sponsored', '.promotion', '.promo',
                '[data-ad]', '[data-ads]', '[data-adunit]',
                
                // Specific ad networks
                '.google-ads', '.googlesyndication', '.doubleclick-ad',
                '.amazon-ad', '.outbrain', '.taboola', '.content-ads',
                
                // Social media ads
                '[data-testid*="ad"]', '[aria-label*="Sponsored"]',
                '.promoted-tweet', '.sponsored-post'
            ];
            
            this.hideElements(adSelectors, 'ad');
        }
        
        blockTrackers() {
            const trackerSelectors = [
                // Tracking pixels
                'img[src*="google-analytics"]',
                'img[src*="googletagmanager"]', 
                'img[src*="facebook.com/tr"]',
                'img[src*="doubleclick"]',
                
                // Tracking scripts
                'script[src*="hotjar"]',
                'script[src*="mixpanel"]',
                'script[src*="segment"]',
                'script[src*="intercom"]'
            ];
            
            this.hideElements(trackerSelectors, 'tracker');
        }
        
        hideElements(selectors, category) {
            selectors.forEach(selector => {
                try {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(element => {
                        if (element && element.style.display !== 'none') {
                            // Multiple hiding methods for maximum effectiveness
                            element.style.display = 'none !important';
                            element.style.visibility = 'hidden !important';
                            element.style.opacity = '0 !important';
                            element.style.height = '0px !important';
                            element.style.width = '0px !important';
                            element.style.overflow = 'hidden !important';
                            
                            // Mark as blocked
                            element.setAttribute('data-adblock-shield-blocked', category);
                            
                            this.blockedCount++;
                            
                            // Notify background script
                            if (typeof chrome !== 'undefined' && chrome.runtime) {
                                chrome.runtime.sendMessage({
                                    type: 'blocked',
                                    category: category,
                                    url: window.location.href
                                }).catch(() => {}); // Ignore errors if background script is asleep
                            }
                        }
                    });
                } catch (error) {
                    // Ignore selector errors
                }
            });
        }
        
        setupMutationObserver() {
            // Throttled mutation observer
            let timeout;
            const observer = new MutationObserver(() => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    this.blockAds();
                    this.blockTrackers();
                }, 500); // Throttled to prevent performance issues
            });
            
            // Wait for body to be available
            const startObserver = () => {
                const targetNode = document.body || document.documentElement;
                if (targetNode) {
                    observer.observe(targetNode, {
                        childList: true,
                        subtree: true
                    });
                } else {
                    setTimeout(startObserver, 100);
                }
            };
            
            startObserver();
        }
    }
    
    // Initialize content blocker when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new ContentBlocker());
    } else {
        new ContentBlocker();
    }
})();

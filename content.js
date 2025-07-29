// AdBlock Shield Pro Content Script  
// Created by Rajarshi Chakraborty

(function() {
  'use strict';
  
  class ContentBlocker {
    constructor() {
      this.blockedCount = 0;
      this.init();
    }
    
    async init() {
      // Load settings
      const result = await chrome.storage.local.get(['settings', 'whitelist']);
      this.settings = result.settings || {};
      this.whitelist = result.whitelist || [];
      
      // Check if current site is whitelisted
      if (this.isWhitelisted()) {
        return;
      }
      
      // Start blocking
      this.blockAds();
      this.blockTrackers();
      this.setupMutationObserver();
      
      console.log('🛡️ AdBlock Shield Pro content script active');
    }
    
    isWhitelisted() {
      const hostname = window.location.hostname;
      return this.whitelist.some(domain => hostname.includes(domain));
    }
    
    blockAds() {
      if (!this.settings.blockAds) return;
      
      const adSelectors = [
        // Generic ad selectors
        '[class*="ad-"]', '[class*="ads-"]', '[class*="_ad_"]',
        '[id*="ad-"]', '[id*="ads-"]', '[id*="_ad_"]',
        '.advertisement', '.sponsored', '.promotion',
        '[data-ad]', '[data-ads]', '[data-adunit]',
        
        // Specific ad networks
        '.google-ads', '.googlesyndication',
        '.facebook-ad', '.twitter-promoted',
        '.outbrain', '.taboola', '.content-ads',
        
        // Video ads
        '.video-ads', '.preroll-ads', '.midroll-ads'
      ];
      
      this.hideElements(adSelectors, 'ad');
    }
    
    blockTrackers() {
      if (!this.settings.blockTrackers) return;
      
      // Block tracking pixels and beacons
      const trackingSelectors = [
        'img[src*="google-analytics"]',
        'img[src*="googletagmanager"]', 
        'img[src*="facebook.com/tr"]',
        'img[src*="doubleclick"]',
        'iframe[src*="google-analytics"]',
        'script[src*="hotjar"]',
        'script[src*="mixpanel"]'
      ];
      
      this.hideElements(trackingSelectors, 'tracker');
    }
    
    hideElements(selectors, category) {
      selectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            if (element.style.display !== 'none') {
              element.style.display = 'none';
              element.style.visibility = 'hidden';
              element.style.opacity = '0';
              element.style.height = '0';
              element.style.width = '0';
              element.setAttribute('data-adblock-shield-blocked', category);
              
              this.blockedCount++;
              
              // Notify background script
              chrome.runtime.sendMessage({
                type: 'blocked',
                category: category,
                url: window.location.href
              });
            }
          });
        } catch (e) {
          // Ignore selector errors
        }
      });
    }
    
    setupMutationObserver() {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // Check if the new element is an ad
              this.checkElement(node);
            }
          });
        });
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
    
    checkElement(element) {
      // Check for ad-like patterns in new elements
      const adPatterns = [
        /\bad[s]?\b/i, /\bsponsored\b/i, /\bpromotion\b/i,
        /\badvertisement\b/i, /\bgoogle[_-]?ads?\b/i
      ];
      
      const elementText = element.className + ' ' + element.id + ' ' + element.innerHTML;
      
      if (adPatterns.some(pattern => pattern.test(elementText))) {
        element.style.display = 'none';
        this.blockedCount++;
        
        chrome.runtime.sendMessage({
          type: 'blocked',
          category: 'ad',
          url: window.location.href
        });
      }
    }
  }
  
  // Initialize content blocker
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ContentBlocker());
  } else {
    new ContentBlocker();
  }
})();

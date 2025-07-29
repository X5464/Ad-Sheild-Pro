// AdBlock Shield Pro - YouTube Optimizer v2.0
// Created by Rajarshi Chakraborty

(function() {
    'use strict';
    
    console.log('🎯 YouTube Optimizer loaded - Rajarshi Chakraborty');
    
    class YouTubeAdBlocker {
        constructor() {
            this.blockedAds = 0;
            this.selectors = [
                '.video-ads', '.ytp-ad-module', '.ytp-ad-overlay-container',
                '.ytp-ad-progress-list', '.ytp-ad-text', '.ytp-ad-preview-container',
                '#secondary .ytd-promoted-sparkles-web-renderer',
                'ytd-promoted-sparkles-web-renderer',
                '.ytd-promoted-video-renderer',
                '.ytd-mealbar-promo-renderer',
                'ytd-popup-container #contentWrapper',
                '.shorts-video-ad'
            ];
            this.init();
        }
        
        init() {
            this.removeAdsImmediately();
            this.setupMutationObserver();
            this.skipVideoAds();
        }
        
        removeAdsImmediately() {
            this.selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.display = 'none !important';
                    el.remove();
                    this.blockedAds++;
                });
            });
        }
        
        setupMutationObserver() {
            const observer = new MutationObserver(this.throttle(() => {
                this.removeAdsImmediately();
            }, 500));
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
        
        skipVideoAds() {
            const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-skip-ad-button');
            if (skipButton && skipButton.offsetParent !== null) {
                skipButton.click();
                this.blockedAds++;
            }
        }
        
        throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        }
    }
    
    new YouTubeAdBlocker();
})();

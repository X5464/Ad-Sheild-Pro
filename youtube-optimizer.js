// AdBlock Shield Pro - YouTube Optimizer v4.0 (Fixed)
// Created by Rajarshi Chakraborty

(function() {
    'use strict';
    
    if (!window.location.hostname.includes('youtube.com')) return;
    
    console.log('🎯 YouTube Optimizer v4.0 loaded');
    
    class YouTubeOptimizer {
        constructor() {
            this.blockedCount = 0;
            this.init();
        }
        
        init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.start());
            } else {
                this.start();
            }
        }
        
        start() {
            this.blockAds();
            this.setupObserver();
            this.skipAds();
        }
        
        blockAds() {
            const adSelectors = [
                '.video-ads', '.ytp-ad-module', '.ytp-ad-overlay-container',
                '.ytp-ad-text', '.ytp-ad-preview-container',
                'ytd-promoted-sparkles-web-renderer',
                '.ytd-promoted-video-renderer',
                '.ytd-banner-promo-renderer'
            ];
            
            adSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(element => {
                    element.style.display = 'none !important';
                    element.remove();
                    this.blockedCount++;
                });
            });
        }
        
        setupObserver() {
            // Fixed: Check if document.body exists before observing
            const targetNode = document.body || document.documentElement;
            
            if (!targetNode) {
                setTimeout(() => this.setupObserver(), 100);
                return;
            }
            
            const observer = new MutationObserver(() => {
                this.blockAds();
                this.skipAds();
            });
            
            observer.observe(targetNode, {
                childList: true,
                subtree: true
            });
        }
        
        skipAds() {
            // Skip button
            const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-skip-ad-button');
            if (skipButton && skipButton.offsetParent !== null) {
                skipButton.click();
                this.blockedCount++;
            }
            
            // Video ad manipulation
            const video = document.querySelector('video');
            if (video) {
                const adOverlay = document.querySelector('.ytp-ad-player-overlay');
                if (adOverlay && video.duration > 0) {
                    video.currentTime = video.duration;
                }
            }
        }
    }
    
    new YouTubeOptimizer();
})();

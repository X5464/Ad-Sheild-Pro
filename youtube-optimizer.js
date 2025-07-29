// AdBlock Shield Pro - Advanced YouTube Optimizer v3.0
// Anti-Detection YouTube Ad Blocker
// Created by Rajarshi Chakraborty

(function() {
    'use strict';
    
    console.log('🎯 Advanced YouTube Optimizer v3.0 - Rajarshi Chakraborty');
    
    class AdvancedYouTubeBlocker {
        constructor() {
            this.isYouTube = window.location.hostname.includes('youtube.com');
            this.blockedCount = 0;
            this.antiDetectionMode = true;
            
            if (this.isYouTube) {
                this.init();
            }
        }
        
        init() {
            // Advanced anti-detection measures
            this.spoofAdBlockDetection();
            this.blockAdsAdvanced();
            this.setupAdvancedObserver();
            this.preventAntiAdBlockScripts();
            this.optimizePerformance();
        }
        
        spoofAdBlockDetection() {
            // Spoof YouTube's ad block detection
            try {
                Object.defineProperty(window, 'adblockDetected', {
                    get: () => false,
                    set: () => false,
                    configurable: false
                });
                
                // Override common detection methods
                window.addEventListener = new Proxy(window.addEventListener, {
                    apply(target, thisArg, args) {
                        if (args[0] && args[0].toString().includes('adblock')) {
                            return; // Block adblock detection listeners
                        }
                        return target.apply(thisArg, args);
                    }
                });
                
                // Spoof ad loading
                if (window.ytplayer && window.ytplayer.config) {
                    window.ytplayer.config.args = window.ytplayer.config.args || {};
                    window.ytplayer.config.args.raw_player_response = 
                        window.ytplayer.config.args.raw_player_response || {};
                    
                    if (window.ytplayer.config.args.raw_player_response.adPlacements) {
                        window.ytplayer.config.args.raw_player_response.adPlacements = [];
                    }
                }
                
            } catch (error) {
                console.log('Anti-detection setup completed');
            }
        }
        
        blockAdsAdvanced() {
            const advancedSelectors = [
                // YouTube-specific ad selectors (2024-2025)
                '.video-ads', '.ytp-ad-module', '.ytp-ad-overlay-container',
                '.ytp-ad-progress-list', '.ytp-ad-text', '.ytp-ad-preview-container',
                '.ytp-ad-skip-button-container', '.ytp-ad-player-overlay',
                
                // Sidebar and homepage ads
                '#secondary .ytd-promoted-sparkles-web-renderer',
                'ytd-promoted-sparkles-web-renderer', '.ytd-promoted-video-renderer',
                '.ytd-mealbar-promo-renderer', 'ytd-popup-container #contentWrapper',
                
                // Shorts ads
                '.shorts-video-ad', '#shorts-container .ytd-promoted-video-renderer',
                
                // New 2024-2025 ad formats
                '.ytd-banner-promo-renderer', '.ytd-statement-banner-renderer',
                '[class*="masthead-ad"]', '[id*="masthead-ad"]',
                
                // Anti-adblock popups
                '.ytd-enforcement-message-view-model',
                '[class*="adblock-warning"]', '[id*="adblock-warning"]'
            ];
            
            this.hideElementsInstantly(advancedSelectors);
        }
        
        hideElementsInstantly(selectors) {
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
                            element.remove(); // Completely remove from DOM
                            
                            this.blockedCount++;
                            
                            // Notify background script
                            if (typeof chrome !== 'undefined' && chrome.runtime) {
                                chrome.runtime.sendMessage({
                                    type: 'blocked',
                                    category: 'youtube',
                                    url: window.location.href
                                }).catch(() => {}); // Ignore errors
                            }
                        }
                    });
                } catch (error) {
                    // Silently continue on selector errors
                }
            });
        }
        
        setupAdvancedObserver() {
            // Throttled mutation observer to prevent performance issues
            let timeout;
            const observer = new MutationObserver(() => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    this.blockAdsAdvanced();
                    this.skipVideoAds();
                }, 100); // Reduced from 500ms for faster blocking
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: false // Reduce observer overhead
            });
        }
        
        skipVideoAds() {
            // Advanced ad skipping
            try {
                // Skip button clicking
                const skipButtons = document.querySelectorAll(
                    '.ytp-ad-skip-button, .ytp-skip-ad-button, [class*="skip"]'
                );
                skipButtons.forEach(button => {
                    if (button.offsetParent !== null) {
                        button.click();
                        this.blockedCount++;
                    }
                });
                
                // Video manipulation for unskippable ads
                const video = document.querySelector('video');
                if (video && video.duration) {
                    const adOverlay = document.querySelector('.ytp-ad-player-overlay');
                    if (adOverlay) {
                        video.currentTime = video.duration; // Skip to end
                        video.play(); // Resume playback
                    }
                }
                
            } catch (error) {
                // Continue silently
            }
        }
        
        preventAntiAdBlockScripts() {
            // Block scripts that detect ad blockers
            const scriptSources = [
                'googleads', 'doubleclick', 'googlesyndication',
                'google-analytics', 'googletagmanager'
            ];
            
            const originalAppendChild = Element.prototype.appendChild;
            Element.prototype.appendChild = function(child) {
                if (child.tagName === 'SCRIPT' && child.src) {
                    const shouldBlock = scriptSources.some(source => 
                        child.src.includes(source)
                    );
                    if (shouldBlock) {
                        console.log('🚫 Blocked script:', child.src);
                        return child; // Return without appending
                    }
                }
                return originalAppendChild.call(this, child);
            };
        }
        
        optimizePerformance() {
            // Optimize YouTube performance
            try {
                // Disable autoplay on other videos to save resources
                const autoplayButton = document.querySelector('[data-tooltip-target-id="ytp-autonav-toggle-button"]');
                if (autoplayButton && autoplayButton.getAttribute('aria-pressed') === 'true') {
                    autoplayButton.click();
                }
                
                // Reduce video quality on mobile to improve loading
                if (window.innerWidth < 768) {
                    const qualityButton = document.querySelector('.ytp-settings-button');
                    if (qualityButton) {
                        // Auto-adjust quality for better performance
                        setTimeout(() => {
                            qualityButton.click();
                            setTimeout(() => {
                                const qualityOption = document.querySelector('[role="menuitem"]:last-child');
                                if (qualityOption) qualityOption.click();
                            }, 100);
                        }, 1000);
                    }
                }
            } catch (error) {
                // Performance optimization is optional
            }
        }
    }
    
    // Initialize with delay to ensure DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => new AdvancedYouTubeBlocker(), 100);
        });
    } else {
        setTimeout(() => new AdvancedYouTubeBlocker(), 100);
    }
})();

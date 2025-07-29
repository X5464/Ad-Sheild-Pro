// AdBlock Shield Pro – Advanced YouTube Optimizer v3.1
(function() {
  'use strict';
  class AdvancedYouTubeBlocker {
    constructor() {
      if (!window.location.hostname.includes('youtube.com')) return;
      this.init();
    }
    init() {
      this.spoofAdBlockDetection();
      this.blockAdsAdvanced();
      this.waitForRoot(root => this.setupAdvancedObserver(root));
      this.preventAntiAdBlockScripts();
      this.optimizePerformance();
    }
    waitForRoot(callback) {
      const check = () => {
        const root = document.body || document.documentElement;
        if (root && root.nodeType === Node.ELEMENT_NODE) return callback(root);
        requestAnimationFrame(check);
      };
      check();
    }
    setupAdvancedObserver(rootNode) {
      let timeout;
      const observer = new MutationObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.blockAdsAdvanced();
          this.skipVideoAds();
        }, 100);
      });
      observer.observe(rootNode, { childList: true, subtree: true });
    }
    // … (rest of class unchanged) …
  }
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', () => setTimeout(() => new AdvancedYouTubeBlocker(), 100))
    : setTimeout(() => new AdvancedYouTubeBlocker(), 100);
})();

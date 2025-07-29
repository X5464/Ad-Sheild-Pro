// AdBlock Shield Pro Content Script
// Created by Rajarshi Chakraborty

(function() {
  'use strict';
  
  console.log('AdBlock Shield Pro content script loaded');
  
  // Hide common ad elements
  const adSelectors = [
    '[class*="ad"]',
    '[id*="ad"]',
    '.advertisement',
    '.sponsored',
    '[data-ad]'
  ];
  
  function hideAds() {
    adSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.display = 'none';
      });
    });
  }
  
  // Run immediately and on DOM changes
  hideAds();
  
  const observer = new MutationObserver(hideAds);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();

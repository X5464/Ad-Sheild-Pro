// AdBlock Shield Pro - Professional Ad & Tracker Blocker Demo
class AdBlockShieldPro {
    constructor() {
        this.data = {
            "blockingStats": {
                "adsBlocked": 15847,
                "trackersBlocked": 8923,
                "dataSaved": "1.4GB",
                "pageSpeedImprovement": "43%",
                "batteryImprovement": "22%",
                "totalRequests": 45231,
                "blockedRequests": 24770
            },
            "platforms": [
                {
                    "name": "Windows",
                    "browsers": [
                        {"name": "Chrome", "difficulty": "Easy", "time": "5 minutes", "compatibility": "Full"},
                        {"name": "Firefox", "difficulty": "Easy", "time": "3 minutes", "compatibility": "Full"}, 
                        {"name": "Edge", "difficulty": "Easy", "time": "5 minutes", "compatibility": "Full"}
                    ]
                },
                {
                    "name": "Mac",
                    "browsers": [
                        {"name": "Safari", "difficulty": "Medium", "time": "10 minutes", "compatibility": "Full"},
                        {"name": "Chrome", "difficulty": "Easy", "time": "5 minutes", "compatibility": "Full"},
                        {"name": "Firefox", "difficulty": "Easy", "time": "3 minutes", "compatibility": "Full"}
                    ]
                },
                {
                    "name": "Android", 
                    "browsers": [
                        {"name": "Kiwi Browser", "difficulty": "Easy", "time": "5 minutes", "compatibility": "Full"},
                        {"name": "Firefox Android", "difficulty": "Easy", "time": "3 minutes", "compatibility": "Full"},
                        {"name": "Edge Canary", "difficulty": "Medium", "time": "8 minutes", "compatibility": "Limited"}
                    ]
                }
            ],
            "blockingCategories": [
                {"name": "Advertisement Blocking", "enabled": true, "blocked": 15847, "percentage": 94},
                {"name": "Tracker Blocking", "enabled": true, "blocked": 8923, "percentage": 91}, 
                {"name": "Social Media Tracking", "enabled": true, "blocked": 3421, "percentage": 88},
                {"name": "Analytics Blocking", "enabled": true, "blocked": 6234, "percentage": 86},
                {"name": "Malware Protection", "enabled": true, "blocked": 12, "percentage": 96},
                {"name": "Cookie Banners", "enabled": false, "blocked": 0, "percentage": 0}
            ],
            "technicalFeatures": [
                {"name": "Manifest V3 Compliant", "status": "Full Support", "description": "Uses latest Chrome extension standards"},
                {"name": "DeclarativeNetRequest API", "status": "Full Support", "description": "High-performance request blocking"},
                {"name": "Cross-Browser Polyfill", "status": "Full Support", "description": "Works on Chrome, Firefox, Safari, Edge"},
                {"name": "Multiple Filter Lists", "status": "300,000+ Rules", "description": "EasyList, EasyPrivacy, AdGuard, Custom"},
                {"name": "Real-time Updates", "status": "< 1ms Response", "description": "Automatic filter list updates"},
                {"name": "Custom Rules", "status": "Full Support", "description": "Create and import custom blocking rules"},
                {"name": "Performance Monitoring", "status": "Full Support", "description": "Track blocking effectiveness and speed"},
                {"name": "Whitelist Management", "status": "Full Support", "description": "Site-specific exceptions and rules"}
            ],
            "installationSteps": {
                "windows": {
                    "chrome": [
                        "Open Google Chrome browser on your Windows PC",
                        "Navigate to Chrome Web Store (chrome.google.com/webstore)",
                        "Search for 'AdBlock Shield Pro' in the search bar",
                        "Click the 'Add to Chrome' button on the extension page",
                        "Review permissions and click 'Add extension' to confirm",
                        "Pin the extension icon to your toolbar for easy access",
                        "Configure your blocking preferences in the popup",
                        "Enjoy professional-grade ad and tracker blocking!"
                    ],
                    "firefox": [
                        "Launch Mozilla Firefox on your Windows computer",
                        "Visit Firefox Add-ons store (addons.mozilla.org)",
                        "Search for 'AdBlock Shield Pro' extension",
                        "Click 'Add to Firefox' button on the extension page",
                        "Accept permissions in the installation popup",
                        "Access the extension from the toolbar icon",
                        "Customize blocking categories and strictness level",
                        "Start browsing with enhanced privacy protection"
                    ],
                    "edge": [
                        "Open Microsoft Edge browser on Windows",
                        "Click the three-dot menu > Extensions > Get extensions",
                        "Visit Microsoft Edge Add-ons store",
                        "Search for 'AdBlock Shield Pro' extension",
                        "Click 'Get' to install the extension",
                        "Alternatively, enable Chrome Web Store extensions",
                        "Configure extension settings and preferences",
                        "Experience faster, cleaner web browsing"
                    ]
                },
                "mac": {
                    "safari": [
                        "Download AdBlock Shield Pro from Mac App Store",
                        "Install the container app on your Mac",
                        "Open Safari > Preferences > Extensions",
                        "Enable AdBlock Shield Pro in the extensions list",
                        "Grant necessary permissions for web content access",
                        "Configure blocking categories in Safari settings",
                        "Restart Safari to activate the extension",
                        "Enjoy native Safari ad blocking with full compatibility"
                    ],
                    "chrome": [
                        "Open Google Chrome on your Mac",
                        "Visit Chrome Web Store and search for AdBlock Shield Pro",
                        "Click 'Add to Chrome' and confirm installation",
                        "Pin extension to toolbar for quick access",
                        "Configure blocking preferences in popup interface",
                        "Set up custom rules and whitelist if needed",
                        "Start blocking ads and trackers across all websites"
                    ],
                    "firefox": [
                        "Launch Firefox browser on macOS",
                        "Navigate to Firefox Add-ons (addons.mozilla.org)",
                        "Search and install AdBlock Shield Pro",
                        "Accept permissions and restart if prompted",
                        "Access extension settings from toolbar",
                        "Customize blocking strictness and categories"
                    ]
                },
                "android": {
                    "kiwi": [
                        "Install Kiwi Browser from Google Play Store",
                        "Open Kiwi Browser and tap the three-dot menu",
                        "Select 'Extensions' from the dropdown menu",
                        "Tap 'Chrome Web Store' at the bottom of screen",
                        "Search for 'AdBlock Shield Pro' extension",
                        "Tap 'Add to Chrome' to install on mobile",
                        "Grant required permissions when prompted",
                        "Configure mobile-optimized blocking settings",
                        "Enjoy ad-free browsing on your Android device!"
                    ],
                    "firefox": [
                        "Download Firefox for Android from Play Store",
                        "Open Firefox and tap the three-line menu",
                        "Select 'Add-ons' from the menu options",
                        "Browse recommended or search for extensions",
                        "Find and tap 'AdBlock Shield Pro'",
                        "Tap the '+' button to add the extension",
                        "Choose privacy settings and permissions",
                        "Start browsing with mobile ad blocking protection"
                    ],
                    "edge-canary": [
                        "Install Microsoft Edge Canary from Play Store",
                        "Open Edge Canary and enable Developer Mode",
                        "Navigate to edge://extensions/ in address bar",
                        "Enable 'Developer mode' toggle",
                        "Load unpacked extension or install from store",
                        "Configure extension permissions carefully",
                        "Note: Limited functionality in mobile environment",
                        "Use for testing advanced blocking features"
                    ]
                }
            }
        };

        this.settings = {
            blockingCategories: {
                ads: true,
                trackers: true,
                social: true,
                annoyances: true
            },
            strictnessLevel: 'standard',
            customRules: '',
            whitelistedSites: ['trusted-news.com', 'secure-banking.com', 'company-intranet.local'],
            currentPlatform: 'windows'
        };

        this.liveStats = {
            sessionBlocked: 0,
            blockingRate: 23,
            currentSite: 'news-website.com'
        };

        this.chart = null;
        this.currentView = 'dashboardView';
        this.updateIntervals = [];
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('Initializing AdBlock Shield Pro...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApp());
        } else {
            this.setupApp();
        }
    }

    setupApp() {
        this.setupEventListeners();
        this.updateDashboard();
        this.populateInstallationGuides();
        this.populateSettings();
        this.startRealTimeUpdates();
        this.isInitialized = true;
        console.log('AdBlock Shield Pro initialized successfully');
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');

        // Navigation tabs - Fixed with proper event handling
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const viewId = tab.getAttribute('data-view');
                console.log('Navigation tab clicked:', viewId);
                if (viewId) {
                    this.switchView(viewId);
                }
            });
        });

        // General click handler for other actions
        document.addEventListener('click', (e) => {
            // Skip if this is a nav tab (handled above)
            if (e.target.closest('.nav-tab')) {
                return;
            }

            // Site actions
            if (e.target.id === 'whitelistSite' || e.target.closest('#whitelistSite')) {
                e.preventDefault();
                this.whitelistCurrentSite();
                return;
            }

            if (e.target.id === 'blockMore' || e.target.closest('#blockMore')) {
                e.preventDefault();
                this.switchView('settingsView');
                return;
            }

            // Settings actions
            if (e.target.id === 'addToWhitelist' || e.target.closest('#addToWhitelist')) {
                e.preventDefault();
                this.addToWhitelist();
                return;
            }

            if (e.target.id === 'saveRules' || e.target.closest('#saveRules')) {
                e.preventDefault();
                this.saveCustomRules();
                return;
            }

            if (e.target.id === 'validateRules' || e.target.closest('#validateRules')) {
                e.preventDefault();
                this.validateCustomRules();
                return;
            }

            // CTA buttons
            if (e.target.id === 'downloadExtension' || e.target.closest('#downloadExtension')) {
                e.preventDefault();
                this.handleDownload();
                return;
            }

            if (e.target.id === 'viewDocumentation' || e.target.closest('#viewDocumentation')) {
                e.preventDefault();
                this.openDocumentation();
                return;
            }

            // Platform selector
            const platformTab = e.target.closest('.platform-tab');
            if (platformTab) {
                e.preventDefault();
                const platform = platformTab.getAttribute('data-platform');
                this.switchPlatform(platform);
                return;
            }
        });

        // Dashboard toggles
        const toggleIds = ['toggleAds', 'toggleTrackers', 'toggleSocial', 'toggleAnnoyances'];
        toggleIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', (e) => {
                    const category = id.replace('toggle', '').toLowerCase();
                    this.updateBlockingCategory(category, e.target.checked);
                });
            }
        });

        // Statistics time range
        const timeRange = document.getElementById('statsTimeRange');
        if (timeRange) {
            timeRange.addEventListener('change', (e) => {
                this.updateStatistics(e.target.value);
            });
        }

        // Settings - Strictness level
        document.addEventListener('change', (e) => {
            if (e.target.name === 'strictness') {
                this.settings.strictnessLevel = e.target.value;
                this.showNotification(`Blocking strictness set to ${e.target.value}`);
            }
        });

        // Whitelist input - Enter key support
        const whitelistInput = document.getElementById('whitelistInput');
        if (whitelistInput) {
            whitelistInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.addToWhitelist();
                }
            });
        }

        console.log('Event listeners setup complete');
    }

    switchView(viewId) {
        console.log('Switching to view:', viewId);
        
        if (!viewId) {
            console.error('No viewId provided');
            return;
        }

        // Hide all views
        const allViews = document.querySelectorAll('.view');
        allViews.forEach(view => {
            view.classList.remove('active');
        });

        // Show selected view
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.add('active');
            console.log('Successfully activated view:', viewId);
        } else {
            console.error('Target view not found:', viewId);
            return;
        }

        // Update nav tabs
        const allTabs = document.querySelectorAll('.nav-tab');
        allTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`[data-view="${viewId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
            console.log('Successfully activated tab for view:', viewId);
        }

        this.currentView = viewId;

        // Initialize view-specific content
        if (viewId === 'statisticsView') {
            setTimeout(() => {
                this.initializeChart();
            }, 100);
        }

        if (viewId === 'installationView') {
            // Ensure installation guides are populated
            this.populateInstallationGuides();
        }

        this.showNotification(`Switched to ${this.getViewName(viewId)}`);
    }

    getViewName(viewId) {
        const viewNames = {
            'dashboardView': 'Dashboard',
            'featuresView': 'Technical Features',
            'statisticsView': 'Statistics',
            'installationView': 'Installation Guide',
            'settingsView': 'Settings'
        };
        return viewNames[viewId] || viewId;
    }

    updateDashboard() {
        console.log('Updating dashboard...');
        
        // Update main stats with real data
        const elements = {
            'adsBlockedToday': this.data.blockingStats.adsBlocked.toLocaleString(),
            'trackersBlockedToday': this.data.blockingStats.trackersBlocked.toLocaleString(),
            'dataSaved': this.data.blockingStats.dataSaved,
            'pageLoadImprovement': this.data.blockingStats.pageSpeedImprovement,
            'batteryImprovement': this.data.blockingStats.batteryImprovement,
            'totalBlocked': this.data.blockingStats.totalRequests.toLocaleString(),
            'currentSiteDomain': this.liveStats.currentSite,
            'siteAdsBlocked': Math.floor(Math.random() * 30) + 15,
            'siteTrackersBlocked': Math.floor(Math.random() * 20) + 8,
            'siteSocialBlocked': Math.floor(Math.random() * 10) + 3
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });

        // Update toggles to reflect current settings
        Object.entries(this.settings.blockingCategories).forEach(([category, enabled]) => {
            const toggleId = 'toggle' + category.charAt(0).toUpperCase() + category.slice(1);
            const element = document.getElementById(toggleId);
            if (element) {
                element.checked = enabled;
            }
        });

        console.log('Dashboard updated successfully');
    }

    populateInstallationGuides() {
        // Windows guides
        this.populateInstallationSteps('chromeSteps', this.data.installationSteps.windows.chrome);
        this.populateInstallationSteps('firefoxSteps', this.data.installationSteps.windows.firefox);
        this.populateInstallationSteps('edgeSteps', this.data.installationSteps.windows.edge);

        // Mac guides
        this.populateInstallationSteps('safariSteps', this.data.installationSteps.mac.safari);
        this.populateInstallationSteps('chromeMacSteps', this.data.installationSteps.mac.chrome);
        this.populateInstallationSteps('firefoxMacSteps', this.data.installationSteps.mac.firefox);

        // Android guides
        this.populateInstallationSteps('kiwiSteps', this.data.installationSteps.android.kiwi);
        this.populateInstallationSteps('firefoxAndroidSteps', this.data.installationSteps.android.firefox);
        this.populateInstallationSteps('edgeCanarySteps', this.data.installationSteps.android['edge-canary']);
    }

    populateInstallationSteps(containerId, steps) {
        const container = document.getElementById(containerId);
        if (!container || !steps) return;

        container.innerHTML = steps.map((step, index) => `
            <div class="installation-step">
                <div class="step-number">${index + 1}</div>
                <div class="step-content">${step}</div>
            </div>
        `).join('');
    }

    populateSettings() {
        // Set strictness level
        const strictnessRadio = document.querySelector(`input[name="strictness"][value="${this.settings.strictnessLevel}"]`);
        if (strictnessRadio) {
            strictnessRadio.checked = true;
        }

        // Populate whitelist
        this.updateWhitelistDisplay();

        // Set custom rules
        const customRulesTextarea = document.getElementById('customRules');
        if (customRulesTextarea) {
            customRulesTextarea.value = this.settings.customRules;
        }
    }

    updateWhitelistDisplay() {
        const whitelistContainer = document.getElementById('whitelistSites');
        if (!whitelistContainer) return;

        whitelistContainer.innerHTML = this.settings.whitelistedSites.map(domain => `
            <div class="whitelist-item">
                <span class="whitelist-domain">${domain}</span>
                <button class="remove-btn" onclick="window.adBlockShield.removeFromWhitelist('${domain}')">×</button>
            </div>
        `).join('');
    }

    initializeChart() {
        const ctx = document.getElementById('blockingChart');
        if (!ctx) {
            console.error('Chart canvas not found');
            return;
        }

        // Destroy existing chart if it exists
        if (this.chart) {
            this.chart.destroy();
        }

        const chartData = this.generateChartData();

        try {
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: 'Blocked Requests',
                        data: chartData.data,
                        backgroundColor: 'rgba(50, 184, 198, 0.1)',
                        borderColor: '#32B8C6',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#32B8C6',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(119, 124, 124, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(245, 245, 245, 0.7)',
                                font: {
                                    family: 'FKGroteskNeue'
                                }
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(119, 124, 124, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(245, 245, 245, 0.7)',
                                font: {
                                    family: 'FKGroteskNeue'
                                }
                            }
                        }
                    }
                }
            });
            
            this.populateStatisticsBreakdown();
            console.log('Chart initialized successfully');
        } catch (error) {
            console.error('Failed to initialize chart:', error);
        }
    }

    generateChartData(timeRange = 'today') {
        const ranges = {
            'today': { 
                labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'], 
                baseValue: 100 
            },
            'week': { 
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 
                baseValue: 500 
            },
            'month': { 
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], 
                baseValue: 2000 
            },
            'all': { 
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], 
                baseValue: 8000 
            }
        };

        const range = ranges[timeRange];
        const data = [];
        let base = range.baseValue;

        for (let i = 0; i < range.labels.length; i++) {
            base += Math.floor(Math.random() * (range.baseValue * 0.4)) + (range.baseValue * 0.1);
            data.push(base);
        }

        return { labels: range.labels, data: data };
    }

    populateStatisticsBreakdown() {
        const topDomains = [
            { name: 'doubleclick.net', count: 2847 },
            { name: 'google-analytics.com', count: 2156 },
            { name: 'facebook.com', count: 1923 },
            { name: 'googlesyndication.com', count: 1654 },
            { name: 'amazon-adsystem.com', count: 1432 },
            { name: 'outbrain.com', count: 1254 }
        ];

        const categories = [
            { name: 'Advertisement Blocking', count: this.data.blockingStats.adsBlocked },
            { name: 'Tracker Blocking', count: this.data.blockingStats.trackersBlocked },
            { name: 'Social Media Tracking', count: 3421 },
            { name: 'Malware Protection', count: 12 }
        ];

        const domainsContainer = document.getElementById('topBlockedDomains');
        if (domainsContainer) {
            domainsContainer.innerHTML = topDomains.map(domain => `
                <div class="domain-item">
                    <span class="domain-name">${domain.name}</span>
                    <span class="domain-count">${domain.count.toLocaleString()}</span>
                </div>
            `).join('');
        }

        const categoriesContainer = document.getElementById('categoryBreakdown');
        if (categoriesContainer) {
            categoriesContainer.innerHTML = categories.map(category => `
                <div class="category-breakdown-item">
                    <span class="category-breakdown-name">${category.name}</span>
                    <span class="category-breakdown-count">${category.count.toLocaleString()}</span>
                </div>
            `).join('');
        }
    }

    startRealTimeUpdates() {
        // Update stats periodically
        const statsInterval = setInterval(() => {
            // Simulate real-time updates
            this.data.blockingStats.adsBlocked += Math.floor(Math.random() * 5) + 1;
            this.data.blockingStats.trackersBlocked += Math.floor(Math.random() * 3) + 1;
            
            // Update current view if it's dashboard
            if (this.currentView === 'dashboardView') {
                const adsBlockedEl = document.getElementById('adsBlockedToday');
                const trackersBlockedEl = document.getElementById('trackersBlockedToday');
                
                if (adsBlockedEl) {
                    adsBlockedEl.textContent = this.data.blockingStats.adsBlocked.toLocaleString();
                }
                if (trackersBlockedEl) {
                    trackersBlockedEl.textContent = this.data.blockingStats.trackersBlocked.toLocaleString();
                }
            }
        }, 3000);

        this.updateIntervals.push(statsInterval);

        // Update site-specific stats
        const siteInterval = setInterval(() => {
            if (this.currentView === 'dashboardView') {
                const siteAds = document.getElementById('siteAdsBlocked');
                const siteTrackers = document.getElementById('siteTrackersBlocked');
                const siteSocial = document.getElementById('siteSocialBlocked');
                
                if (siteAds) siteAds.textContent = Math.floor(Math.random() * 30) + 15;
                if (siteTrackers) siteTrackers.textContent = Math.floor(Math.random() * 20) + 8;
                if (siteSocial) siteSocial.textContent = Math.floor(Math.random() * 10) + 3;
            }
        }, 5000);

        this.updateIntervals.push(siteInterval);
    }

    updateBlockingCategory(category, enabled) {
        this.settings.blockingCategories[category] = enabled;
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        
        if (enabled) {
            this.showNotification(`${categoryName} blocking enabled`);
        } else {
            this.showNotification(`${categoryName} blocking disabled`, 'warning');
        }
        
        console.log('Updated blocking category:', category, enabled);
    }

    whitelistCurrentSite() {
        const currentSite = this.liveStats.currentSite;
        if (!this.settings.whitelistedSites.includes(currentSite)) {
            this.settings.whitelistedSites.push(currentSite);
            this.updateWhitelistDisplay();
            this.showNotification(`${currentSite} added to whitelist`);
        } else {
            this.showNotification(`${currentSite} is already whitelisted`, 'warning');
        }
    }

    addToWhitelist() {
        const input = document.getElementById('whitelistInput');
        if (!input) return;

        const domain = input.value.trim().toLowerCase();
        if (!domain) {
            this.showNotification('Please enter a domain', 'warning');
            return;
        }

        if (!this.isValidDomain(domain)) {
            this.showNotification('Please enter a valid domain', 'error');
            return;
        }

        if (!this.settings.whitelistedSites.includes(domain)) {
            this.settings.whitelistedSites.push(domain);
            input.value = '';
            this.updateWhitelistDisplay();
            this.showNotification(`${domain} added to whitelist`);
        } else {
            this.showNotification(`${domain} is already whitelisted`, 'warning');
        }
    }

    removeFromWhitelist(domain) {
        const index = this.settings.whitelistedSites.indexOf(domain);
        if (index > -1) {
            this.settings.whitelistedSites.splice(index, 1);
            this.updateWhitelistDisplay();
            this.showNotification(`${domain} removed from whitelist`);
        }
    }

    saveCustomRules() {
        const textarea = document.getElementById('customRules');
        if (textarea) {
            this.settings.customRules = textarea.value;
            this.showNotification('Custom rules saved successfully');
        }
    }

    validateCustomRules() {
        const textarea = document.getElementById('customRules');
        if (!textarea) return;

        const rules = textarea.value.split('\n').filter(rule => rule.trim());
        let validRules = 0;
        let invalidRules = 0;

        rules.forEach(rule => {
            if (this.isValidRule(rule.trim())) {
                validRules++;
            } else {
                invalidRules++;
            }
        });

        if (invalidRules === 0 && validRules > 0) {
            this.showNotification(`All ${validRules} rules are valid`);
        } else if (validRules === 0 && rules.length > 0) {
            this.showNotification('No valid rules found', 'error');
        } else {
            this.showNotification(`${validRules} valid, ${invalidRules} invalid rules`, 'warning');
        }
    }

    updateStatistics(timeRange) {
        if (this.chart) {
            const newData = this.generateChartData(timeRange);
            this.chart.data.labels = newData.labels;
            this.chart.data.datasets[0].data = newData.data;
            this.chart.update('show');
        }
        this.showNotification(`Statistics updated to ${timeRange} view`);
    }

    switchPlatform(platform) {
        // Update platform tabs
        document.querySelectorAll('.platform-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`[data-platform="${platform}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Show platform content
        document.querySelectorAll('.platform-content').forEach(content => {
            content.classList.remove('active');
        });

        const targetContent = document.getElementById(`${platform}Installation`);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        this.settings.currentPlatform = platform;
        this.showNotification(`Switched to ${platform.charAt(0).toUpperCase() + platform.slice(1)} installation guide`);
    }

    handleDownload() {
        const platform = this.settings.currentPlatform;
        const platformNames = {
            'windows': 'Windows',
            'mac': 'Mac',
            'android': 'Android'
        };
        
        this.showNotification(`Initiating download for ${platformNames[platform]} platform...`);
        
        // In a real application, this would trigger the actual download
        setTimeout(() => {
            this.showNotification('Download started! Check your downloads folder.');
        }, 1500);
    }

    openDocumentation() {
        this.showNotification('Opening documentation in new tab...');
        // In a real application, this would open documentation
    }

    isValidDomain(domain) {
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/;
        return domainRegex.test(domain);
    }

    isValidRule(rule) {
        // Basic rule validation for ad blocking syntax
        if (!rule || rule.length < 3) return false;
        if (rule.startsWith('!') || rule.startsWith('#')) return true; // Comments
        if (rule.includes('||') || rule.includes('##') || rule.includes('###')) return true; // Filter syntax
        if (rule.startsWith('@@')) return true; // Whitelist rules
        if (rule.includes('$')) return true; // Rules with options
        return rule.length > 3; // Basic length check
    }

    showNotification(message, type = 'success') {
        console.log('Notification:', message, type);
        
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    destroy() {
        // Clear all intervals
        this.updateIntervals.forEach(interval => clearInterval(interval));
        this.updateIntervals = [];
        
        // Destroy chart
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        
        // Remove event listeners
        console.log('AdBlock Shield Pro destroyed');
    }
}

// Initialize the application
let adBlockShield;

function initializeApp() {
    console.log('DOM ready, initializing AdBlock Shield Pro...');
    adBlockShield = new AdBlockShieldPro();
    adBlockShield.init();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (adBlockShield) {
        adBlockShield.destroy();
    }
});

// Global function for whitelist removal (called from HTML onclick)
window.adBlockShield = {
    removeFromWhitelist: (domain) => {
        if (adBlockShield) {
            adBlockShield.removeFromWhitelist(domain);
        }
    }
};
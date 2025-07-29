const fs = require('fs');

function parseAdblockFilters(content) {
    const lines = content.split('\n');
    const rules = [];
    let ruleId = 1;
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Skip comments and empty lines
        if (!trimmed || trimmed.startsWith('!') || trimmed.startsWith('[')) continue;
        
        // Handle blocking rules
        if (trimmed.includes('||')) {
            const domain = trimmed.split('||')[1]?.split(/[\/\^\$]/)[0];
            if (domain && domain.includes('.')) {
                rules.push({
                    id: ruleId++,
                    priority: 1,
                    action: { type: "block" },
                    condition: {
                        urlFilter: `*://*.${domain}/*`,
                        resourceTypes: ["script", "xmlhttprequest", "image", "sub_frame"]
                    }
                });
            }
        }
        
        // Limit rules to stay under Chrome's limit
        if (rules.length >= 10000) break;
    }
    
    return rules;
}

function convertFilters() {
    const filterFiles = [
        { input: 'filters/easylist.txt', output: 'rules/easylist_rules.json' },
        { input: 'filters/easyprivacy.txt', output: 'rules/easyprivacy_rules.json' },
        { input: 'filters/fanboy-annoyances.txt', output: 'rules/fanboy_rules.json' },
        { input: 'filters/adguard-base.txt', output: 'rules/adguard_rules.json' }
    ];
    
    if (!fs.existsSync('rules')) fs.mkdirSync('rules');
    
    filterFiles.forEach(({ input, output }) => {
        if (fs.existsSync(input)) {
            const content = fs.readFileSync(input, 'utf8');
            const rules = parseAdblockFilters(content);
            fs.writeFileSync(output, JSON.stringify(rules, null, 2));
            console.log(`✅ Converted: ${output} (${rules.length} rules)`);
        }
    });
    
    console.log('🎉 All filters converted successfully!');
}

convertFilters();

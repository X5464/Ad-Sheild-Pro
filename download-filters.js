const fs = require('fs');
const https = require('https');

function download(url, filename) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filename);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`✅ Downloaded: ${filename}`);
                resolve();
            });
        }).on('error', reject);
    });
}

async function downloadFilters() {
    if (!fs.existsSync('filters')) fs.mkdirSync('filters');
    
    await download('https://easylist.to/easylist/easylist.txt', 'filters/easylist.txt');
    await download('https://easylist.to/easylist/easyprivacy.txt', 'filters/easyprivacy.txt');
    await download('https://easylist.to/easylist/fanboy-annoyance.txt', 'filters/fanboy-annoyances.txt');
    await download('https://raw.githubusercontent.com/AdguardTeam/FiltersRegistry/master/filters/filter_2_Base/filter.txt', 'filters/adguard-base.txt');
    
    console.log('🎉 All filters downloaded successfully!');
}

downloadFilters().catch(console.error);

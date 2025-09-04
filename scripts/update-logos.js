#!/usr/bin/env node

const fs = require('fs').promises;

class LogoUpdater {
    constructor() {
        this.knownApiLogos = {
            'margarita-diamante': {
                logo: 'https://cdn1.pactorian.net/fcceacc50b1db2fc4e8872b06099c142/3ISnhfvjxox*ybUNrupT9B5qyII6ZIqjWg4AGh4Te6U=/jtGo7xfGreYfjucCmU7FZg==.jpg',
                chave: 'fcceacc50b1db2fc4e8872b06099c142',
                nome: 'LIVE - MARGARITA'
            },
            'vieiralves-diamante': {
                logo: 'https://cdn1.pactorian.net/7724bf6109e5370177c8129aa431b922/3ISnhfvjxox*ybUNrupT9B5qyII6ZIqjWg4AGh4Te6U=/jtGo7xfGreYfjucCmU7FZg==.jpg', 
                chave: '7724bf6109e5370177c8129aa431b922',
                nome: 'LIVE - VIEIRALVES'
            }
        };
    }

    async updateLocations() {
        try {
            console.log('📖 Reading current locations.ts...');
            let content = await fs.readFile('./lib/locations.ts', 'utf8');
            
            console.log('🔄 Updating known API logos...');
            let updatedCount = 0;
            
            // Update each known API logo
            for (const [unitId, apiData] of Object.entries(this.knownApiLogos)) {
                // Find the unit in the file and replace the logo
                const unitPattern = new RegExp(
                    `(id:\\s*"${unitId}"[\\s\\S]*?logo:\\s*")([^"]*)(")`,
                    'g'
                );
                
                const match = content.match(unitPattern);
                if (match) {
                    const newContent = content.replace(unitPattern, `$1${apiData.logo}$3`);
                    if (newContent !== content) {
                        content = newContent;
                        updatedCount++;
                        console.log(`✅ Updated ${unitId}: ${apiData.nome}`);
                        console.log(`   New logo: ${apiData.logo.substring(0, 60)}...`);
                    }
                }
            }
            
            // Add comments with API information
            const apiComment = `
// API Logo Information
// ===================
// These logos are fetched from Pacto Soluções API
// Base URL: https://app.pactosolucoes.com.br/api/prest/v2/vendas/{chave}/unidade/1
//
// Known working API keys:
// - Margarita: fcceacc50b1db2fc4e8872b06099c142
// - Vieiralves: 7724bf6109e5370177c8129aa431b922
//
// To discover more keys, check:
// 1. Hotsite source code for API calls
// 2. Browser network tab when loading hotsites
// 3. Use scripts/manual-key-tester.js to test keys
//
`;

            // Add comment at the top
            content = content.replace('export const locations = [', 
                apiComment + 'export const locations = [');
            
            console.log('💾 Writing updated locations.ts...');
            await fs.writeFile('./lib/locations.ts', content);
            
            console.log(`\n🎉 Update complete!`);
            console.log(`Updated ${updatedCount} units with API logos`);
            console.log(`\nNext steps to get more logos:`);
            console.log('1. Use browser dev tools to find API keys in hotsites');
            console.log('2. Test keys with: node scripts/manual-key-tester.js <key>');
            console.log('3. Run this script again when you have more keys');
            
            // Save current known keys for reference
            await fs.writeFile('./known-api-keys.json', JSON.stringify({
                updated: new Date().toISOString(),
                keys: this.knownApiLogos,
                instructions: [
                    'Visit each hotsite and inspect network requests',
                    'Look for calls to app.pactosolucoes.com.br',
                    'Extract the 32-character key from the URL',
                    'Test with: node scripts/manual-key-tester.js <key>',
                    'Add working keys to this file'
                ]
            }, null, 2));
            
            console.log('\n📄 Saved reference info to known-api-keys.json');
            
        } catch (error) {
            console.error('❌ Error updating locations:', error);
        }
    }
}

// Execute if run directly
if (require.main === module) {
    const updater = new LogoUpdater();
    updater.updateLocations();
}

module.exports = LogoUpdater;
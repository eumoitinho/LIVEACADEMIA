#!/usr/bin/env node

const https = require('https');

function testSingleKey(chave) {
    return new Promise((resolve) => {
        const url = `https://app.pactosolucoes.com.br/api/prest/v2/vendas/${chave}/unidade/1`;
        
        const req = https.get(url, {
            headers: {
                'accept': 'application/json, text/plain, */*',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.logo && parsed.nome) {
                        resolve({
                            success: true,
                            chave,
                            nome: parsed.nome,
                            logo: parsed.logo,
                            cidade: parsed.cidade,
                            endereco: parsed.endereco
                        });
                    } else {
                        resolve({ success: false, chave, error: 'No logo/name found' });
                    }
                } catch (e) {
                    resolve({ success: false, chave, error: 'Parse error' });
                }
            });
        });
        
        req.on('error', (err) => {
            resolve({ success: false, chave, error: err.message });
        });
        
        req.setTimeout(8000, () => {
            req.destroy();
            resolve({ success: false, chave, error: 'Timeout' });
        });
    });
}

async function main() {
    const knownKeys = [
        'fcceacc50b1db2fc4e8872b06099c142', // Margarita 
        '7724bf6109e5370177c8129aa431b922', // Vieiralves
    ];
    
    console.log('🧪 Testing known API keys...\n');
    
    for (const key of knownKeys) {
        console.log(`Testing key: ${key}`);
        const result = await testSingleKey(key);
        
        if (result.success) {
            console.log(`✅ SUCCESS!`);
            console.log(`   Unit: ${result.nome}`);
            console.log(`   Logo: ${result.logo}`);
            console.log(`   City: ${result.cidade}`);
            console.log(`   Address: ${result.endereco}`);
        } else {
            console.log(`❌ FAILED: ${result.error}`);
        }
        console.log('');
        
        // Delay entre requests
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    // Se foi passada uma chave como argumento, teste ela também
    if (process.argv[2]) {
        const customKey = process.argv[2];
        console.log(`\n🔍 Testing custom key: ${customKey}`);
        const result = await testSingleKey(customKey);
        
        if (result.success) {
            console.log(`✅ SUCCESS!`);
            console.log(`   Unit: ${result.nome}`);
            console.log(`   Logo: ${result.logo}`);
            console.log(`   City: ${result.cidade}`);
        } else {
            console.log(`❌ FAILED: ${result.error}`);
        }
    }
}

console.log('Live Academia API Key Tester');
console.log('============================\n');
console.log('Usage: node manual-key-tester.js [custom-key]');
console.log('Example: node manual-key-tester.js a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6\n');

main().catch(console.error);
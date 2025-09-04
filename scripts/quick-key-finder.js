#!/usr/bin/env node

const https = require('https');

// Lista de hotsites prioritários com seus nomes
const targets = [
    { url: "https://pedroteixeira.hotsite.in", name: "Pedro Teixeira" },
    { url: "https://cachoeirinha.hotsite.in", name: "Cachoeirinha" },
    { url: "https://centro.hotsite.in", name: "Centro" },
    { url: "https://silves.hotsite.in", name: "Silves" },
    { url: "https://allegro.hotsite.in", name: "Torquato Allegro" }
];

// Chaves comuns para testar (baseadas em padrões)
const commonKeys = [
    // Chaves conhecidas funcionais
    'fcceacc50b1db2fc4e8872b06099c142',
    '7724bf6109e5370177c8129aa431b922',
    
    // Possíveis chaves baseadas em padrões MD5 comuns
    '1234567890abcdef1234567890abcdef',
    'abcdef1234567890abcdef1234567890',
    '0123456789abcdef0123456789abcdef',
    'fedcba0987654321fedcba0987654321',
    
    // Hash MD5 de nomes comuns
    '5d41402abc4b2a76b9719d911017c592', // MD5 de 'hello'
    'e99a18c428cb38d5f260853678922e03', // MD5 de 'abc123'
    '25d55ad283aa400af464c76d713c07ad', // MD5 de 'hello world'
    '098f6bcd4621d373cade4e832627b4f6'  // MD5 de 'test'
];

async function testKey(key) {
    return new Promise((resolve) => {
        const url = `https://app.pactosolucoes.com.br/api/prest/v2/vendas/${key}/unidade/1`;
        
        const req = https.get(url, {
            headers: { 'user-agent': 'Mozilla/5.0' }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.logo && parsed.nome) {
                        resolve({ success: true, key, data: parsed });
                    } else {
                        resolve({ success: false, key });
                    }
                } catch (e) {
                    resolve({ success: false, key });
                }
            });
        });
        
        req.on('error', () => resolve({ success: false, key }));
        req.setTimeout(5000, () => {
            req.destroy();
            resolve({ success: false, key });
        });
    });
}

async function fetchHotsite(url) {
    return new Promise((resolve) => {
        const req = https.get(url, {
            headers: { 'user-agent': 'Mozilla/5.0' }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        });
        
        req.on('error', () => resolve(''));
        req.setTimeout(8000, () => {
            req.destroy();
            resolve('');
        });
    });
}

function extractKeys(html) {
    const keys = [];
    const matches = html.match(/[a-f0-9]{32}/gi) || [];
    return [...new Set(matches.filter(key => key.length === 32))];
}

async function main() {
    console.log('🔍 Quick Key Finder - Live Academia');
    console.log('=====================================\n');
    
    const discovered = [];
    
    // 1. Primeiro testar chaves conhecidas para confirmar que funcionam
    console.log('🧪 Testando chaves conhecidas...');
    for (const key of commonKeys.slice(0, 2)) {
        const result = await testKey(key);
        if (result.success) {
            console.log(`✅ ${result.data.nome}: ${key}`);
            discovered.push(result);
        }
    }
    
    // 2. Para cada hotsite, extrair e testar chaves
    console.log('\n🔍 Procurando em hotsites...\n');
    
    for (const target of targets) {
        console.log(`📱 ${target.name}: ${target.url}`);
        
        try {
            const html = await fetchHotsite(target.url);
            if (html) {
                const foundKeys = extractKeys(html);
                console.log(`  🔑 Encontradas ${foundKeys.length} possíveis chaves`);
                
                // Testar as primeiras 3 chaves encontradas
                for (let i = 0; i < Math.min(foundKeys.length, 3); i++) {
                    const key = foundKeys[i];
                    console.log(`  ⚡ Testando: ${key.substring(0, 8)}...`);
                    
                    const result = await testKey(key);
                    if (result.success) {
                        console.log(`  ✅ SUCESSO! ${result.data.nome}`);
                        discovered.push({ ...result, hotsite: target.url, unitName: target.name });
                        break;
                    } else {
                        console.log(`  ❌ Não funcionou`);
                    }
                }
            } else {
                console.log('  ❌ Erro ao acessar hotsite');
            }
        } catch (error) {
            console.log(`  ❌ Erro: ${error.message}`);
        }
        
        console.log('');
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Resultado final
    console.log('🎉 RESULTADO FINAL');
    console.log('==================');
    
    if (discovered.length > 0) {
        console.log(`✅ Encontradas ${discovered.length} chaves funcionais:\n`);
        
        discovered.forEach((item, index) => {
            console.log(`${index + 1}. ${item.data.nome}`);
            console.log(`   Chave: ${item.key}`);
            console.log(`   Logo: ${item.data.logo.substring(0, 60)}...`);
            if (item.hotsite) console.log(`   Hotsite: ${item.hotsite}`);
            console.log('');
        });
        
        // Salvar resultado
        const fs = require('fs').promises;
        await fs.writeFile('./quick-discovery-results.json', JSON.stringify(discovered, null, 2));
        console.log('💾 Resultados salvos em quick-discovery-results.json');
        
    } else {
        console.log('❌ Nenhuma nova chave descoberta');
        console.log('\n💡 Próximos passos:');
        console.log('1. Use DevTools do browser nos hotsites');
        console.log('2. Procure na aba Network por chamadas da API');
        console.log('3. Teste chaves manualmente com manual-key-tester.js');
    }
}

main().catch(console.error);
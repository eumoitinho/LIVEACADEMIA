#!/usr/bin/env node

const https = require('https');
const crypto = require('crypto');

// Unidades prioritárias para descobrir chaves
const units = [
    { name: 'Pedro Teixeira', variations: ['pedroteixeira', 'pedro-teixeira', 'pedro_teixeira', 'teixeira'] },
    { name: 'Cachoeirinha', variations: ['cachoeirinha', 'cachoeirinha-live', 'live-cachoeirinha'] },
    { name: 'Centro', variations: ['centro', 'centro-live', 'live-centro', 'centrolive'] },
    { name: 'Silves', variations: ['silves', 'silves-live', 'live-silves', 'silveslive'] },
    { name: 'Planalto', variations: ['planalto', 'planalto-diamante', 'liveplanalto', 'planalto-live'] }
];

// Padrões comuns para gerar chaves
const patterns = [
    (name) => crypto.createHash('md5').update(name).digest('hex'),
    (name) => crypto.createHash('md5').update(`live${name}`).digest('hex'),
    (name) => crypto.createHash('md5').update(`${name}live`).digest('hex'),
    (name) => crypto.createHash('md5').update(`live-${name}`).digest('hex'),
    (name) => crypto.createHash('md5').update(`${name}-live`).digest('hex'),
    (name) => crypto.createHash('md5').update(`liveacademia${name}`).digest('hex'),
    (name) => crypto.createHash('md5').update(`${name}liveacademia`).digest('hex'),
    (name) => crypto.createHash('md5').update(`${name}2024`).digest('hex'),
    (name) => crypto.createHash('md5').update(`${name}2025`).digest('hex'),
    (name) => crypto.createHash('md5').update(`live${name}2024`).digest('hex'),
    (name) => crypto.createHash('md5').update(`live${name}2025`).digest('hex'),
    (name) => crypto.createHash('md5').update(name.toUpperCase()).digest('hex'),
    (name) => crypto.createHash('md5').update(`LIVE-${name.toUpperCase()}`).digest('hex')
];

// Chaves específicas baseadas em padrões observados
const specificKeys = [
    // Variações numéricas dos padrões conhecidos
    'fcceacc50b1db2fc4e8872b06099c143',
    'fcceacc50b1db2fc4e8872b06099c141', 
    '7724bf6109e5370177c8129aa431b921',
    '7724bf6109e5370177c8129aa431b923',
    
    // Padrões incrementais
    'fcceacc50b1db2fc4e8872b06099c144',
    'fcceacc50b1db2fc4e8872b06099c145',
    '7724bf6109e5370177c8129aa431b924',
    '7724bf6109e5370177c8129aa431b925',
    
    // Possíveis padrões sequenciais
    'a1b2c3d4e5f6789012345678901234567',
    '1234567890abcdef1234567890abcdef',
    'abcdef1234567890abcdef1234567890'
];

async function testKey(key, unitName = '') {
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
                        resolve({
                            success: true,
                            key,
                            unitName,
                            data: parsed
                        });
                    } else {
                        resolve({ success: false, key });
                    }
                } catch (e) {
                    resolve({ success: false, key });
                }
            });
        });
        
        req.on('error', () => resolve({ success: false, key }));
        req.setTimeout(8000, () => {
            req.destroy();
            resolve({ success: false, key });
        });
    });
}

async function main() {
    console.log('🧠 Smart Pattern Tester - Live Academia API Keys');
    console.log('================================================\n');
    
    const discoveries = [];
    let totalTested = 0;
    
    // 1. Testar chaves específicas primeiro
    console.log('🎯 Testando chaves específicas...');
    for (const key of specificKeys) {
        console.log(`   Testing: ${key.substring(0, 8)}...`);
        const result = await testKey(key, 'Specific Pattern');
        totalTested++;
        
        if (result.success) {
            console.log(`   ✅ FOUND: ${result.data.nome}`);
            discoveries.push(result);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // 2. Testar padrões baseados nos nomes das unidades
    console.log('\n🔄 Testando padrões baseados nos nomes...');
    
    for (const unit of units) {
        console.log(`\n📍 ${unit.name}:`);
        
        for (const variation of unit.variations) {
            console.log(`  📝 Variação: ${variation}`);
            
            // Testar os primeiros 5 padrões para cada variação
            for (let i = 0; i < Math.min(patterns.length, 5); i++) {
                const key = patterns[i](variation);
                console.log(`    🔑 ${key.substring(0, 8)}...`);
                
                const result = await testKey(key, unit.name);
                totalTested++;
                
                if (result.success) {
                    console.log(`    ✅ SUCCESS: ${result.data.nome}`);
                    discoveries.push(result);
                    break; // Encontrou para esta unidade, pular para próxima
                }
                
                await new Promise(resolve => setTimeout(resolve, 800));
            }
        }
    }
    
    // Resultado final
    console.log('\n' + '='.repeat(50));
    console.log('🎉 RESULTADO FINAL');
    console.log('='.repeat(50));
    console.log(`📊 Total testado: ${totalTested} chaves`);
    console.log(`✅ Descobertas: ${discoveries.length} chaves funcionais\n`);
    
    if (discoveries.length > 0) {
        discoveries.forEach((discovery, index) => {
            console.log(`${index + 1}. ${discovery.data.nome}`);
            console.log(`   🔑 Chave: ${discovery.key}`);
            console.log(`   🖼️  Logo: ${discovery.data.logo}`);
            console.log(`   📍 Local: ${discovery.data.cidade}, ${discovery.data.estado}`);
            console.log(`   🏷️  Padrão: ${discovery.unitName}`);
            console.log('');
        });
        
        // Salvar resultados
        const fs = require('fs').promises;
        const results = {
            timestamp: new Date().toISOString(),
            totalTested,
            discovered: discoveries.length,
            keys: discoveries.map(d => ({
                key: d.key,
                nome: d.data.nome,
                logo: d.data.logo,
                cidade: d.data.cidade,
                estado: d.data.estado,
                endereco: d.data.endereco,
                pattern: d.unitName
            }))
        };
        
        await fs.writeFile('./smart-pattern-results.json', JSON.stringify(results, null, 2));
        console.log('💾 Resultados salvos em: smart-pattern-results.json');
        
    } else {
        console.log('❌ Nenhuma nova chave descoberta com os padrões testados');
        console.log('\n💡 Próximos passos:');
        console.log('1. Use DevTools nos hotsites para monitorar Network');
        console.log('2. Verifique localStorage/sessionStorage dos hotsites');
        console.log('3. Procure por configurações dinâmicas carregadas via JS');
    }
}

main().catch(console.error);
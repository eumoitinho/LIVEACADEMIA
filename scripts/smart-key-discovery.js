#!/usr/bin/env node

const https = require('https');
const fs = require('fs').promises;
const crypto = require('crypto');

class SmartKeyDiscovery {
    constructor() {
        // Chaves conhecidas que funcionam
        this.knownKeys = [
            'fcceacc50b1db2fc4e8872b06099c142', // Margarita
            '7724bf6109e5370177c8129aa431b922', // Vieiralves
        ];
        
        // Padrões de nomes das unidades
        this.unitNames = [
            'LIVE - MARGARITA',
            'LIVE - VIEIRALVES',
            'LIVE - CACHOEIRINHA',
            'LIVE - CENTRO',
            'LIVE - CHAPEU GOIANO',
            'LIVE - CIDADE DE DEUS',
            'LIVE - COMPENSA',
            'LIVE - DOM PEDRO',
            'LIVE - JAPIIM',
            'LIVE - SILVES',
            'LIVE - SUMAUMA',
            'LIVE - TIRADENTES',
            'LIVE - TORQUATO ALLEGRO',
            'LIVE - TORQUATO SANTOS DUMONT',
            'LIVE - TORRES',
            'LIVE - FLORES',
            'LIVE - PEDRO TEIXEIRA',
            'LIVE - PLANALTO',
            'LIVE - RODRIGUES',
            'LIVE - BOM PRATO',
            'LIVE - CT CIDADE NOVA',
            'LIVE - VITORIA COROADO',
            'LIVE - CAMAPUA'
        ];
    }

    async makeRequest(url) {
        return new Promise((resolve) => {
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
                        resolve({
                            status: res.statusCode,
                            data: JSON.parse(data)
                        });
                    } catch (e) {
                        resolve({ status: res.statusCode, error: true });
                    }
                });
            });
            
            req.on('error', () => resolve({ error: true }));
            req.setTimeout(5000, () => {
                req.destroy();
                resolve({ timeout: true });
            });
        });
    }

    // Gerar chaves baseadas em padrões
    generatePossibleKeys() {
        const keys = [];
        
        // Tentar variações baseadas nos nomes das unidades
        for (const name of this.unitNames) {
            const cleanName = name.toLowerCase()
                .replace(/live\s*-\s*/g, '')
                .replace(/\s+/g, '')
                .replace(/[^a-z0-9]/g, '');
            
            // Criar hash MD5 do nome limpo
            const hash1 = crypto.createHash('md5').update(cleanName).digest('hex');
            const hash2 = crypto.createHash('md5').update(cleanName + 'live').digest('hex');
            const hash3 = crypto.createHash('md5').update('live' + cleanName).digest('hex');
            
            keys.push(hash1, hash2, hash3);
        }
        
        return [...new Set(keys)]; // Remove duplicatas
    }

    // Teste múltiplas chaves de uma vez
    async testKeys(keys, startIndex = 0, batchSize = 5) {
        const batch = keys.slice(startIndex, startIndex + batchSize);
        const promises = batch.map(async (key, index) => {
            const url = `https://app.pactosolucoes.com.br/api/prest/v2/vendas/${key}/unidade/1`;
            
            const result = await this.makeRequest(url);
            
            if (result.status === 200 && result.data && result.data.logo) {
                return {
                    key,
                    success: true,
                    name: result.data.nome,
                    logo: result.data.logo,
                    cidade: result.data.cidade
                };
            }
            
            return { key, success: false };
        });
        
        const results = await Promise.all(promises);
        return results.filter(r => r.success);
    }

    // Executar descoberta inteligente
    async discoverKeys() {
        console.log('🚀 Starting smart key discovery...\n');
        
        // 1. Testar chaves conhecidas primeiro
        console.log('📋 Testing known keys...');
        const knownResults = await this.testKeys(this.knownKeys);
        
        if (knownResults.length > 0) {
            console.log('✅ Known keys working:');
            knownResults.forEach(r => {
                console.log(`  ${r.name}: ${r.key}`);
            });
        }
        
        // 2. Gerar e testar chaves possíveis
        console.log('\n🔍 Generating possible keys based on unit names...');
        const possibleKeys = this.generatePossibleKeys();
        console.log(`Generated ${possibleKeys.length} possible keys`);
        
        console.log('\n⚡ Testing generated keys in batches...');
        const allResults = [...knownResults];
        
        for (let i = 0; i < possibleKeys.length; i += 10) {
            console.log(`Testing keys ${i + 1}-${Math.min(i + 10, possibleKeys.length)} of ${possibleKeys.length}...`);
            
            const batchResults = await this.testKeys(possibleKeys, i, 10);
            allResults.push(...batchResults);
            
            if (batchResults.length > 0) {
                batchResults.forEach(r => {
                    console.log(`✅ FOUND: ${r.name} -> ${r.key}`);
                });
            }
            
            // Delay entre batches para não sobrecarregar
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        return allResults;
    }

    // Salvar resultados encontrados
    async saveResults(results) {
        if (results.length === 0) {
            console.log('❌ No valid keys found');
            return;
        }
        
        const data = {
            timestamp: new Date().toISOString(),
            totalFound: results.length,
            units: results.map(r => ({
                name: r.name,
                key: r.key,
                logo: r.logo,
                cidade: r.cidade,
                apiUrl: `https://app.pactosolucoes.com.br/api/prest/v2/vendas/${r.key}/unidade/1`
            }))
        };
        
        await fs.writeFile('./discovered-api-keys.json', JSON.stringify(data, null, 2));
        
        console.log('\n🎉 DISCOVERY COMPLETE!');
        console.log(`Found ${results.length} valid API keys`);
        console.log('Saved to: discovered-api-keys.json');
        
        console.log('\n📊 SUMMARY:');
        results.forEach((r, index) => {
            console.log(`${index + 1}. ${r.name}`);
            console.log(`   Key: ${r.key}`);
            console.log(`   Logo: ${r.logo}`);
            console.log(`   City: ${r.cidade}`);
            console.log('');
        });
    }

    async run() {
        try {
            const results = await this.discoverKeys();
            await this.saveResults(results);
        } catch (error) {
            console.error('Error during discovery:', error);
        }
    }
}

// Executar
if (require.main === module) {
    const discovery = new SmartKeyDiscovery();
    discovery.run();
}

module.exports = SmartKeyDiscovery;
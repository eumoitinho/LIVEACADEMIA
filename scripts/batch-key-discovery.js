#!/usr/bin/env node

const https = require('https');
const crypto = require('crypto');
const fs = require('fs').promises;

class BatchKeyDiscovery {
    constructor() {
        this.hotsites = [
            "https://bomprato.hotsite.in",
            "https://liveacademiacidadenova.hotsite.in/home", 
            "https://cachoeirinha.hotsite.in",
            "https://livemcamapua.hotsite.in",
            "https://centro.hotsite.in",
            "https://livechapeugoiano.hotsite.in",
            "https://livecidadededeus.hotsite.in",
            "https://compensa.hotsite.in/home",
            "https://livedompedro.hotsite.in/",
            "https://liveacademiaflores.hotsite.in",
            "https://livejapiim.hotsite.in/home",
            "https://pedroteixeira.hotsite.in",
            "https://liveplanalto.hotsite.in",
            "https://liverodrigues.hotsite.in",
            "https://silves.hotsite.in",
            "https://livesumauma.hotsite.in",
            "https://livetiradentes.hotsite.in",
            "https://allegro.hotsite.in",
            "https://livetorquato1.hotsite.in/home",
            "https://liveacademiastorres.hotsite.in/home",
            "https://vitoriacoroado.hotsite.in"
        ];
        
        this.results = [];
        this.knownKeys = [
            'fcceacc50b1db2fc4e8872b06099c142',
            '7724bf6109e5370177c8129aa431b922'
        ];
    }

    async makeRequest(url, timeout = 10000) {
        return new Promise((resolve) => {
            const req = https.get(url, {
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
                }
            }, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
            });
            
            req.on('error', () => resolve({ error: true }));
            req.setTimeout(timeout, () => {
                req.destroy();
                resolve({ timeout: true });
            });
        });
    }

    async testApiKey(key) {
        const url = `https://app.pactosolucoes.com.br/api/prest/v2/vendas/${key}/unidade/1`;
        const result = await this.makeRequest(url, 8000);
        
        if (result.status === 200 && result.data) {
            try {
                const parsed = JSON.parse(result.data);
                if (parsed.logo && parsed.nome) {
                    return {
                        success: true,
                        key,
                        nome: parsed.nome,
                        logo: parsed.logo,
                        cidade: parsed.cidade,
                        endereco: parsed.endereco
                    };
                }
            } catch (e) {
                // Parse error
            }
        }
        return { success: false, key };
    }

    // Extrair possíveis chaves do HTML/JS de um hotsite
    extractPossibleKeys(html) {
        const keys = [];
        
        // Padrão 1: Strings de 32 caracteres hexadecimais
        const hexMatches = html.match(/[a-f0-9]{32}/gi) || [];
        keys.push(...hexMatches);
        
        // Padrão 2: Em chamadas de API
        const apiMatches = html.match(/app\.pactosolucoes\.com\.br\/api\/prest\/.*?\/([a-f0-9]{32})\//gi) || [];
        apiMatches.forEach(match => {
            const keyMatch = match.match(/([a-f0-9]{32})/);
            if (keyMatch) keys.push(keyMatch[1]);
        });
        
        // Padrão 3: Em configurações JS
        const configMatches = html.match(/['"](chave|key|apikey|api_key)['"]\s*:\s*['"]([a-f0-9]{32})['"]/gi) || [];
        configMatches.forEach(match => {
            const keyMatch = match.match(/['"]([a-f0-9]{32})['"]/);
            if (keyMatch) keys.push(keyMatch[1]);
        });

        return [...new Set(keys.filter(key => key.length === 32))];
    }

    // Gerar chaves baseadas no nome da unidade
    generateKeysFromName(hotsiteUrl) {
        const keys = [];
        
        // Extrair nome da unidade do URL
        const urlParts = hotsiteUrl.replace(/https?:\/\//, '').split('.')[0];
        let unitName = urlParts.replace(/live|academia/gi, '').toLowerCase();
        
        // Variações do nome
        const variations = [
            unitName,
            `live${unitName}`,
            `${unitName}live`,
            `liveacademia${unitName}`,
            `${unitName}liveacademia`,
            `live_${unitName}`,
            `${unitName}_live`
        ];
        
        // Gerar hashes MD5
        variations.forEach(variation => {
            if (variation && variation.length > 0) {
                keys.push(crypto.createHash('md5').update(variation).digest('hex'));
                keys.push(crypto.createHash('md5').update(variation + '2025').digest('hex'));
                keys.push(crypto.createHash('md5').update('2025' + variation).digest('hex'));
            }
        });
        
        return [...new Set(keys)];
    }

    async processHotsite(hotsiteUrl, index, total) {
        console.log(`\n[${index + 1}/${total}] 🔍 Processando: ${hotsiteUrl}`);
        
        const hotsiteResult = {
            url: hotsiteUrl,
            keys_found: [],
            working_key: null,
            unit_data: null,
            errors: []
        };

        try {
            // 1. Buscar HTML do hotsite
            console.log('  📥 Baixando HTML...');
            const htmlResult = await this.makeRequest(hotsiteUrl);
            
            if (htmlResult.error || htmlResult.timeout) {
                hotsiteResult.errors.push('Failed to fetch hotsite');
                console.log('  ❌ Erro ao acessar hotsite');
                return hotsiteResult;
            }

            // 2. Extrair possíveis chaves do HTML
            const extractedKeys = this.extractPossibleKeys(htmlResult.data);
            console.log(`  🔑 Encontradas ${extractedKeys.length} possíveis chaves no HTML`);

            // 3. Gerar chaves baseadas no nome
            const generatedKeys = this.generateKeysFromName(hotsiteUrl);
            console.log(`  🎯 Geradas ${generatedKeys.length} chaves baseadas no nome`);

            // 4. Combinar todas as chaves e remover duplicatas
            const allKeys = [...new Set([...extractedKeys, ...generatedKeys])];
            hotsiteResult.keys_found = allKeys;

            // 5. Testar cada chave
            console.log(`  ⚡ Testando ${allKeys.length} chaves...`);
            
            for (let i = 0; i < allKeys.length; i++) {
                const key = allKeys[i];
                console.log(`    [${i + 1}/${allKeys.length}] Testando: ${key.substring(0, 8)}...`);
                
                const testResult = await this.testApiKey(key);
                
                if (testResult.success) {
                    console.log(`    ✅ SUCESSO! Encontrada: ${testResult.nome}`);
                    hotsiteResult.working_key = key;
                    hotsiteResult.unit_data = testResult;
                    break;
                }
                
                // Delay entre testes para não sobrecarregar
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            if (!hotsiteResult.working_key) {
                console.log('  ❌ Nenhuma chave funcionou');
            }

        } catch (error) {
            hotsiteResult.errors.push(error.message);
            console.log(`  ❌ Erro: ${error.message}`);
        }

        return hotsiteResult;
    }

    async discoverAll() {
        console.log('🚀 Iniciando descoberta em lote de chaves API...\n');
        console.log(`📋 Total de hotsites: ${this.hotsites.length}`);
        
        // Processar cada hotsite
        for (let i = 0; i < this.hotsites.length; i++) {
            const result = await this.processHotsite(this.hotsites[i], i, this.hotsites.length);
            this.results.push(result);
            
            // Delay entre hotsites
            if (i < this.hotsites.length - 1) {
                console.log('  ⏳ Aguardando 2s...');
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        return this.results;
    }

    async saveResults() {
        const summary = {
            timestamp: new Date().toISOString(),
            total_processed: this.results.length,
            successful_discoveries: this.results.filter(r => r.working_key).length,
            failed_discoveries: this.results.filter(r => !r.working_key).length,
            results: this.results
        };

        // Salvar resultados completos
        await fs.writeFile('./batch-discovery-results.json', JSON.stringify(summary, null, 2));
        
        // Criar arquivo apenas com as chaves que funcionaram
        const workingKeys = {};
        this.results.forEach(result => {
            if (result.working_key && result.unit_data) {
                workingKeys[result.working_key] = {
                    hotsite: result.url,
                    nome: result.unit_data.nome,
                    logo: result.unit_data.logo,
                    cidade: result.unit_data.cidade,
                    endereco: result.unit_data.endereco
                };
            }
        });
        
        await fs.writeFile('./working-keys.json', JSON.stringify(workingKeys, null, 2));
        
        return summary;
    }

    printSummary(summary) {
        console.log('\n' + '='.repeat(60));
        console.log('🎉 DESCOBERTA CONCLUÍDA!');
        console.log('='.repeat(60));
        console.log(`📊 Total processado: ${summary.total_processed}`);
        console.log(`✅ Sucessos: ${summary.successful_discoveries}`);
        console.log(`❌ Falhas: ${summary.failed_discoveries}`);
        
        if (summary.successful_discoveries > 0) {
            console.log('\n🔑 CHAVES DESCOBERTAS:');
            this.results.forEach((result, index) => {
                if (result.working_key) {
                    console.log(`${index + 1}. ${result.unit_data.nome}`);
                    console.log(`   🔑 Chave: ${result.working_key}`);
                    console.log(`   🖼️  Logo: ${result.unit_data.logo}`);
                    console.log(`   📍 Local: ${result.unit_data.cidade}`);
                    console.log(`   🌐 Hotsite: ${result.url}`);
                    console.log('');
                }
            });
        }
        
        console.log('💾 Resultados salvos em:');
        console.log('   - batch-discovery-results.json (completo)');
        console.log('   - working-keys.json (apenas chaves funcionais)');
    }

    async run() {
        try {
            const results = await this.discoverAll();
            const summary = await this.saveResults();
            this.printSummary(summary);
        } catch (error) {
            console.error('❌ Erro durante a descoberta:', error);
        }
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    const discovery = new BatchKeyDiscovery();
    discovery.run();
}

module.exports = BatchKeyDiscovery;
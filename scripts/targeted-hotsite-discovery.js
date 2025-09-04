#!/usr/bin/env node

const https = require('https');
const crypto = require('crypto');
const fs = require('fs').promises;

class TargetedHotsiteDiscovery {
    constructor() {
        this.hotsites = [
            "https://pedroteixeira.hotsite.in",
            "https://cachoeirinha.hotsite.in",
            "https://centro.hotsite.in", 
            "https://silves.hotsite.in",
            "https://liveplanalto.hotsite.in"
        ];
        
        this.results = [];
        this.knownKeys = [
            'fcceacc50b1db2fc4e8872b06099c142', // Margarita
            '7724bf6109e5370177c8129aa431b922'  // Vieiralves
        ];
    }

    async makeRequest(url, timeout = 10000) {
        return new Promise((resolve) => {
            const req = https.get(url, {
                headers: {
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            }, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
            });
            
            req.on('error', (err) => resolve({ error: true, message: err.message }));
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
                        endereco: parsed.endereco,
                        data: parsed
                    };
                }
            } catch (e) {
                console.log(`      ❌ JSON Parse error for key ${key}: ${e.message}`);
            }
        } else if (result.error) {
            console.log(`      ❌ Request error for key ${key}: ${result.message || 'Unknown error'}`);
        } else if (result.timeout) {
            console.log(`      ⏱️ Timeout for key ${key}`);
        } else {
            console.log(`      ❌ HTTP ${result.status} for key ${key}`);
        }
        return { success: false, key };
    }

    // Enhanced key extraction with more patterns
    extractPossibleKeys(html) {
        const keys = new Set();
        
        // Pattern 1: 32-character hex strings
        const hexMatches = html.match(/[a-f0-9]{32}/gi) || [];
        hexMatches.forEach(match => keys.add(match.toLowerCase()));
        
        // Pattern 2: In API calls
        const apiMatches = html.match(/app\.pactosolucoes\.com\.br\/api\/prest\/.*?\/([a-f0-9]{32})\//gi) || [];
        apiMatches.forEach(match => {
            const keyMatch = match.match(/([a-f0-9]{32})/i);
            if (keyMatch) keys.add(keyMatch[1].toLowerCase());
        });
        
        // Pattern 3: In JS configuration objects
        const configPatterns = [
            /['"](chave|key|apikey|api_key|token)['"]\s*:\s*['"]([a-f0-9]{32})['"]/gi,
            /['"]([a-f0-9]{32})['"].*?(chave|key|apikey|api_key|token)/gi,
            /(chave|key|apikey|api_key|token).*?['"]([a-f0-9]{32})['"]/gi
        ];
        
        configPatterns.forEach(pattern => {
            const matches = html.match(pattern) || [];
            matches.forEach(match => {
                const keyMatch = match.match(/([a-f0-9]{32})/i);
                if (keyMatch) keys.add(keyMatch[1].toLowerCase());
            });
        });

        // Pattern 4: In localStorage/sessionStorage calls
        const storageMatches = html.match(/(localStorage|sessionStorage)\.setItem\(['"].*?['"],\s*['"]([a-f0-9]{32})['"]\)/gi) || [];
        storageMatches.forEach(match => {
            const keyMatch = match.match(/['"]([a-f0-9]{32})['"]/i);
            if (keyMatch) keys.add(keyMatch[1].toLowerCase());
        });

        return Array.from(keys).filter(key => key && key.length === 32);
    }

    // Enhanced key generation based on hotsite name
    generateKeysFromName(hotsiteUrl) {
        const keys = new Set();
        
        // Extract name from URL
        const urlParts = hotsiteUrl.replace(/https?:\/\//, '').split('.')[0];
        let unitName = urlParts.replace(/live|academia/gi, '').toLowerCase();
        
        console.log(`    🎯 Gerando chaves para unidade: "${unitName}"`);
        
        // Base variations
        const baseVariations = [
            unitName,
            `live${unitName}`,
            `${unitName}live`,
            `liveacademia${unitName}`,
            `${unitName}liveacademia`,
            `live_${unitName}`,
            `${unitName}_live`,
            `academia${unitName}`,
            `${unitName}academia`,
            urlParts  // Original name from URL
        ];
        
        // Year variations
        const years = ['2025', '2024', '2023', '2022', '2021'];
        const allVariations = [...baseVariations];
        
        // Add year variations
        baseVariations.forEach(base => {
            years.forEach(year => {
                allVariations.push(`${base}${year}`);
                allVariations.push(`${year}${base}`);
                allVariations.push(`${base}_${year}`);
                allVariations.push(`${year}_${base}`);
            });
        });
        
        // Generate MD5 hashes
        allVariations.forEach(variation => {
            if (variation && variation.length > 0) {
                const hash = crypto.createHash('md5').update(variation.toLowerCase()).digest('hex');
                keys.add(hash);
            }
        });
        
        console.log(`    🔧 Geradas ${keys.size} chaves baseadas no nome`);
        return Array.from(keys);
    }

    async processHotsite(hotsiteUrl, index, total) {
        console.log(`\n[${'='*50}]`);
        console.log(`🔍 [${index + 1}/${total}] Processando: ${hotsiteUrl}`);
        console.log(`[${'='*50}]`);
        
        const hotsiteResult = {
            url: hotsiteUrl,
            extracted_keys: [],
            generated_keys: [],
            all_keys: [],
            working_key: null,
            unit_data: null,
            errors: [],
            html_sample: ''
        };

        try {
            // 1. Fetch HTML
            console.log('📥 Baixando HTML do hotsite...');
            const htmlResult = await this.makeRequest(hotsiteUrl);
            
            if (htmlResult.error || htmlResult.timeout) {
                const errorMsg = htmlResult.error ? `Request error: ${htmlResult.message || 'Unknown error'}` : 'Timeout';
                hotsiteResult.errors.push(errorMsg);
                console.log(`❌ Erro ao acessar hotsite: ${errorMsg}`);
                return hotsiteResult;
            }

            if (htmlResult.status !== 200) {
                hotsiteResult.errors.push(`HTTP ${htmlResult.status}`);
                console.log(`❌ HTTP ${htmlResult.status}`);
                return hotsiteResult;
            }

            const html = htmlResult.data;
            hotsiteResult.html_sample = html.substring(0, 500) + '...';
            console.log(`✅ HTML baixado: ${html.length} caracteres`);

            // 2. Extract keys from HTML
            console.log('🔑 Extraindo possíveis chaves do HTML...');
            const extractedKeys = this.extractPossibleKeys(html);
            hotsiteResult.extracted_keys = extractedKeys;
            console.log(`  📋 Encontradas ${extractedKeys.length} chaves no HTML:`, extractedKeys.map(k => k.substring(0,8) + '...'));

            // 3. Generate keys based on name
            console.log('🎯 Gerando chaves baseadas no nome da unidade...');
            const generatedKeys = this.generateKeysFromName(hotsiteUrl);
            hotsiteResult.generated_keys = generatedKeys;
            console.log(`  📋 Geradas ${generatedKeys.length} chaves baseadas no nome`);

            // 4. Combine all keys
            const allKeys = [...new Set([...extractedKeys, ...generatedKeys])];
            hotsiteResult.all_keys = allKeys;
            console.log(`🔄 Total de chaves para testar: ${allKeys.length}`);

            // 5. Test each key
            if (allKeys.length > 0) {
                console.log('⚡ Testando chaves na API...');
                
                for (let i = 0; i < allKeys.length; i++) {
                    const key = allKeys[i];
                    console.log(`  🔍 [${i + 1}/${allKeys.length}] Testando: ${key.substring(0, 8)}...${key.substring(-4)}`);
                    
                    const testResult = await this.testApiKey(key);
                    
                    if (testResult.success) {
                        console.log(`  🎉 ✅ SUCESSO! Chave encontrada!`);
                        console.log(`      📛 Nome: ${testResult.nome}`);
                        console.log(`      📍 Cidade: ${testResult.cidade || 'N/A'}`);
                        console.log(`      🖼️  Logo: ${testResult.logo.substring(0, 50)}...`);
                        hotsiteResult.working_key = key;
                        hotsiteResult.unit_data = testResult;
                        break;
                    }
                    
                    // Delay to avoid overwhelming the API
                    await new Promise(resolve => setTimeout(resolve, 300));
                }
            }

            if (!hotsiteResult.working_key) {
                console.log('❌ Nenhuma chave funcionou para este hotsite');
            }

        } catch (error) {
            hotsiteResult.errors.push(error.message);
            console.log(`❌ Erro durante processamento: ${error.message}`);
        }

        return hotsiteResult;
    }

    async run() {
        console.log('🚀 Iniciando descoberta direcionada de chaves API...');
        console.log(`📋 Hotsites a processar: ${this.hotsites.length}`);
        console.log('🎯 Buscando chaves de 32 caracteres hexadecimais para API Pacto Soluções\n');
        
        // Process each hotsite
        for (let i = 0; i < this.hotsites.length; i++) {
            const result = await this.processHotsite(this.hotsites[i], i, this.hotsites.length);
            this.results.push(result);
            
            // Delay between hotsites
            if (i < this.hotsites.length - 1) {
                console.log('⏳ Aguardando 2s antes do próximo hotsite...\n');
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        // Generate summary
        await this.generateSummary();
    }

    async generateSummary() {
        console.log('\n' + '='.repeat(70));
        console.log('🎉 DESCOBERTA CONCLUÍDA!');
        console.log('='.repeat(70));
        
        const successful = this.results.filter(r => r.working_key);
        const failed = this.results.filter(r => !r.working_key);
        
        console.log(`📊 Total processado: ${this.results.length}`);
        console.log(`✅ Sucessos: ${successful.length}`);
        console.log(`❌ Falhas: ${failed.length}`);
        
        if (successful.length > 0) {
            console.log('\n🔑 CHAVES API DESCOBERTAS:');
            successful.forEach((result, index) => {
                const data = result.unit_data;
                console.log(`\n${index + 1}. ${data.nome}`);
                console.log(`   🔑 Chave: ${result.working_key}`);
                console.log(`   🖼️  Logo: ${data.logo}`);
                console.log(`   📍 Cidade: ${data.cidade || 'N/A'}`);
                console.log(`   📍 Endereço: ${data.endereco || 'N/A'}`);
                console.log(`   🌐 Hotsite: ${result.url}`);
            });

            // API endpoint template
            console.log('\n📡 ENDPOINTS API:');
            successful.forEach(result => {
                console.log(`https://app.pactosolucoes.com.br/api/prest/v2/vendas/${result.working_key}/unidade/1`);
            });
        }

        if (failed.length > 0) {
            console.log('\n❌ HOTSITES SEM CHAVE DESCOBERTA:');
            failed.forEach((result, index) => {
                console.log(`${index + 1}. ${result.url}`);
                if (result.errors.length > 0) {
                    console.log(`   Erros: ${result.errors.join(', ')}`);
                }
                console.log(`   Chaves testadas: ${result.all_keys.length}`);
            });
        }

        // Save results
        const summary = {
            timestamp: new Date().toISOString(),
            hotsites_processed: this.results.length,
            successful_discoveries: successful.length,
            failed_discoveries: failed.length,
            discovered_keys: successful.map(r => ({
                hotsite: r.url,
                key: r.working_key,
                unit_name: r.unit_data.nome,
                city: r.unit_data.cidade,
                logo_url: r.unit_data.logo,
                api_endpoint: `https://app.pactosolucoes.com.br/api/prest/v2/vendas/${r.working_key}/unidade/1`
            })),
            full_results: this.results
        };

        await fs.writeFile('./targeted-discovery-results.json', JSON.stringify(summary, null, 2));
        console.log('\n💾 Resultados salvos em: targeted-discovery-results.json');
    }
}

// Execute if called directly
if (require.main === module) {
    const discovery = new TargetedHotsiteDiscovery();
    discovery.run().catch(console.error);
}

module.exports = TargetedHotsiteDiscovery;
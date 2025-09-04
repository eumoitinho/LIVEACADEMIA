#!/usr/bin/env node

const https = require('https');
const fs = require('fs').promises;

class LiveAcademiaLogoFetcher {
    constructor() {
        // Mapeamento hotsite -> chave API (descobrir essas chaves)
        this.hotsiteToApiMapping = {
            // Vou descobrir as chaves das APIs dos hotsites
        };
        
        this.allUnits = [];
        this.apiResults = [];
    }

    // Fazer request HTTP
    async makeRequest(url, headers = {}) {
        return new Promise((resolve, reject) => {
            const defaultHeaders = {
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9',
                'origin': 'https://livemargarita.hotsite.in',
                'referer': 'https://livemargarita.hotsite.in/',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
            };

            const allHeaders = { ...defaultHeaders, ...headers };
            
            const req = https.get(url, { headers: allHeaders }, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(data);
                        resolve({
                            status: res.statusCode,
                            data: parsedData
                        });
                    } catch (e) {
                        resolve({
                            status: res.statusCode,
                            data: data,
                            error: 'Failed to parse JSON'
                        });
                    }
                });
            });
            
            req.on('error', (err) => {
                reject(err);
            });
            
            req.setTimeout(10000, () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });
        });
    }

    // Descobrir chave API de um hotsite
    async discoverApiKey(hotsiteUrl) {
        console.log(`🔍 Discovering API key for ${hotsiteUrl}`);
        
        try {
            // Primeiro, tentar acessar o hotsite para encontrar a chave na página
            const response = await this.makeRequest(hotsiteUrl);
            
            if (response.data && typeof response.data === 'string') {
                // Procurar por chaves de API no HTML/JS
                const chaveMatches = response.data.match(/[a-f0-9]{32}/g);
                if (chaveMatches && chaveMatches.length > 0) {
                    // Testar cada chave encontrada
                    for (const chave of chaveMatches) {
                        const testUrl = `https://app.pactosolucoes.com.br/api/prest/v2/vendas/${chave}/unidade/1`;
                        try {
                            const testResponse = await this.makeRequest(testUrl);
                            if (testResponse.status === 200 && testResponse.data && testResponse.data.logo) {
                                console.log(`✅ Found working API key: ${chave}`);
                                return chave;
                            }
                        } catch (err) {
                            // Continue testando outras chaves
                        }
                    }
                }
            }
        } catch (error) {
            console.log(`❌ Error discovering key for ${hotsiteUrl}: ${error.message}`);
        }
        
        return null;
    }

    // Obter dados da unidade pela API
    async getUnitDataFromApi(chave, unitName) {
        const url = `https://app.pactosolucoes.com.br/api/prest/v2/vendas/${chave}/unidade/1`;
        
        try {
            const response = await this.makeRequest(url);
            if (response.status === 200 && response.data) {
                return {
                    unitName,
                    chave,
                    ...response.data
                };
            }
        } catch (error) {
            console.log(`❌ Error fetching ${unitName}: ${error.message}`);
        }
        
        return null;
    }

    // Carregar dados das unidades existentes
    async loadUnitsData() {
        try {
            const locationsData = await fs.readFile('./lib/locations.ts', 'utf8');
            const unidadesData = await fs.readFile('./unidades_live.json', 'utf8');
            
            // Parse das unidades do JSON
            const unidades = JSON.parse(unidadesData);
            
            this.allUnits = Object.entries(unidades).map(([name, data]) => ({
                name,
                hotsite: data.enrollment_link,
                currentLogo: data.image_src,
                status: data.status
            })).filter(unit => unit.status === 'open' && unit.hotsite && unit.hotsite.includes('.hotsite.in'));
            
            console.log(`📋 Found ${this.allUnits.length} active units with hotsites`);
            return this.allUnits;
        } catch (error) {
            console.error('Error loading units data:', error);
            return [];
        }
    }

    // Lista de chaves conhecidas para testar primeiro
    getKnownApiKeys() {
        return [
            'fcceacc50b1db2fc4e8872b06099c142', // Margarita (exemplo fornecido)
            '7724bf6109e5370177c8129aa431b922', // Vieiralves (do responses.json)
            // Adicionar mais chaves conhecidas aqui se descobrir
        ];
    }

    // Tentar descobrir todas as chaves API
    async discoverAllApiKeys() {
        console.log('🚀 Starting API key discovery for all units...\n');
        
        await this.loadUnitsData();
        
        const knownKeys = this.getKnownApiKeys();
        const results = [];
        
        // Primeiro, testar chaves conhecidas
        console.log('Testing known API keys...');
        for (const chave of knownKeys) {
            const data = await this.getUnitDataFromApi(chave, `Unknown-${chave}`);
            if (data) {
                results.push(data);
                console.log(`✅ ${data.nome}: ${data.logo}`);
            }
        }
        
        // Tentar descobrir chaves para cada hotsite
        for (const unit of this.allUnits) {
            console.log(`\n🔍 Processing ${unit.name}...`);
            
            // Tentar descobrir chave da API
            const chave = await this.discoverApiKey(unit.hotsite);
            
            if (chave) {
                const data = await this.getUnitDataFromApi(chave, unit.name);
                if (data) {
                    results.push(data);
                    console.log(`✅ ${data.nome}: ${data.logo}`);
                } else {
                    console.log(`❌ API key found but no valid data for ${unit.name}`);
                }
            } else {
                console.log(`❌ Could not discover API key for ${unit.name}`);
            }
            
            // Delay entre requests
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        this.apiResults = results;
        return results;
    }

    // Salvar resultados
    async saveResults() {
        try {
            // Salvar dados completos das APIs
            await fs.writeFile('./api-logos-data.json', JSON.stringify(this.apiResults, null, 2));
            
            // Criar mapeamento simples nome -> logo
            const logoMapping = {};
            this.apiResults.forEach(unit => {
                logoMapping[unit.nome] = unit.logo;
            });
            
            await fs.writeFile('./logos-mapping.json', JSON.stringify(logoMapping, null, 2));
            
            console.log(`\n📄 Saved ${this.apiResults.length} unit data to api-logos-data.json`);
            console.log('📄 Saved logo mapping to logos-mapping.json');
            
            // Mostrar resumo
            console.log('\n📊 SUMMARY:');
            this.apiResults.forEach((unit, index) => {
                console.log(`${index + 1}. ${unit.nome}`);
                console.log(`   Logo: ${unit.logo}`);
                console.log(`   Chave: ${unit.chave}`);
                console.log(`   Cidade: ${unit.cidade}, ${unit.estado}`);
                console.log('');
            });
            
        } catch (error) {
            console.error('Error saving results:', error);
        }
    }

    // Método principal
    async run() {
        try {
            const results = await this.discoverAllApiKeys();
            await this.saveResults();
            
            console.log(`\n🎉 Process completed! Found ${results.length} units with API data.`);
        } catch (error) {
            console.error('Error in main process:', error);
        }
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    const fetcher = new LiveAcademiaLogoFetcher();
    
    if (process.argv[2] === '--known-only') {
        // Testar apenas chaves conhecidas
        fetcher.getKnownApiKeys().forEach(async (chave) => {
            const data = await fetcher.getUnitDataFromApi(chave, `Unit-${chave}`);
            if (data) {
                console.log(JSON.stringify(data, null, 2));
            }
        });
    } else {
        // Executar processo completo
        fetcher.run();
    }
}

module.exports = LiveAcademiaLogoFetcher;
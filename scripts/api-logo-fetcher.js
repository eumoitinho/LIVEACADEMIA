#!/usr/bin/env node

const https = require('https');
const http = require('http');

class APIEndpointCatalog {
    constructor() {
        this.baseUrl = 'https://app.pactosolucoes.com.br/api/prest';
        this.endpoints = {
            menu: '/v1/hotsite/{chave}/menu/{id}',
            unidade: '/v2/vendas/{chave}/unidade/{id}',
            // Add more endpoints as discovered
        };
        this.discovered = [];
    }

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
            
            const protocol = url.startsWith('https:') ? https : http;
            
            const options = {
                headers: allHeaders
            };

            const req = protocol.get(url, options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(data);
                        resolve({
                            status: res.statusCode,
                            data: parsedData,
                            headers: res.headers
                        });
                    } catch (e) {
                        resolve({
                            status: res.statusCode,
                            data: data,
                            headers: res.headers,
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

    async getUnidadeData(chave, unidadeId = 1) {
        const url = `${this.baseUrl}/v2/vendas/${chave}/unidade/${unidadeId}`;
        console.log(`Fetching unidade data: ${url}`);
        
        try {
            const response = await this.makeRequest(url);
            return response;
        } catch (error) {
            console.error(`Error fetching unidade data: ${error.message}`);
            return null;
        }
    }

    async getMenuData(chave, menuId = 1) {
        const url = `${this.baseUrl}/v1/hotsite/${chave}/menu/${menuId}`;
        console.log(`Fetching menu data: ${url}`);
        
        try {
            const response = await this.makeRequest(url);
            return response;
        } catch (error) {
            console.error(`Error fetching menu data: ${error.message}`);
            return null;
        }
    }

    async getLogo(chave, unidadeId = 1) {
        const unidadeData = await this.getUnidadeData(chave, unidadeId);
        
        if (unidadeData && unidadeData.data && unidadeData.data.logo) {
            return {
                chave,
                unidadeId,
                logo: unidadeData.data.logo,
                nome: unidadeData.data.nome,
                cidade: unidadeData.data.cidade,
                estado: unidadeData.data.estado
            };
        }
        
        return null;
    }

    async catalogEndpoints(chave) {
        console.log(`\n=== Cataloging endpoints for chave: ${chave} ===`);
        
        const results = {
            chave,
            endpoints: {},
            logos: []
        };

        // Test unidade endpoint
        const unidadeData = await this.getUnidadeData(chave);
        if (unidadeData) {
            results.endpoints.unidade = {
                url: `${this.baseUrl}/v2/vendas/${chave}/unidade/1`,
                status: unidadeData.status,
                hasData: !!unidadeData.data,
                fields: unidadeData.data ? Object.keys(unidadeData.data) : []
            };
            
            if (unidadeData.data && unidadeData.data.logo) {
                results.logos.push({
                    source: 'unidade',
                    url: unidadeData.data.logo,
                    nome: unidadeData.data.nome
                });
            }
        }

        // Test menu endpoint
        const menuData = await this.getMenuData(chave);
        if (menuData) {
            results.endpoints.menu = {
                url: `${this.baseUrl}/v1/hotsite/${chave}/menu/1`,
                status: menuData.status,
                hasData: !!menuData.data,
                fields: menuData.data ? Object.keys(menuData.data) : []
            };
        }

        // Test other potential endpoints
        const otherEndpoints = [
            `/v1/vendas/${chave}/unidades`,
            `/v1/vendas/${chave}/planos`,
            `/v1/vendas/${chave}/modalidades`,
            `/v2/vendas/${chave}/configuracao`,
            `/v1/hotsite/${chave}/banner`,
            `/v1/hotsite/${chave}/sobre`,
        ];

        for (const endpoint of otherEndpoints) {
            const url = `${this.baseUrl}${endpoint}`;
            try {
                const response = await this.makeRequest(url);
                if (response.status === 200) {
                    results.endpoints[endpoint.split('/').pop()] = {
                        url,
                        status: response.status,
                        hasData: !!response.data,
                        fields: response.data ? Object.keys(response.data) : []
                    };
                }
            } catch (error) {
                // Ignore errors for discovery
            }
        }

        return results;
    }

    printResults(results) {
        console.log(`\n=== Results for ${results.chave} ===`);
        
        console.log('\n📍 Available Endpoints:');
        Object.entries(results.endpoints).forEach(([name, info]) => {
            console.log(`  ${name}:`);
            console.log(`    URL: ${info.url}`);
            console.log(`    Status: ${info.status}`);
            console.log(`    Has Data: ${info.hasData}`);
            if (info.fields.length > 0) {
                console.log(`    Fields: ${info.fields.join(', ')}`);
            }
            console.log('');
        });

        console.log('\n🖼️  Logos Found:');
        results.logos.forEach((logo, index) => {
            console.log(`  ${index + 1}. From ${logo.source}:`);
            console.log(`     Nome: ${logo.nome}`);
            console.log(`     URL: ${logo.url}`);
            console.log('');
        });
    }
}

// Main execution
async function main() {
    const catalog = new APIEndpointCatalog();
    
    // Example chave from your request
    const chaveExample = 'fcceacc50b1db2fc4e8872b06099c142';
    
    if (process.argv.length > 2) {
        const chave = process.argv[2];
        console.log(`Using provided chave: ${chave}`);
        
        if (process.argv[3] === '--logo-only') {
            const logo = await catalog.getLogo(chave);
            if (logo) {
                console.log(JSON.stringify(logo, null, 2));
            } else {
                console.log('No logo found');
            }
            return;
        }
        
        const results = await catalog.catalogEndpoints(chave);
        catalog.printResults(results);
    } else {
        console.log('Usage:');
        console.log('  node api-logo-fetcher.js <chave>                    # Catalog all endpoints');
        console.log('  node api-logo-fetcher.js <chave> --logo-only        # Get logo only');
        console.log('');
        console.log('Example:');
        console.log(`  node api-logo-fetcher.js ${chaveExample}`);
        console.log(`  node api-logo-fetcher.js ${chaveExample} --logo-only`);
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = APIEndpointCatalog;
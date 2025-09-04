#!/usr/bin/env node

const https = require('https');
const fs = require('fs').promises;

class ManualDiscoveryHelper {
    constructor() {
        this.discoveredKeys = new Map();
        this.loadExistingKeys();
    }

    async loadExistingKeys() {
        try {
            const data = await fs.readFile('./discovered-keys.json', 'utf8');
            const keys = JSON.parse(data);
            Object.entries(keys).forEach(([key, data]) => {
                this.discoveredKeys.set(key, data);
            });
            console.log(`📋 Carregadas ${this.discoveredKeys.size} chaves existentes`);
        } catch (error) {
            console.log('📝 Nenhuma chave salva anteriormente');
        }
    }

    async testKey(key) {
        if (!/^[a-f0-9]{32}$/i.test(key)) {
            return { success: false, error: 'Formato inválido - deve ser 32 caracteres hexadecimais' };
        }

        return new Promise((resolve) => {
            const url = `https://app.pactosolucoes.com.br/api/prest/v2/vendas/${key}/unidade/1`;
            
            console.log(`🔍 Testando: ${url}`);
            
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
                                key,
                                data: parsed,
                                apiUrl: url
                            });
                        } else {
                            resolve({ success: false, key, error: 'API retornou dados incompletos' });
                        }
                    } catch (e) {
                        resolve({ success: false, key, error: 'Erro ao parse JSON: ' + e.message });
                    }
                });
            });
            
            req.on('error', (err) => {
                resolve({ success: false, key, error: 'Erro de rede: ' + err.message });
            });
            
            req.setTimeout(10000, () => {
                req.destroy();
                resolve({ success: false, key, error: 'Timeout' });
            });
        });
    }

    async addKey(key, hotsiteUrl = null) {
        const result = await this.testKey(key);
        
        if (result.success) {
            const keyData = {
                nome: result.data.nome,
                logo: result.data.logo,
                cidade: result.data.cidade,
                estado: result.data.estado,
                endereco: result.data.endereco,
                hotsite: hotsiteUrl,
                descoberta: new Date().toISOString(),
                apiUrl: result.apiUrl
            };
            
            this.discoveredKeys.set(key, keyData);
            await this.saveKeys();
            
            console.log('✅ CHAVE ADICIONADA COM SUCESSO!');
            console.log(`   Unidade: ${keyData.nome}`);
            console.log(`   Logo: ${keyData.logo}`);
            console.log(`   Local: ${keyData.cidade}, ${keyData.estado}`);
            if (hotsiteUrl) console.log(`   Hotsite: ${hotsiteUrl}`);
            
            return true;
        } else {
            console.log('❌ CHAVE NÃO FUNCIONA');
            console.log(`   Erro: ${result.error}`);
            return false;
        }
    }

    async saveKeys() {
        const keysObject = {};
        this.discoveredKeys.forEach((data, key) => {
            keysObject[key] = data;
        });
        
        await fs.writeFile('./discovered-keys.json', JSON.stringify(keysObject, null, 2));
        console.log(`💾 ${this.discoveredKeys.size} chaves salvas em discovered-keys.json`);
    }

    listKeys() {
        if (this.discoveredKeys.size === 0) {
            console.log('📋 Nenhuma chave descoberta ainda');
            return;
        }

        console.log(`\n📋 CHAVES DESCOBERTAS (${this.discoveredKeys.size}):`);
        console.log('='.repeat(50));
        
        let index = 1;
        this.discoveredKeys.forEach((data, key) => {
            console.log(`${index}. ${data.nome}`);
            console.log(`   Chave: ${key}`);
            console.log(`   Logo: ${data.logo}`);
            console.log(`   Local: ${data.cidade}, ${data.estado}`);
            if (data.hotsite) console.log(`   Hotsite: ${data.hotsite}`);
            console.log(`   Descoberta: ${new Date(data.descoberta).toLocaleString()}`);
            console.log('');
            index++;
        });
    }

    async generateUpdateScript() {
        if (this.discoveredKeys.size === 0) {
            console.log('❌ Nenhuma chave para gerar script de atualização');
            return;
        }

        let script = '#!/usr/bin/env node\n\n';
        script += '// Auto-generated script to update locations.ts with discovered API logos\n\n';
        script += 'const fs = require("fs").promises;\n\n';
        script += 'async function updateLogos() {\n';
        script += '  console.log("🔄 Updating locations.ts with discovered logos...");\n';
        script += '  \n';
        script += '  let content = await fs.readFile("./lib/locations.ts", "utf8");\n';
        script += '  let updated = 0;\n\n';
        
        this.discoveredKeys.forEach((data, key) => {
            // Tentar mapear nome da unidade para ID
            const unitId = this.guessUnitId(data.nome);
            if (unitId) {
                script += `  // Update ${data.nome}\n`;
                script += `  if (content.includes('id: "${unitId}"')) {\n`;
                script += `    content = content.replace(\n`;
                script += `      /(id:\\s*"${unitId}"[\\s\\S]*?logo:\\s*")([^"]*)("),/g,\n`;
                script += `      '$1${data.logo}$3'\n`;
                script += `    );\n`;
                script += `    updated++;\n`;
                script += `    console.log("✅ Updated ${data.nome}");\n`;
                script += `  }\n\n`;
            }
        });
        
        script += '  await fs.writeFile("./lib/locations.ts", content);\n';
        script += '  console.log(`🎉 Updated ${updated} units with API logos`);\n';
        script += '}\n\n';
        script += 'updateLogos().catch(console.error);\n';
        
        await fs.writeFile('./update-with-discovered-keys.js', script);
        console.log('📄 Script de atualização gerado: update-with-discovered-keys.js');
        console.log('   Execute com: node update-with-discovered-keys.js');
    }

    guessUnitId(unitName) {
        const mapping = {
            'LIVE - MARGARITA': 'margarita-diamante',
            'LIVE - VIEIRALVES': 'vieiralves-diamante',
            'LIVE - PEDRO TEIXEIRA': 'pedro-teixeira-diamante',
            'LIVE - CACHOEIRINHA': 'cachoeirinha',
            'LIVE - CENTRO': 'centro',
            'LIVE - SILVES': 'silves',
            'LIVE - TORQUATO ALLEGRO': 'torquato-allegro',
            'LIVE - FLORES': 'flores-diamante',
            'LIVE - PLANALTO': 'planalto-diamante',
            'LIVE - TORRES': 'torres',
            'LIVE - TORRES DIAMANTE': 'torres-diamante'
        };
        
        return mapping[unitName.toUpperCase()] || null;
    }

    showInstructions() {
        console.log('\n📖 COMO DESCOBRIR CHAVES MANUALMENTE:');
        console.log('=====================================');
        console.log('1. Acesse um hotsite (ex: https://pedroteixeira.hotsite.in)');
        console.log('2. Abra DevTools (F12) → aba Network');
        console.log('3. Recarregue a página');
        console.log('4. Procure por chamadas para app.pactosolucoes.com.br');
        console.log('5. Copie a chave de 32 caracteres da URL');
        console.log('6. Use este script para testá-la\n');
        
        console.log('📝 COMANDOS DISPONÍVEIS:');
        console.log('node manual-discovery-helper.js test <chave>');
        console.log('node manual-discovery-helper.js add <chave> [hotsite]');
        console.log('node manual-discovery-helper.js list');
        console.log('node manual-discovery-helper.js generate-script');
        console.log('');
    }
}

async function main() {
    const helper = new ManualDiscoveryHelper();
    await new Promise(resolve => setTimeout(resolve, 100)); // Wait for loadExistingKeys
    
    const args = process.argv.slice(2);
    const command = args[0];
    
    if (!command) {
        helper.showInstructions();
        helper.listKeys();
        return;
    }
    
    switch (command) {
        case 'test':
            if (!args[1]) {
                console.log('❌ Uso: node manual-discovery-helper.js test <chave>');
                return;
            }
            await helper.testKey(args[1]);
            break;
            
        case 'add':
            if (!args[1]) {
                console.log('❌ Uso: node manual-discovery-helper.js add <chave> [hotsite]');
                return;
            }
            await helper.addKey(args[1], args[2]);
            break;
            
        case 'list':
            helper.listKeys();
            break;
            
        case 'generate-script':
            await helper.generateUpdateScript();
            break;
            
        default:
            console.log('❌ Comando inválido');
            helper.showInstructions();
    }
}

if (require.main === module) {
    main();
}

module.exports = ManualDiscoveryHelper;
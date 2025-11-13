/**
 * Script para verificar se as permissões estão configuradas
 * Execute: node scripts/check-permissions.js
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'c949bf8391796ec49975d38139036a9d29d515f7d14fc1eed9f2fc01a248aca2b54d156462d9436932a3bebee33a2556d41ee6462d15a4d09715238b266927ed026da8a05bb98dd5b828be445d68552202a1bc2471bce647bad13f7b4f6d79d769dbd144cbebb7d8afb986a826f023ea445b35c94f874090a2a772962cdfc9cc';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
};

// Testar permissões para diferentes endpoints
const endpoints = [
  { type: 'Single Type', endpoint: 'homepage', method: 'PUT' },
  { type: 'Single Type', endpoint: 'contact-page', method: 'PUT' },
  { type: 'Collection Type', endpoint: 'plans', method: 'POST' },
  { type: 'Collection Type', endpoint: 'units', method: 'POST' },
];

async function checkPermissions() {
  console.log('🔍 Verificando permissões da API do Strapi...\n');
  console.log(`URL: ${STRAPI_URL}\n`);

  for (const { type, endpoint, method } of endpoints) {
    try {
      const url = `${STRAPI_URL}/api/${endpoint}`;
      const options = {
        method,
        headers,
        body: method === 'PUT' ? JSON.stringify({ data: {} }) : JSON.stringify({ data: { name: 'test' } }),
      };

      const response = await fetch(url, options);
      
      if (response.status === 405) {
        console.log(`❌ ${endpoint} (${type}): Method Not Allowed`);
        console.log(`   → Permissão ${method} não configurada para ${endpoint}`);
      } else if (response.status === 401 || response.status === 403) {
        console.log(`⚠️  ${endpoint} (${type}): Unauthorized/Forbidden`);
        console.log(`   → Token de API pode não ter permissões suficientes`);
      } else if (response.status === 400 || response.status === 404) {
        console.log(`✅ ${endpoint} (${type}): Permissão OK (erro esperado: conteúdo não existe)`);
      } else {
        console.log(`✅ ${endpoint} (${type}): Status ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint} (${type}): Erro - ${error.message}`);
    }
  }

  console.log('\n📋 Resumo:');
  console.log('   Se você vê muitos "Method Not Allowed", as permissões não estão configuradas.');
  console.log('   Se você vê "Unauthorized/Forbidden", o token de API não tem permissões.');
  console.log('   Se você vê "Permissão OK", as permissões estão funcionando!\n');

  console.log('🔧 SOLUÇÃO:');
  console.log('   1. Acesse: http://localhost:1337/admin');
  console.log('   2. Vá em: Settings → Users & Permissions Plugin → Roles → Public');
  console.log('   3. Habilite todas as permissões para os Content Types');
  console.log('   4. Clique em Save');
  console.log('   5. Execute este script novamente para verificar\n');
}

checkPermissions();


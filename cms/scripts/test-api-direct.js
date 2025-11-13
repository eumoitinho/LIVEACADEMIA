/**
 * Script de teste direto da API do Strapi
 * Testa diferentes métodos e tokens
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'c949bf8391796ec49975d38139036a9d29d515f7d14fc1eed9f2fc01a248aca2b54d156462d9436932a3bebee33a2556d41ee6462d15a4d09715238b266927ed026da8a05bb98dd5b828be445d68552202a1bc2471bce647bad13f7b4f6d79d769dbd144cbebb7d8afb986a826f023ea445b35c94f874090a2a772962cdfc9cc';

async function testAPI() {
  console.log('🧪 Testando API do Strapi...\n');
  console.log(`URL: ${STRAPI_URL}\n`);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
  };

  // Teste 1: GET homepage (deve funcionar se permissões estiverem OK)
  console.log('1️⃣  Testando GET /api/homepage...');
  try {
    const getResponse = await fetch(`${STRAPI_URL}/api/homepage`, { headers });
    console.log(`   Status: ${getResponse.status} ${getResponse.statusText}`);
    if (getResponse.ok) {
      const data = await getResponse.json();
      console.log(`   ✅ GET funciona!`);
    } else {
      const errorText = await getResponse.text();
      console.log(`   ❌ GET falhou: ${errorText.substring(0, 100)}`);
    }
  } catch (error) {
    console.log(`   ❌ Erro: ${error.message}`);
  }

  // Teste 2: PUT homepage (o que está falhando)
  console.log('\n2️⃣  Testando PUT /api/homepage...');
  try {
    const putResponse = await fetch(`${STRAPI_URL}/api/homepage`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        data: {
          seo: {
            metaTitle: 'Test',
          },
        },
      }),
    });
    console.log(`   Status: ${putResponse.status} ${putResponse.statusText}`);
    const responseText = await putResponse.text();
    console.log(`   Resposta: ${responseText.substring(0, 200)}`);
    
    if (putResponse.status === 405) {
      console.log(`   ❌ 405 Method Not Allowed - O método PUT não está permitido`);
      console.log(`   💡 Possíveis causas:`);
      console.log(`      - Token de API não tem permissões de escrita`);
      console.log(`      - Rotas da API não estão habilitadas`);
      console.log(`      - Precisa usar token de administrador (não API token)`);
    }
  } catch (error) {
    console.log(`   ❌ Erro: ${error.message}`);
  }

  // Teste 3: POST plans (Collection Type)
  console.log('\n3️⃣  Testando POST /api/plans...');
  try {
    const postResponse = await fetch(`${STRAPI_URL}/api/plans`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          planId: 'test',
          name: 'Test Plan',
        },
      }),
    });
    console.log(`   Status: ${postResponse.status} ${postResponse.statusText}`);
    const responseText = await postResponse.text();
    console.log(`   Resposta: ${responseText.substring(0, 200)}`);
  } catch (error) {
    console.log(`   ❌ Erro: ${error.message}`);
  }

  // Teste 4: Verificar informações do token
  console.log('\n4️⃣  Verificando informações do token...');
  try {
    const meResponse = await fetch(`${STRAPI_URL}/api/users/me`, { headers });
    console.log(`   Status: ${meResponse.status} ${meResponse.statusText}`);
    if (meResponse.ok) {
      const userData = await meResponse.json();
      console.log(`   ✅ Token válido!`);
      console.log(`   Usuário: ${userData.username || 'N/A'}`);
    } else {
      console.log(`   ⚠️  Token pode não ser de administrador`);
      console.log(`   💡 API Tokens não podem fazer operações de escrita`);
      console.log(`   💡 Você precisa usar um token de JWT de administrador`);
    }
  } catch (error) {
    console.log(`   ❌ Erro: ${error.message}`);
  }

  console.log('\n📋 CONCLUSÃO:');
  console.log('   Se você vê 405 em PUT/POST mas 200 em GET:');
  console.log('   → O token de API não tem permissões de escrita');
  console.log('   → Você precisa usar um JWT token de administrador');
  console.log('   → Ou configurar o API Token com permissões Full Access');
  console.log('\n💡 SOLUÇÃO:');
  console.log('   1. Acesse: http://localhost:1337/admin');
  console.log('   2. Vá em: Settings → API Tokens');
  console.log('   3. Verifique se o token tem "Full Access"');
  console.log('   4. Ou use um JWT token de administrador (faça login e pegue o token)');
}

testAPI();


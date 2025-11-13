/**
 * Script de seed usando autenticação de administrador
 * Isso resolve o problema de API Tokens sem permissões de escrita
 * 
 * Execute: node scripts/seed-with-admin-auth.js
 * 
 * Você precisa ter credenciais de administrador no Strapi
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_ADMIN_EMAIL = process.env.STRAPI_ADMIN_EMAIL || 'admin@example.com';
const STRAPI_ADMIN_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD || 'Admin123!';

let adminToken = null;

async function loginAsAdmin() {
  console.log('🔐 Fazendo login como administrador...\n');
  
  try {
    const response = await fetch(`${STRAPI_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: STRAPI_ADMIN_EMAIL,
        password: STRAPI_ADMIN_PASSWORD,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login falhou: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    adminToken = data.data?.token;
    
    if (!adminToken) {
      throw new Error('Token não recebido na resposta de login');
    }

    console.log('✅ Login realizado com sucesso!\n');
    return adminToken;
  } catch (error) {
    console.error('❌ Erro ao fazer login:', error.message);
    console.error('\n💡 SOLUÇÃO:');
    console.error('   1. Certifique-se de que o Strapi está rodando');
    console.error('   2. Configure STRAPI_ADMIN_EMAIL e STRAPI_ADMIN_PASSWORD no .env.local');
    console.error('   3. Ou use as credenciais padrão do Strapi (criadas no primeiro acesso)');
    throw error;
  }
}

async function createOrUpdateSingleType(endpoint, data, token) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      const name = data.data?.title || data.data?.siteName || endpoint;
      console.log(`✅ ${endpoint} criado/atualizado: ${name}`);
      return result;
    } else {
      const errorText = await response.text();
      console.error(`❌ Erro ao criar/atualizar ${endpoint}:`, errorText);
      throw new Error(`Failed: ${response.status}`);
    }
  } catch (error) {
    console.error(`❌ Erro: ${error.message}`);
    throw error;
  }
}

async function createCollectionType(endpoint, data, token) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    // Verificar se já existe
    const identifier = data.data.slug || data.data.planId || data.data.name;
    let existingItem = null;

    if (identifier) {
      try {
        const filter = data.data.slug 
          ? `filters[slug][$eq]=${encodeURIComponent(identifier)}`
          : data.data.planId
          ? `filters[planId][$eq]=${encodeURIComponent(identifier)}`
          : `filters[name][$eq]=${encodeURIComponent(identifier)}`;
        
        const searchResponse = await fetch(`${STRAPI_URL}/api/${endpoint}?${filter}`, { headers });
        if (searchResponse.ok) {
          const searchResult = await searchResponse.json();
          if (searchResult.data && searchResult.data.length > 0) {
            existingItem = searchResult.data[0];
          }
        }
      } catch (error) {
        // Ignorar
      }
    }

    if (existingItem) {
      // Atualizar
      const updateResponse = await fetch(`${STRAPI_URL}/api/${endpoint}/${existingItem.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });

      if (updateResponse.ok) {
        const result = await updateResponse.json();
        const name = data.data.name || data.data.title || 'item';
        console.log(`✅ ${endpoint} atualizado: ${name}`);
        return result;
      }
    } else {
      // Criar
      const createResponse = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (createResponse.ok) {
        const result = await createResponse.json();
        const name = data.data.name || data.data.title || 'item';
        console.log(`✅ ${endpoint} criado: ${name}`);
        return result;
      } else {
        const errorText = await createResponse.text();
        console.error(`⚠️  Erro ao criar ${endpoint}:`, errorText);
      }
    }
  } catch (error) {
    console.error(`⚠️  Erro: ${error.message}`);
  }
  
  return null;
}

async function seed() {
  try {
    console.log('🌱 Iniciando seed com autenticação de administrador...\n');
    console.log(`URL: ${STRAPI_URL}\n`);

    // Fazer login
    const token = await loginAsAdmin();

    // Importar dados do script original
    // Por enquanto, vamos apenas testar com homepage
    console.log('📄 Criando Homepage...');
    await createOrUpdateSingleType('homepage', {
      data: {
        seo: {
          metaTitle: 'Live Academia | Rede de Academias em Manaus',
          metaDescription: 'Transforme seu corpo e sua vida na maior rede de academias de Manaus.',
        },
      },
    }, token);

    console.log('\n✅ Seed concluído!');
  } catch (error) {
    console.error('\n❌ Erro durante o seed:', error.message);
    process.exit(1);
  }
}

seed();


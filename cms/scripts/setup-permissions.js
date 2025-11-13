/**
 * Script para configurar permissões da API do Strapi
 * Este script habilita todas as permissões necessárias para o seed funcionar
 * 
 * Execute: node scripts/setup-permissions.js
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'c949bf8391796ec49975d38139036a9d29d515f7d14fc1eed9f2fc01a248aca2b54d156462d9436932a3bebee33a2556d41ee6462d15a4d09715238b266927ed026da8a05bb98dd5b828be445d68552202a1bc2471bce647bad13f7b4f6d79d769dbd144cbebb7d8afb986a826f023ea445b35c94f874090a2a772962cdfc9cc';

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN não configurado!');
  console.error('   Adicione STRAPI_API_TOKEN ao .env.local');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
};

// Content Types que precisam de permissões
const contentTypes = [
  'homepage', // Single Type
  'contact-page', // Single Type
  'day-use-page', // Single Type
  'about-page', // Single Type
  'trabalhe-conosco-page', // Single Type
  'global-setting', // Single Type
  'plan', // Collection Type
  'unit', // Collection Type
  'benefit', // Collection Type
  'modality', // Collection Type
];

// Ações para Collection Types
const collectionActions = ['find', 'findOne', 'create', 'update', 'delete'];

// Ações para Single Types (só update)
const singleActions = ['find', 'update'];

async function getPublicRole() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/users-permissions/roles`, { headers });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Erro ao buscar roles: ${response.status} ${errorText}`);
      throw new Error(`Failed to fetch roles: ${response.status}`);
    }
    const data = await response.json();
    
    // Tentar encontrar role público por type ou name
    let publicRole = data.roles?.find(role => role.type === 'public');
    if (!publicRole) {
      publicRole = data.roles?.find(role => role.name === 'Public' || role.name === 'public');
    }
    
    if (!publicRole) {
      console.error('❌ Role público não encontrado. Roles disponíveis:');
      console.error(data.roles?.map(r => `   - ${r.name} (${r.type})`).join('\n') || '   Nenhum role encontrado');
      throw new Error('Public role not found. Você precisa criar um role público no Strapi Admin primeiro.');
    }
    return publicRole;
  } catch (error) {
    console.error('❌ Erro ao buscar role público:', error.message);
    throw error;
  }
}

async function updatePermissions(roleId, permissions) {
  try {
    // Buscar role atual primeiro para preservar outras configurações
    const getResponse = await fetch(`${STRAPI_URL}/api/users-permissions/roles/${roleId}`, { headers });
    if (!getResponse.ok) {
      throw new Error(`Failed to fetch role: ${getResponse.status}`);
    }
    const roleData = await getResponse.json();
    
    // Mesclar permissões existentes com as novas
    const updatedPermissions = {
      ...roleData.role?.permissions,
      ...permissions,
    };
    
    // Atualizar role com permissões mescladas
    const response = await fetch(`${STRAPI_URL}/api/users-permissions/roles/${roleId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        ...roleData.role,
        permissions: updatedPermissions,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Erro ao atualizar permissões: ${response.status}`);
      console.error(`   Resposta: ${errorText}`);
      throw new Error(`Failed to update permissions: ${response.status} ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('❌ Erro ao atualizar permissões:', error.message);
    throw error;
  }
}

async function setupPermissions() {
  console.log('🔐 Configurando permissões da API do Strapi...\n');
  console.log(`URL: ${STRAPI_URL}\n`);

  try {
    // 1. Buscar role público
    console.log('🔍 Buscando role público...');
    const publicRole = await getPublicRole();
    console.log(`✅ Role público encontrado: ${publicRole.name} (ID: ${publicRole.id})\n`);

    // 2. Construir permissões
    console.log('📝 Construindo permissões...');
    const permissions = {};

    for (const contentType of contentTypes) {
      const isSingleType = ['homepage', 'contact-page', 'day-use-page', 'about-page', 'trabalhe-conosco-page', 'global-setting'].includes(contentType);
      const actions = isSingleType ? singleActions : collectionActions;
      
      for (const action of actions) {
        // Para Single Types, o formato é: api::homepage.homepage.find
        // Para Collection Types, o formato é: api::plan.plan.find
        const permissionKey = `api::${contentType}.${contentType}.${action}`;
        permissions[permissionKey] = {
          enabled: true,
          policy: '',
        };
        console.log(`   ✅ ${permissionKey}`);
      }
    }

    console.log(`\n✅ ${Object.keys(permissions).length} permissões preparadas\n`);

    // 3. Atualizar permissões
    console.log('💾 Atualizando permissões no Strapi...');
    const result = await updatePermissions(publicRole.id, permissions);
    console.log('✅ Permissões atualizadas com sucesso!\n');

    console.log('📋 Permissões habilitadas:');
    for (const contentType of contentTypes) {
      const isSingleType = ['homepage', 'contact-page', 'day-use-page', 'about-page', 'trabalhe-conosco-page', 'global-setting'].includes(contentType);
      const actions = isSingleType ? singleActions : collectionActions;
      console.log(`   ✅ ${contentType}: ${actions.join(', ')}`);
    }

    console.log('\n✅ Configuração de permissões concluída!');
    console.log('\n🚀 Agora você pode executar o seed:');
    console.log('   cd cms && pnpm run seed');
  } catch (error) {
    console.error('\n❌ Erro durante a configuração de permissões:', error.message);
    console.error('\n💡 Alternativa: Configure as permissões manualmente no Strapi Admin:');
    console.error('   1. Acesse: http://localhost:1337/admin');
    console.error('   2. Vá em Settings → Users & Permissions Plugin → Roles → Public');
    console.error('   3. Habilite as permissões para todos os content types');
    process.exit(1);
  }
}

// Executar
setupPermissions();


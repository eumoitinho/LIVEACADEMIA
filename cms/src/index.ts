import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Configurar permissões automaticamente na primeira inicialização
    try {
      await setupPermissions(strapi);
    } catch (error) {
      console.error('❌ Erro ao configurar permissões:', error);
      // Não bloquear a inicialização do Strapi se houver erro
    }
  },
};

async function setupPermissions(strapi: Core.Strapi) {
  try {
    // Buscar role público
    const publicRole = await strapi
      .plugin('users-permissions')
      .service('role')
      .findOne({ type: 'public' });

    if (!publicRole) {
      console.log('⚠️  Role público não encontrado. As permissões precisam ser configuradas manualmente.');
      return;
    }

    // Content Types que precisam de permissões
    const singleTypes = [
      'homepage',
      'contact-page',
      'day-use-page',
      'about-page',
      'trabalhe-conosco-page',
      'global-setting',
    ];

    const collectionTypes = ['plan', 'unit', 'benefit', 'modality'];

    // Construir ações de permissão
    const actionsToEnable: string[] = [];

    // Single Types: find e update
    for (const contentType of singleTypes) {
      actionsToEnable.push(`api::${contentType}.${contentType}.find`);
      actionsToEnable.push(`api::${contentType}.${contentType}.update`);
    }

    // Collection Types: find, findOne, create, update, delete
    for (const contentType of collectionTypes) {
      actionsToEnable.push(`api::${contentType}.${contentType}.find`);
      actionsToEnable.push(`api::${contentType}.${contentType}.findOne`);
      actionsToEnable.push(`api::${contentType}.${contentType}.create`);
      actionsToEnable.push(`api::${contentType}.${contentType}.update`);
      actionsToEnable.push(`api::${contentType}.${contentType}.delete`);
    }

    // Buscar permissões existentes
    const existingPermissions = await strapi
      .plugin('users-permissions')
      .service('permission')
      .findMany({
        filters: {
          role: {
            id: publicRole.id,
          },
          action: {
            $in: actionsToEnable,
          },
        },
      });

    const existingActions = new Set(existingPermissions.map((p: any) => p.action));
    const newActions = actionsToEnable.filter((action) => !existingActions.has(action));

    if (newActions.length > 0) {
      console.log(`🔐 Configurando ${newActions.length} permissões...`);

      // Criar permissões uma por uma
      for (const action of newActions) {
        try {
          await strapi
            .plugin('users-permissions')
            .service('permission')
            .create({
              data: {
                action,
                role: publicRole.id,
              },
            });
        } catch (error: any) {
          // Ignorar se já existir
          if (!error.message?.includes('already exists')) {
            console.error(`⚠️  Erro ao criar permissão ${action}:`, error.message);
          }
        }
      }

      console.log('✅ Permissões configuradas com sucesso!');
    } else {
      console.log('✅ Permissões já estão configuradas.');
    }
  } catch (error: any) {
    console.error('❌ Erro ao configurar permissões:', error.message);
    console.error('💡 Configure manualmente no Strapi Admin:');
    console.error('   Settings → Users & Permissions Plugin → Roles → Public');
  }
}

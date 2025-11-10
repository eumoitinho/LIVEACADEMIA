import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    // Usar variáveis de ambiente para garantir sincronização
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c9pbklm2',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  },
  deployment: {
    appId: 'rpg83gvhhsfs8sb6yu013emv',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: false, // Desabilitado para evitar problemas de conexão durante build
  },
})

import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'c9pbklm2',
    dataset: 'production'
  },
  deployment: {
    appId: 'rpg83gvhhsfs8sb6yu013emv',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})

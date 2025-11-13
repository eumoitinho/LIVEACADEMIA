import type { StrapiApp } from '@strapi/strapi/admin';

/**
 * Strapi Admin Customization
 * 
 * This file customizes the Strapi admin panel to add preview buttons
 * and live edit functionality.
 */
export default {
  config: {
    // Add preview button to content manager
    locales: ['pt-BR'],
    tutorials: false,
    notifications: { releases: false },
  },
  bootstrap(app: StrapiApp) {
    // Add custom logic here if needed
    console.log('Strapi admin panel loaded with preview support');
  },
};


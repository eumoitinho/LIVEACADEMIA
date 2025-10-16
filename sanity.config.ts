import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Import schemas
import { homepageSchema } from './sanity/schemas/homepage'
import { unitSchema } from './sanity/schemas/unit'
import { planoSchema } from './sanity/schemas/plano'
import { benefitSchema } from './sanity/schemas/benefit'
import { testimonialSchema } from './sanity/schemas/testimonial'
import { appFeatureSchema } from './sanity/schemas/app-feature'
import { modalitySchema } from './sanity/schemas/modality'
import { structureFeatureSchema } from './sanity/schemas/structure-feature'
import { wellhubFeatureSchema } from './sanity/schemas/wellhub-feature'
import { bioimpedanciaFeatureSchema } from './sanity/schemas/bioimpedancia-feature'

export default defineConfig({
  name: 'live-academia',
  title: 'Live Academia CMS',

  projectId: 'c9pbklm2',
  dataset: 'production',

  // API version
  apiVersion: '2024-01-01',

  // Enable authentication
  token: process.env.SANITY_API_TOKEN,
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Live Academia')
          .items([
            S.listItem()
              .title('Homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),
            S.divider(),
            S.listItem()
              .title('Unidades')
              .child(S.documentTypeList('unit')),
            S.listItem()
              .title('Planos')
              .child(S.documentTypeList('plano')),
            S.listItem()
              .title('Benefícios')
              .child(S.documentTypeList('benefit')),
            S.listItem()
              .title('Depoimentos')
              .child(S.documentTypeList('testimonial')),
            S.listItem()
              .title('Recursos do App')
              .child(S.documentTypeList('appFeature')),
            S.listItem()
              .title('Modalidades')
              .child(S.documentTypeList('modality')),
            S.listItem()
              .title('Estrutura')
              .child(S.documentTypeList('structureFeature')),
            S.listItem()
              .title('Wellhub')
              .child(S.documentTypeList('wellhubFeature')),
            S.listItem()
              .title('Bioimpedância')
              .child(S.documentTypeList('bioimpedanciaFeature')),
          ])
    }),
    visionTool()
  ],
  
  schema: {
    types: [
      homepageSchema,
      unitSchema,
      planoSchema,
      benefitSchema,
      testimonialSchema,
      appFeatureSchema,
      modalitySchema,
      structureFeatureSchema,
      wellhubFeatureSchema,
      bioimpedanciaFeatureSchema,
    ],
  },
})

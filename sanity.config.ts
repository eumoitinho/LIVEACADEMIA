import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'

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
import { appSectionSchema } from './sanity/schemas/app-section'
import { beneficiosSectionSchema } from './sanity/schemas/beneficios-section'
import { dayUse } from './sanity/schemas/day-use'
import { sobreNosSchema } from './sanity/schemas/sobre-nos'
import { contatoSchema } from './sanity/schemas/contato'
import { trabalheConoscoSchema } from './sanity/schemas/trabalhe-conosco'
import { sobreSchema } from './sanity/schemas/sobre'

export default defineConfig({
  name: 'live-academia',
  title: 'Live Academia CMS',

  projectId: 'ocjqsglj',
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
            S.divider(),
            // Seções Singleton (documento único)
            S.listItem()
              .title('Seção do App')
              .child(
                S.document()
                  .schemaType('appSection')
                  .documentId('appSection')
              ),
            S.listItem()
              .title('Seção de Benefícios')
              .child(
                S.document()
                  .schemaType('beneficiosSection')
                  .documentId('beneficiosSection')
              ),
            S.listItem()
              .title('Day Use')
              .child(
                S.document()
                  .schemaType('dayUse')
                  .documentId('dayUse')
              ),
            S.listItem()
              .title('Sobre Nós')
              .child(
                S.document()
                  .schemaType('sobreNos')
                  .documentId('sobreNos')
              ),
            S.listItem()
              .title('Contato')
              .child(
                S.document()
                  .schemaType('contato')
                  .documentId('contato')
              ),
            S.listItem()
              .title('Trabalhe Conosco')
              .child(
                S.document()
                  .schemaType('trabalheConosco')
                  .documentId('trabalheConosco')
              ),
            S.listItem()
              .title('Sobre')
              .child(
                S.document()
                  .schemaType('sobre')
                  .documentId('sobre')
              ),
          ])
    }),
    presentationTool({
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
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
      appSectionSchema,
      beneficiosSectionSchema,
      dayUse,
      sobreNosSchema,
      contatoSchema,
      trabalheConoscoSchema,
      sobreSchema,
    ],
  },
})

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
import { appSectionSchema } from './sanity/schemas/app-section'
import { beneficiosSectionSchema } from './sanity/schemas/beneficios-section'
import { dayUse } from './sanity/schemas/day-use'
import { sobreNosSchema } from './sanity/schemas/sobre-nos'
import { contatoSchema } from './sanity/schemas/contato'
import { trabalheConoscoSchema } from './sanity/schemas/trabalhe-conosco'
import { sobreSchema } from './sanity/schemas/sobre'
import { globalSettingsSchema } from './sanity/schemas/global-settings'
import { modalidadesSectionSchema } from './sanity/schemas/modalidades-section'
import { wellhubSectionSchema } from './sanity/schemas/wellhub-section'
import { testimonialSectionSchema } from './sanity/schemas/testimonial-section'
import { estruturaSectionSchema } from './sanity/schemas/estrutura-section'
import { bioimpedanciaSectionSchema } from './sanity/schemas/bioimpedancia-section'
import { heroSectionSchema } from './sanity/schemas/hero-section'
import { planosSectionSchema } from './sanity/schemas/planos-section'
import { planosPageSchema } from './sanity/schemas/planos-page'
import { unidadesPageSchema } from './sanity/schemas/unidades-page'
import { navigationSchema } from './sanity/schemas/navigation'

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
              .title('Configurações Globais')
              .child(
                S.document()
                  .schemaType('globalSettings')
                  .documentId('globalSettings')
              ),
            S.divider(),
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
            S.divider(),
            // Seções da Homepage
            S.listItem()
              .title('Seção Modalidades')
              .child(
                S.document()
                  .schemaType('modalidadesSection')
                  .documentId('modalidadesSection')
              ),
            S.listItem()
              .title('Seção Wellhub')
              .child(
                S.document()
                  .schemaType('wellhubSection')
                  .documentId('wellhubSection')
              ),
            S.listItem()
              .title('Seção Depoimentos')
              .child(
                S.document()
                  .schemaType('testimonialSection')
                  .documentId('testimonialSection')
              ),
            S.listItem()
              .title('Seção Estrutura')
              .child(
                S.document()
                  .schemaType('estruturaSection')
                  .documentId('estruturaSection')
              ),
            S.listItem()
              .title('Seção Bioimpedância')
              .child(
                S.document()
                  .schemaType('bioimpedanciaSection')
                  .documentId('bioimpedanciaSection')
              ),
            S.listItem()
              .title('Seção Hero')
              .child(
                S.document()
                  .schemaType('heroSection')
                  .documentId('heroSection')
              ),
            S.listItem()
              .title('Seção Planos')
              .child(
                S.document()
                  .schemaType('planosSection')
                  .documentId('planosSection')
              ),
            S.listItem()
              .title('Página de Planos')
              .child(
                S.document()
                  .schemaType('planosPage')
                  .documentId('planosPage')
              ),
            S.listItem()
              .title('Página de Unidades')
              .child(
                S.document()
                  .schemaType('unidadesPage')
                  .documentId('unidadesPage')
              ),
            S.listItem()
              .title('Navegação do Site')
              .child(
                S.document()
                  .schemaType('navigation')
                  .documentId('navigation')
              ),
          ])
    }),
    visionTool()
  ],
  
  schema: {
    types: [
      globalSettingsSchema,
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
      modalidadesSectionSchema,
      wellhubSectionSchema,
      testimonialSectionSchema,
      estruturaSectionSchema,
      bioimpedanciaSectionSchema,
      heroSectionSchema,
      planosSectionSchema,
      planosPageSchema,
      unidadesPageSchema,
      navigationSchema,
    ],
  },
})

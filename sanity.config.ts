import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Import schemas essenciais
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
import { dayUse } from './sanity/schemas/day-use'
import { sobreSchema } from './sanity/schemas/sobre'
import { contatoSchema } from './sanity/schemas/contato'
import { trabalheConoscoSchema } from './sanity/schemas/trabalhe-conosco'
import { globalSettingsSchema } from './sanity/schemas/global-settings'

// Import seções
import { heroSectionSchema } from './sanity/schemas/hero-section'
import { modalidadesSectionSchema } from './sanity/schemas/modalidades-section'
import { wellhubSectionSchema } from './sanity/schemas/wellhub-section'
import { testimonialSectionSchema } from './sanity/schemas/testimonial-section'
import { estruturaSectionSchema } from './sanity/schemas/estrutura-section'
import { bioimpedanciaSectionSchema } from './sanity/schemas/bioimpedancia-section'
import { beneficiosSectionSchema } from './sanity/schemas/beneficios-section'
import { planosSectionSchema } from './sanity/schemas/planos-section'
import { planosPageSchema } from './sanity/schemas/planos-page'
import { unidadesPageSchema } from './sanity/schemas/unidades-page'
import { unidadesSectionSchema } from './sanity/schemas/unidades-section'
import { navigationSchema } from './sanity/schemas/navigation'

export default defineConfig({
  name: 'live-academia',
  title: 'Live Academia CMS',
  basePath: '/studio',

  // Usar variáveis de ambiente para garantir sincronização entre Cloud e Local
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c9pbklm2',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  // API version
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',

  // Enable authentication
  token: process.env.SANITY_API_TOKEN,

  // Configuração para permitir uso em múltiplos domínios
  // O Sanity Studio embarcado funcionará em qualquer domínio onde a aplicação Next.js estiver rodando
  // Não há necessidade de configurar CORS aqui, pois o Studio é servido pela própria aplicação Next.js
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Live Academia CMS')
          .items([
            // Configurações principais
            S.listItem()
              .title('⚙️ Configurações Globais')
              .child(
                S.document()
                  .schemaType('globalSettings')
                  .documentId('globalSettings')
              ),
            S.listItem()
              .title('🏠 Homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),
            S.divider(),

            // Conteúdo principal
            S.listItem()
              .title('🏢 Unidades')
              .child(S.documentTypeList('unit')),
            S.listItem()
              .title('💎 Planos')
              .child(S.documentTypeList('plano')),
            S.listItem()
              .title('🌟 Benefícios')
              .child(S.documentTypeList('benefit')),
            S.listItem()
              .title('💬 Depoimentos')
              .child(S.documentTypeList('testimonial')),
            S.listItem()
              .title('🏃‍♀️ Modalidades')
              .child(S.documentTypeList('modality')),
            S.divider(),

            // Features e recursos
            S.listItem()
              .title('📱 Recursos do App')
              .child(S.documentTypeList('appFeature')),
            S.listItem()
              .title('🏗️ Estrutura')
              .child(S.documentTypeList('structureFeature')),
            S.listItem()
              .title('💼 Wellhub')
              .child(S.documentTypeList('wellhubFeature')),
            S.listItem()
              .title('⚖️ Bioimpedância')
              .child(S.documentTypeList('bioimpedanciaFeature')),
            S.divider(),

            // Páginas especiais
            S.listItem()
              .title('🌅 Day Use')
              .child(
                S.document()
                  .schemaType('dayUse')
                  .documentId('dayUse')
              ),
            S.listItem()
              .title('📖 Sobre Nós')
              .child(
                S.document()
                  .schemaType('sobre')
                  .documentId('sobre')
              ),
            S.listItem()
              .title('📞 Contato')
              .child(
                S.document()
                  .schemaType('contato')
                  .documentId('contato')
              ),
            S.listItem()
              .title('💼 Trabalhe Conosco')
              .child(
                S.document()
                  .schemaType('trabalheConosco')
                  .documentId('trabalheConosco')
              ),
            S.divider(),

            // Seções da Homepage
            S.listItem()
              .title('🦸‍♂️ Seção Hero')
              .child(
                S.document()
                  .schemaType('heroSection')
                  .documentId('heroSection')
              ),
            S.listItem()
              .title('🏃‍♀️ Seção Modalidades')
              .child(
                S.document()
                  .schemaType('modalidadesSection')
                  .documentId('modalidadesSection')
              ),
            S.listItem()
              .title('💼 Seção Wellhub')
              .child(
                S.document()
                  .schemaType('wellhubSection')
                  .documentId('wellhubSection')
              ),
            S.listItem()
              .title('💬 Seção Depoimentos')
              .child(
                S.document()
                  .schemaType('testimonialSection')
                  .documentId('testimonialSection')
              ),
            S.listItem()
              .title('🏗️ Seção Estrutura')
              .child(
                S.document()
                  .schemaType('estruturaSection')
                  .documentId('estruturaSection')
              ),
            S.listItem()
              .title('⚖️ Seção Bioimpedância')
              .child(
                S.document()
                  .schemaType('bioimpedanciaSection')
                  .documentId('bioimpedanciaSection')
              ),
            S.listItem()
              .title('🌟 Seção Benefícios')
              .child(
                S.document()
                  .schemaType('beneficiosSection')
                  .documentId('beneficiosSection')
              ),
            S.listItem()
              .title('💎 Seção Planos')
              .child(
                S.document()
                  .schemaType('planosSection')
                  .documentId('planosSection')
              ),
            S.divider(),

            // Páginas específicas
            S.listItem()
              .title('📄 Página Planos')
              .child(
                S.document()
                  .schemaType('planosPage')
                  .documentId('planosPage')
              ),
            S.listItem()
              .title('📍 Página Unidades')
              .child(
                S.document()
                  .schemaType('unidadesPage')
                  .documentId('unidadesPage')
              ),
            S.listItem()
              .title('📍 Seção Unidades (Homepage)')
              .child(
                S.document()
                  .schemaType('unidadesSection')
                  .documentId('unidadesSection')
              ),
            S.listItem()
              .title('🧭 Navegação')
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
      // Configurações e páginas principais
      globalSettingsSchema,
      homepageSchema,
      sobreSchema,
      contatoSchema,
      trabalheConoscoSchema,
      dayUse,

      // Conteúdo principal
      unitSchema,
      planoSchema,
      benefitSchema,
      testimonialSchema,
      modalitySchema,

      // Features e recursos
      appFeatureSchema,
      structureFeatureSchema,
      wellhubFeatureSchema,
      bioimpedanciaFeatureSchema,

      // Seções da Homepage
      heroSectionSchema,
      modalidadesSectionSchema,
      wellhubSectionSchema,
      testimonialSectionSchema,
      estruturaSectionSchema,
      bioimpedanciaSectionSchema,
      beneficiosSectionSchema,
      planosSectionSchema,

      // Páginas específicas
      planosPageSchema,
      unidadesPageSchema,
      unidadesSectionSchema,
      navigationSchema,
    ],
  },
})

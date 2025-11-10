/**
 * Script para restaurar/criar o documento da homepage no Sanity
 * 
 * Uso:
 * 1. Via Sanity CLI: sanity exec sanity/data/restore-homepage.js --with-user-token
 * 2. Ou importe este script no Studio e execute manualmente
 */

export default async function restoreHomepage(client) {
  console.log('🔄 Restaurando documento da homepage...')

  try {
    // Verificar se já existe um documento homepage
    const existing = await client.fetch(`*[_type == "homepage"][0]`)

    if (existing) {
      console.log('ℹ️  Documento homepage já existe. Atualizando com valores padrão...')
      
      // Atualizar documento existente
      await client
        .patch(existing._id)
        .set({
          seo: {
            title: 'Live Academia | Rede de Academias em Manaus',
            description: 'Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha.',
            keywords: ['academia', 'manaus', 'fitness', 'musculação', 'aulas coletivas']
          },
          hero: {
            title: 'Transforme.',
            subtitle: 'Evolua.',
            thirdTitle: 'Viva.',
            description: 'Transforme seu corpo e sua vida na maior rede de academias de Manaus. Construído para atletas que exigem excelência em cada repetição.',
            rating: {
              value: '4.9',
              label: 'Elite rating',
              subscribers: '15k+ atletas'
            },
            primaryCta: {
              text: 'Comece Agora',
              link: '/planos'
            },
            secondaryCta: {
              text: 'Ver as aulas',
              link: '/aulas-coletivas'
            },
            footerText: 'Protocolos de treino de elite. Suporte premium. Todos os dispositivos suportados.'
          },
          about: {
            badge: 'Sobre a Live Academia',
            title: 'Seu treino, suas regras',
            description: 'A Live Academia está presente em Manaus há mais de 10 anos, oferecendo estrutura moderna, equipamentos de última geração e profissionais altamente qualificados para te ajudar a alcançar seus objetivos.',
            stats: [
              { value: '10+', label: 'Anos de Experiência' },
              { value: '15k+', label: 'Alunos Ativos' }
            ],
            highlights: [
              'Equipamentos de última geração',
              'Profissionais qualificados',
              'Aulas coletivas inclusas',
              'Sem fidelidade',
              'Horário flexível',
              'Ambiente climatizado'
            ]
          },
          beneficios: {
            badge: 'Benefícios',
            title: 'Por que escolher a Live Academia?',
            description: 'Descubra todos os benefícios que fazem da Live Academia a melhor escolha para sua jornada fitness.',
            items: []
          },
          planos: {
            badge: 'Planos',
            title: 'Escolha o plano ideal para você',
            description: 'Planos flexíveis sem fidelidade. Cancele quando quiser, sem multas ou taxas.',
            plans: []
          },
          testimonials: {
            badge: 'Depoimentos',
            title: 'O que nossos alunos dizem',
            description: 'Conheça histórias reais de transformação de nossos alunos.',
            testimonials: []
          }
        })
        .commit()
      
      console.log('✅ Documento homepage atualizado com sucesso!')
      return existing._id
    } else {
      console.log('📝 Criando novo documento homepage...')
      
      // Criar novo documento
      const newDoc = await client.create({
        _type: 'homepage',
        seo: {
          title: 'Live Academia | Rede de Academias em Manaus',
          description: 'Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha.',
          keywords: ['academia', 'manaus', 'fitness', 'musculação', 'aulas coletivas']
        },
        hero: {
          title: 'Transforme.',
          subtitle: 'Evolua.',
          thirdTitle: 'Viva.',
          description: 'Transforme seu corpo e sua vida na maior rede de academias de Manaus. Construído para atletas que exigem excelência em cada repetição.',
          rating: {
            value: '4.9',
            label: 'Elite rating',
            subscribers: '15k+ atletas'
          },
          primaryCta: {
            text: 'Comece Agora',
            link: '/planos'
          },
          secondaryCta: {
            text: 'Ver as aulas',
            link: '/aulas-coletivas'
          },
          footerText: 'Protocolos de treino de elite. Suporte premium. Todos os dispositivos suportados.'
        },
        about: {
          badge: 'Sobre a Live Academia',
          title: 'Seu treino, suas regras',
          description: 'A Live Academia está presente em Manaus há mais de 10 anos, oferecendo estrutura moderna, equipamentos de última geração e profissionais altamente qualificados para te ajudar a alcançar seus objetivos.',
          stats: [
            { value: '10+', label: 'Anos de Experiência' },
            { value: '15k+', label: 'Alunos Ativos' }
          ],
          highlights: [
            'Equipamentos de última geração',
            'Profissionais qualificados',
            'Aulas coletivas inclusas',
            'Sem fidelidade',
            'Horário flexível',
            'Ambiente climatizado'
          ]
        },
        beneficios: {
          badge: 'Benefícios',
          title: 'Por que escolher a Live Academia?',
          description: 'Descubra todos os benefícios que fazem da Live Academia a melhor escolha para sua jornada fitness.',
          items: []
        },
        planos: {
          badge: 'Planos',
          title: 'Escolha o plano ideal para você',
          description: 'Planos flexíveis sem fidelidade. Cancele quando quiser, sem multas ou taxas.',
          plans: []
        },
        testimonials: {
          badge: 'Depoimentos',
          title: 'O que nossos alunos dizem',
          description: 'Conheça histórias reais de transformação de nossos alunos.',
          testimonials: []
        }
      })
      
      console.log('✅ Documento homepage criado com sucesso!')
      console.log(`📋 ID do documento: ${newDoc._id}`)
      return newDoc._id
    }
  } catch (error) {
    console.error('❌ Erro ao restaurar homepage:', error)
    throw error
  }
}

// Se executado diretamente via sanity exec
if (typeof require !== 'undefined') {
  const { getCliClient } = require('@sanity/cli')
  const client = getCliClient()
  
  restoreHomepage(client)
    .then((id) => {
      console.log(`\n✨ Homepage restaurada com sucesso! ID: ${id}`)
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n💥 Erro ao restaurar homepage:', error)
      process.exit(1)
    })
}


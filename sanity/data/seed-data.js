// Dados de exemplo para o Sanity CMS
// Execute este script após configurar o Sanity para popular o CMS com dados iniciais

const homepageData = {
  _type: 'homepage',
  _id: 'homepage',
  hero: {
    backgroundImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-hero-bg' // Referência para imagem no Sanity
      }
    },
    badge: 'A MAIOR REDE DE MANAUS',
    title: 'Transforme seu corpo e sua vida',
    subtitle: 'na maior rede de academias de Manaus',
    description: 'Sem fidelidade, sem anuidade, sem pegadinha. Treino ilimitado, aulas coletivas inclusas e estrutura completa para você alcançar seus objetivos.',
    primaryCta: {
      text: 'Quero me matricular',
      link: '/planos'
    },
    secondaryCta: {
      text: 'Conhecer unidades',
      link: '/unidades'
    },
    stats: [
      { value: '20+', label: 'Unidades' },
      { value: '10mil+', label: 'Alunos' },
      { value: '15 anos', label: 'de História' }
    ]
  },
  about: {
    badge: 'Live Academia',
    title: 'Sobre',
    description: 'Transformamos treino em rotina sustentável e resultado real: liberdade multiunidade, atendimento humano que acompanha cada fase e estrutura premium para garantir evolução de verdade.',
    stats: [
      { value: '10K+', label: 'Alunos ativos', icon: '👥' },
      { value: '35+', label: 'Unidades', icon: '🏢' },
      { value: '4.9', label: 'Avaliação média', icon: '⭐' },
      { value: '10+', label: 'Anos de experiência', icon: '🎯' }
    ],
    highlights: [
      'Planos flexíveis sem fidelidade e acesso multiunidade',
      'Profissionais presentes e acompanhamento periódico',
      'Estrutura moderna, tecnologia e modalidades variadas',
      'Foco em consistência: não é só começar, é manter'
    ]
  },
  beneficios: {
    badge: 'Vantagens',
    title: 'Por que escolher a Live Academia?',
    description: 'Oferecemos muito mais do que equipamentos. Nossa proposta é entregar uma experiência completa de transformação.',
    items: [
      {
        icon: '🛡️',
        title: 'Sem Fidelidade',
        description: 'Cancele quando quiser, sem multas ou taxas adicionais. Sua liberdade é nossa prioridade.',
        color: 'from-yellow-400 to-amber-500',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-beneficio-1'
          }
        }
      },
      {
        icon: '♾️',
        title: 'Treino Ilimitado',
        description: 'Treine quantas vezes quiser, em qualquer horário. Acesso 7 dias por semana.',
        color: 'from-amber-500 to-yellow-600',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-beneficio-2'
          }
        }
      },
      {
        icon: '👥',
        title: 'Aulas Coletivas Inclusas',
        description: 'Mais de 15 modalidades diferentes: Spinning, Yoga, Pilates, Funcional e muito mais.',
        color: 'from-yellow-500 to-amber-600',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-beneficio-3'
          }
        }
      },
      {
        icon: '🏋️',
        title: 'Equipamentos Modernos',
        description: 'Aparelhos de última geração com manutenção regular para garantir sua segurança.',
        color: 'from-yellow-400 to-amber-500',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-beneficio-4'
          }
        }
      }
    ]
  },
  planos: {
    badge: 'Nossos Planos',
    title: 'Escolha o plano ideal para você',
    description: 'Sem fidelidade, sem anuidade. Pague apenas enquanto treinar.',
    plans: [
      {
        id: 'tradicional',
        name: 'TRADICIONAL',
        price: '119,90',
        period: 'mês',
        description: 'Treine em todas as unidades Tradicionais, incluindo as Tradicionais Climatizadas.',
        badge: 'Mais Popular',
        features: [
          'Sem fidelidade',
          'Sem taxa de cancelamento',
          'Sem taxa de manutenção',
          'Sem taxa de anuidade',
          'Acesso ao app Live Academia',
          'Aulas coletivas',
          'Climatização (apenas unidades Torquato Bemol e Tiradentes)',
          'Atendimento aos domingos (consultar unidade)'
        ],
        cta: 'Matricular agora',
        highlight: true
      },
      {
        id: 'diamante',
        name: 'DIAMANTE',
        price: '159,90',
        period: 'mês',
        description: 'Treine em todas as unidades da rede em Manaus, exceto Morada do Sol e Alphaville.',
        badge: 'Premium',
        features: [
          'Tudo do Plano Tradicional',
          'Acesso às unidades Diamante',
          'Área de relaxamento exclusiva',
          'Sauna seca e úmida',
          'Espaço gourmet',
          'Toalhas de cortesia',
          'Estacionamento coberto'
        ],
        cta: 'Quero ser Diamante',
        highlight: false
      }
    ]
  },
  seo: {
    title: 'Live Academia | A Maior Rede de Academias de Manaus',
    description: 'Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha. Mais de 20 unidades.',
    keywords: 'academia manaus, academia sem fidelidade, live academia, treino manaus, musculação manaus, aulas coletivas'
  }
}

const unitsData = [
  {
    _type: 'unit',
    name: 'Live Academia Centro',
    slug: { current: 'centro' },
    address: 'Rua 10 de Julho, 123 - Centro',
    city: 'Manaus',
    state: 'AM',
    zipCode: '69010-060',
    phone: '(92) 3234-5678',
    whatsapp: '(92) 99999-9999',
    email: 'centro@liveacademia.com.br',
    latitude: -3.1190275,
    longitude: -60.0217314,
    type: 'Diamante',
    services: ['Climatização', 'Espaço Relax', 'Espaço Yoga', 'Studio de Bike', 'Sauna'],
    description: 'Nossa unidade flagship no centro de Manaus, com estrutura completa e todos os serviços premium.',
    openingHours: 'Segunda a Sexta: 5h às 23h | Sábado: 6h às 22h | Domingo: 6h às 20h',
    order: 1
  },
  {
    _type: 'unit',
    name: 'Live Academia Cidade Nova',
    slug: { current: 'cidade-nova' },
    address: 'Av. Torquato Tapajós, 456 - Cidade Nova',
    city: 'Manaus',
    state: 'AM',
    zipCode: '69065-000',
    phone: '(92) 3234-5679',
    whatsapp: '(92) 99999-9998',
    email: 'cidadenova@liveacademia.com.br',
    latitude: -3.0471193,
    longitude: -59.9910556,
    type: 'Premium',
    services: ['Climatização', 'Espaço Relax', 'Atendimento Domingos'],
    description: 'Unidade moderna na Cidade Nova com foco em funcional e aulas coletivas.',
    openingHours: 'Segunda a Sexta: 5h às 23h | Sábado: 6h às 22h | Domingo: 6h às 20h',
    order: 2
  },
  {
    _type: 'unit',
    name: 'Live Academia Compensa',
    slug: { current: 'compensa' },
    address: 'Av. Brasil, 789 - Compensa',
    city: 'Manaus',
    state: 'AM',
    zipCode: '69036-110',
    phone: '(92) 3234-5680',
    whatsapp: '(92) 99999-9997',
    email: 'compensa@liveacademia.com.br',
    latitude: -3.0873944,
    longitude: -60.0454731,
    type: 'Tradicional',
    services: ['Climatização'],
    description: 'Unidade tradicional na Compensa com equipamentos modernos e preços acessíveis.',
    openingHours: 'Segunda a Sexta: 5h às 23h | Sábado: 6h às 22h',
    order: 3
  },
  {
    _type: 'unit',
    name: 'Live Academia Vieiralves',
    slug: { current: 'vieiralves' },
    address: 'Rua Recife, 321 - Vieiralves',
    city: 'Manaus',
    state: 'AM',
    zipCode: '69053-010',
    phone: '(92) 3234-5681',
    whatsapp: '(92) 99999-9996',
    email: 'vieiralves@liveacademia.com.br',
    latitude: -3.0864611,
    longitude: -60.0217314,
    type: 'Diamante',
    services: ['Climatização', 'Espaço Relax', 'Espaço Yoga', 'Studio de Bike', 'Sauna', 'Estacionamento Coberto'],
    description: 'Unidade premium no Vieiralves com estrutura completa e serviços exclusivos.',
    openingHours: 'Segunda a Sexta: 5h às 23h | Sábado: 6h às 22h | Domingo: 6h às 20h',
    order: 4
  }
]

export { homepageData, unitsData }

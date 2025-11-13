/**
 * Script para popular o Strapi com dados iniciais
 * Equivalente aos dados do Sanity
 * 
 * Execute: node scripts/seed-strapi.js
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '9b30aa86af30060e1cfe49360c15007c673ea3b616a827f337305e258371552cf447986cd0ef90fd975d40168046a7230f27d63a59d80259993d769fef600a456b775f71712b6391df69ca4d518390a65a953c33a10889292816b6421c0694e3019ee29ea76f8a4df2376690cff6d222c2cf0cd7dc1a8492bbb12b4207dcd50f';

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN não configurado!');
  console.error('   Adicione STRAPI_API_TOKEN ao .env.local');
  console.error('\n💡 IMPORTANTE: O token precisa ter "Full Access"!');
  console.error('   Crie em: Settings → API Tokens → Create new API Token → Full access');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
};

// Dados da Homepage
const homepageData = {
  data: {
    seo: {
      metaTitle: 'Live Academia | Rede de Academias em Manaus',
      metaDescription: 'Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha.',
      keywords: 'academia,manaus,fitness,musculação,aulas coletivas',
    },
    heroSection: {
      title1: 'Transformamos',
      title2: 'treino em rotina',
      title3: 'e resultado real.',
      description: 'A maior rede de academias de Manaus, com planos flexíveis e estrutura completa para você treinar do seu jeito.',
      rating: 4.9,
      ratingLabel: 'Elite rating',
      subscribersCount: '15k+ atletas',
      primaryCta: {
        text: 'Comece Agora',
        url: '/planos',
        variant: 'primary',
        size: 'lg',
      },
      secondaryCta: {
        text: 'Ver as aulas',
        url: '/aulas-coletivas',
        variant: 'secondary',
        size: 'lg',
      },
      footerText: 'Protocolos de treino de elite. Suporte premium. Todos os dispositivos suportados.',
    },
    aboutSection: {
      badge: 'Sobre a Live Academia',
      title: 'Transforme seu corpo e sua vida',
      description: 'A Live Academia transcende o conceito de academia. Somos um verdadeiro ecossistema de bem-estar em Manaus. Com mais de 10 anos de história, nossa missão é oferecer um ambiente completo para sua qualidade de vida. Com dezenas de unidades espalhadas por toda a capital amazonense, garantimos que o cuidado com o corpo e a mente esteja sempre ao seu alcance. Nossas instalações contam com estrutura moderna e equipamentos de última geração, e nosso time é formado por profissionais altamente qualificados que integram treino, orientação e suporte para um estilo de vida mais pleno.\n\nVenha para a Live Academia e descubra a força de um ecossistema que trabalha integralmente pelo seu melhor desempenho.\n',
      stats: [
        {
          value: '10+',
          label: 'Anos de experiência',
        },
        {
          value: '15k+',
          label: 'Alunos Ativos',
        },
      ],
      highlights: [
        { text: 'Equipamentos de última geração', icon: 'Check' },
        { text: 'Profissionais qualificados', icon: 'Check' },
        { text: 'Aulas coletivas inclusas', icon: 'Check' },
        { text: 'Sem fidelidade', icon: 'Check' },
        { text: 'Horário flexível', icon: 'Check' },
        { text: 'Ambiente climatizado', icon: 'Check' },
      ],
    },
    benefitsSection: {
      badge: 'Benefícios',
      title: 'Por que escolher a Live Academia?',
      description: 'Descubra todos os benefícios que fazem da Live Academia a melhor escolha para sua jornada fitness.',
    },
    plansSection: {
      badge: 'Planos',
      title: 'Escolha o plano ideal para você',
      description: 'Planos flexíveis sem fidelidade. Cancele quando quiser, sem multas ou taxas.',
    },
    testimonialsSection: {
      badge: 'Depoimentos',
      title: 'O que nossos alunos dizem',
      description: 'Conheça histórias reais de transformação de nossos alunos.',
    },
    appSection: {
      badge: 'APLICATIVO',
      title: 'Tudo na',
      highlightedText: 'palma da mão',
      description: 'Acesse sua academia de onde estiver. Agende aulas, acompanhe seu treino e muito mais.',
      subtitle: 'Disponível para iOS e Android',
      benefits: [
        { text: 'Agendamento de aulas', icon: 'Check' },
        { text: 'Acompanhamento de treino', icon: 'Check' },
        { text: 'Histórico de pagamentos', icon: 'Check' },
        { text: 'Notificações personalizadas', icon: 'Check' },
      ],
    },
    wellhubSection: {
      badge: 'WELLHUB',
      title: 'Bem-estar completo',
      description: 'Acesse uma rede de bem-estar com descontos exclusivos em milhares de estabelecimentos.',
      benefits: [
        { text: 'Descontos em milhares de estabelecimentos', icon: 'Check' },
        { text: 'Yoga, pilates e meditação', icon: 'Check' },
        { text: 'Sauna e spa', icon: 'Check' },
        { text: 'Nutrição e bem-estar', icon: 'Check' },
      ],
      ctaButton: {
        text: 'Saiba mais',
        url: '/wellhub',
        variant: 'primary',
        size: 'lg',
      },
    },
    bioimpedanciaSection: {
      badge: 'BIOIMPEDÂNCIA',
      title: 'Acompanhe sua evolução',
      description: 'Análise completa da composição corporal com tecnologia de ponta.',
      features: [
        { text: 'Percentual de gordura corporal', icon: 'Check' },
        { text: 'Massa muscular', icon: 'Check' },
        { text: 'Água corporal total', icon: 'Check' },
        { text: 'Metabolismo basal', icon: 'Check' },
        { text: 'Idade metabólica', icon: 'Check' },
      ],
      ctaButton: {
        text: 'Agendar análise',
        url: '/bioimpedancia',
        variant: 'primary',
        size: 'lg',
      },
    },
    structureSection: {
      badge: 'ESTRUTURA',
      title: 'Estrutura completa para seu treino',
      description: 'Equipamentos modernos e espaços pensados para sua comodidade.',
      features: [
        { text: 'Equipamentos de última geração', icon: 'Dumbbell' },
        { text: 'Climatização', icon: 'Snowflake' },
        { text: 'Estacionamento', icon: 'Car' },
        { text: 'WiFi gratuito', icon: 'Wifi' },
        { text: 'Vestiários completos', icon: 'Shirt' },
        { text: 'Segurança 24h', icon: 'Shield' },
      ],
    },
    modalitiesSection: {
      badge: 'AULAS COLETIVAS',
      title: 'Modalidades para todos os gostos',
      description: 'Mais de 15 modalidades diferentes incluídas no seu plano.',
    },
  },
};

// Dados dos Planos
const plansData = [
  {
    data: {
      planId: 'tradicional',
      name: 'TRADICIONAL',
      description: 'Treine em todas as unidades Tradicionais, incluindo as Tradicionais Climatizadas.',
      price: 11990, // em centavos (R$ 119,90)
      priceLabel: 'R$ 119,90/mês',
      period: 'mensal',
      features: [
        { text: 'Sem fidelidade', icon: 'Check' },
        { text: 'Sem taxa de cancelamento', icon: 'Check' },
        { text: 'Sem taxa de manutenção', icon: 'Check' },
        { text: 'Sem taxa de anuidade', icon: 'Check' },
        { text: 'Acesso ao app Live Academia', icon: 'Check' },
        { text: 'Aulas coletivas', icon: 'Check' },
        { text: 'Climatização (apenas unidades Torquato Bemol e Tiradentes)', icon: 'Check' },
        { text: 'Atendimento aos domingos (consultar unidade)', icon: 'Check' },
      ],
      ctaText: 'MATRICULE-SE AGORA',
      ctaUrl: '/planos',
      highlight: true,
      popular: true,
      badge: 'mais_vendido',
      order: 1,
      active: true,
    },
  },
  {
    data: {
      planId: 'diamante',
      name: 'DIAMANTE',
      description: 'Treine em todas as unidades da rede em Manaus, exceto Morada do Sol e Alphaville.',
      price: 15990, // em centavos (R$ 159,90)
      priceLabel: 'R$ 159,90/mês',
      period: 'mensal',
      features: [
        { text: 'Tudo do Plano Tradicional', icon: 'Check' },
        { text: 'Acesso às unidades Diamante', icon: 'Check' },
        { text: 'Área de relaxamento exclusiva', icon: 'Check' },
        { text: 'Sauna seca e úmida', icon: 'Check' },
        { text: 'Espaço gourmet', icon: 'Check' },
        { text: 'Toalhas de cortesia', icon: 'Check' },
        { text: 'Estacionamento coberto', icon: 'Check' },
      ],
      ctaText: 'QUERO SER DIAMANTE',
      ctaUrl: '/planos',
      highlight: false,
      popular: false,
      badge: 'recomendado',
      order: 2,
      active: true,
    },
  },
];

// Dados das Unidades
const unitsData = [
  {
    data: {
      name: 'Live Academia Centro',
      slug: 'centro',
      address: 'Rua 10 de Julho, 123 - Centro',
      city: 'Manaus',
      state: 'AM',
      zipCode: '69010-060',
      phone: '(92) 3234-5678',
      whatsapp: '(92) 99999-9999',
      email: 'centro@liveacademia.com.br',
      latitude: -3.1190275,
      longitude: -60.0217314,
      type: 'diamante',
      description: 'Nossa unidade flagship no centro de Manaus, com estrutura completa e todos os serviços premium.',
      openingHours: 'Segunda a Sexta: 5h às 23h | Sábado: 6h às 22h | Domingo: 6h às 20h',
      features: [
        { text: 'Climatização', icon: 'Check' },
        { text: 'Espaço Relax', icon: 'Check' },
        { text: 'Espaço Yoga', icon: 'Check' },
        { text: 'Studio de Bike', icon: 'Check' },
        { text: 'Sauna', icon: 'Check' },
      ],
      order: 1,
      active: true,
      featured: true,
      codigoUnidade: '1', // Código da unidade na API do Pacto (configure no Strapi Admin)
      chavePublica: '', // Chave pública da API do Pacto (configure no Strapi Admin)
    },
  },
  {
    data: {
      name: 'Live Academia Cidade Nova',
      slug: 'cidade-nova',
      address: 'Av. Torquato Tapajós, 456 - Cidade Nova',
      city: 'Manaus',
      state: 'AM',
      zipCode: '69065-000',
      phone: '(92) 3234-5679',
      whatsapp: '(92) 99999-9998',
      email: 'cidadenova@liveacademia.com.br',
      latitude: -3.0471193,
      longitude: -59.9910556,
      type: 'premium',
      description: 'Unidade moderna na Cidade Nova com foco em funcional e aulas coletivas.',
      openingHours: 'Segunda a Sexta: 5h às 23h | Sábado: 6h às 22h | Domingo: 6h às 20h',
      features: [
        { text: 'Climatização', icon: 'Check' },
        { text: 'Espaço Relax', icon: 'Check' },
        { text: 'Atendimento Domingos', icon: 'Check' },
      ],
      order: 2,
      active: true,
      featured: false,
      codigoUnidade: '2', // Código da unidade na API do Pacto (configure no Strapi Admin)
      chavePublica: '', // Chave pública da API do Pacto (configure no Strapi Admin)
    },
  },
  {
    data: {
      name: 'Live Academia Compensa',
      slug: 'compensa',
      address: 'Av. Brasil, 789 - Compensa',
      city: 'Manaus',
      state: 'AM',
      zipCode: '69036-110',
      phone: '(92) 3234-5680',
      whatsapp: '(92) 99999-9997',
      email: 'compensa@liveacademia.com.br',
      latitude: -3.0873944,
      longitude: -60.0454731,
      type: 'tradicional',
      description: 'Unidade tradicional na Compensa com equipamentos modernos e preços acessíveis.',
      openingHours: 'Segunda a Sexta: 5h às 23h | Sábado: 6h às 22h',
      features: [
        { text: 'Climatização', icon: 'Check' },
      ],
      order: 3,
      active: true,
      featured: false,
      codigoUnidade: '3', // Código da unidade na API do Pacto (configure no Strapi Admin)
      chavePublica: '', // Chave pública da API do Pacto (configure no Strapi Admin)
    },
  },
  {
    data: {
      name: 'Live Academia Vieiralves',
      slug: 'vieiralves',
      address: 'Rua Recife, 321 - Vieiralves',
      city: 'Manaus',
      state: 'AM',
      zipCode: '69053-010',
      phone: '(92) 3234-5681',
      whatsapp: '(92) 99999-9996',
      email: 'vieiralves@liveacademia.com.br',
      latitude: -3.0864611,
      longitude: -60.0217314,
      type: 'diamante',
      description: 'Unidade premium no Vieiralves com estrutura completa e serviços exclusivos.',
      openingHours: 'Segunda a Sexta: 5h às 23h | Sábado: 6h às 22h | Domingo: 6h às 20h',
      features: [
        { text: 'Climatização', icon: 'Check' },
        { text: 'Espaço Relax', icon: 'Check' },
        { text: 'Espaço Yoga', icon: 'Check' },
        { text: 'Studio de Bike', icon: 'Check' },
        { text: 'Sauna', icon: 'Check' },
        { text: 'Estacionamento Coberto', icon: 'Check' },
      ],
      order: 4,
      active: true,
      featured: true,
      codigoUnidade: '4', // Código da unidade na API do Pacto (configure no Strapi Admin)
      chavePublica: '', // Chave pública da API do Pacto (configure no Strapi Admin)
    },
  },
];

// Dados dos Benefícios
const benefitsData = [
  {
    data: {
      title: 'Sem Fidelidade',
      description: 'Cancele quando quiser, sem multas ou taxas. Sua liberdade é nossa prioridade.',
      icon: 'ShieldCheck',
      order: 1,
      active: true,
    },
  },
  {
    data: {
      title: 'Equipamentos Modernos',
      description: 'Máquinas de última geração para maximizar seus resultados e segurança.',
      icon: 'Users',
      order: 2,
      active: true,
    },
  },
  {
    data: {
      title: 'Aulas Coletivas',
      description: 'Diversas modalidades inclusas: spinning, funcional, dança e muito mais.',
      icon: 'CheckCircle',
      order: 3,
      active: true,
    },
  },
];

// Dados das Modalidades
const modalitiesData = [
  {
    data: {
      name: 'Spinning',
      description: 'Aula de ciclismo indoor com música alta e muita energia.',
      duration: 45,
      difficultyLevel: 'intermediario',
      instructor: 'Prof. João Silva',
      order: 1,
      active: true,
    },
  },
  {
    data: {
      name: 'Yoga',
      description: 'Prática de yoga para flexibilidade, força e bem-estar.',
      duration: 60,
      difficultyLevel: 'iniciante',
      instructor: 'Prof. Maria Santos',
      order: 2,
      active: true,
    },
  },
  {
    data: {
      name: 'Pilates',
      description: 'Exercícios de pilates para fortalecimento e alongamento.',
      duration: 50,
      difficultyLevel: 'intermediario',
      instructor: 'Prof. Ana Costa',
      order: 3,
      active: true,
    },
  },
  {
    data: {
      name: 'Funcional',
      description: 'Treino funcional para movimento e força.',
      duration: 50,
      difficultyLevel: 'intermediario',
      instructor: 'Prof. Carlos Oliveira',
      order: 4,
      active: true,
    },
  },
  {
    data: {
      name: 'Dança',
      description: 'Aulas de dança para diversão e condicionamento.',
      duration: 60,
      difficultyLevel: 'iniciante',
      instructor: 'Prof. Julia Lima',
      order: 5,
      active: true,
    },
  },
];

// Dados da Página de Contato
const contactPageData = {
  data: {
    seo: {
      metaTitle: 'Contato | Live Academia',
      metaDescription: 'Entre em contato com a Live Academia. Estamos prontos para ajudar você.',
      keywords: 'contato, live academia, manaus, telefone, email',
    },
    title: 'Entre em Contato',
    subtitle: 'Estamos prontos para ajudar você',
    description: 'Tem dúvidas? Quer saber mais sobre nossos planos? Entre em contato conosco!',
    contactInfo: {
      phone: '(92) 3234-5678',
      whatsapp: '(92) 99999-9999',
      email: 'contato@liveacademia.com.br',
      address: 'Av. Torquato Tapajós, 456 - Cidade Nova, Manaus - AM, 69065-000',
    },
    socialNetworks: {
      instagram: 'https://instagram.com/liveacademia',
      facebook: 'https://facebook.com/liveacademia',
      youtube: 'https://youtube.com/liveacademia',
    },
    formTitle: 'Envie sua mensagem',
    formDescription: 'Preencha o formulário abaixo e entraremos em contato em breve.',
    ctaButtonText: 'Enviar mensagem',
  },
};

// Dados da Página Day Use
const dayUsePageData = {
  data: {
    seo: {
      metaTitle: 'Day Use | Live Academia',
      metaDescription: 'Experimente a Live Academia por um dia. Acesso completo à estrutura e aulas coletivas.',
      keywords: 'day use, academia, manaus, experimente, teste',
    },
    title: 'Day Use',
    subtitle: 'Experimente a Live Academia por um dia',
    description: 'Quer conhecer nossa estrutura antes de se matricular? Experimente o Day Use e tenha acesso completo à academia por um dia.',
    benefits: [
      { text: 'Acesso completo à estrutura', icon: 'Check' },
      { text: 'Aulas coletivas inclusas', icon: 'Check' },
      { text: 'Equipamentos de última geração', icon: 'Check' },
      { text: 'Sem compromisso', icon: 'Check' },
    ],
    packages: [
      {
        title: 'Day Use Básico',
        price: 29.90,
        description: 'Acesso por um dia à estrutura e aulas coletivas.',
        popular: false,
        benefits: [
          { text: 'Acesso à estrutura', icon: 'Check' },
          { text: 'Aulas coletivas', icon: 'Check' },
        ],
      },
      {
        title: 'Day Use Completo',
        price: 49.90,
        description: 'Acesso completo com acompanhamento de personal trainer.',
        popular: true,
        benefits: [
          { text: 'Tudo do Day Use Básico', icon: 'Check' },
          { text: 'Acompanhamento de personal', icon: 'Check' },
          { text: 'Análise de bioimpedância', icon: 'Check' },
        ],
      },
    ],
    faqs: [
      {
        question: 'O que está incluído no Day Use?',
        answer: 'O Day Use inclui acesso completo à estrutura da academia, uso de todos os equipamentos e participação em aulas coletivas do dia.',
      },
      {
        question: 'Preciso agendar com antecedência?',
        answer: 'Recomendamos agendar com antecedência para garantir sua vaga, mas também aceitamos visitas sem agendamento, sujeito à disponibilidade.',
      },
      {
        question: 'Posso usar o Day Use mais de uma vez?',
        answer: 'Sim, você pode adquirir quantos Day Uses quiser. É uma ótima forma de experimentar a academia antes de se matricular.',
      },
    ],
    ctaTitle: 'Pronto para experimentar a Live Academia?',
    ctaDescription: 'Adquira seu Day Use agora e descubra por que somos a melhor academia de Manaus.',
  },
};

// Dados da Página Sobre Nós
const aboutPageData = {
  data: {
    seo: {
      metaTitle: 'Sobre Nós | Live Academia',
      metaDescription: 'Conheça a história da Live Academia, a maior rede de academias de Manaus.',
      keywords: 'sobre, live academia, história, manaus, academia',
    },
    title: 'Sobre a Live Academia',
    subtitle: 'Transformando vidas há mais de 10 anos',
    description: 'A Live Academia é a maior rede de academias de Manaus, com mais de 10 anos de história dedicados a transformar vidas através do exercício físico.',
    contentSections: [
      {
        title: 'Nossa História',
        content: 'Fundada em 2013, a Live Academia nasceu com a missão de democratizar o acesso à atividade física de qualidade em Manaus.',
        order: 1,
      },
      {
        title: 'Nossa Missão',
        content: 'Oferecer estrutura moderna, equipamentos de última geração e profissionais qualificados para ajudar nossos alunos a alcançarem seus objetivos.',
        order: 2,
      },
    ],
    values: [
      {
        title: 'Qualidade',
        description: 'Estrutura e equipamentos de primeira linha',
        icon: 'Star',
      },
      {
        title: 'Acessibilidade',
        description: 'Planos flexíveis sem fidelidade',
        icon: 'Users',
      },
      {
        title: 'Inovação',
        description: 'Tecnologia e métodos modernos',
        icon: 'Zap',
      },
    ],
    teamSection: {
      title: 'Nossa Equipe',
      description: 'Profissionais qualificados dedicados ao seu sucesso.',
      members: [], // Adicione membros do time se necessário
    },
    mission: 'Transformar vidas através do exercício físico, oferecendo estrutura moderna e profissionais qualificados.',
    vision: 'Ser a maior e melhor rede de academias do Norte do Brasil.',
    history: 'Fundada em 2013, a Live Academia começou com uma unidade e hoje conta com mais de 20 unidades espalhadas por Manaus.',
    stats: [
      {
        value: '10+',
        label: 'Anos de experiência',
        description: 'Mais de uma década transformando vidas',
      },
      {
        value: '20+',
        label: 'Unidades',
        description: 'Espalhadas por toda Manaus',
      },
      {
        value: '15k+',
        label: 'Alunos ativos',
        description: 'Pessoas que confiam na Live Academia',
      },
      {
        value: '4.9',
        label: 'Avaliação média',
        description: 'Satisfação dos nossos alunos',
      },
    ],
    cta: {
      title: 'Faça parte da nossa história',
      description: 'Venha conhecer de perto o que faz da Live Academia a melhor escolha para sua jornada fitness.',
      buttonText: 'Conheça nossas unidades',
      buttonUrl: '/unidades',
    },
  },
};

// Dados da Página Trabalhe Conosco
const trabalheConoscoPageData = {
  data: {
    seo: {
      metaTitle: 'Trabalhe Conosco | Live Academia',
      metaDescription: 'Venha fazer parte da equipe Live Academia. Oportunidades de trabalho e carreira.',
      keywords: 'trabalhe conosco, vagas, emprego, carreira, live academia',
    },
    title: 'Trabalhe Conosco',
    subtitle: 'Faça parte da nossa equipe',
    description: 'Venha fazer parte da maior rede de academias de Manaus. Oferecemos oportunidades de crescimento e desenvolvimento profissional.',
    benefits: [
      {
        title: 'Plano de Carreira',
        description: 'Oportunidades de crescimento e desenvolvimento',
        icon: 'Award',
        colorGradient: 'from-blue-500 to-cyan-600',
      },
      {
        title: 'Ambiente de Trabalho',
        description: 'Ambiente descontraído e acolhedor',
        icon: 'Heart',
        colorGradient: 'from-pink-500 to-rose-600',
      },
      {
        title: 'Benefícios',
        description: 'Vale-refeição, plano de saúde e muito mais',
        icon: 'Gift',
        colorGradient: 'from-purple-500 to-pink-600',
      },
    ],
    positions: [
      {
        title: 'Personal Trainer',
        department: 'Treinamento',
        location: 'Manaus',
        type: 'full-time',
        description: 'Procuramos personal trainer experiente para integrar nossa equipe.',
        requirements: [
          { text: 'CREF ativo', icon: 'Check' },
          { text: 'Experiência mínima de 2 anos', icon: 'Check' },
          { text: 'Disponibilidade para horários flexíveis', icon: 'Check' },
        ],
        benefits: [
          { text: 'Salário competitivo', icon: 'Check' },
          { text: 'Vale-refeição', icon: 'Check' },
          { text: 'Plano de saúde', icon: 'Check' },
        ],
        salary: 'A combinar',
        active: true,
      },
    ],
    formTitle: 'Candidatar-se',
    formDescription: 'Envie seu currículo e venha fazer parte da nossa equipe.',
    ctaButtonText: 'Enviar candidatura',
    contactInfo: {
      email: 'rh@liveacademia.com.br',
      phone: '(92) 3234-5678',
      whatsapp: '(92) 99999-9999',
    },
  },
};

// Dados das Configurações Globais
const globalSettingsData = {
  data: {
    siteName: 'Live Academia',
    siteTagline: 'Transforme seu corpo e sua vida',
    primaryColor: '#FF6B00',
    accentColor: '#FF8C42',
    defaultSeo: {
      metaTitle: 'Live Academia | Rede de Academias em Manaus',
      metaDescription: 'Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha.',
      keywords: 'academia, manaus, fitness, musculação, aulas coletivas',
    },
    contactInfo: {
      phone: '(92) 3234-5678',
      whatsapp: '(92) 99999-9999',
      email: 'contato@liveacademia.com.br',
      address: 'Av. Torquato Tapajós, 456 - Cidade Nova, Manaus - AM, 69065-000',
    },
    socialMedia: {
      instagram: 'https://instagram.com/liveacademia',
      facebook: 'https://facebook.com/liveacademia',
      youtube: 'https://youtube.com/liveacademia',
    },
    analytics: {
      ga4Id: process.env.NEXT_PUBLIC_GA4_ID || '',
      gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
      metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
    },
  },
};

// Função para criar/atualizar Single Type (homepage)
async function createOrUpdateSingleType(endpoint, data) {
  try {
    // Para Single Types no Strapi, sempre usar PUT (cria ou atualiza)
    const putResponse = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    if (putResponse.ok) {
      const result = await putResponse.json();
      const name = data.data?.title || data.data?.siteName || endpoint;
      console.log(`✅ ${endpoint} criado/atualizado: ${name}`);
      return result;
    } else {
      const errorText = await putResponse.text();
      console.error(`❌ Erro ao criar/atualizar ${endpoint}:`, errorText);
      console.error(`   Status: ${putResponse.status} ${putResponse.statusText}`);
      
      // Se for erro 405 (Method Not Allowed), tentar verificar se precisa de configuração diferente
      if (putResponse.status === 405) {
        console.error(`   ⚠️  Método PUT não permitido. Verifique se o endpoint está configurado como Single Type no Strapi.`);
      }
      
      throw new Error(`Failed to create/update ${endpoint}: ${putResponse.status} ${putResponse.statusText}`);
    }
  } catch (error) {
    // Verificar se é erro de conexão
    if (error.cause?.code === 'ECONNREFUSED') {
      console.error(`\n❌ ERRO: Strapi não está rodando!`);
      console.error(`   Por favor, inicie o Strapi primeiro:`);
      console.error(`   cd cms && pnpm dev`);
      process.exit(1);
    }
    
    console.error(`❌ Erro ao processar ${endpoint}:`, error.message);
    throw error;
  }
}

// Função para criar Collection Type
async function createCollectionType(endpoint, data) {
  try {
    // Verificar se já existe (buscar por slug, planId, name, etc.)
    const identifier = data.data.slug || data.data.planId || data.data.name;
    let existingItem = null;

    if (identifier) {
      try {
        const filter = data.data.slug 
          ? `filters[slug][$eq]=${encodeURIComponent(identifier)}`
          : data.data.planId
          ? `filters[planId][$eq]=${encodeURIComponent(identifier)}`
          : `filters[name][$eq]=${encodeURIComponent(identifier)}`;
        
        const searchResponse = await fetch(`${STRAPI_URL}/api/${endpoint}?${filter}`, { headers });
        if (searchResponse.ok) {
          const searchResult = await searchResponse.json();
          if (searchResult.data && searchResult.data.length > 0) {
            existingItem = searchResult.data[0];
          }
        }
      } catch (error) {
        // Ignorar erro de busca, continuar para criar
      }
    }

    if (existingItem) {
      // Atualizar item existente
      const updateResponse = await fetch(`${STRAPI_URL}/api/${endpoint}/${existingItem.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });

      if (updateResponse.ok) {
        const result = await updateResponse.json();
        const name = data.data.name || data.data.title || 'item';
        console.log(`✅ ${endpoint} atualizado: ${name} (ID: ${result.data.id})`);
        return result;
      } else {
        const errorText = await updateResponse.text();
        console.error(`⚠️  Erro ao atualizar ${endpoint}:`, errorText);
        // Não falhar, apenas avisar
        return null;
      }
    } else {
      // Criar novo item
      const createResponse = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (createResponse.ok) {
        const result = await createResponse.json();
        const name = data.data.name || data.data.title || 'item';
        console.log(`✅ ${endpoint} criado: ${name} (ID: ${result.data.id})`);
        return result;
      } else {
        const errorText = await createResponse.text();
        console.error(`⚠️  Erro ao criar ${endpoint}:`, errorText);
        console.error(`   Status: ${createResponse.status} ${createResponse.statusText}`);
        
        // Se já existe (erro 400/409), apenas avisar mas não falhar
        if (createResponse.status === 400 || createResponse.status === 409) {
          const name = data.data.name || data.data.title || 'item';
          console.log(`⚠️  ${endpoint} já existe: ${name} (ignorando)`);
          return null;
        }
        
        // Para outros erros, apenas avisar mas não falhar o seed completo
        console.error(`⚠️  Não foi possível criar ${endpoint}, mas continuando...`);
        return null;
      }
    }
  } catch (error) {
    // Verificar se é erro de conexão
    if (error.cause?.code === 'ECONNREFUSED') {
      console.error(`\n❌ ERRO: Strapi não está rodando!`);
      console.error(`   Por favor, inicie o Strapi primeiro:`);
      console.error(`   cd cms && pnpm dev`);
      process.exit(1);
    }
    
    console.error(`⚠️  Erro ao processar ${endpoint}:`, error.message);
    // Não falhar completamente, apenas avisar
    return null;
  }
}


// Verificar se o Strapi está rodando
async function checkStrapiConnection() {
  try {
    const response = await fetch(`${STRAPI_URL}/_health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Função principal
async function seed() {
  console.log('🌱 Iniciando seed do Strapi...\n');
  console.log(`URL: ${STRAPI_URL}\n`);

  try {
    // Verificar se o Strapi está rodando
    console.log('🔍 Verificando conexão com o Strapi...');
    const isConnected = await checkStrapiConnection();
    if (!isConnected) {
      console.error('\n❌ ERRO: Strapi não está rodando!');
      console.error('   Por favor, inicie o Strapi primeiro:');
      console.error('   cd cms && pnpm dev');
      console.error('\n   Aguarde até ver: "Server started at http://localhost:1337"');
      process.exit(1);
    }
    console.log('✅ Strapi está rodando!\n');
    
    // 1. Criar Homepage (Single Type)
    console.log('📄 Criando Homepage...');
    try {
      await createOrUpdateSingleType('homepage', homepageData);
    } catch (error) {
      console.error('⚠️  Erro ao criar homepage, mas continuando...');
    }

    // 2. Criar Planos (Collection Type)
    console.log('\n💰 Criando Planos...');
    for (const plan of plansData) {
      await createCollectionType('plans', plan);
    }

    // 3. Criar Unidades (Collection Type)
    console.log('\n🏢 Criando Unidades...');
    for (const unit of unitsData) {
      await createCollectionType('units', unit);
    }

    // 4. Criar Benefícios (Collection Type)
    console.log('\n🎁 Criando Benefícios...');
    for (const benefit of benefitsData) {
      await createCollectionType('benefits', benefit);
    }

    // 5. Criar Modalidades (Collection Type)
    console.log('\n🏋️ Criando Modalidades...');
    for (const modality of modalitiesData) {
      await createCollectionType('modalities', modality);
    }

    // 6. Criar Página de Contato
    console.log('\n📞 Criando Página de Contato...');
    try {
      await createOrUpdateSingleType('contact-page', contactPageData);
    } catch (error) {
      console.error('⚠️  Erro ao criar contact-page, mas continuando...');
    }

    // 7. Criar Página Day Use
    console.log('\n🎫 Criando Página Day Use...');
    try {
      await createOrUpdateSingleType('day-use-page', dayUsePageData);
    } catch (error) {
      console.error('⚠️  Erro ao criar day-use-page, mas continuando...');
    }

    // 8. Criar Página Sobre Nós
    console.log('\n📖 Criando Página Sobre Nós...');
    try {
      await createOrUpdateSingleType('about-page', aboutPageData);
    } catch (error) {
      console.error('⚠️  Erro ao criar about-page, mas continuando...');
    }

    // 9. Criar Página Trabalhe Conosco
    console.log('\n💼 Criando Página Trabalhe Conosco...');
    try {
      await createOrUpdateSingleType('trabalhe-conosco-page', trabalheConoscoPageData);
    } catch (error) {
      console.error('⚠️  Erro ao criar trabalhe-conosco-page, mas continuando...');
    }

    // 10. Criar Configurações Globais
    console.log('\n⚙️  Criando Configurações Globais...');
    try {
      await createOrUpdateSingleType('global-setting', globalSettingsData);
    } catch (error) {
      console.error('⚠️  Erro ao criar global-setting, mas continuando...');
    }

    console.log('\n✅ Seed concluído!');
    console.log('\n📋 Próximos passos:');
    console.log('   1. Acesse o Strapi Admin: http://localhost:1337/admin');
    console.log('   2. Publique os conteúdos criados');
    console.log('   3. Adicione imagens aos conteúdos');
    console.log('   4. Configure chaves de API do Pacto nas unidades (codigoUnidade, chavePublica)');
    console.log('   5. Teste a API: curl http://localhost:1337/api/homepage');
    console.log('\n⚠️  IMPORTANTE:');
    console.log('   - Planos dinâmicos vêm da API do Pacto (não são gerenciados no Strapi)');
    console.log('   - Configure as chaves de API do Pacto nas unidades no Strapi Admin');
    console.log('   - Dados de vendas, cupons e simulações vêm da API do Pacto');
    console.log('   - Veja docs/STRAPI-API-INTEGRATION.md para mais detalhes');
  } catch (error) {
    console.error('\n❌ Erro durante o seed:', error);
    process.exit(1);
  }
}

// Executar seed
seed();


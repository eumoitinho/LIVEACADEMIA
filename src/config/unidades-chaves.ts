/**
 * Configuração de chaves por unidade
 * Mapeamento das chaves da Pacto para cada unidade da Live Academia
 */

export interface UnidadeConfig {
  id: string
  nome: string
  chaveSecret: string
  chavePublic: string
  codigoUnidade: number
}

/**
 * Mapeamento de chaves por unidade
 * Baseado nas chaves fornecidas pelo usuário
 */
export const UNIDADES_CHAVES: Record<string, UnidadeConfig> = {
  // Unidades Tradicionais
  'torres': {
    id: 'torres',
    nome: 'Torres',
    chaveSecret: 'PACTO_SECRET_KEY_TORRES',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_TORRES',
    codigoUnidade: 1
  },
  'vieiralves': {
    id: 'vieiralves',
    nome: 'Vieiralves',
    chaveSecret: 'PACTO_SECRET_KEY_VIEIRALVES',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_VIEIRALVES',
    codigoUnidade: 2
  },
  'torquato-santos-dumont': {
    id: 'torquato-santos-dumont',
    nome: 'Torquato Santos Dumont',
    chaveSecret: 'PACTO_SECRET_KEY_SANTOS_DUMONT',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_SANTOS_DUMONT',
    codigoUnidade: 3
  },
  'v8': {
    id: 'v8',
    nome: 'V8',
    chaveSecret: 'PACTO_SECRET_KEY_V8',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_V8',
    codigoUnidade: 4
  },
  'franceses': {
    id: 'franceses',
    nome: 'Franceses',
    chaveSecret: 'PACTO_SECRET_KEY_FRANCESES',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_FRANCESES',
    codigoUnidade: 5
  },
  'dom-pedro': {
    id: 'dom-pedro',
    nome: 'Dom Pedro',
    chaveSecret: 'PACTO_SECRET_KEY_DOM_PEDRO',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_DOM_PEDRO',
    codigoUnidade: 6
  },
  'compensa': {
    id: 'compensa',
    nome: 'Compensa',
    chaveSecret: 'PACTO_SECRET_KEY_COMPENSA',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_COMPENSA',
    codigoUnidade: 7
  },
  'tiradentes': {
    id: 'tiradentes',
    nome: 'Tiradentes Climatizada',
    chaveSecret: 'PACTO_SECRET_KEY_TIRADENTES',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_TIRADENTES',
    codigoUnidade: 8
  },
  'japiim': {
    id: 'japiim',
    nome: 'Japiim',
    chaveSecret: 'PACTO_SECRET_KEY_JAPIIM',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_JAPIIM',
    codigoUnidade: 9
  },
  'ct-cidade-nova': {
    id: 'ct-cidade-nova',
    nome: 'CT Cidade Nova',
    chaveSecret: 'PACTO_SECRET_KEY_CIDADE_NOVA',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_CIDADE_NOVA',
    codigoUnidade: 10
  },
  'margarita-diamante': {
    id: 'margarita-diamante',
    nome: 'Margarita Diamante',
    chaveSecret: 'PACTO_SECRET_KEY_MARGARITA',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_MARGARITA',
    codigoUnidade: 11
  },
  'torquato-bemol': {
    id: 'torquato-bemol',
    nome: 'Torquato Bemol Climatizada',
    chaveSecret: 'PACTO_SECRET_KEY_BEMOL',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_BEMOL',
    codigoUnidade: 12
  },
  'centro': {
    id: 'centro',
    nome: 'Centro',
    chaveSecret: 'PACTO_SECRET_KEY_CENTRO',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_CENTRO',
    codigoUnidade: 13
  },
  'cachoeirinha': {
    id: 'cachoeirinha',
    nome: 'Cachoeirinha',
    chaveSecret: 'PACTO_SECRET_KEY_CACHOEIRINHA',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_CACHOEIRINHA',
    codigoUnidade: 14
  },
  'sumauma': {
    id: 'sumauma',
    nome: 'Sumaúma',
    chaveSecret: 'PACTO_SECRET_KEY_SUMAUMA',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_SUMAUMA',
    codigoUnidade: 15
  },
  'laranjeiras': {
    id: 'laranjeiras',
    nome: 'Laranjeiras',
    chaveSecret: 'PACTO_SECRET_KEY_LARANJEIRAS',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_LARANJEIRAS',
    codigoUnidade: 16
  },
  'torquato-allegro': {
    id: 'torquato-allegro',
    nome: 'Torquato Allegro',
    chaveSecret: 'PACTO_SECRET_KEY_ALLEGRO',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_ALLEGRO',
    codigoUnidade: 17
  },
  'chapeu-goiano': {
    id: 'chapeu-goiano',
    nome: 'Chapéu Goiano',
    chaveSecret: 'PACTO_SECRET_KEY_GOIANO',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_GOIANO',
    codigoUnidade: 18
  },
  'jacira': {
    id: 'jacira',
    nome: 'Jacira',
    chaveSecret: 'PACTO_SECRET_KEY_JACIRA',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_JACIRA',
    codigoUnidade: 19
  },
  'adrianopolis': {
    id: 'adrianopolis',
    nome: 'Adrianópolis',
    chaveSecret: 'PACTO_SECRET_KEY_ADRIANOPOLIS',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_ADRIANOPOLIS',
    codigoUnidade: 20
  },
  'parque-10': {
    id: 'parque-10',
    nome: 'Parque 10',
    chaveSecret: 'PACTO_SECRET_KEY_PARQUE_10',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_PARQUE_10',
    codigoUnidade: 21
  },
  'camapua': {
    id: 'camapua',
    nome: 'Camapuã',
    chaveSecret: 'PACTO_SECRET_KEY_CAMAPUA',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_CAMAPUA',
    codigoUnidade: 22
  },
  'belem': {
    id: 'belem',
    nome: 'Belém',
    chaveSecret: 'PACTO_SECRET_KEY_BELEM',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_BELEM',
    codigoUnidade: 23
  },
  'silves': {
    id: 'silves',
    nome: 'Silves',
    chaveSecret: 'PACTO_SECRET_KEY_SILVES',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_SILVES',
    codigoUnidade: 24
  },
  'morada': {
    id: 'morada',
    nome: 'Morada',
    chaveSecret: 'PACTO_SECRET_KEY_MORADA',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_MORADA',
    codigoUnidade: 25
  },
  'ponta-negra': {
    id: 'ponta-negra',
    nome: 'Ponta Negra',
    chaveSecret: 'PACTO_SECRET_KEY_PONTA_NEGRA',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_PONTA_NEGRA',
    codigoUnidade: 26
  },
  'alphaville': {
    id: 'alphaville',
    nome: 'Alphaville',
    chaveSecret: 'PACTO_SECRET_KEY_ALPHAVILLE',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_ALPHAVILLE',
    codigoUnidade: 27
  },
  'cidade-de-deus': {
    id: 'cidade-de-deus',
    nome: 'Cidade de Deus',
    chaveSecret: 'PACTO_SECRET_KEY_CIDADE_DE_DEUS',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_CIDADE_DE_DEUS',
    codigoUnidade: 28
  },
  'petropolis': {
    id: 'petropolis',
    nome: 'Petrópolis',
    chaveSecret: 'PACTO_SECRET_KEY_PETROPOLIS',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_PETROPOLIS',
    codigoUnidade: 29
  },
  'coroado': {
    id: 'coroado',
    nome: 'Coroado',
    chaveSecret: 'PACTO_SECRET_KEY_COROADO',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_COROADO',
    codigoUnidade: 30
  },
  'planalto-diamante': {
    id: 'planalto-diamante',
    nome: 'Planalto Diamante',
    chaveSecret: 'PACTO_SECRET_KEY_PLANALTO',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_PLANALTO',
    codigoUnidade: 31
  },
  'rodrigues-grande-circular': {
    id: 'rodrigues-grande-circular',
    nome: 'Rodrigues Grande Circular Premium',
    chaveSecret: 'PACTO_SECRET_KEY_RODRIGUES',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_RODRIGUES',
    codigoUnidade: 32
  },
  'flores-diamante': {
    id: 'flores-diamante',
    nome: 'Flores Diamante',
    chaveSecret: 'PACTO_SECRET_KEY_FLORES',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_FLORES',
    codigoUnidade: 33
  },
  'bom-prato-diamante': {
    id: 'bom-prato-diamante',
    nome: 'Bom Prato Diamante',
    chaveSecret: 'PACTO_SECRET_KEY_BOM_PRATO',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_BOM_PRATO',
    codigoUnidade: 34
  },
  'pedro-teixeira-diamante': {
    id: 'pedro-teixeira-diamante',
    nome: 'Pedro Teixeira Diamante',
    chaveSecret: 'PACTO_SECRET_KEY_PEDRO_TEXEIRA',
    chavePublic: 'NEXT_PUBLIC_UNIDADE_PEDRO_TEXEIRA',
    codigoUnidade: 35
  }
}

/**
 * Buscar configuração de uma unidade por slug
 */
export function getUnidadeConfig(slug: string): UnidadeConfig | null {
  return UNIDADES_CHAVES[slug] || null
}

/**
 * Buscar configuração de uma unidade por ID
 */
export function getUnidadeConfigById(id: string): UnidadeConfig | null {
  return Object.values(UNIDADES_CHAVES).find(u => u.id === id) || null
}

/**
 * Listar todas as unidades configuradas
 */
export function getAllUnidadesConfig(): UnidadeConfig[] {
  return Object.values(UNIDADES_CHAVES)
}

/**
 * Buscar chave secreta de uma unidade
 */
export function getChaveSecret(slug: string): string | null {
  const config = getUnidadeConfig(slug)
  return config ? config.chaveSecret : null
}

/**
 * Buscar chave pública de uma unidade
 */
export function getChavePublic(slug: string): string | null {
  const config = getUnidadeConfig(slug)
  return config ? config.chavePublic : null
}

/**
 * Buscar código da unidade
 */
export function getCodigoUnidade(slug: string): number | null {
  const config = getUnidadeConfig(slug)
  return config ? config.codigoUnidade : null
}
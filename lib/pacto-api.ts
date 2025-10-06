/**
 * Integração com API Pacto Soluções
 * Implementa o checkout transparente para Live Academia
 *
 * ENDPOINTS CORRETOS (baseado na documentação oficial):
 * - GET /negociacao/planos/{incluirBolsa}/{planoForcar}?codigoCliente={codigo}
 * - GET /negociacao/dados-plano/{codigo_plano}/{situacao_contrato}/{contrato_baseado}
 * - POST /negociacao/simular
 * - POST /negociacao/gravar
 * - POST /v2/cliente
 * - GET /parcelas/{codigoPessoa}
 *
 * AUTENTICAÇÃO:
 * - Authorization: Bearer {API_KEY}
 * - empresaId: {EMPRESA_ID} (header obrigatório)
 */

import {
  PlanoSchema,
  SimulacaoSchema,
  VendaResultadoSchema,
  CupomSchema,
  safeParse,
  type Plano,
  type Simulacao,
  type VendaResultado,
  type Cupom,
} from './pacto-schemas'

const PACTO_BASE_URL = process.env.PACTO_API_URL || 'https://apigw.pactosolucoes.com.br'

if (typeof window !== 'undefined') {
  console.warn('[PactoAPI] Atenção: pacto-api.ts foi importado no client. Use apenas no servidor.')
}

export interface CustomerData {
  nome: string
  email: string
  telefone: string
  cpf: string
  endereco?: string
  dataNascimento?: string
  sexo?: string
}

export interface CardData {
  numeroCartao: string
  nomeCartao: string
  validadeCartao: string
  cvvCartao: string
}

export interface SaleData {
  unidadeId: string
  planoId: string
  planoNome: string
  valor: string | number
  customer: CustomerData
  paymentMethod: 'cartao' | 'pix' | 'boleto'
  cardData?: CardData
  cupom?: string
}

export interface PactoResponse {
  success: boolean
  data?: any
  error?: string
  transactionId?: string
  pixCode?: string
  boletoUrl?: string
}

class PactoAPI {
  private baseURL: string

  constructor() { this.baseURL = PACTO_BASE_URL }

  /**
   * Requisição com timeout / retry básico
   */
  private async request(input: string, init: RequestInit & { timeoutMs?: number; retries?: number } = {}) {
    const { timeoutMs = 15000, retries = 1, ...rest } = init
    for (let attempt = 0; attempt <= retries; attempt++) {
      const controller = new AbortController()
      const id = setTimeout(() => controller.abort(), timeoutMs)
      try {
        const resp = await fetch(input, { ...rest, signal: controller.signal })
        clearTimeout(id)
        return resp
      } catch (err) {
        clearTimeout(id)
        const isLast = attempt === retries
        if (isLast || (err instanceof Error && err.name !== 'AbortError')) {
          throw err
        }
      }
    }
    throw new Error('Request falhou')
  }

  /**
   * Busca os planos disponíveis para negociação
   * GET /negociacao/planos/{incluirBolsa}/{planoForcar}?codigoCliente={codigo}
   *
   * @param apiKey - Chave API da unidade (Bearer token)
   * @param empresaId - ID da empresa/unidade
   * @param codigoCliente - Código do cliente (opcional, use 0 para listar todos)
   */
  async getPlanosNegociacao(apiKey: string, empresaId: string, codigoCliente: number = 0): Promise<Plano[]> {
    try {
      const incluirBolsa = true
      const planoForcar = 0
      const url = `${this.baseURL}/negociacao/planos/${incluirBolsa}/${planoForcar}${codigoCliente ? `?codigoCliente=${codigoCliente}` : ''}`

      console.log(`[PactoAPI] getPlanosNegociacao: URL=${url}, empresaId=${empresaId.substring(0,10)}...`)

      const response = await this.request(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'empresaId': empresaId,
        },
        timeoutMs: 10000,
      })

      console.log(`[PactoAPI] getPlanosNegociacao response: status=${response.status}`)

      if (!response.ok) {
        const errorBody = await response.text()
        console.error(`[PactoAPI] getPlanosNegociacao failed: ${response.status} - ${errorBody}`)
        throw new Error(`Erro ao buscar planos: ${response.status}`)
      }

      const json = await response.json()
      const data = json.content || json

      if (!Array.isArray(data)) {
        console.warn('[PactoAPI] getPlanosNegociacao: response is not an array', json)
        return []
      }

      // Adaptar formato da resposta para o schema PlanoSchema
      return data.map((p: any) => ({
        codigo: String(p.codigo),
        nome: p.descricao || p.nome || '',
        valor: 0, // Valor será obtido em dados-plano
        categoria: '',
        recorrencia: '',
      }))
    } catch (error) {
      console.error('Erro ao buscar planos:', error)
      return []
    }
  }

  /**
   * Busca dados detalhados de um plano para negociação
   * GET /negociacao/dados-plano/{codigo_plano}/{situacao_contrato}/{contrato_baseado}
   *
   * @param apiKey - Chave API da unidade
   * @param empresaId - ID da empresa/unidade
   * @param codigoPlano - Código do plano
   * @param situacaoContrato - Situação do contrato (MA=Matrícula, RE=Rematrícula, RN=Renovação)
   */
  async getDadosPlano(apiKey: string, empresaId: string, codigoPlano: string | number, situacaoContrato: string = 'MA'): Promise<any> {
    try {
      const contratoBaseado = 0
      const url = `${this.baseURL}/negociacao/dados-plano/${codigoPlano}/${situacaoContrato}/${contratoBaseado}`

      console.log(`[PactoAPI] getDadosPlano: URL=${url}`)

      const response = await this.request(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'empresaId': empresaId,
        },
        timeoutMs: 10000,
      })

      console.log(`[PactoAPI] getDadosPlano response: status=${response.status}`)

      if (!response.ok) {
        const errorBody = await response.text()
        console.error(`[PactoAPI] getDadosPlano failed: ${response.status} - ${errorBody}`)
        throw new Error(`Erro ao buscar dados do plano: ${response.status}`)
      }

      const data = await response.json()
      return data.content || data
    } catch (error) {
      console.error('Erro ao buscar dados do plano:', error)
      return null
    }
  }

  /**
   * Simula uma venda/negociação
   * POST /negociacao/simular
   *
   * IMPORTANTE: Este endpoint requer um payload complexo baseado na documentação
   */
  async simularVenda(apiKey: string, empresaId: string, payload: any): Promise<Simulacao | null> {
    try {
      const url = `${this.baseURL}/negociacao/simular`

      console.log(`[PactoAPI] simularVenda: URL=${url}, payload=`, JSON.stringify(payload))

      const response = await this.request(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'empresaId': empresaId,
        },
        body: JSON.stringify(payload),
        timeoutMs: 15000,
      })

      console.log(`[PactoAPI] simularVenda response: status=${response.status}`)

      if (!response.ok) {
        const errorBody = await response.text()
        console.error(`[PactoAPI] simularVenda failed: ${response.status} - ${errorBody}`)
        throw new Error(`Erro na simulação: ${response.status}`)
      }

      const json = await response.json()
      const data = json.content || json

      console.log(`[PactoAPI] simularVenda result:`, JSON.stringify(data).substring(0, 200))

      // Adaptar resposta para o SimulacaoSchema
      return {
        valorTotal: data.valorFinal || data.valorBase || 0,
        parcelas: data.parcelas?.map((p: any) => ({
          numero: p.nrParcela,
          valor: p.valorParcela,
          vencimento: p.dataVencimento || '',
        })) || [],
      }
    } catch (error) {
      console.error('Erro na simulação:', error)
      return null
    }
  }

  /**
   * Finaliza uma venda/negociação
   * POST /negociacao/gravar
   *
   * Retorna o código do contrato criado e link de pagamento
   */
  async gravarVenda(apiKey: string, empresaId: string, payload: any): Promise<VendaResultado> {
    try {
      const url = `${this.baseURL}/negociacao/gravar`

      console.log(`[PactoAPI] gravarVenda: URL=${url}`)

      const response = await this.request(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'empresaId': empresaId,
        },
        body: JSON.stringify(payload),
        timeoutMs: 20000,
        retries: 1,
      })

      console.log(`[PactoAPI] gravarVenda response: status=${response.status}`)

      if (!response.ok) {
        const errorBody = await response.text()
        console.error(`[PactoAPI] gravarVenda failed: ${response.status} - ${errorBody}`)
        throw new Error(`Erro ao gravar venda: ${response.status}`)
      }

      const json = await response.json()
      const data = json.content || json

      // Adaptar resposta
      return {
        status: 'pendente',
        matricula_id: String(data.contrato || ''),
        transacao_id: data.link || '',
        link_pagamento: data.link,
        whatsapp_link: data.whatsapp,
      }
    } catch (error) {
      console.error('Erro ao gravar venda:', error)
      throw error
    }
  }

  /**
   * Valida cupom de desconto
   * NOTA: Endpoint não documentado, mantido para compatibilidade
   */
  async validarCupomDesconto(apiKey: string, empresaId: string, cupom: string, unidadeId: string): Promise<Cupom | null> {
    try {
      const response = await this.request(`${this.baseURL}/cupom/validar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'empresaId': empresaId,
        },
        body: JSON.stringify({ cupom, unidade: unidadeId }),
      })

      if (!response.ok) throw new Error(`Erro ao validar cupom: ${response.status}`)

      const data = await response.json()
      return safeParse(CupomSchema, data, 'Cupom')
    } catch (error) {
      console.error('Erro ao validar cupom:', error)
      return null
    }
  }
}

// Mapeamento de IDs das unidades (slugs) para códigos da empresa
export const UNIDADE_ID_MAP: Record<string, string> = {
  'adrianopolis': '1',
  'allegro': '2',
  'bom-prato': '3',
  'cachoeirinha': '4',
  'camapua': '5',
  'centro': '6',
  'chapeu-goiano': '7',
  'cidade-de-deus': '8',
  'cidade-nova': '9',
  'compensa': '10',
  'coroado': '11',
  'dom-pedro': '12',
  'flores': '13',
  'japiim': '14',
  'margarita': '15',
  'petropolis': '16',
  'pedro-teixeira': '17',
  'planalto': '18',
  'rodrigues': '19',
  'silves': '20',
  'sumauma': '21',
  'tiradentes': '22',
  'torquato': '23',
  'torres': '24',
  'vieiralves': '25',
}

// Instância única da API
export const pactoAPI = new PactoAPI()

// Funções auxiliares
export const getCodigoUnidade = (unidadeId: string): string => {
  return UNIDADE_ID_MAP[unidadeId] || '1'
}

export const processCheckout = async (
  apiKey: string,
  empresaId: string,
  paymentMethod: 'cartao' | 'pix' | 'boleto',
  saleData: SaleData
): Promise<PactoResponse> => {
  try {
    // TODO: Implementar criação do payload de negociação
    // Requer cliente cadastrado, plano selecionado, modalidades, produtos, etc.
    throw new Error('processCheckout não implementado - use gravarVenda diretamente')
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}

export type { Plano, Simulacao, VendaResultado, Cupom }

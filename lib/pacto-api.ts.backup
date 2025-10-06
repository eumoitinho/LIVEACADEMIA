/**
 * Integração com API Pacto Soluções (V3 /psec)
 * Implementa o checkout transparente para Live Academia
 *
 * NOTA:
 *  - Este módulo deve ser utilizado apenas em contexto server-side (Route Handler, Server Action ou API Route)
 *  - Cada unidade possui `chave_api` (privada) e `chave_publica`; ambas são necessárias para autenticação/escopo.
 *  - Caso seja necessário expor operações ao cliente, criar um endpoint interno que chama estas funções.
 */

import {
  TokenResponseSchema,
  UnidadeSchema,
  PlanoSchema,
  SimulacaoSchema,
  VendaResultadoSchema,
  CupomSchema,
  safeParse,
  type Unidade,
  type Plano,
  type Simulacao,
  type VendaResultado,
  type TokenResponse,
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
  /** cache de tokens por par (redeKey|publicKey) */
  private tokenCache: Map<string, { token: string; expiresAt: number }> = new Map()

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
   * Autentica na API Pacto
   * Nota: A "redeKey" na verdade é a API_KEY que vai diretamente no header Authorization
   * A "publicKey" é o empresaId que vai no header empresaId
   */
  private async authenticate(redeKey: string, publicKey: string): Promise<string> {
    if (!redeKey) throw new Error('redeKey ausente (chave_api da unidade)')
    if (!publicKey) throw new Error('publicKey ausente (empresaId da unidade)')

    // A redeKey É o token Bearer direto (não precisa obter de /token)
    // A API Pacto usa a chave diretamente como Bearer token
    console.log(`[PactoAPI] Using direct auth: apiKey=${redeKey.substring(0,10)}..., empresaId=${publicKey.substring(0,10)}...`)

    return redeKey // A chave já é o token!
  }

  /**
   * Busca as unidades disponíveis
   */
  async getUnidades(redeKey: string, publicKey: string): Promise<Unidade[]> {
    try {
      const token = await this.authenticate(redeKey, publicKey)
      const response = await this.request(`${this.baseURL}/psec/vendas/unidades`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'empresaId': publicKey,
        },
        timeoutMs: 10000,
      })
      if (!response.ok) throw new Error(`Erro ao buscar unidades: ${response.status}`)
      const data = await response.json()
      if (!Array.isArray(data)) return []
      return data.map((u) => safeParse(UnidadeSchema, u, 'Unidade'))
    } catch (error) {
      console.error('Erro ao buscar unidades:', error)
      return []
    }
  }

  /**
   * Busca os planos de uma unidade específica
   */
  async getPlanosUnidade(redeKey: string, publicKey: string, codigoUnidade: string): Promise<Plano[]> {
    try {
      const token = await this.authenticate(redeKey, publicKey)
      // Supõe-se que V3 permita filtro por unidade via query (?unidade=)
      const url = `${this.baseURL}/psec/vendas/planos?unidade=${encodeURIComponent(codigoUnidade)}`
      const response = await this.request(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'empresaId': publicKey,
        },
        timeoutMs: 10000,
      })
      if (!response.ok) throw new Error(`Erro ao buscar planos: ${response.status}`)
      const data = await response.json()
      if (!Array.isArray(data)) return []
      return data.map((p) => safeParse(PlanoSchema, p, 'Plano'))
    } catch (error) {
      console.error('Erro ao buscar planos:', error)
      return []
    }
  }

  /**
   * Simula uma venda para calcular valores
   */
  async simularVenda(redeKey: string, publicKey: string, planoId: string, payload: { unidade: string; valor?: number; cupom?: string; paymentMethod?: string }): Promise<Simulacao | null> {
    try {
      const token = await this.authenticate(redeKey, publicKey)
      const url = `${this.baseURL}/psec/vendas/simularVenda/${planoId}`
      console.log(`[PactoAPI] simularVenda: URL=${url}, planoId=${planoId}, payload=`, JSON.stringify(payload))
      console.log(`[PactoAPI] simularVenda: Using token=${token.substring(0,20)}..., empresaId=${publicKey.substring(0,10)}...`)
      const response = await this.request(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'empresaId': publicKey,
        },
        body: JSON.stringify(payload),
      })
      console.log(`[PactoAPI] simularVenda response: status=${response.status}, ok=${response.ok}`)
      if (!response.ok) {
        const errorBody = await response.text()
        console.error(`[PactoAPI] simularVenda failed: ${response.status} - ${errorBody}`)
        throw new Error(`Erro na simulação: ${response.status}`)
      }
      const data = await response.json()
      return safeParse(SimulacaoSchema, data, 'Simulacao')
    } catch (error) {
      console.error('Erro na simulação:', error)
      return null
    }
  }

  /**
   * Processa venda via cartão de crédito
   */
  private buildVendaPayload(saleData: SaleData) {
    const valorNumber = typeof saleData.valor === 'string' ? parseFloat(saleData.valor.replace(',', '.')) : saleData.valor
    const base: any = {
      unidade: saleData.unidadeId,
      plano: saleData.planoId,
      cliente: {
        nome: saleData.customer.nome,
        email: saleData.customer.email,
        telefone: saleData.customer.telefone,
        cpf: saleData.customer.cpf.replace(/\D/g, ''),
        endereco: saleData.customer.endereco || '',
      },
      valor: valorNumber,
      pagamento: {
        tipo: saleData.paymentMethod,
      },
    }
    if (saleData.cupom) base.cupom = saleData.cupom
    if (saleData.paymentMethod === 'cartao' && saleData.cardData) {
      base.pagamento.cartao = {
        numero: saleData.cardData.numeroCartao.replace(/\D/g, ''),
        nome: saleData.cardData.nomeCartao,
        validade: saleData.cardData.validadeCartao,
        cvv: saleData.cardData.cvvCartao,
      }
    }
    return base
  }

  private async cadastrarVenda(redeKey: string, publicKey: string, payload: any): Promise<VendaResultado> {
    const token = await this.authenticate(redeKey, publicKey)
    const response = await this.request(`${this.baseURL}/psec/vendas/cadastrarVenda`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'empresaId': publicKey,
      },
      body: JSON.stringify(payload),
      timeoutMs: 20000,
      retries: 1,
    })
    if (!response.ok) throw new Error(`Erro ao cadastrar venda: ${response.status}`)
    const data = await response.json()
    return safeParse(VendaResultadoSchema, data, 'VendaResultado')
  }

  async vendaCartao(redeKey: string, publicKey: string, _captcha: string, saleData: SaleData): Promise<PactoResponse> {
    try {
      const payload = this.buildVendaPayload({ ...saleData, paymentMethod: 'cartao' })
      const result = await this.cadastrarVenda(redeKey, publicKey, payload)
      return { success: true, data: result, transactionId: result.transacao_id }
    } catch (error) {
      console.error('Erro no pagamento via cartão:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' }
    }
  }

  /**
   * Processa venda via PIX
   */
  async vendaPix(redeKey: string, publicKey: string, _captcha: string, saleData: SaleData): Promise<PactoResponse> {
    try {
      const payload = this.buildVendaPayload({ ...saleData, paymentMethod: 'pix' })
      const result = await this.cadastrarVenda(redeKey, publicKey, payload)
      return { success: true, data: result, pixCode: result.pix?.codigo, transactionId: result.transacao_id }
    } catch (error) {
      console.error('Erro no pagamento via PIX:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' }
    }
  }

  /**
   * Processa venda via Boleto
   */
  async vendaBoleto(redeKey: string, publicKey: string, _captcha: string, saleData: SaleData): Promise<PactoResponse> {
    try {
      const payload = this.buildVendaPayload({ ...saleData, paymentMethod: 'boleto' })
      const result = await this.cadastrarVenda(redeKey, publicKey, payload)
      return { success: true, data: result, boletoUrl: result.boleto?.pdf_url, transactionId: result.transacao_id }
    } catch (error) {
      console.error('Erro no pagamento via boleto:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' }
    }
  }

  /**
   * Valida cupom de desconto
   */
  async validarCupomDesconto(redeKey: string, publicKey: string, cupom: string, unidadeId: string): Promise<Cupom | null> {
    try {
      const token = await this.authenticate(redeKey, publicKey)
      const response = await this.request(`${this.baseURL}/psec/vendas/validarCupomDesconto`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'empresaId': publicKey,
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

// Mapeamento de IDs das unidades do JSON para códigos da API Pacto
export const UNIDADE_ID_MAP: Record<string, string> = {
  'bom-prato-diamante': 'BPD001',
  'ct-cidade-nova': 'CCN002',
  'cachoeirinha': 'CAC003',
  'camapua': 'CAM005',
  'centro': 'CEN007',
  'chapeu-goiano': 'CHG008',
  'cidade-de-deus': 'CDD009',
  'compensa': 'COM010',
  'dom-pedro': 'DPE011',
  'flores-diamante': 'FLD012',
  'japiim': 'JAP013',
  'margarita-diamante': 'MAD014',
  'pedro-teixeira-diamante': 'PTD016',
  'planalto-diamante': 'PLD017',
  'rodrigues-grande-circular': 'RGC018',
  'silves': 'SIL019',
  'sumauma': 'SUM020',
  'tiradentes': 'TIR021',
  'torquato-allegro': 'TAL022',
  'torquato-bemol': 'TBE023',
  'torquato-santos-dumont': 'TSD024',
  'torquato-santos-dumont-diamante': 'TSDD025',
  'torres': 'TOR026',
  'torres-diamante': 'TORD027',
  'vieiralves-diamante': 'VID029',
  'vitoria-coroado': 'VCP030',
}

// Instância única da API
export const pactoAPI = new PactoAPI()

// Funções auxiliares
export const getCodigoUnidade = (unidadeId: string): string => {
  return UNIDADE_ID_MAP[unidadeId] || unidadeId
}

export const processCheckout = async (
  redeKey: string,
  publicKey: string,
  paymentMethod: 'cartao' | 'pix' | 'boleto',
  saleData: SaleData
): Promise<PactoResponse> => {
  switch (paymentMethod) {
    case 'cartao':
      return await pactoAPI.vendaCartao(redeKey, publicKey, '', saleData)
    case 'pix':
      return await pactoAPI.vendaPix(redeKey, publicKey, '', saleData)
    case 'boleto':
      return await pactoAPI.vendaBoleto(redeKey, publicKey, '', saleData)
    default:
      return { success: false, error: 'Método de pagamento inválido' }
  }
}

export type { Unidade, Plano, Simulacao, VendaResultado, Cupom, TokenResponse }


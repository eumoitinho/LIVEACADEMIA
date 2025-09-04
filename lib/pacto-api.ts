/**
 * Integração com API Pacto Soluções
 * Implementa o checkout transparente para Live Academia
 */

const PACTO_BASE_URL = process.env.NEXT_PUBLIC_PACTO_API_URL || 'https://api-docs.pactosolucoes.com.br'
const PACTO_SECRET_KEY = process.env.NEXT_PUBLIC_PACTO_SECRET_KEY

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
  valor: string
  customer: CustomerData
  paymentMethod: 'cartao' | 'pix' | 'boleto'
  cardData?: CardData
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
  private token: string | null = null
  private baseURL: string

  constructor() {
    this.baseURL = PACTO_BASE_URL
  }

  /**
   * Autentica na API Pacto Soluções
   */
  async authenticate(): Promise<boolean> {
    try {
      if (!PACTO_SECRET_KEY) {
        throw new Error('Secret key não configurada')
      }

      const response = await fetch(`${this.baseURL}/v2/vendas/tkn/${PACTO_SECRET_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Erro na autenticação: ${response.status}`)
      }

      const data = await response.json()
      this.token = data.token
      return true
    } catch (error) {
      console.error('Erro na autenticação:', error)
      return false
    }
  }

  /**
   * Busca as unidades disponíveis
   */
  async getUnidades(): Promise<any[]> {
    try {
      if (!this.token) {
        await this.authenticate()
      }

      const response = await fetch(`${this.baseURL}/v2/vendas/unidades`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Erro ao buscar unidades: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro ao buscar unidades:', error)
      return []
    }
  }

  /**
   * Busca os planos de uma unidade específica
   */
  async getPlanosUnidade(codigoUnidade: string): Promise<any[]> {
    try {
      if (!this.token) {
        await this.authenticate()
      }

      const response = await fetch(`${this.baseURL}/v2/vendas/planos/${codigoUnidade}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Erro ao buscar planos: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro ao buscar planos:', error)
      return []
    }
  }

  /**
   * Simula uma venda para calcular valores
   */
  async simularVenda(unidadeId: string, dadosVenda: any): Promise<any> {
    try {
      if (!this.token) {
        await this.authenticate()
      }

      const response = await fetch(`${this.baseURL}/v2/vendas/simularV2/${unidadeId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosVenda),
      })

      if (!response.ok) {
        throw new Error(`Erro na simulação: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro na simulação:', error)
      return null
    }
  }

  /**
   * Processa venda via cartão de crédito
   */
  async vendaCartao(captcha: string, saleData: SaleData): Promise<PactoResponse> {
    try {
      if (!this.token) {
        await this.authenticate()
      }

      const payload = {
        unidade: saleData.unidadeId,
        plano: saleData.planoId,
        cliente: {
          nome: saleData.customer.nome,
          email: saleData.customer.email,
          telefone: saleData.customer.telefone,
          cpf: saleData.customer.cpf.replace(/\D/g, ''),
          endereco: saleData.customer.endereco || '',
        },
        cartao: {
          numero: saleData.cardData?.numeroCartao?.replace(/\D/g, ''),
          nome: saleData.cardData?.nomeCartao,
          validade: saleData.cardData?.validadeCartao,
          cvv: saleData.cardData?.cvvCartao,
        },
        valor: parseFloat(saleData.valor.replace(',', '.')),
      }

      const response = await fetch(`${this.baseURL}/v2/vendas/alunovendaonline/${captcha}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Erro no pagamento: ${response.status}`)
      }

      const data = await response.json()
      return {
        success: true,
        data,
        transactionId: data.transactionId || data.id,
      }
    } catch (error) {
      console.error('Erro no pagamento via cartão:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      }
    }
  }

  /**
   * Processa venda via PIX
   */
  async vendaPix(captcha: string, saleData: SaleData): Promise<PactoResponse> {
    try {
      if (!this.token) {
        await this.authenticate()
      }

      const payload = {
        unidade: saleData.unidadeId,
        plano: saleData.planoId,
        cliente: {
          nome: saleData.customer.nome,
          email: saleData.customer.email,
          telefone: saleData.customer.telefone,
          cpf: saleData.customer.cpf.replace(/\D/g, ''),
          endereco: saleData.customer.endereco || '',
        },
        valor: parseFloat(saleData.valor.replace(',', '.')),
      }

      const response = await fetch(`${this.baseURL}/v2/vendas/alunovendaonlinepix/${captcha}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Erro no pagamento PIX: ${response.status}`)
      }

      const data = await response.json()
      return {
        success: true,
        data,
        pixCode: data.pixCode || data.codigoPix,
        transactionId: data.transactionId || data.id,
      }
    } catch (error) {
      console.error('Erro no pagamento via PIX:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      }
    }
  }

  /**
   * Processa venda via Boleto
   */
  async vendaBoleto(captcha: string, saleData: SaleData): Promise<PactoResponse> {
    try {
      if (!this.token) {
        await this.authenticate()
      }

      const payload = {
        unidade: saleData.unidadeId,
        plano: saleData.planoId,
        cliente: {
          nome: saleData.customer.nome,
          email: saleData.customer.email,
          telefone: saleData.customer.telefone,
          cpf: saleData.customer.cpf.replace(/\D/g, ''),
          endereco: saleData.customer.endereco || '',
        },
        valor: parseFloat(saleData.valor.replace(',', '.')),
      }

      const response = await fetch(`${this.baseURL}/v2/vendas/alunovendaonlineboleto/${captcha}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Erro no pagamento boleto: ${response.status}`)
      }

      const data = await response.json()
      return {
        success: true,
        data,
        boletoUrl: data.boletoUrl || data.linkBoleto,
        transactionId: data.transactionId || data.id,
      }
    } catch (error) {
      console.error('Erro no pagamento via boleto:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      }
    }
  }

  /**
   * Valida cupom de desconto
   */
  async validarCupomDesconto(cupom: string, unidadeId: string): Promise<any> {
    try {
      if (!this.token) {
        await this.authenticate()
      }

      const response = await fetch(`${this.baseURL}/psec/vendas/validarCupomDesconto`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cupom,
          unidade: unidadeId,
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro ao validar cupom: ${response.status}`)
      }

      const data = await response.json()
      return data
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
  paymentMethod: 'cartao' | 'pix' | 'boleto',
  saleData: SaleData
): Promise<PactoResponse> => {
  // Gerar captcha temporário (em produção, deve ser obtido de um serviço)
  const captcha = 'temp_captcha_' + Date.now()
  
  switch (paymentMethod) {
    case 'cartao':
      return await pactoAPI.vendaCartao(captcha, saleData)
    case 'pix':
      return await pactoAPI.vendaPix(captcha, saleData)
    case 'boleto':
      return await pactoAPI.vendaBoleto(captcha, saleData)
    default:
      return { success: false, error: 'Método de pagamento inválido' }
  }
}
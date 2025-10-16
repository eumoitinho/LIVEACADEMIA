import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { NextRequest } from 'next/server'
import { tokenizeCard, detokenizeCard, EncryptedCardData } from '@/src/lib/utils/card-tokenization'
import {
  PactoVendaDTO,
  PactoVendaSimplificada,
  PactoVendaAprovadaResponse,
  PactoVendaProcessadaResponse,
  PactoVendaCupomResponse,
  PactoTermoAceiteResponse,
  PactoRegistroAcessoResponse,
  PactoDadosAcesso,
  convertToPactoVendaDTO
} from './pacto-v2-interfaces'

// ============================================
// TIPOS BASEADOS NA DOCUMENTAÇÃO V2 DA PACTO
// ============================================

export interface PactoTokenResponse {
  token: string
}

export interface PactoUnidade {
  codigo: number
  nome: string
  endereco: string
  cidade: string
  estado: string
  telefone: string
  email: string
  status: string
}

export interface PactoPlano {
  codigo: number
  nome: string
  mensalidade: number
  primeiraParcela: number
  adesao: number
  fidelidade: number
  parcelamentoOperadora: boolean
  maxDivisao: number
  descricaoEncantamento?: string
  mesAnuidade: string
  nrVezesParcelarMatricula: number
  anuidade: number
  horario: string
  quantidadeDeDiasDuracaoPlano: number
  quantidadeCompartilhamentos: number
  valorProdutos: number
  valorTotalDoPlano: number
  produtos: string
  inicioMinimo?: string
  modalidades: string[]
  diasVencimento: number[]
  inicioFuturo: boolean
  anuidadeAgora: boolean
  cobrarPrimeiraParcelaCompra: boolean
  qtdCreditoPlanoCredito: number
  regimeRecorrencia: boolean
  renovavelAutomaticamente: boolean
  matricula: number
  renovacao?: string
  rematricula?: string
  parcelasAnuidade: any[]
  categorias: any[]
  apresentarPactoFlow: boolean
  vendaComTurma: boolean
  modalidadesDTO: Array<{
    codigo: number
    modalidade: string
    nrVezesSemana: number
    nrsVezesSemana?: number
    selected: boolean
    utilizarTurma: boolean
  }>
  videoSiteUrl?: string
  observacaoSite?: string
  cobrarProdutoSeparado: boolean
  cobrarAdesaoSeparado: boolean
  permitirCompartilharPLanoNoSite: boolean
  condicaoPagamentoPrePago: boolean
  gerarParcelasValorDiferente: boolean
  produtoTaxaCancelamento: string
  percentualMultaCancelamento: number
}

export interface PactoSimulacao {
  codigo: number
  status: string
  valor: number
  parcelas?: Array<{
    numero: number
    valor: number
    vencimento?: string
  }>
  taxas?: number
  total: number
}

export interface PactoVenda {
  codigo: number
  status: string
  valor: number
  transacao?: string
  pixCode?: string
  boletoUrl?: string
  cartaoAprovado?: boolean
}

export interface PactoCupom {
  codigo: string
  desconto: number
  tipo: 'percentual' | 'fixo'
  valido: boolean
  mensagem?: string
}

export interface PactoCliente {
  nome: string
  cpf: string
  email: string
  telefone: string
  endereco?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  estado?: string
  cep?: string
  dataNascimento?: string
  sexo?: string
  rg?: string
}

export interface PactoCartao {
  numero: string
  nome: string
  validade: string // MM/AA
  cvv: string
  parcelas?: number
}

export interface PactoError {
  statusErro: string
  mensagem: string
  codigo?: number
}

export interface PactoVendaData {
  unidade: number
  plano: number
  cliente: {
    nome: string
    cpf: string
    email: string
    telefone: string
    endereco: string
    cidade: string
    estado: string
    cep: string
  }
  cartao?: {
    numero: string
    nome: string
    validade: string
    cvv: string
    parcelas: number
  }
  termoDeUsoAceito: boolean
  origemSistema: number
  dataUtilizacao: string
  ipPublico: string
}

export interface TokenizedVendaData {
  unidade: number
  plano: number
  cliente: {
    nome: string
    cpf: string
    email: string
    telefone: string
    endereco: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
    cep: string
    dataNascimento: string
    sexo: string
    rg: string
  }
  cartaoToken?: string // Token do cartão em vez dos dados diretos
  termoDeUsoAceito: boolean
  origemSistema: number
  dataUtilizacao: string
  ipPublico: string
}

export interface PactoCupomData {
  unidade: number
  plano: number
  valor: number
  [key: string]: unknown
}

export interface BlacklistItem {
  ip: string
  descricao: string
}

export interface AxiosError {
  response?: {
    data?: unknown
  }
  message: string
}

// ============================================
// CLASSE PRINCIPAL DA API V2
// ============================================

class PactoV2API {
  private client: AxiosInstance
  private tokens: Map<string, { token: string; expiry: number }> = new Map()

  constructor() {
    this.client = axios.create({
      baseURL: 'https://app.pactosolucoes.com.br/api/prest',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Interceptor para adicionar Bearer Token automaticamente
    this.client.interceptors.request.use(async (config) => {
      if (config.url?.includes('/v2/')) {
        const slug = config.headers['x-pacto-unidade'] as string
        if (slug && !this.isTokenValid(slug)) {
          await this.authenticate(slug)
        }
        const tokenData = this.tokens.get(slug)
        if (tokenData?.token) {
          config.headers.Authorization = `Bearer ${tokenData.token}`
        }
      }
      return config
    })
  }

  /**
   * Buscar chave de uma unidade específica
   * Prioridade: Vercel (produção) > .env.local (desenvolvimento)
   */
  private async getChaveUnidade(slug: string): Promise<string | null> {
    try {
      // 1. Vercel Environment Variables (produção) - TEXTO PLANO
      const chaveVercel = process.env[`PACTO_SECRET_KEY_${slug.toUpperCase()}`]
      if (chaveVercel) {
        console.log(`[PactoV2] Chave da unidade ${slug} carregada via Vercel`)
        return chaveVercel
      }

      // 2. Desenvolvimento (.env.local) - TEXTO PLANO
      const chaveDev = process.env[`PACTO_SECRET_KEY_DEV_${slug.toUpperCase()}`]
      if (chaveDev) {
        console.log(`[PactoV2] Chave da unidade ${slug} carregada via dev env`)
        return chaveDev
      }

      console.error(`[PactoV2] Chave da unidade ${slug} não encontrada`)
      return null
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error(`[PactoV2] Erro ao buscar chave da unidade ${slug}:`, errorMessage)
      return null
    }
  }

  /**
   * Verificar se o token ainda é válido
   */
  private isTokenValid(slug: string): boolean {
    const tokenData = this.tokens.get(slug)
    if (!tokenData) return false
    return Date.now() < tokenData.expiry
  }

  /**
   * Autenticar e obter token de acesso
   */
  private async authenticate(slug: string): Promise<void> {
    const chaveUnidade = await this.getChaveUnidade(slug)
    if (!chaveUnidade) {
      throw new Error(`Chave da unidade ${slug} não configurada`)
    }

    try {
      const response = await this.client.post<PactoTokenResponse>(`/v2/vendas/tkn/${chaveUnidade}`)
      
      this.tokens.set(slug, {
        token: response.data.token,
        expiry: Date.now() + (3500 * 1000) // 58 minutos
      })

      console.log(`[PactoV2] Token gerado para unidade ${slug}`)
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error(`[PactoV2] Erro ao autenticar unidade ${slug}:`, errorMessage)
      throw new Error(`Falha na autenticação da unidade ${slug}`)
    }
  }

  /**
   * Buscar chave da rede (mantido para compatibilidade)
   * @deprecated Use getChaveUnidade() em vez disso
   */
  private async getChaveRede(codigoRede: string): Promise<string | null> {
    // Para compatibilidade, retorna a chave padrão da rede
    return await this.getChaveUnidade('centro') // Fallback para centro
  }

  // ============================================
  // ENDPOINTS DA API V2
  // ============================================

  /**
   * 1. Registrar Início de Acesso (Anti-fraude)
   */
  async registrarInicioAcesso(slug: string, unidade: number, plano: number, ip: string): Promise<PactoRegistroAcessoResponse> {
    try {
      // Garantir que temos um token válido
      if (!this.isTokenValid(slug)) {
        await this.authenticate(slug)
      }

      const dadosAcesso: PactoDadosAcesso = {
        empresa: 1, // Será mapeado baseado na unidade
        evento: 0, // Evento padrão
        ip: ip,
        link: 'https://liveacademia.com.br',
        tela: 'pagina-inicial',
        usuario: 0 // Usuário não logado
      }

      const response = await this.client.post(`/v2/vendasonlineicv/${slug}/registrarInicioAcessoPagina/`, dadosAcesso, {
        headers: {
          'x-pacto-unidade': slug
        }
      })
      
      console.log(`[PactoV2] Acesso registrado para unidade ${slug}, código ${unidade}, plano ${plano}, IP ${ip}`)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error('[PactoV2] Erro ao registrar acesso:', errorMessage)
      // Não joga erro para não bloquear o fluxo principal
      throw error
    }
  }

  /**
   * 2. Consultar Unidade Específica
   */
  async getUnidade(slug: string, codigoUnidade: number): Promise<PactoUnidade> {
    try {
      // Garantir que temos um token válido
      if (!this.isTokenValid(slug)) {
        await this.authenticate(slug)
      }

      const response = await this.client.get(`/v2/vendas/${slug}/unidade/${codigoUnidade}`, {
        headers: {
          'x-pacto-unidade': slug
        }
      })
      return response.data.retorno
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error(`[PactoV2] Erro ao buscar unidade ${codigoUnidade} da unidade ${slug}:`, errorMessage)
      throw new Error(`Failed to fetch unit ${codigoUnidade} from ${slug}`)
    }
  }

  /**
   * 3. Consultar Planos de uma Unidade
   */
  async getPlanosUnidade(slug: string, codigoUnidade: number): Promise<PactoPlano[]> {
    try {
      // Garantir que temos um token válido
      if (!this.isTokenValid(slug)) {
        await this.authenticate(slug)
      }

      const response = await this.client.get(`/v2/vendas/${slug}/planos/${codigoUnidade}`, {
        headers: {
          'x-pacto-unidade': slug
        }
      })
      return response.data.retorno || []
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error(`[PactoV2] Erro ao buscar planos da unidade ${codigoUnidade} da unidade ${slug}:`, errorMessage)
      throw new Error(`Failed to fetch plans for unit ${codigoUnidade} from ${slug}`)
    }
  }

  /**
   * 4. Simular Venda (V2)
   */
  async simularVenda(
    slug: string,
    unidadeCodigo: number,
    dadosVenda: PactoVendaData
  ): Promise<PactoSimulacao> {
    try {
      // Garantir que temos um token válido
      if (!this.isTokenValid(slug)) {
        await this.authenticate(slug)
      }

      const response = await this.client.post(
        `/v2/vendas/simularV2/${slug}/${unidadeCodigo}`,
        dadosVenda,
        {
          headers: {
            'x-pacto-unidade': slug
          }
        }
      )
      return response.data.retorno
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error('[PactoV2] Erro na simulação:', errorMessage)
      throw new Error('Failed to simulate sale')
    }
  }

  /**
   * 5. Validar Cupom de Desconto
   */
  async validarCupom(slug: string, cupom: string, dadosPlano: PactoCupomData): Promise<PactoVendaCupomResponse> {
    try {
      // Garantir que temos um token válido
      if (!this.isTokenValid(slug)) {
        await this.authenticate(slug)
      }

      const response = await this.client.post(`/v2/vendas/${slug}/adicionarCupomDescontoSite`, dadosPlano, {
        params: { numeroCupomDesconto: cupom },
        headers: {
          'x-pacto-unidade': slug
        }
      })
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error('[PactoV2] Erro ao validar cupom:', errorMessage)
      throw new Error('Failed to validate coupon')
    }
  }

  /**
   * 6. Processar Pagamento - Cartão de Crédito
   */
  async processarPagamentoCartao(
    codigoRede: string,
    captchaToken: string,
    dadosVenda: PactoVendaData
  ): Promise<PactoVenda> {
    try {
      const response = await this.client.post(
        `/v2/vendas/${codigoRede}/alunovendaonline/${captchaToken}`,
        dadosVenda
      )
      return response.data.retorno
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error('[PactoV2] Erro no pagamento com cartão:', errorMessage)
      throw new Error('Failed to process card payment')
    }
  }

  /**
   * 7. Processar Pagamento - PIX
   */
  async processarPagamentoPIX(
    codigoRede: string,
    captchaToken: string,
    dadosVenda: PactoVendaData
  ): Promise<PactoVenda> {
    try {
      const response = await this.client.post(
        `/v2/vendas/${codigoRede}/alunovendaonlinepix/${captchaToken}`,
        dadosVenda
      )
      return response.data.retorno
    } catch (error: any) {
      console.error('[PactoV2] Erro no pagamento PIX:', error.response?.data || error.message)
      throw new Error('Failed to process PIX payment')
    }
  }

  /**
   * 8. Processar Pagamento - Boleto
   */
  async processarPagamentoBoleto(
    codigoRede: string,
    captchaToken: string,
    dadosVenda: any
  ): Promise<PactoVenda> {
    try {
      const response = await this.client.post(
        `/v2/vendas/${codigoRede}/alunovendaonlineboleto/${captchaToken}`,
        dadosVenda
      )
      return response.data.retorno
    } catch (error: any) {
      console.error('[PactoV2] Erro no pagamento boleto:', error.response?.data || error.message)
      throw new Error('Failed to process boleto payment')
    }
  }

  /**
   * 9. Verificar reCAPTCHA (Backend verification)
   */
  async verifyRecaptcha(token: string): Promise<boolean> {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    if (!secretKey) {
      throw new Error('RECAPTCHA_SECRET_KEY not configured')
    }

    try {
      const response = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        null,
        {
          params: {
            secret: secretKey,
            response: token,
          },
        }
      )

      if (response.data.success) {
        console.log('[reCAPTCHA] Verification successful')
        return true
      } else {
        console.warn('[reCAPTCHA] Verification failed:', response.data)
        return false
      }
    } catch (error: any) {
      console.error('[reCAPTCHA] Error verifying:', error.response?.data || error.message)
      return false
    }
  }

  /**
   * 10. Verificar Blacklist (Anti-fraude)
   */
  async verificarBlacklist(ip: string): Promise<boolean> {
    try {
      const response = await this.client.get('/v2/vendas/blacklist')
      const blacklist = response.data.retorno || []
      return blacklist.some((item: any) => item.ip === ip)
    } catch (error: any) {
      console.error('[PactoV2] Erro ao verificar blacklist:', error.response?.data || error.message)
      return false // Assume não está na blacklist em caso de erro
    }
  }

  /**
   * 11. Obter IP do Cliente
   */
  getClientIP(req: NextRequest): string {
    const forwardedFor = req.headers.get('x-forwarded-for')
    if (forwardedFor) {
      return forwardedFor.split(',')[0].trim()
    }
    // NextRequest in Next.js does not have .ip property.
    // Fallback: best effort extraction from headers or default value.
    const realIP = req.headers.get('x-real-ip')
    if (realIP) {
      return realIP
    }
    return '0.0.0.0'
  }

  /**
   * 12. Obter Contrato em PDF
   */
  async getContratoPDF(codigoVenda: number): Promise<string> {
    return `${process.env.PACTO_API_URL || 'https://api.pactosolucoes.com.br'}/v2/vendas/contratoImp/${codigoVenda}`
  }

  /**
   * 13. Registrar Aceite de Termos
   */
  async registrarAceiteTermos(codigoVenda: number): Promise<void> {
    try {
      await this.client.post('/v2/vendas/comprovanteTermoAceite', {
        codigo: codigoVenda,
        aceite: true
      })
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error('[PactoV2] Erro ao registrar aceite de termos:', errorMessage)
      throw new Error('Failed to register terms acceptance')
    }
  }

  /**
   * 14. Tokenizar Dados do Cartão (PCI DSS)
   */
  tokenizeCardData(cardData: EncryptedCardData): string {
    try {
      const token = tokenizeCard(cardData)
      console.log(`[PactoV2] Cartão tokenizado: ${token.maskedCard} (${token.brand})`)
      return token.token
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('[PactoV2] Erro ao tokenizar cartão:', errorMessage)
      throw new Error('Failed to tokenize card data')
    }
  }

  /**
   * 15. Recuperar Dados do Cartão (PCI DSS)
   */
  detokenizeCardData(token: string): EncryptedCardData {
    try {
      const cardData = detokenizeCard(token)
      console.log(`[PactoV2] Dados do cartão recuperados via token`)
      return cardData
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('[PactoV2] Erro ao recuperar dados do cartão:', errorMessage)
      throw new Error('Failed to detokenize card data')
    }
  }

  /**
   * 16. Processar Pagamento com Token (Cartão)
   */
  async processarPagamentoCartaoComToken(
    slug: string,
    captchaToken: string,
    dadosVenda: TokenizedVendaData
  ): Promise<PactoVendaAprovadaResponse> {
    try {
      // Recuperar dados do cartão usando token
      if (!dadosVenda.cartaoToken) {
        throw new Error('Token do cartão é obrigatório')
      }

      const cardData = this.detokenizeCardData(dadosVenda.cartaoToken)
      
      // Converter para formato simplificado
      const vendaSimplificada: PactoVendaSimplificada = {
        unidade: dadosVenda.unidade,
        plano: dadosVenda.plano,
        cliente: dadosVenda.cliente,
        cartao: {
          numero: cardData.numero,
          nome: cardData.nome,
          validade: cardData.validade,
          cvv: cardData.cvv,
          parcelas: cardData.parcelas || 1
        },
        termoDeUsoAceito: dadosVenda.termoDeUsoAceito,
        origemSistema: dadosVenda.origemSistema,
        dataUtilizacao: dadosVenda.dataUtilizacao,
        ipPublico: dadosVenda.ipPublico,
        observacaoCliente: 'Venda online'
      }

      // Garantir que temos um token válido
      if (!this.isTokenValid(slug)) {
        await this.authenticate(slug)
      }

      const vendaDTO = convertToPactoVendaDTO(vendaSimplificada)
      const response = await this.client.post(
        `/v2/vendas/${slug}/alunovendaonline/${captchaToken}`,
        vendaDTO,
        {
          headers: {
            'x-pacto-unidade': slug
          }
        }
      )
      
      console.log(`[PactoV2] Pagamento com cartão processado com sucesso via token`)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error('[PactoV2] Erro no pagamento com cartão via token:', errorMessage)
      throw new Error('Failed to process card payment with token')
    }
  }
}

// ============================================
// INSTÂNCIA SINGLETON
// ============================================

export const pactoV2API = new PactoV2API()

// ============================================
// UTILITÁRIOS PARA FORMATAÇÃO DE DADOS
// ============================================

export function formatVendaData(
  codigoRede: string,
  cliente: PactoCliente,
  cartao: PactoCartao | null,
  unidade: number,
  plano: number,
  paymentMethod: 'cartao' | 'pix' | 'boleto',
  ipPublico?: string
): PactoVendaSimplificada {
  const baseData: PactoVendaSimplificada = {
    unidade,
    plano,
    cliente: {
      nome: cliente.nome,
      cpf: cliente.cpf,
      email: cliente.email,
      telefone: cliente.telefone,
      endereco: cliente.endereco || '',
      numero: cliente.numero || '',
      complemento: cliente.complemento || '',
      bairro: cliente.bairro || '',
      cidade: cliente.cidade || '',
      estado: cliente.estado || '',
      cep: cliente.cep || '',
      dataNascimento: cliente.dataNascimento || '01/01/1990',
      sexo: cliente.sexo || 'M',
      rg: cliente.rg || '',
    },
    termoDeUsoAceito: true,
    origemSistema: 9, // Vendas online
    dataUtilizacao: new Date().toLocaleDateString('pt-BR'),
    ipPublico: ipPublico || '0.0.0.0',
    observacaoCliente: 'Venda online'
  }

  if (paymentMethod === 'cartao' && cartao) {
    baseData.cartao = {
      numero: cartao.numero,
      nome: cartao.nome,
      validade: cartao.validade,
      cvv: cartao.cvv,
      parcelas: cartao.parcelas || 1,
    }
  }

  return baseData
}
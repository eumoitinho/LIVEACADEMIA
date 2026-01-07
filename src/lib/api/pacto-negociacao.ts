import axios, { AxiosInstance, AxiosError } from 'axios'
import { getUnitBySlug } from './supabase-repository'

export interface NegociacaoResponse<T> {
  content: T
}

export interface ClienteNegociacao {
  codigo: number
  nome: string
  empresa: number
  situacao: string
  matricula?: string
}

export interface CheckNegociacao {
  planoSugerido?: number
  valorParcelasAberto?: number
  permiteContratoConcomitante?: boolean
  nivelAluno?: number
  usaProdutos?: boolean
  usaDesconto?: boolean
  codigoContratoRenovacao?: number
  finalContratoAtivo?: number
}

export interface PlanoNegociacao {
  codigo: number
  descricao: string
  quantidadeCompartilhamentos?: number
  restringeVendaPorCategoria?: boolean
  categorias?: Array<any>
  bloquearRecompra?: boolean
  permitirTransferenciaDeCredito?: boolean
}

export interface PlanoDuracaoCondicao {
  codigo: number
  nrParcelas: number
  descricao: string
}

export interface PlanoDuracao {
  codigo: number
  nrMeses: number
  descricao: string
  condicoes: PlanoDuracaoCondicao[]
}

export interface PlanoHorario {
  codigo: number
  descricao: string
  livre: boolean
}

export interface ModalidadeConfigVezesDTO {
  codigo: number
  vezes: number
  duracao: number
  horario: number
  valorModalidade?: number
}

export interface PlanoModalidadeDTO {
  codigo: number
  descricao: string
  nrvezes?: number
  valorModalidade?: number
  utilizarTurma?: boolean
  aulaColetivaFixa?: boolean
  configsVezes?: ModalidadeConfigVezesDTO[]
}

export interface PlanoProdutoDTO {
  codigo: number
  produto?: number
  quantidade?: number
  descontoPadrao?: number
}

export interface PlanoDescontoDTO {
  codigo: number
  descricao: string
  tipo: string
  valor: number
}

export interface PlanoNegociacaoDetalhe {
  plano: number
  bolsa: boolean
  recorrencia: boolean
  duracoes: PlanoDuracao[]
  horarios: PlanoHorario[]
  modalidades: PlanoModalidadeDTO[]
  produtos: PlanoProdutoDTO[]
  descontos: PlanoDescontoDTO[]
}

export interface ProdutoNegociacao {
  codigo: number
  descricao: string
  valorFinal: number
  desativado: boolean
  tipoProduto: string
  tipoProdutoDescricao: string
}

export interface UsuarioNegociacao {
  codigo: number
  nome: string
}

export interface ConfigsAvancadasDTO {
  cobrarMatricula?: boolean
  vezesCobrarMatricula?: number
  diaPrimeiraParcela?: number
  diaProrata?: number
  cobrarProdutosSeparados?: boolean
  vezesCobrarProdutosSeparados?: number
}

export interface ConfigsContratoDTO {
  contratoBase?: number
  plano?: number
  empresa?: number
  usuario?: number
  usuarioAutorizouDesconto?: number
  cliente: number
  duracao?: number
  condicao?: number
  horario?: number
  dataLancamento?: number
  diaPrimeiraParcela?: number
  tipoContrato?: string
  inicio?: number
  gerarLink?: boolean
  descontoExtraValor?: number
  descontoExtraPercentual?: number
  modalidades: PlanoModalidadeDTO[]
  produtos?: PlanoProdutoDTO[]
  configuracoesAvancadas?: ConfigsAvancadasDTO
  observacao?: string
  cupom?: string
  codigoConvenio?: number
  convenioDesconto?: number
  vencimentoCartao?: number
}

export interface SimulacaoParcelaDTO {
  nrParcela: number
  valorParcela: number
  descricao: string
}

export interface SimulacaoModalidadeDTO {
  modalidade: string
  nrVezesSemana: number
}

export interface SimulacaoNegociacao {
  valorFinal: number
  valorBase: number
  valorPlano: number
  descontos: number
  nrParcelas: number
  valorPrimeiraParcela: number
  parcelas: SimulacaoParcelaDTO[]
  modalidades: SimulacaoModalidadeDTO[]
}

export interface NegociacaoFinalizada {
  contrato: number
  link: string
  whatsapp: string
}

function buildSlugVariations(slug: string) {
  const slugNormalized = slug.toUpperCase().replace(/-/g, '_')
  const suffixesToRemove = ['_DIAMANTE', '_PREMIUM', '_CLIMATIZADA', '_GRANDE_CIRCULAR']
  const slugVariations = [slugNormalized]

  for (const suffix of suffixesToRemove) {
    if (slugNormalized.endsWith(suffix)) {
      slugVariations.push(slugNormalized.replace(suffix, ''))
    }
  }

  if (slugNormalized.startsWith('CT_')) {
    slugVariations.push(slugNormalized.replace('CT_', ''))
  }
  if (slugNormalized.startsWith('TORQUATO_')) {
    slugVariations.push(slugNormalized.replace('TORQUATO_', ''))
  }
  if (slugNormalized === 'TORQUATO_BEMOL') {
    slugVariations.push('BEMOL')
  }
  if (slugNormalized === 'TORQUATO_ALLEGRO') {
    slugVariations.push('ALLEGRO')
  }
  if (slugNormalized === 'CHAPEU_GOIANO') {
    slugVariations.push('GOIANO')
  }
  if (slugNormalized.startsWith('MORADA_')) {
    slugVariations.push('MORADA')
  }
  if (slugNormalized === 'VITORIA_COROADO' || slugNormalized === 'VITORIA') {
    slugVariations.push('COROADO')
    slugVariations.push('VITORIA')
  }
  if (slugNormalized.startsWith('RODRIGUES_')) {
    slugVariations.push('RODRIGUES')
  }
  if (slugNormalized === 'TORRES_DIAMANTE') {
    slugVariations.push('TORRES')
  }
  if (slugNormalized === 'VIEIRALVES_DIAMANTE') {
    slugVariations.push('VIEIRALVES')
  }
  if (slugNormalized === 'MARGARITA_DIAMANTE') {
    slugVariations.push('MARGARITA')
  }
  if (slugNormalized === 'PEDRO_TEIXEIRA_DIAMANTE') {
    slugVariations.push('PEDRO_TEIXEIRA')
  }
  if (slugNormalized === 'PLANALTO_DIAMANTE') {
    slugVariations.push('PLANALTO')
  }
  if (slugNormalized === 'BOM_PRATO_DIAMANTE') {
    slugVariations.push('BOM_PRATO')
  }
  if (slugNormalized === 'FLORES_DIAMANTE') {
    slugVariations.push('FLORES')
  }
  if (slugNormalized.includes('EFIGENIO')) {
    slugVariations.push('EFIGENIO_SALLES')
    slugVariations.push('EFIGENIO')
  }
  if (slugNormalized.includes('VENEZA')) {
    slugVariations.push('VENEZA')
  }
  if (slugNormalized.startsWith('JACIRA_')) {
    slugVariations.push('JACIRA')
  }

  return slugVariations
}

function getEnvBySlug(prefixes: string[], slug: string): string | null {
  const variations = buildSlugVariations(slug)
  for (const variation of variations) {
    for (const prefix of prefixes) {
      const envKey = `${prefix}${variation}`
      const value = process.env[envKey]
      if (value) {
        return value
      }
    }
  }
  return null
}

export async function resolveNegociacaoAuth(headers: Headers, slug?: string) {
  let token = headers.get('authorization') || headers.get('x-api-key') || headers.get('x-pacto-token')
  if (token?.toLowerCase().startsWith('bearer ')) {
    token = token.slice(7)
  }

  if (!token && slug) {
    const envToken = getEnvBySlug(
      ['PACTO_NEGOCIACAO_TOKEN_', 'PACTO_API_TOKEN_', 'PACTO_API_KEY_', 'PACTO_SECRET_KEY_'],
      slug
    )
    if (envToken) {
      token = envToken
    }

    const unidade = await getUnitBySlug(slug)
    if (unidade?.apiKeyPlain) {
      token = unidade.apiKeyPlain
    }
  }

  if (!token) {
    token = process.env.PACTO_NEGOCIACAO_TOKEN || process.env.PACTO_API_TOKEN || process.env.PACTO_API_KEY || null
  }

  let empresaId = headers.get('empresaId') || headers.get('x-empresa-id') || headers.get('empresaid') || null
  if (!empresaId && slug) {
    empresaId = getEnvBySlug(['PACTO_EMPRESA_ID_', 'PACTO_EMPRESAID_'], slug)
  }
  if (!empresaId) {
    empresaId = process.env.PACTO_EMPRESA_ID || process.env.PACTO_EMPRESAID || null
  }

  return { token, empresaId }
}

class PactoNegociacaoAPI {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.PACTO_API_URL || 'https://apigw.pactosolucoes.com.br',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  private buildHeaders(token: string, empresaId: string) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      empresaId,
    }
  }

  private logError(context: string, error: unknown) {
    const axiosError = error as AxiosError
    if (axiosError?.response) {
      console.error(`[PactoNegociacao] ${context} - ${axiosError.response.status}`, axiosError.response.data)
      return
    }
    const message = error instanceof Error ? error.message : String(error)
    console.error(`[PactoNegociacao] ${context} -`, message)
  }

  async buscarClientes(token: string, empresaId: string, nome: string): Promise<ClienteNegociacao[]> {
    try {
      const response = await this.client.get<NegociacaoResponse<ClienteNegociacao[]>>('/negociacao/cliente', {
        params: { nome },
        headers: this.buildHeaders(token, empresaId),
      })
      return response.data?.content || []
    } catch (error) {
      this.logError('Erro ao buscar clientes', error)
      throw error
    }
  }

  async checkNegociacao(token: string, empresaId: string, cliente: number, contratoForcar: number = 0, verificarEmpresa?: boolean) {
    try {
      const response = await this.client.get<NegociacaoResponse<CheckNegociacao>>(
        `/negociacao/check/${cliente}/${contratoForcar}`,
        {
          params: {
            verificarEmpresaEContratoResponsavelRematricula: verificarEmpresa,
          },
          headers: this.buildHeaders(token, empresaId),
        }
      )
      return response.data?.content
    } catch (error) {
      this.logError('Erro ao checar negociação', error)
      throw error
    }
  }

  async listarPlanos(token: string, empresaId: string, codigoCliente: number, contrato?: number, incluirBolsa?: boolean, planoForcar?: number): Promise<PlanoNegociacao[]> {
    try {
      const response = await this.client.get<NegociacaoResponse<PlanoNegociacao[]>>(`/negociacao/planos/${codigoCliente}`, {
        params: {
          contrato,
          incluirBolsa,
          planoForcar,
        },
        headers: this.buildHeaders(token, empresaId),
      })
      return response.data?.content || []
    } catch (error) {
      this.logError('Erro ao listar planos', error)
      throw error
    }
  }

  async obterDadosPlano(token: string, empresaId: string, plano: number, contratoBaseado: number, situacaoContrato: string): Promise<PlanoNegociacaoDetalhe | null> {
    try {
      const response = await this.client.get<NegociacaoResponse<PlanoNegociacaoDetalhe>>(
        `/negociacao/plano/${plano}/${contratoBaseado}/${situacaoContrato}`,
        {
          headers: this.buildHeaders(token, empresaId),
        }
      )
      return response.data?.content || null
    } catch (error) {
      this.logError('Erro ao obter dados do plano', error)
      throw error
    }
  }

  async listarProdutos(token: string, empresaId: string): Promise<ProdutoNegociacao[]> {
    try {
      const response = await this.client.get<NegociacaoResponse<ProdutoNegociacao[]>>('/produtos', {
        headers: this.buildHeaders(token, empresaId),
      })
      return response.data?.content || []
    } catch (error) {
      this.logError('Erro ao listar produtos', error)
      throw error
    }
  }

  async listarUsuarios(token: string, empresaId: string, nome: string, page?: number, size?: number): Promise<UsuarioNegociacao[]> {
    try {
      const response = await this.client.get<NegociacaoResponse<UsuarioNegociacao[]>>('/v1/usuario', {
        params: { nome, page, size },
        headers: this.buildHeaders(token, empresaId),
      })
      return response.data?.content || []
    } catch (error) {
      this.logError('Erro ao listar usuários', error)
      throw error
    }
  }

  async simularNegociacao(token: string, empresaId: string, config: ConfigsContratoDTO): Promise<SimulacaoNegociacao> {
    try {
      const response = await this.client.post<NegociacaoResponse<SimulacaoNegociacao>>(
        '/negociacao/simular',
        config,
        { headers: this.buildHeaders(token, empresaId) }
      )
      return response.data?.content
    } catch (error) {
      this.logError('Erro ao simular negociação', error)
      throw error
    }
  }

  async finalizarNegociacao(token: string, empresaId: string, config: ConfigsContratoDTO): Promise<NegociacaoFinalizada> {
    try {
      const response = await this.client.post<NegociacaoFinalizada>('/negociacao/gravar', config, {
        headers: this.buildHeaders(token, empresaId),
      })
      return response.data
    } catch (error) {
      this.logError('Erro ao finalizar negociação', error)
      throw error
    }
  }
}

export const pactoNegociacaoAPI = new PactoNegociacaoAPI()

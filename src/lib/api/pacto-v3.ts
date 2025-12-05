import axios, { AxiosInstance, AxiosResponse } from 'axios'

// ============================================
// INTERFACES PARA API V3
// ============================================

export interface PactoV3Unidade {
  codigo: number
  nome: string
  chave: string
  cidade: string
  telefone: string
  email: string
  estado: string
  cep: string
  endereco: string
  longitude: string
  latitude: string
  logo: string
  complemento: string
  imagens: string[]
  usarSistemaInternacional: boolean
}

export interface PactoV3Plano {
  parcelamentoOperadora: boolean
  maxDivisao: number
  descricaoEncantamento: string | null
  nome: string
  mesAnuidade: string
  codigo: number
  adesao: number
  nrVezesParcelarMatricula: number
  anuidade: number
  horario: string
  fidelidade: number
  quantidadeDeDiasDuracaoPlano: number
  quantidadeCompartilhamentos: number
  mensalidade: number
  primeiraParcela: number
  valorProdutos: number
  valorTotalDoPlano: number
  produtos: string
  inicioMinimo: string | null
  modalidades: string[]
  diasVencimento: number[]
  inicioFuturo: boolean
  anuidadeAgora: boolean
  cobrarPrimeiraParcelaCompra: boolean
  qtdCreditoPlanoCredito: number
  regimeRecorrencia: boolean
  renovavelAutomaticamente: boolean
  matricula: number
  renovacao: string | null
  rematricula: string | null
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
  videoSiteUrl: string | null
  observacaoSite: string | null
  cobrarProdutoSeparado: boolean
  cobrarAdesaoSeparado: boolean
  permitirCompartilharPLanoNoSite: boolean
  condicaoPagamentoPrePago: boolean
  gerarParcelasValorDiferente: boolean
  produtoTaxaCancelamento: string
  percentualMultaCancelamento: number
}

export interface PactoV3Config {
  habilitarAgendamentoAulaExperimentalLinkVisitante: boolean
  configSescHabilitada: boolean
  googleTagIdHotsite: string
  cor: string
  usarFormaPagamentoPlanoProduto: boolean
  apresentarValorTotalDoPlanoNaTelaDeSelecaoDoPlano: boolean
  urlLinkGooglePlay: string
  apresentarCartao: boolean
  apresentarCartaoVenda: boolean
  urlLinkAppleStore: string
  apresentarTermoAceiteLinkPag: boolean
  apresentarCPFLinkPag: boolean
  apresentarCartaoRegua: boolean
  apresentarPix: boolean
  analyticsId: string
  cobrarProdutoJuntoAdesaoMatricula: string
  exibirTipoDocumentoTelaVendasOnline: boolean
  temaescuro: boolean
  primeiraCobrancaPixEGuardarCartao: boolean
  tipoConvenio: string
  detalharParcelaTelaCheckout: string
  apresentarBoletoRegua: boolean
  selecionarUnidadeListaPlano: boolean
  modalidadesIniciarSelecionadasContratoTurma: boolean
  apresentarPixRegua: boolean
  ativarLinksGooglePlayEAppleStore: boolean
  permitirMudarTipoParcelamento: boolean
  apresentarPixVenda: boolean
  temaclaro: boolean
  apresentarDtFaturaLinkPag: boolean
  permiteVendaProdutoAlunoOutraUnidade: boolean
  apresentarvaloranuidade: string
  apresentarBoletoVenda: boolean
  permiteRenovacaoDeContrato: boolean
  exibeDataUtilizacao: boolean
  apresentarBoleto: boolean
  camposAdicionais: string[]
  camposAdicionaisProduto: string[]
  permitecontratosconcomintante: string
  camposAdicionaisProdutoFlow: string[]
  cobrarPrimeiraParcelaCompra: string
  permiteProsseguirMesmoCpfOuEmailCadastroVisitante: boolean
  tokenApiConversao: string
  verificarCpfAlunoAntesEscolha: boolean
  camposAdicionaisProdutoPlano: string[]
  url: string
  camposAdicionaisPlanoFlow: string[]
  pixelId: string
  habilitarPreCadastro: boolean
  tema: string
  googleTagId: string
  titulocheckout: string
}

export interface PactoV3CupomResponse {
  retorno: {
    codigo: number
    status: string
    valor: number
  }
  statusErro: string
}

export interface PactoV3SimulacaoResponse {
  retorno: {
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
  statusErro: string
}

export interface PactoV3TokenResponse {
  retorno: {
    token: string
    codigo: number
    status: string
  }
  statusErro: string
}

export interface PactoV3VendaResponse {
  retorno: {
    codigo: number
    status: string
    valor: number
    transacao?: string
    pixCode?: string
    boletoUrl?: string
    cartaoAprovado?: boolean
  }
  statusErro: string
}

export interface PactoV3VendaDTO {
  apiCredential: {
    chaveEmpresaEmissora: string
    companyId: number
    createdAt: any
    description: string
    expiresAt: any
    id: number
    key: string
    public_Key: string
    revoked: boolean
    revokedAt: any
    scope: string[]
    token: string
    zwUserCode: number
    zwUsername: string
  }
  assinaturaDigital: string
  aulasMarcadas: any[]
  bairro: string
  cep: string
  cidade: number
  clientesCadastradosComoDependentesPlanoCompartilhado: any[]
  cnpj: string
  cobrancaAntecipada: number
  cobrarParcelasEmAberto: boolean
  codigoCategoriaPlano: number
  codigoColaborador: number
  codigoEvento: number
  codigoRegistroAcessoPagina: number
  complemento: string
  convenioCobranca: number
  cpf: string
  cpfMae: string
  cpfPai: string
  cpfResponsavelEmpresa: string
  cpftitularcard: string
  cvv: string
  dataInicioContrato: string
  dataInicioVendaProdutos: string
  dataLancamento: string
  dataNascimento: string
  dataUtilizacao: string
  diaVencimento: number
  email: string
  endereco: string
  enviarEmail: boolean
  estado: number
  horariosSelecionados: any[]
  ipPublico: string
  locacaoAmbiente: boolean
  locacoesSelecionadas: any
  modalidadesSelecionadas: any[]
  nome: string
  nomeCartao: string
  nomeResponsavelEmpresa: string
  nowLocationIp: string
  nrVezesDividir: number
  nrVezesDividirMatricula: number
  numero: string
  numeroCartao: string
  numeroCupomDesconto: string
  observacaoCliente: string
  origemCobranca: number
  origemSistema: number
  pactoPayComunicacao: number
  pais: number
  parcelasSelecionadas: any
  passaporte: string
  permiteInformarDataUtilizacao: boolean
  permitirRenovacao: boolean
  plano: number
  produtos: any[]
  responsavelLink: number
  responsavelMae: string
  responsavelPai: string
  respostaParqJson: string
  rg: string
  sexo: string
  telefone: string
  termoDeUsoAceito: boolean
  tipoParcelamentoCredito: string
  todasEmAberto: boolean
  token: string
  unidade: number
  usuarioResponsavel: number
  utm_data: string
  validade: string
  vencimentoFatura: number
  vendaConsultor: boolean
}

// ============================================
// CLASSE PRINCIPAL DA API V3
// ============================================

class PactoV3API {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'https://apigw.pactosolucoes.com.br',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * Buscar chave SECRETA de uma unidade específica
   * Cada unidade tem sua própria PACTO_SECRET_KEY_[NOME_UNIDADE] ou PACTO_API_KEY_[NOME_UNIDADE]
   */
  private async getChaveSecretaUnidade(slug: string): Promise<string | null> {
    try {
      // Convert hyphens to underscores for env var name
      const slugNormalized = slug.toUpperCase().replace(/-/g, '_')

      // Gerar variações do slug removendo sufixos comuns (ex: FLORES_DIAMANTE -> FLORES)
      const suffixesToRemove = ['_DIAMANTE', '_PREMIUM', '_CLIMATIZADA', '_GRANDE_CIRCULAR']
      const slugVariations = [slugNormalized]
      for (const suffix of suffixesToRemove) {
        if (slugNormalized.endsWith(suffix)) {
          slugVariations.push(slugNormalized.replace(suffix, ''))
        }
      }
      // Também adicionar variação para slugs compostos (ex: CT_CIDADE_NOVA -> CIDADE_NOVA)
      if (slugNormalized.startsWith('CT_')) {
        slugVariations.push(slugNormalized.replace('CT_', ''))
      }
      // Variação para torquato-santos-dumont -> SANTOS_DUMONT  
      if (slugNormalized.startsWith('TORQUATO_')) {
        slugVariations.push(slugNormalized.replace('TORQUATO_', ''))
      }
      // Variação para torquato-bemol -> BEMOL
      if (slugNormalized === 'TORQUATO_BEMOL') {
        slugVariations.push('BEMOL')
      }
      // Variação para torquato-allegro -> ALLEGRO
      if (slugNormalized === 'TORQUATO_ALLEGRO') {
        slugVariations.push('ALLEGRO')
      }
      // Variação para chapeu-goiano -> GOIANO
      if (slugNormalized === 'CHAPEU_GOIANO') {
        slugVariations.push('GOIANO')
      }
      // Variação para morada-do-sol -> MORADA
      if (slugNormalized.startsWith('MORADA_')) {
        slugVariations.push('MORADA')
      }
      // Variação para vitoria-coroado -> COROADO ou VITORIA
      if (slugNormalized === 'VITORIA_COROADO' || slugNormalized === 'VITORIA') {
        slugVariations.push('COROADO')
        slugVariations.push('VITORIA')
      }
      // Variação para rodrigues-grande-circular -> RODRIGUES
      if (slugNormalized.startsWith('RODRIGUES_')) {
        slugVariations.push('RODRIGUES')
      }
      // Variação para torres-diamante -> TORRES
      if (slugNormalized === 'TORRES_DIAMANTE') {
        slugVariations.push('TORRES')
      }
      // Variação para vieiralves-diamante -> VIEIRALVES
      if (slugNormalized === 'VIEIRALVES_DIAMANTE') {
        slugVariations.push('VIEIRALVES')
      }
      // Variação para margarita-diamante -> MARGARITA
      if (slugNormalized === 'MARGARITA_DIAMANTE') {
        slugVariations.push('MARGARITA')
      }
      // Variação para pedro-teixeira-diamante -> PEDRO_TEIXEIRA
      if (slugNormalized === 'PEDRO_TEIXEIRA_DIAMANTE') {
        slugVariations.push('PEDRO_TEIXEIRA')
      }
      // Variação para planalto-diamante -> PLANALTO
      if (slugNormalized === 'PLANALTO_DIAMANTE') {
        slugVariations.push('PLANALTO')
      }
      // Variação para bom-prato-diamante -> BOM_PRATO
      if (slugNormalized === 'BOM_PRATO_DIAMANTE') {
        slugVariations.push('BOM_PRATO')
      }
      // Variação para flores-diamante -> FLORES
      if (slugNormalized === 'FLORES_DIAMANTE') {
        slugVariations.push('FLORES')
      }
      // Variação para efigenio-salles ou similar
      if (slugNormalized.includes('EFIGENIO')) {
        slugVariations.push('EFIGENIO_SALLES')
        slugVariations.push('EFIGENIO')
      }
      // Variação para veneza
      if (slugNormalized.includes('VENEZA')) {
        slugVariations.push('VENEZA')
      }
      // Variação para jacira-reis -> JACIRA
      if (slugNormalized.startsWith('JACIRA_')) {
        slugVariations.push('JACIRA')
      }
      
      // Tentar cada variação com diferentes prefixos
      const prefixes = ['PACTO_SECRET_KEY_', 'PACTO_API_KEY_', 'PACTO_SECRET_KEY_DEV_']
      
      for (const variation of slugVariations) {
        for (const prefix of prefixes) {
          const envKey = `${prefix}${variation}`
          const chave = process.env[envKey]
          if (chave) {
            console.log(`[PactoV3] Chave SECRETA da unidade ${slug} carregada via ${envKey}`)
            return chave
          }
        }
      }

      console.error(`[PactoV3] Chave SECRETA da unidade ${slug} não encontrada`)
      console.error(`[PactoV3] Tentativas: ${slugVariations.map(v => `PACTO_API_KEY_${v}`).join(', ')}`)
      return null
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error(`[PactoV3] Erro ao buscar chave SECRETA da unidade ${slug}:`, errorMessage)
      return null
    }
  }

  // getCodigoUnidade removido - não mais necessário pois a busca de planos é feita pela API V2

  // ============================================
  // ENDPOINTS DA API V3
  // ============================================

  /**
   * 1. Consultar Unidade Específica
   * GET /psec/vendas/unidade
   */
  async getUnidade(slug: string): Promise<PactoV3Unidade> {
    try {
      const chaveSecreta = await this.getChaveSecretaUnidade(slug)
      if (!chaveSecreta) {
        throw new Error(`Chave SECRETA da unidade ${slug} não configurada`)
      }

      const response = await this.client.get('/psec/vendas/unidade', {
        headers: {
          'Authorization': `Bearer ${chaveSecreta}`,
          'Content-Type': 'application/json'
        }
      })
      
      console.log(`[PactoV3] Unidade obtida para ${slug}:`, response.data.return?.nome)
      return response.data.return
    } catch (error: unknown) {
      const axiosError = error as any
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error(`[PactoV3] Erro ao buscar unidade ${slug}:`, errorMessage)
      throw new Error(`Failed to fetch unit ${slug}`)
    }
  }

  /**
   * 2. Consultar Todas as Unidades
   * GET /psec/vendas/unidades
   */
  async getUnidades(slug: string): Promise<PactoV3Unidade[]> {
    try {
      const chaveSecreta = await this.getChaveSecretaUnidade(slug)
      if (!chaveSecreta) {
        throw new Error(`Chave SECRETA da unidade ${slug} não configurada`)
      }

      const response = await this.client.get('/psec/vendas/unidades', {
        headers: {
          'Authorization': `Bearer ${chaveSecreta}`,
          'Content-Type': 'application/json'
        }
      })
      
      console.log(`[PactoV3] ${response.data.return?.length || 0} unidades encontradas`)
      return response.data.return || []
    } catch (error: unknown) {
      const axiosError = error as any
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error('[PactoV3] Erro ao buscar unidades:', errorMessage)
      throw new Error('Failed to fetch units')
    }
  }

  /**
   * DEPRECATED: Use pactoV2API.getPlanosUnidade() instead
   * A busca de planos por unidade deve ser feita na API V2
   * GET /v2/vendas/planos/1 com Authorization: Bearer {chave_unidade}
   */
  // Método removido - use pactoV2API.getPlanosUnidade() ao invés

  /**
   * 4. Consultar Configurações da Empresa
   * GET /psec/vendas/configs
   */
  async getConfigs(slug: string): Promise<PactoV3Config> {
    try {
      const chaveSecreta = await this.getChaveSecretaUnidade(slug)
      if (!chaveSecreta) {
        throw new Error(`Chave SECRETA da unidade ${slug} não configurada`)
      }

      const response = await this.client.get('/psec/vendas/configs', {
        headers: {
          'Authorization': `Bearer ${chaveSecreta}`,
          'Content-Type': 'application/json'
        }
      })
      
      console.log(`[PactoV3] Configurações obtidas para ${slug}`)
      return response.data.return
    } catch (error: unknown) {
      const axiosError = error as any
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error(`[PactoV3] Erro ao buscar configurações da unidade ${slug}:`, errorMessage)
      throw new Error(`Failed to fetch configs for unit ${slug}`)
    }
  }

  /**
   * 5. Validar Cupom de Desconto
   * POST /psec/vendas/validarCupomDesconto
   */
  async validarCupom(slug: string, cupom: string, dadosPlano: { plano: number; valor: number }): Promise<PactoV3CupomResponse> {
    try {
      const chaveSecreta = await this.getChaveSecretaUnidade(slug)
      if (!chaveSecreta) {
        throw new Error(`Chave SECRETA da unidade ${slug} não configurada`)
      }

      const response = await this.client.post('/psec/vendas/validarCupomDesconto', dadosPlano, {
        params: { numeroCupomDesconto: cupom },
        headers: {
          'Authorization': `Bearer ${chaveSecreta}`,
          'Content-Type': 'application/json'
        }
      })
      
      console.log(`[PactoV3] Cupom ${cupom} validado para ${slug}`)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as any
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error(`[PactoV3] Erro ao validar cupom:`, errorMessage)
      throw new Error('Failed to validate coupon')
    }
  }

  /**
   * 6. Simular Venda
   * POST /psec/vendas/simularVenda/{plano}
   */
  async simularVenda(slug: string, plano: number): Promise<PactoV3SimulacaoResponse> {
    try {
      const chaveSecreta = await this.getChaveSecretaUnidade(slug)
      if (!chaveSecreta) {
        throw new Error(`Chave SECRETA da unidade ${slug} não configurada`)
      }

      const response = await this.client.post(`/psec/vendas/simularVenda/${plano}`, {}, {
        headers: {
          'Authorization': `Bearer ${chaveSecreta}`,
          'Content-Type': 'application/json'
        }
      })
      
      console.log(`[PactoV3] Simulação realizada para plano ${plano} em ${slug}`)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as any
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error('[PactoV3] Erro na simulação:', errorMessage)
      throw new Error('Failed to simulate sale')
    }
  }

  /**
   * 7. Gerar Token de Venda
   * POST /psec/vendas/token
   */
  async gerarToken(slug: string, ipPublico: string): Promise<PactoV3TokenResponse> {
    try {
      const chaveSecreta = await this.getChaveSecretaUnidade(slug)
      if (!chaveSecreta) {
        throw new Error(`Chave SECRETA da unidade ${slug} não configurada`)
      }

      const response = await this.client.post('/psec/vendas/token', {}, {
        params: { ipPublico },
        headers: {
          'Authorization': `Bearer ${chaveSecreta}`,
          'Content-Type': 'application/json'
        }
      })
      
      console.log(`[PactoV3] Token gerado para ${slug}`)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as any
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error('[PactoV3] Erro ao gerar token:', errorMessage)
      throw new Error('Failed to generate token')
    }
  }

  /**
   * 8. Cadastrar Venda
   * POST /psec/vendas/cadastrarVenda
   */
  async cadastrarVenda(slug: string, dadosVenda: any, token: string): Promise<PactoV3VendaResponse> {
    try {
      const chaveSecreta = await this.getChaveSecretaUnidade(slug)
      if (!chaveSecreta) {
        throw new Error(`Chave SECRETA da unidade ${slug} não configurada`)
      }

      const response = await this.client.post('/psec/vendas/cadastrarVenda', dadosVenda, {
        headers: {
          'Authorization': `Bearer ${chaveSecreta}`,
          'Content-Type': 'application/json'
        }
      })
      
      console.log(`[PactoV3] Venda cadastrada para ${slug}`)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as any
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error('[PactoV3] Erro ao cadastrar venda:', errorMessage)
      throw new Error('Failed to register sale')
    }
  }

  /**
   * 9. Consultar Produtos por Categoria
   * GET /psec/vendas/produtos/{categoria}
   */
  async getProdutos(slug: string, categoria: number): Promise<any[]> {
    try {
      const chaveSecreta = await this.getChaveSecretaUnidade(slug)
      if (!chaveSecreta) {
        throw new Error(`Chave SECRETA da unidade ${slug} não configurada`)
      }

      const response = await this.client.get(`/psec/vendas/produtos/${categoria}`, {
        headers: {
          'Authorization': `Bearer ${chaveSecreta}`,
          'Content-Type': 'application/json'
        }
      })
      
      console.log(`[PactoV3] Produtos obtidos para categoria ${categoria} em ${slug}`)
      return response.data.return || []
    } catch (error: unknown) {
      const axiosError = error as any
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error(`[PactoV3] Erro ao buscar produtos:`, errorMessage)
      throw new Error('Failed to fetch products')
    }
  }

  /**
   * 10. Consultar Cliente por Múltiplos Critérios
   * GET /psec/vendas/consultarCliente
   */
  async consultarCliente(slug: string, criterios: {
    email?: string
    cpf?: string
    cliente?: number
    empresa?: number
  }): Promise<any> {
    try {
      const chaveSecreta = await this.getChaveSecretaUnidade(slug)
      if (!chaveSecreta) {
        throw new Error(`Chave SECRETA da unidade ${slug} não configurada`)
      }

      const response = await this.client.get('/psec/vendas/consultarCliente', {
        params: criterios,
        headers: {
          'Authorization': `Bearer ${chaveSecreta}`,
          'Content-Type': 'application/json'
        }
      })
      
      console.log(`[PactoV3] Cliente consultado para ${slug}`)
      return response.data.return
    } catch (error: unknown) {
      const axiosError = error as any
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error'
      console.error(`[PactoV3] Erro ao consultar cliente:`, errorMessage)
      throw new Error('Failed to query client')
    }
  }
}

// ============================================
// INSTÂNCIA SINGLETON
// ============================================

export const pactoV3API = new PactoV3API()

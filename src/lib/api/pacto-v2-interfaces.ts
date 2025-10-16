/**
 * Interfaces completas da API Pacto V2
 * Baseadas na documentação oficial fornecida
 */

// ==================== CREDENCIAIS ====================
export interface PactoApiCredential {
  chaveEmpresaEmissora: string
  companyId: number
  createdAt: {
    date: number
    hours: number
    minutes: number
    month: number
    nanos: number
    seconds: number
    time: number
    year: number
  }
  description: string
  expiresAt: {
    date: number
    hours: number
    minutes: number
    month: number
    nanos: number
    seconds: number
    time: number
    year: number
  }
  id: number
  key: string
  public_Key: string
  revoked: boolean
  revokedAt: {
    date: number
    hours: number
    minutes: number
    month: number
    nanos: number
    seconds: number
    time: number
    year: number
  } | null
  scope: string[]
  token: string
  zwUserCode: number
  zwUsername: string
}

// ==================== DEPENDENTES ====================
export interface PactoDependente {
  aulasMarcadas: any[]
  bairro: string
  cadastrarComoDependente: boolean
  cep: string
  cnpj: string | null
  codigoEvento: number | null
  codigoRegistroAcessoPagina: number | null
  complemento: string
  cpf: string
  cpfMae: string | null
  cpfPai: string | null
  cpfResponsavelEmpresa: string
  cpfTitular: string
  dataNascimento: string
  email: string
  endereco: string
  freepass: string | null
  ip: string
  nome: string
  nomeResponsavelEmpresa: string
  numero: string
  origemSistema: string
  passaporte: string
  remetenteConviteMatricula: string | null
  responsavelMae: string | null
  responsavelPai: string | null
  rg: string
  sexo: string
  telefone: string
  tipoDocumento: string
  unidade: number
  urlZw: string | null
  userAgent: string
  usuarioResponsavel: any | null
}

// ==================== HORÁRIOS ====================
export interface PactoHorarioSelecionado {
  ambiente: string
  codigo: number
  diaSemana: string
  diaSemanaNumero: number
  horaFinal: string
  horaInicial: string
  identificador: string
  nivelTurma: string
  nomeTurma: string
  nrMaximoAluno: number
  ocupacao: number
  professor: string
  turma: number
}

// ==================== MODALIDADES ====================
export interface PactoModalidadeSelecionada {
  codigo: number
  modalidade: string
  selectedTimesPerWeek: number
}

// ==================== PRODUTOS ====================
export interface PactoProduto {
  descricao: string
  modalidade: number
  observacao: string
  produto: number
  qtd: number
  valorUnitario: number
}

// ==================== VENDA COMPLETA ====================
export interface PactoVendaDTO {
  apiCredential?: PactoApiCredential
  assinaturaDigital?: string | null
  aulasMarcadas: any[]
  bairro: string
  cep: string
  cidade: number
  clientesCadastradosComoDependentesPlanoCompartilhado: PactoDependente[]
  cnpj: string | null
  cobrancaAntecipada: number
  cobrarParcelasEmAberto: boolean
  codigoCategoriaPlano: number
  codigoColaborador: number
  codigoEvento: number
  codigoRegistroAcessoPagina: number
  complemento: string
  convenioCobranca: number
  cpf: string
  cpfMae: string | null
  cpfPai: string | null
  cpfResponsavelEmpresa: string | null
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
  horariosSelecionados: PactoHorarioSelecionado[]
  ipPublico: string
  locacaoAmbiente: boolean
  locacoesSelecionadas: any[] // List<AgendaDisponibilidadeDTO>
  modalidadesSelecionadas: PactoModalidadeSelecionada[]
  nome: string
  nomeCartao: string
  nomeResponsavelEmpresa: string
  nowLocationIp: string | null
  nrVezesDividir: number
  nrVezesDividirMatricula: number
  numero: string
  numeroCartao: string
  numeroCupomDesconto?: string
  observacaoCliente: string
  origemCobranca: number
  origemSistema: number
  pactoPayComunicacao: number
  pais: number
  parcelasSelecionadas: any | null
  passaporte: string
  permiteInformarDataUtilizacao: boolean
  permitirRenovacao: boolean
  plano: number
  produtos: PactoProduto[]
  responsavelLink: number
  responsavelMae: string | null
  responsavelPai: string | null
  respostaParqJson: string
  rg: string
  sexo: string
  telefone: string
  termoDeUsoAceito: boolean
  tipoParcelamentoCredito: string | null
  todasEmAberto: boolean
  token: string
  unidade: number
  usuarioResponsavel: number
  utm_data: string | null
  validade: string
  vencimentoFatura: number
  vendaConsultor: boolean
}

// ==================== RESPOSTAS DA API ====================

// Resposta de venda aprovada (cartão)
export interface PactoVendaAprovadaResponse {
  return: "APROVADA"
}

// Resposta de venda com boleto/PIX
export interface PactoVendaProcessadaResponse {
  retorno: {
    codigo: number
    status: string
    valor: number
  }
  statusErro?: string
}

// Resposta de cupom
export interface PactoVendaCupomResponse {
  retorno: {
    codigo: number
    status: string
    valor: number
  }
  statusErro?: string
}

// Resposta de termo de aceite
export interface PactoTermoAceiteResponse {
  retorno: {
    codigo: number
    status: string
    valor: number
  }
  statusErro?: string
}

// Resposta de registro de acesso
export interface PactoRegistroAcessoResponse {
  empresa: number
  evento: number
  ip: string
  link: string
  tela: string
  usuario: number
}

// ==================== DADOS DE ACESSO ====================
export interface PactoDadosAcesso {
  empresa: number
  evento: number
  ip: string
  link: string
  tela: string
  usuario: number
}

// ==================== INTERFACES SIMPLIFICADAS PARA NOSSO USO ====================

// Cliente simplificado para nosso sistema
export interface PactoClienteSimplificado {
  nome: string
  cpf: string
  email: string
  telefone: string
  endereco: string
  cidade: string
  estado: string
  cep: string
  dataNascimento?: string
  sexo?: string
  rg?: string
}

// Dados de venda simplificados para nosso sistema
export interface PactoVendaSimplificada {
  unidade: number
  plano: number
  cliente: PactoClienteSimplificado
  cartaoToken?: string // Para pagamentos com cartão tokenizado
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
  numeroCupomDesconto?: string
  observacaoCliente?: string
}

// Função para converter dados simplificados para VendaDTO completo
export function convertToPactoVendaDTO(
  vendaSimplificada: PactoVendaSimplificada,
  apiCredential?: PactoApiCredential
): PactoVendaDTO {
  const now = new Date()
  const dataAtual = now.toLocaleDateString('pt-BR')
  const dataISO = now.toISOString()

  return {
    apiCredential,
    assinaturaDigital: null,
    aulasMarcadas: [],
    bairro: vendaSimplificada.cliente.cidade || '',
    cep: vendaSimplificada.cliente.cep || '',
    cidade: 0, // Será mapeado baseado na cidade
    clientesCadastradosComoDependentesPlanoCompartilhado: [],
    cnpj: null,
    cobrancaAntecipada: 0,
    cobrarParcelasEmAberto: true,
    codigoCategoriaPlano: 1,
    codigoColaborador: 1,
    codigoEvento: 0,
    codigoRegistroAcessoPagina: 0,
    complemento: '',
    convenioCobranca: 1,
    cpf: vendaSimplificada.cliente.cpf,
    cpfMae: null,
    cpfPai: null,
    cpfResponsavelEmpresa: null,
    cpftitularcard: vendaSimplificada.cliente.cpf,
    cvv: vendaSimplificada.cartao?.cvv || '',
    dataInicioContrato: dataAtual,
    dataInicioVendaProdutos: dataISO,
    dataLancamento: dataAtual,
    dataNascimento: vendaSimplificada.cliente.dataNascimento || '01/01/1990',
    dataUtilizacao: vendaSimplificada.dataUtilizacao,
    diaVencimento: 5,
    email: vendaSimplificada.cliente.email,
    endereco: vendaSimplificada.cliente.endereco,
    enviarEmail: true,
    estado: 0, // Será mapeado baseado no estado
    horariosSelecionados: [],
    ipPublico: vendaSimplificada.ipPublico,
    locacaoAmbiente: false,
    locacoesSelecionadas: [],
    modalidadesSelecionadas: [],
    nome: vendaSimplificada.cliente.nome,
    nomeCartao: vendaSimplificada.cartao?.nome || vendaSimplificada.cliente.nome.toUpperCase(),
    nomeResponsavelEmpresa: '',
    nowLocationIp: null,
    nrVezesDividir: 1,
    nrVezesDividirMatricula: 1,
    numero: '',
    numeroCartao: vendaSimplificada.cartao?.numero || '',
    numeroCupomDesconto: vendaSimplificada.numeroCupomDesconto,
    observacaoCliente: vendaSimplificada.observacaoCliente || 'Venda online',
    origemCobranca: 0,
    origemSistema: vendaSimplificada.origemSistema,
    pactoPayComunicacao: 0,
    pais: 1,
    parcelasSelecionadas: null,
    passaporte: '',
    permiteInformarDataUtilizacao: true,
    permitirRenovacao: false,
    plano: vendaSimplificada.plano,
    produtos: [],
    responsavelLink: 1,
    responsavelMae: null,
    responsavelPai: null,
    respostaParqJson: '',
    rg: vendaSimplificada.cliente.rg || '',
    sexo: vendaSimplificada.cliente.sexo || 'M',
    telefone: vendaSimplificada.cliente.telefone,
    termoDeUsoAceito: vendaSimplificada.termoDeUsoAceito,
    tipoParcelamentoCredito: null,
    todasEmAberto: false,
    token: vendaSimplificada.cartaoToken || '',
    unidade: vendaSimplificada.unidade,
    usuarioResponsavel: 0,
    utm_data: null,
    validade: vendaSimplificada.cartao?.validade || '',
    vencimentoFatura: 5,
    vendaConsultor: false
  }
}

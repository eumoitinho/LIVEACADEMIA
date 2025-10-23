// Types for Pacto Checkout Configuration and Related APIs

export interface VendasConfig {
  habilitarAgendamentoAulaExperimentalLinkVisitante: boolean;
  configSescHabilitada: boolean;
  googleTagIdHotsite: string;
  cor: string;
  usarFormaPagamentoPlanoProduto: boolean;
  apresentarValorTotalDoPlanoNaTelaDeSelecaoDoPlano: boolean;
  urlLinkGooglePlay: string;
  apresentarCartao: boolean;
  apresentarCartaoVenda: boolean;
  urlLinkAppleStore: string;
  apresentarTermoAceiteLinkPag: boolean;
  apresentarCPFLinkPag: boolean;
  apresentarCartaoRegua: boolean;
  apresentarPix: boolean;
  analyticsId: string;
  cobrarProdutoJuntoAdesaoMatricula: string;
  exibirTipoDocumentoTelaVendasOnline: boolean;
  temaescuro: boolean;
  primeiraCobrancaPixEGuardarCartao: boolean;
  tipoConvenio: string;
  detalharParcelaTelaCheckout: string;
  apresentarBoletoRegua: boolean;
  selecionarUnidadeListaPlano: boolean;
  modalidadesIniciarSelecionadasContratoTurma: boolean;
  apresentarPixRegua: boolean;
  ativarLinksGooglePlayEAppleStore: boolean;
  permitirMudarTipoParcelamento: boolean;
  apresentarPixVenda: boolean;
  temaclaro: boolean;
  apresentarDtFaturaLinkPag: boolean;
  permiteVendaProdutoAlunoOutraUnidade: boolean;
  apresentarvaloranuidade: string;
  apresentarBoletoVenda: boolean;
  permiteRenovacaoDeContrato: boolean;
  exibeDataUtilizacao: boolean;
  apresentarBoleto: boolean;
  camposAdicionais: CampoAdicional[];
  camposAdicionaisProduto: CampoAdicional[];
  permitecontratosconcomintante: string;
  camposAdicionaisProdutoFlow: string[];
  cobrarPrimeiraParcelaCompra: string;
  permiteProsseguirMesmoCpfOuEmailCadastroVisitante: boolean;
  tokenApiConversao: string;
  verificarCpfAlunoAntesEscolha: boolean;
  camposAdicionaisProdutoPlano: any[];
  url: string;
  camposAdicionaisPlanoFlow: string[];
  pixelId: string;
  habilitarPreCadastro: boolean;
  tema: string;
  googleTagId: string;
  titulocheckout: string;
}

export type CampoAdicional =
  | "TELEFONE"
  | "CEP"
  | "ENDERECO"
  | "NUMERO"
  | "BAIRRO"
  | "COMPLEMENTO"
  | "SEXO"
  | "DT_NASCIMENTO"
  | "ParQ"
  | "CUPOM_DESCONTO"
  | "RG"
  | "CIDADE"
  | "ESTADO"
  | "EMAIL"
  | "CPF"
  | "NOME";

export interface AddLeadPayload {
  email: string;
  nome: string;
  telefone: string;
  idade?: number;
  landing?: string;
  landing_url?: string;
  mensagem?: string;
}

export interface AddLeadResponse {
  success: boolean;
  data?: {
    Lead: string;
  };
  error?: string;
}

export interface ParqResposta {
  codigo: number;
  descricao: string;
}

export interface ParqPergunta {
  codigo: number;
  tipoPergunta: "SIM_NAO" | "MULTIPLA_ESCOLHA" | "TEXTO";
  descricao: string;
  respostas: ParqResposta[];
}

export interface ParqQuestionario {
  codigo: number;
  tipoQuestionario: "parq";
  descricao: string;
  perguntas: ParqPergunta[];
}

export interface ParqResponse {
  parq: ParqQuestionario;
  apresentarLeiParq: boolean;
  siglaEstadoLeiParq?: string;
}

export interface ParqAnswer {
  perguntaCodigo: number;
  respostaCodigo: number;
}

export interface ParqSubmitPayload {
  leadId: string;
  respostas: ParqAnswer[];
  aceitouTermos: boolean;
}

export interface CepData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}

export interface CheckoutConfigContext {
  config: VendasConfig | null;
  loading: boolean;
  error: string | null;
  leadId?: string;
  parqCompleted?: boolean;
}

export interface PreCadastroData {
  nome: string;
  email: string;
  telefone: string;
}

export interface CheckoutStep {
  step: 'pre-cadastro' | 'parq' | 'dados-pessoais' | 'pagamento' | 'processando' | 'sucesso' | 'erro';
  label: string;
  completed: boolean;
}
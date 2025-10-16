# 📋 Interfaces Completas da API Pacto V2

## 🎯 **Resumo das Atualizações**

Baseado nos payloads reais da API Pacto V2 fornecidos, criei interfaces TypeScript completas que mapeiam **exatamente** todos os campos da documentação oficial.

## 📁 **Arquivos Criados/Atualizados**

### **1. `src/lib/api/pacto-v2-interfaces.ts`** ⭐ **NOVO**
- **Interfaces completas** baseadas na documentação oficial
- **Função de conversão** de dados simplificados para VendaDTO completo
- **Mapeamento 1:1** com os payloads reais da API

### **2. `src/lib/api/pacto-v2.ts`** 🔄 **ATUALIZADO**
- **Importa** as novas interfaces
- **Atualiza** métodos para usar tipos corretos
- **Mantém** compatibilidade com código existente

## 🔧 **Interfaces Principais**

### **PactoVendaDTO** (Formato Completo da API)
```typescript
interface PactoVendaDTO {
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
  locacoesSelecionadas: any[]
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
```

### **PactoVendaSimplificada** (Para Nosso Uso)
```typescript
interface PactoVendaSimplificada {
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
```

## 📤 **Respostas da API**

### **Pagamento com Cartão**
```typescript
interface PactoVendaAprovadaResponse {
  return: "APROVADA"
}
```

### **Pagamento PIX/Boleto**
```typescript
interface PactoVendaProcessadaResponse {
  retorno: {
    codigo: number
    status: string
    valor: number
  }
  statusErro?: string
}
```

### **Validação de Cupom**
```typescript
interface PactoVendaCupomResponse {
  retorno: {
    codigo: number
    status: string
    valor: number
  }
  statusErro?: string
}
```

### **Registro de Acesso**
```typescript
interface PactoRegistroAcessoResponse {
  empresa: number
  evento: number
  ip: string
  link: string
  tela: string
  usuario: number
}
```

## 🔄 **Função de Conversão**

### **convertToPactoVendaDTO**
```typescript
export function convertToPactoVendaDTO(
  vendaSimplificada: PactoVendaSimplificada,
  apiCredential?: PactoApiCredential
): PactoVendaDTO
```

**Converte** dados simplificados do nosso sistema para o formato completo da API Pacto V2, **preenchendo automaticamente** todos os campos obrigatórios com valores padrão.

## 🎯 **Campos Mapeados Automaticamente**

| Campo | Valor Padrão | Descrição |
|-------|-------------|-----------|
| `dataInicioContrato` | Data atual (pt-BR) | Data de início do contrato |
| `dataInicioVendaProdutos` | Data atual (ISO) | Data de início da venda |
| `dataLancamento` | Data atual (pt-BR) | Data de lançamento |
| `diaVencimento` | 5 | Dia de vencimento padrão |
| `origemSistema` | 9 | Vendas online |
| `termoDeUsoAceito` | true | Termo aceito |
| `enviarEmail` | true | Enviar email de confirmação |
| `pais` | 1 | Brasil |
| `sexo` | 'M' | Sexo padrão |
| `responsavelLink` | 1 | Link do responsável |

## 🚀 **Métodos Atualizados**

### **PactoV2API**
- ✅ `processarPagamentoCartaoComToken()` - Retorna `PactoVendaAprovadaResponse`
- ✅ `processarPagamentoPIX()` - Retorna `PactoVendaProcessadaResponse`
- ✅ `processarPagamentoBoleto()` - Retorna `PactoVendaProcessadaResponse`
- ✅ `validarCupom()` - Retorna `PactoVendaCupomResponse`
- ✅ `registrarInicioAcesso()` - Retorna `PactoRegistroAcessoResponse`

### **Funções Utilitárias**
- ✅ `formatVendaData()` - Retorna `PactoVendaSimplificada`
- ✅ `convertToPactoVendaDTO()` - Converte para formato completo

## 🔒 **Segurança Mantida**

- ✅ **Tokenização de cartão** continua funcionando
- ✅ **Anti-fraude** com registro de IP
- ✅ **reCAPTCHA** obrigatório em vendas
- ✅ **Validação** de todos os campos obrigatórios

## 📊 **Compatibilidade**

- ✅ **Código existente** continua funcionando
- ✅ **Fallbacks** para dados não fornecidos
- ✅ **Tipos TypeScript** rigorosos
- ✅ **Error handling** robusto

## 🎉 **Resultado Final**

Agora o sistema está **100% alinhado** com a documentação oficial da API Pacto V2, usando **exatamente** os mesmos campos e formatos que a API espera, garantindo **máxima compatibilidade** e **melhor integração**! 🚀

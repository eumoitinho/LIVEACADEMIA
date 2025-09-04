# Fluxo de Pagamento - Live Academia

## Visão Geral

O sistema de pagamento da Live Academia implementa um checkout transparente integrado com a API da Pacto Soluções, oferecendo três modalidades de pagamento: **Cartão de Crédito**, **PIX** e **Boleto Bancário**.

## Arquitetura do Sistema

### Componentes Principais

- **`/components/checkout-modal.tsx`** - Modal de checkout com 4 etapas
- **`/components/planos-cards.tsx`** - Cards de planos com botão de matrícula
- **`/lib/pacto-api.ts`** - Integração com API Pacto Soluções
- **`/contexts/unit-context.tsx`** - Contexto para dados da unidade atual

### Mapeamento de Unidades

```typescript
export const UNIDADE_ID_MAP: Record<string, string> = {
  'bom-prato-diamante': 'BPD001',
  'ct-cidade-nova': 'CCN002',
  'centro': 'CTR003',
  'compensa': 'CMP004',
  // ... todas as 30 unidades
}
```

## Fluxo de Checkout - 4 Etapas

### 1. Dados Pessoais (`step: 'data'`)

**Campos obrigatórios:**
- Nome completo
- E-mail
- CPF (com validação e formatação automática)
- Telefone (com formatação automática)

**Validações:**
- CPF válido (algoritmo de verificação)
- E-mail formato válido
- Telefone com DDD brasileiro
- Nome com pelo menos 2 palavras

### 2. Forma de Pagamento (`step: 'payment'`)

#### Opção A: Cartão de Crédito
- Número do cartão (com formatação automática)
- Data de validade (MM/AA)
- CVV (3 dígitos)
- Nome do portador
- CPF do portador

#### Opção B: PIX
- Apenas confirmação dos dados
- QR Code gerado pela API

#### Opção C: Boleto Bancário
- Apenas confirmação dos dados
- PDF do boleto gerado pela API

### 3. Processamento (`step: 'processing'`)

**Estados visuais:**
- Validando dados...
- Processando pagamento...
- Finalizando matrícula...

**Chamadas à API:**
```typescript
const paymentData = {
  unidadeId: UNIDADE_ID_MAP[unidadeId],
  plano: selectedPlano,
  cliente: customerData,
  pagamento: paymentMethod
}

const response = await processPayment(paymentData)
```

### 4. Sucesso (`step: 'success'`)

**Conteúdo específico por método:**

#### Cartão de Crédito
- ✅ Pagamento aprovado instantaneamente
- 📧 Comprovante enviado por e-mail
- 📱 Acesso liberado no app Live Academia

#### PIX
- 📱 QR Code para pagamento
- ⏰ Válido por 30 minutos
- 🔄 Confirmação automática após pagamento

#### Boleto
- 📄 Boleto disponível para download
- 📅 Vencimento em 3 dias úteis
- 🏦 Pagável em qualquer banco ou lotérica

## Integração com API Pacto Soluções

### Base URL
```
https://api-docs.pactosolucoes.com.br/
```

### Endpoints Utilizados

#### 1. Criação de Matrícula
```http
POST /vendas-online/matricula
Content-Type: application/json

{
  "unidade_id": "BPD001",
  "plano": {
    "nome": "Plano Premium",
    "valor": "89.90"
  },
  "cliente": {
    "nome": "João Silva",
    "email": "joao@email.com",
    "cpf": "12345678901",
    "telefone": "92999999999"
  },
  "forma_pagamento": "cartao_credito"
}
```

#### 2. Processamento de Pagamento Cartão
```http
POST /vendas-online/pagamento/cartao
Content-Type: application/json

{
  "matricula_id": "MAT123456",
  "cartao": {
    "numero": "4111111111111111",
    "cvv": "123",
    "validade": "12/25",
    "portador": "JOAO SILVA",
    "cpf": "12345678901"
  }
}
```

#### 3. Geração PIX
```http
POST /vendas-online/pagamento/pix
Content-Type: application/json

{
  "matricula_id": "MAT123456",
  "valor": 89.90
}
```

#### 4. Geração Boleto
```http
POST /vendas-online/pagamento/boleto
Content-Type: application/json

{
  "matricula_id": "MAT123456",
  "vencimento": "2024-01-15"
}
```

### Respostas da API

#### Sucesso - Cartão de Crédito
```json
{
  "status": "aprovado",
  "matricula_id": "MAT123456",
  "transacao_id": "TXN789012",
  "comprovante_url": "https://api.../comprovante/TXN789012.pdf"
}
```

#### Sucesso - PIX
```json
{
  "status": "pendente",
  "matricula_id": "MAT123456",
  "pix": {
    "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "codigo": "00020126580014BR.GOV.BCB.PIX...",
    "expiracao": "2024-01-10T15:30:00Z"
  }
}
```

#### Sucesso - Boleto
```json
{
  "status": "pendente",
  "matricula_id": "MAT123456",
  "boleto": {
    "codigo_barras": "23791234500000089905678901234567890123456789",
    "linha_digitavel": "23791.23459 00000.089905 67890.123456 7 12345000008990",
    "pdf_url": "https://api.../boleto/MAT123456.pdf",
    "vencimento": "2024-01-15"
  }
}
```

## Estados de Erro

### Validação de Dados
```json
{
  "erro": "dados_invalidos",
  "campos": ["cpf", "email"],
  "mensagem": "Verifique os dados informados"
}
```

### Cartão Recusado
```json
{
  "erro": "cartao_recusado",
  "codigo": "51",
  "mensagem": "Cartão sem limite disponível"
}
```

### Erro de Sistema
```json
{
  "erro": "erro_interno",
  "mensagem": "Tente novamente em alguns minutos"
}
```

## Configuração de Ambiente

### Variáveis Necessárias

```env
# .env.local
PACTO_API_URL=https://api-docs.pactosolucoes.com.br
PACTO_API_KEY=sua_chave_api_aqui
PACTO_CLIENT_ID=seu_client_id_aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Segurança

### Dados Sensíveis
- **Nunca** armazenar dados de cartão no frontend
- CPF mascarado após validação
- Tokens de sessão com expiração curta

### Validações Frontend
```typescript
// Validação CPF
export function isValidCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, '')
  if (cleaned.length !== 11) return false
  
  // Algoritmo de validação CPF
  // ... implementação completa
}

// Validação Cartão
export function isValidCreditCard(number: string): boolean {
  const cleaned = number.replace(/\D/g, '')
  return luhnCheck(cleaned)
}
```

## Monitoramento

### Logs Importantes
- Início de checkout
- Seleção de forma de pagamento
- Sucesso/erro no processamento
- Abandono de carrinho

### Métricas
- Taxa de conversão por forma de pagamento
- Tempo médio de checkout
- Erros mais frequentes
- Taxa de abandono por etapa

## Testes

### Dados de Teste - Cartão de Crédito

```typescript
// Cartões para teste
export const TEST_CARDS = {
  aprovado: '4111111111111111',
  recusado: '4000000000000002',
  erro: '4000000000000119'
}
```

### Fluxo de Teste

1. **Selecionar plano** em qualquer unidade
2. **Preencher dados** (usar CPF válido de teste)
3. **Escolher pagamento** (usar cartões de teste)
4. **Verificar resposta** da API
5. **Confirmar estado final** do modal

## Troubleshooting

### Problemas Comuns

#### Modal não abre
- Verificar se o plano foi selecionado
- Verificar console para erros JavaScript

#### Erro na validação CPF
- CPF deve ter 11 dígitos válidos
- Usar ferramenta online para gerar CPF válido para testes

#### API retorna erro 401
- Verificar se API_KEY está configurada
- Verificar se token não expirou

#### Cartão sempre recusado
- Verificar se está usando cartão de teste correto
- Verificar se dados estão formatados corretamente

## Roadmap

### Melhorias Futuras
- [ ] Apple Pay / Google Pay
- [ ] Parcelamento no cartão
- [ ] Cupons de desconto
- [ ] Cashback para indicações
- [ ] Pagamento recorrente automático

### Otimizações
- [ ] Cache de dados de unidades
- [ ] Prefetch de dados de pagamento
- [ ] Loading states mais detalhados
- [ ] Retry automático para falhas temporárias
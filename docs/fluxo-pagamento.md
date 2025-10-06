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

### Base URL Oficial
```
https://apigw.pactosolucoes.com.br
```

> Status: Migração para **V3 (/psec)** concluída. Endpoints `v2` removidos do código (mantidos aqui apenas como referência histórica). O módulo `lib/pacto-api.ts` usa exclusivamente endpoints `/psec`.

### Chave de Rede / Unidade
Cada rede ou unidade possui uma chave própria (ex.: `chaverede`) usada em diversos endpoints.

Estratégia recomendada de variáveis de ambiente:
```
PACTO_REDE_KEY=<chave_da_rede_principal>
PACTO_UNIDADE_KEY_TORRES=<chave_unidade>
PACTO_UNIDADE_KEY_CENTRO=<chave_unidade>
# ... uma por unidade conforme necessidade
```
Resolver em runtime via função utilitária, ex.: `resolveUnidadeKey(slug)`.

### Autenticação
| Versão | Endpoint | Status | Observações |
|--------|----------|--------|-------------|
| v2 (LEGADO) | `POST /v2/vendas/tkn/{secretKey}` | Desativado | Removido do código |
| v3 (ATUAL) | `POST /psec/vendas/token` | Em uso | Token + expiração (cache em memória) |

### Template CURL Genérico
```
curl -X 'GET' \
  'https://apigw.pactosolucoes.com.br/{endpoint}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <TOKEN>'
```

---
### Catálogo de Endpoints (Agrupado)
Os endpoints fornecidos foram organizados por domínio. Aqueles já utilizados hoje no código estão marcados com ✅. Recomendações de migração para V3 marcadas com ▶.

#### 1. Saúde / Configuração
| Endpoint | Método | Descrição | Status |
|----------|--------|-----------|--------|
| `/psec/vendas/health` | GET | Health check V3 | Planejado |
| `/psec/vendas/configs` | GET | Configs empresa V3 | Planejado |
| `/v2/vendas/configs/{codigo}` | GET | Configs unidade | Planejado |
| `/v2/vendas/configs/{codigo}/tela/{nometela}` | GET | Config especifica por tela | Planejado |

#### 2. Unidades / Rede
| Endpoint | Método | Descrição | Status |
|----------|--------|-----------|--------|
| `/psec/vendas/unidades` | GET | Unidades por chave (V3) | ✅ Em uso |
| `/psec/vendas/{chaverede}/unidadesRede` | GET | Unidades por rede (V3) | Planejado |
| `/v2/vendas/unidades` | GET | Unidades por chave | Removido |
| `/v2/vendas/unidade/{codigo}` | GET | Unidade específica | Planejado |
| `/psec/vendas/unidade` | GET | Unidade específica (V3) | ▶ Preferir |
| `/v2/vendas/imagens/{codigo}` | GET | Imagens unidade | Planejado |

#### 3. Planos / Produtos
| Endpoint | Método | Descrição | Status |
|----------|--------|-----------|--------|
| `/psec/vendas/planos` | GET | Planos da empresa (V3) | ✅ Em uso (filtragem via query) |
| `/v2/vendas/planos/{codigo}` | GET | Planos unidade | Removido |
| `/v2/vendas/plano/{unidade}/{codigo}` | GET | Detalhe plano | Planejado |
| `/v2/vendas/planosPactoFlow/{codigoUnidade}` | GET | Planos PactoFlow | Avaliar |
| `/psec/vendas/produtos/{categoria}` | GET | Produtos por categoria (V3) | Planejado |
| `/v2/vendas/produtos/{empresa}/{categoria}` | GET | Produtos (v2) | Planejado |
| `/v2/vendas/produto/{empresa}/{produto}` | GET | Produto específico | Planejado |

#### 4. Simulação / Pré-venda
| Endpoint | Método | Descrição | Status |
|----------|--------|-----------|--------|
| `/v2/vendas/simular/{plano}/{unidade}` | POST | Simular contrato | Planejado |
| `/v2/vendas/simularV2/{unidade}` | POST | Simular contrato v2 | ✅ Usado (função `simularVenda`) |
| `/psec/vendas/simularVenda/{plano}` | POST | Simular venda (V3) | ✅ Em uso |

#### 5. Venda / Checkout
| Endpoint | Método | Descrição | Status |
|----------|--------|-----------|--------|
| `/psec/vendas/cadastrarVenda` | POST | Cadastrar venda (V3 fluxo unificado) | ✅ Em uso |
| `/v2/vendas/alunovendaonline/{captcha}` | POST | Pagamento Cartão | Removido |
| `/v2/vendas/alunovendaonlinepix/{captcha}` | POST | Pagamento PIX | Removido |
| `/v2/vendas/alunovendaonlineboleto/{captcha}` | POST | Pagamento Boleto | Removido |
| `/psec/vendas/validarCupomDesconto` | POST | Validar cupom (V3) | ✅ Em uso |
| `/v2/vendas/adicionarCupomDescontoSite` | POST | Adicionar cupom | Avaliar |
| `/v2/vendas/comprovanteTermoAceite` | POST | Registrar aceite termo | Planejado |

#### 6. Anti-fraude / Segurança
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/v2/vendas/blacklist` (GET/POST/DELETE) | Gerenciar blacklist IP persistente |
| `/v2/vendas/blacklist/memory` | Blacklist em memória |
| `/v2/vendas/blacklist/memory/reload` | Recarregar blacklist memória |
| `/v2/vendas/blacklistcartao` (GET/POST/DELETE) | Blacklist cartões |
| `/v2/vendas/blacklistcartao/memory` | Blacklist cartões memória |
| `/v2/vendas/blacklistcartao/memory/reload` | Recarregar cartões |
| `/v2/vendas/cardEightDigitsMsgTries` | Registrar tentativas irreversíveis por cartão |
| `/v2/vendas/ipstries` | Tentativas por IP |
| `/v2/vendas/ipstries/reload` | Recarregar sistema antifraude |
| `/v2/vendas/ipstries/unblock` | Desbloquear IP/cartão |
| `/v2/vendas/ipstries/unblock/card` | Desbloquear cartão |
| `/v2/vendas/ipstries/unblock/ip` | Desbloquear IP |
| `/v2/vendas/whitelist` (GET/POST/DELETE) | Whitelist IP |
| `/v2/vendas/whitelist/memory` | Whitelist memória |
| `/v2/vendas/whitelist/memory/reload` | Recarregar whitelist |

#### 7. Parcelas / Cobrança
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/v2/vendas/cobrarparcelasabertas/{matricula}` | POST | Cobrar parcelas abertas |
| `/v2/vendas/cobrarParcelasAbertasBoleto/{matricula}` | POST | Cobrar via Boleto |
| `/v2/vendas/cobrarParcelasAbertasPix/{matricula}` | POST | Cobrar via PIX |
| `/v2/vendas/v2/cobrarParcelasAbertasPix/{matricula}` | POST | Cobrança PIX v2 |
| `/v2/vendas/consultarParcelasPix/{codigo}` | POST | Consultar parcelas para PIX |

#### 8. Contratos / Documentos
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/v2/vendas/contrato/{codigo}` | GET | Plano de um contrato |
| `/v2/vendas/contratoImp/{codigo}` | GET | Imprimir contrato |
| `/v2/vendas/plano/{unidade}/contrato/{plano}` | GET | Gerar contrato em branco |

#### 9. Aulas / Modalidades
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/v2/vendas/aulas/{empresa}` | GET | Aulas disponíveis |
| `/v2/vendas/aulasColetivas/{empresa}` | GET | Aulas coletivas |
| `/v2/vendas/turmas/{modalidades}/{empresa}/{idade}` | GET | Turmas por modalidade/idade |

#### 10. Consultores / Convenios / Diversos
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/v2/vendas/consultores/{empresa}` | GET | Consultores |
| `/v2/vendas/convenios/{empresa}` | GET | Convênios |
| `/v2/vendas/{empresa}/taxasparcelamento` | POST | Taxa de parcelamento Stone |
| `/v2/vendas/aluno/{matricula}` | GET | Dados aluno |
| `/v2/vendasonlineicv/registrarInicioAcessoPagina` | POST | Registrar início acesso página |
| `/v2/vendasonlineicv/{codigo}` | GET | Consultar registro acesso |
| `/v2/vendas/logoEmail/{crypt}` | GET | Logo para email |
| `/v2/t/vendas/remTest` | DELETE | Remover aluno de teste |

---
### Resumo de Endpoints Ativos (Pós-Migração)
| Domínio | Endpoint | Uso |
|---------|----------|-----|
| Autenticação | `POST /psec/vendas/token` | Gera token (cache in-memory) |
| Unidades | `GET /psec/vendas/unidades` | Lista unidades |
| Planos | `GET /psec/vendas/planos?unidade={codigo}` | Planos filtrados |
| Simulação | `POST /psec/vendas/simularVenda/{plano}` | Simulação checkout |
| Venda | `POST /psec/vendas/cadastrarVenda` | Criação unificada (cartão/pix/boleto) |
| Cupom | `POST /psec/vendas/validarCupomDesconto` | Validação cupom |

### Migração V3 - Status
Concluída: (preencher data de deploy)

Principais mudanças:
1. Remoção total de chamadas v2 no código.
2. Token com expiração e cache primitivo.
3. Unificação de fluxo de pagamento em um endpoint único.
4. Schemas Zod para validação de todas as respostas (`lib/pacto-schemas.ts`).
5. Timeout + retry básico implementados nas requisições.
6. Captcha retirado (não requerido no fluxo V3 atual).

---
### Política de Segurança / Anti-fraude (Planejada)
Não implementado ainda, mas definido:
1. Registrar tentativas de falha por IP/cartão → armazenar contador local + opção futura de consultar `/v2/vendas/ipstries`.
2. Se exceder limite (ex. 5 em 10min) → bloquear nova tentativa e sugerir contato.
3. Integrar endpoints de blacklist somente após validação de caso de uso (evitar uso prematuro):
   - IP suspeitos → `/v2/vendas/blacklist`
   - Cartão fraudulento → `/v2/vendas/blacklistcartao`
4. Whitelist para IPs internos se necessário (suporte / operação).
5. Logging estruturado: `categoria=checkout antifraude=tentativa_excedida ip=... cartão_final=1234`.

---
### Variáveis de Ambiente (Atual)
```
PACTO_API_URL=https://apigw.pactosolucoes.com.br
```
As chaves sensíveis da Pacto não ficam mais em variáveis de ambiente por unidade ou chave global. Cada unidade possui sua `chave_api` armazenada (criptografada) em `units.chave_api`. Os route handlers obtêm a unidade (`getUnitBySlug`), decriptam a chave e passam como `redeKey` para o wrapper `pacto-api.ts`.

Benefícios:
1. Rotação individual por unidade sem reiniciar processo.
2. Menor superfície de erro (não depende de env global inconsistente).
3. Logs associam falhas à unidade específica.

Fallback: se unidade não existe ou não tem chave, rotas retornam 404 / 503 ou planos estáticos (somente `/planos`).

---
### Boas Práticas ao Consumir os Endpoints
1. Sempre validar respostas com Zod (status, campos obrigatórios)
2. Implementar retry somente para erros 5xx (ex. 2 tentativas)
3. Timeout client (ex.: abort controller em 12s)
4. Sanitizar CPF/telefone antes de enviar
5. Obfuscar últimos dígitos de cartão em logs (`**** **** **** 1234`)
6. Registrar evento analytics `payment_attempt` antes da chamada e `payment_result` após


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
PACTO_API_URL=https://apigw.pactosolucoes.com.br
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
# Plano de Tagueamento / Analytics - Live Academia

## Objetivo
Mapear todos os eventos críticos de negócio (aquisição, engajamento e conversão) garantindo rastreabilidade completa do funil de matrícula (checkout transparente) e engajamento com conteúdo, para GA4, Meta Pixel e DataLayer (GTM).

## Stack de Tracking
| Camada | Ferramenta | Objetivo |
|--------|------------|----------|
| Data Collection | `dataLayer` (GTM) | Ponto central de eventos padronizados |
| Analytics | GA4 | Métricas de engajamento e funil |
| Ads / Performance | Meta Pixel | Campanhas de conversão (lead / purchase) |
| Futuro | Segment / RudderStack (opcional) | Enriquecimento multi-destino |

## Convenções Gerais
- Nome de evento em `snake_case`
- Parâmetros em `snake_case`
- Valores monetários SEMPRE em centavos em parâmetro interno e convertidos apenas na camada de visualização
- IDs consistentes: `unidade_id`, `plano_id`, `transacao_id`
- Evitar PII direto: mascarar CPF (últimos 3 dígitos) se necessário

## Estrutura Base do dataLayer
```ts
interface BaseEvent {
  event: string
  timestamp: string // ISO
  env: string // dev, staging, prod
  session_id?: string
  user_id?: string // quando logado futuramente
}
```

## Eventos (Tabela Resumo)
| Evento | Momento | Objetivo | Principais Parâmetros |
|--------|---------|----------|-----------------------|
| `page_view` | Cada navegação | Métricas básicas | `page_path`, `page_title`, `unidade_id?` |
| `cta_click` | Clique em botões principais | Atribuição | `cta_name`, `location` |
| `plan_view` | Exibição de card de plano em viewport | Popularidade | `plano_id`, `plano_nome`, `unidade_id?` |
| `plan_select` | Usuário clica em "Matricular" | Início funil | `plano_id`, `plano_valor`, `unidade_id` |
| `checkout_start` | Modal etapa 1 aberta | Início checkout | `plano_id`, `plano_valor`, `unidade_id` |
| `checkout_step_view` | Entrada em cada etapa | Diagnóstico | `step_name`, `step_index` |
| `checkout_abandon` | Fechou modal antes de concluir | Perda | `step_name`, `plano_id` |
| `payment_method_select` | Escolheu forma pagamento | Otimização UX | `payment_method` |
| `coupon_validate` | Validou cupom | Tracking marketing | `cupom_code`, `valid` |
| `payment_attempt` | Antes da chamada API pagamento | Sucesso/erro taxa | `payment_method`, `plano_id`, `valor` |
| `payment_result` | Resposta API | Conversão | `status`, `payment_method`, `transacao_id?`, `valor` |
| `pix_qr_generated` | QR Code exibido | Acompanhamento PIX | `plano_id`, `valor`, `expiracao` |
| `pix_confirmed` | Confirmação de pagamento PIX | Conversão | `transacao_id`, `valor` |
| `boleto_generated` | Boleto emitido | Acompanhamento | `plano_id`, `valor`, `vencimento` |
| `boleto_paid` | Confirmação boleto (futuro backend) | Conversão | `transacao_id`, `valor` |
| `purchase` | Evento final (GA4 / Meta) | Conversão final | `transaction_id`, `value`, `currency` |
| `lead_submit` | Form Trabalhe Conosco / Contato | Geração lead | `form_id`, `success` |
| `carousel_interaction` | Interação carrossel unidades | Engajamento | `carousel_id`, `action`, `item_index` |
| `unit_view` | Unidade em foco/rota | Interesse unidade | `unidade_id`, `categoria` |

## Detalhamento de Eventos
### 1. page_view
```json
{
  "event": "page_view",
  "page_path": "/unidades",
  "page_title": "Unidades - Live Academia",
  "unidade_id": "torres",
  "timestamp": "2025-09-20T12:00:00.000Z"
}
```
Fonte: Hook de roteamento (`usePathname` + `useEffect`).

### 2. plan_select
```json
{
  "event": "plan_select",
  "plano_id": "diamante",
  "plano_nome": "Plano Diamante",
  "plano_valor": 8990,
  "unidade_id": "torres",
  "timestamp": "..."
}
```

### 3. checkout_start
Emitido ao abrir modal etapa 1.
```json
{
  "event": "checkout_start",
  "plano_id": "diamante",
  "plano_valor": 8990,
  "unidade_id": "torres"
}
```

### 4. checkout_step_view
```json
{
  "event": "checkout_step_view",
  "step_name": "dados_pessoais",
  "step_index": 1
}
```

### 5. payment_attempt
```json
{
  "event": "payment_attempt",
  "payment_method": "cartao",
  "plano_id": "diamante",
  "valor": 8990
}
```

### 6. payment_result
```json
{
  "event": "payment_result",
  "status": "aprovado", // aprovado | pendente | recusado | erro
  "payment_method": "cartao",
  "plano_id": "diamante",
  "valor": 8990,
  "transacao_id": "TXN123"
}
```
Se `status=aprovado` ou confirmação PIX -> gerar também GA4 `purchase`:
```js
dataLayer.push({
  event: 'purchase',
  transaction_id: 'TXN123',
  value: 89.9,
  currency: 'BRL',
  items: [{
    item_id: 'plano_diamante',
    item_name: 'Plano Diamante',
    price: 89.9,
    quantity: 1,
    unidade_id: 'torres'
  }]
})
```

### 7. pix_qr_generated
```json
{
  "event": "pix_qr_generated",
  "plano_id": "diamante",
  "valor": 8990,
  "expiracao": "2025-09-20T13:15:00Z"
}
```

### 8. boleto_generated
```json
{
  "event": "boleto_generated",
  "plano_id": "diamante",
  "valor": 8990,
  "vencimento": "2025-09-25"
}
```

### 9. lead_submit
```json
{
  "event": "lead_submit",
  "form_id": "trabalhe_conosco",
  "success": true
}
```

## Mapeamento GA4 Principais
| Evento Interno | GA4 Nome | Campos Chave |
|----------------|----------|--------------|
| page_view | page_view (auto) | page_location, page_title |
| plan_select | select_item | item_id, item_name, value |
| checkout_start | begin_checkout | value, items |
| payment_result (aprovado) | purchase | transaction_id, value, currency, items |
| lead_submit | generate_lead | form_id |

## Meta Pixel (Conversões Principais)
| Evento Interno | Meta Standard | Observações |
|----------------|---------------|-------------|
| checkout_start | InitiateCheckout | `content_ids`, `value`, `currency` |
| payment_result aprovado | Purchase | `event_id` = transacao_id |
| lead_submit | Lead | `content_name` = form_id |

## Priorização de Implementação
1. Wrapper `track()` + enum de eventos
2. Emissão de `page_view` manual (caso SPA transitions)
3. Checkout: `plan_select`, `checkout_start`, `checkout_step_view`, `payment_attempt`, `payment_result`
4. PIX e Boleto específicos
5. Leads e carrosséis

## Implementação Técnica Proposta
Arquivo `lib/analytics.ts` (a criar):
```ts
export const AnalyticsEvents = {
  PAGE_VIEW: 'page_view',
  PLAN_SELECT: 'plan_select',
  CHECKOUT_START: 'checkout_start',
  CHECKOUT_STEP_VIEW: 'checkout_step_view',
  PAYMENT_ATTEMPT: 'payment_attempt',
  PAYMENT_RESULT: 'payment_result',
  PIX_QR_GENERATED: 'pix_qr_generated',
  BOLETO_GENERATED: 'boleto_generated',
  LEAD_SUBMIT: 'lead_submit',
  PURCHASE: 'purchase',
} as const

export type AnalyticsEvent = typeof AnalyticsEvents[keyof typeof AnalyticsEvents]

interface TrackOptions {
  event: AnalyticsEvent
  payload?: Record<string, any>
}

export function track({ event, payload = {} }: TrackOptions) {
  if (typeof window === 'undefined') return
  const base = { event, timestamp: new Date().toISOString(), env: process.env.NEXT_PUBLIC_ENV || 'dev' }
  const data = { ...base, ...payload }
  if ((window as any).dataLayer) {
    ;(window as any).dataLayer.push(data)
  } else {
    console.debug('[analytics]', data)
  }
}
```

## KPIs Diretos
| Métrica | Fonte | Cálculo |
|---------|-------|---------|
| Taxa Conversão Checkout | GA4 (begin_checkout vs purchase) | `purchase / begin_checkout` |
| Abandono por Etapa | Eventos `checkout_step_view` | Menor índice etapa final / início |
| Adoção PIX vs Cartão | `payment_attempt` | % por método |
| Tempo médio Checkout | Timestamp step1 → payment_result | Diferença média |
| Leads Validados | `lead_submit` | Count success |

## Governança de Tracking
- Alterações em eventos: abrir PR editando este arquivo + versão em CHANGELOG
- Auditoria mensal: comparar naming vs GA4 export
- Bloqueio de merge se adicionar novo evento sem atualizar doc (futuro lint custom)

## Futuro / Extensões
- Enriquecimento com Client ID / Session ID padronizado
- Integração com Sentry para core web vitals + correlação de erros
- Heatmaps (Hotjar / Clarity) somente após consentimento LGPD

---
_Manter alinhado com `lib/analytics.ts` e revisão trimestral._

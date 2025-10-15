# Análise Completa do Projeto LIVEACADEMIA

**Data:** 14 de Outubro de 2025  
**Analisado por:** Claude AI  
**Escopo:** Análise minuciosa de segurança, arquitetura, TypeScript, performance, qualidade de código e overengineering

---

## 🔴 CRÍTICO - Problemas de Segurança Imediatos

### 1. **CREDENCIAIS HARDCODED NO CÓDIGO FONTE** ⚠️⚠️⚠️

**Arquivo:** `lib/supabase-server.ts` (linhas 4-5)

```typescript
const supabaseUrl = "https://sgntnwnngdskwyuywksk.supabase.co";
const serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnbnRud25uZ2Rza3d5dXl3a3NrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODM5MzU2MSwiZXhwIjoyMDczOTY5NTYxfQ.LTNaSFG2p1QaXGhF66TUzBZFS0G8IcimY5U0dkBqgpM"
```

**Impacto:** 🔴 **CRÍTICO** - Service Role Key do Supabase com privilégios administrativos exposta publicamente no repositório Git.

**Ações Imediatas:**
- [ ] Rotacionar IMEDIATAMENTE a service role key no dashboard do Supabase
- [ ] Remover as credenciais do código e usar variáveis de ambiente
- [ ] Escanear histórico do Git e remover todas as ocorrências (git-filter-repo ou BFG Repo-Cleaner)
- [ ] Se o repositório é público, considerar criar novo projeto Supabase
- [ ] Implementar `.env.local` com:
  ```bash
  NEXT_PUBLIC_SUPABASE_URL=https://sgntnwnngdskwyuywksk.supabase.co
  SUPABASE_SERVICE_ROLE_KEY=<nova_chave_rotacionada>
  ```

**Código correto:**
```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  throw new Error('Supabase env vars missing')
}
```

---

### 2. **Chave de Criptografia com Fallback Hardcoded**

**Arquivo:** `lib/crypto.ts` (linhas 7-10)

```typescript
const RAW_SECRET = process.env.ENCRYPTION_SECRET || 'a+oZvP9a2ob1vl54zwT9BlSCxHgI4o+lfMXPyjnDc2g='
if (!process.env.ENCRYPTION_SECRET) {
  console.warn('[crypto] Usando fallback hardcoded local ENCRYPTION_SECRET (não usar em produção).')
}
```

**Impacto:** 🟠 **ALTO** - Chave de criptografia previsível em produção se a variável de ambiente não estiver definida.

**Problema:** Se `ENCRYPTION_SECRET` não for definida, usa um valor hardcoded que está versionado no Git. Qualquer pessoa com acesso ao código pode descriptografar dados sensíveis (chaves de API armazenadas no banco).

**Correção:**
```typescript
const RAW_SECRET = process.env.ENCRYPTION_SECRET

if (!RAW_SECRET) {
  throw new Error(
    'ENCRYPTION_SECRET não definida! Defina uma chave forte de 32+ caracteres. ' +
    'Exemplo: openssl rand -base64 32'
  )
}

const KEY = crypto.createHash('sha256').update(RAW_SECRET).digest()
```

---

### 3. **Dados de Cartão Passando pelo Client Side**

**Arquivo:** `components/checkout-modal.tsx`

**Problema:** Dados de cartão de crédito são coletados no frontend e enviados para `/api/pacto/venda` sem tokenização prévia.

**Riscos:**
- Exposição de dados sensíveis em logs do browser
- Possibilidade de interceptação via XSS
- Não conformidade com PCI-DSS

**Recomendação:**
1. Implementar tokenização no client (Stripe.js, PagSeguro.js, etc.) antes de enviar dados
2. Ou usar iframe de pagamento hospedado pelo gateway
3. Nunca logar dados de cartão (nem parcialmente)
4. Implementar CSP (Content Security Policy) rigorosa

**Código atual exposto:**
```typescript
// checkout-modal.tsx:210-216
if (paymentMethod === 'cartao') {
  saleBody.cardData = {
    numeroCartao: formData.numeroCartao,      // 🔴 Sensível
    nomeCartao: formData.nomeCartao,          // 🔴 Sensível
    validadeCartao: formData.validadeCartao,  // 🔴 Sensível
    cvvCartao: formData.cvvCartao,            // 🔴 Sensível
  }
}
```

---

### 4. **Script de Tracking de Terceiros sem SRI**

**Arquivo:** `app/layout.tsx` (linha 25)

```html
<script src="https://api.tracking.ninetwo.com.br/script/live-academia" async></script>
```

**Problema:** Script externo carregado sem Subresource Integrity (SRI), permitindo potencial Man-in-the-Middle ou comprometimento do servidor de terceiros.

**Correção:**
```html
<script 
  src="https://api.tracking.ninetwo.com.br/script/live-academia" 
  integrity="sha384-<hash-do-script>" 
  crossorigin="anonymous" 
  async
></script>
```

Ou use Google Tag Manager como proxy para scripts de terceiros.

---

### 5. **Falta de Rate Limiting nas APIs**

**Arquivos:** Todas as rotas em `app/api/`

**Problema:** Nenhuma proteção contra abuso de API (força bruta, DDoS).

**Vulnerabilidades:**
- `/api/pacto/venda` - pode ser bombardeada com tentativas de pagamento
- `/api/pacto/simular` - queries custosas sem throttling
- `/api/pacto/planos/[slug]` - pode ser raspada sem limite

**Solução:** Implementar rate limiting com `@upstash/ratelimit` ou similar:

```typescript
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
})

export async function POST(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  // ... resto do código
}
```

---

### 6. **Falta de Sanitização de Inputs**

**Exemplo:** `components/checkout-modal.tsx`

**Problema:** Inputs do usuário (nome, email, endereço) não são sanitizados antes de serem enviados para a API ou banco.

**Risco:** Possível injeção de código em logs, analytics ou banco de dados.

**Correção:** Usar bibliotecas de sanitização:
```typescript
import DOMPurify from 'isomorphic-dompurify'
import validator from 'validator'

// Sanitizar strings
const sanitizeName = (name: string) => DOMPurify.sanitize(name.trim())

// Validar email
const sanitizeEmail = (email: string) => {
  const clean = email.trim().toLowerCase()
  return validator.isEmail(clean) ? clean : ''
}
```

---

### 7. **Chaves de API da Pacto em Comentários**

**Arquivo:** `lib/locations.ts` (linhas 5-7)

```typescript
// Chaves API conhecidas:
// - Margarita: fcceacc50b1db2fc4e8872b06099c142
// - Vieiralves: 7724bf6109e5370177c8129aa431b922
```

**Problema:** Chaves de API expostas em comentários no código versionado.

**Ação:** 
- Remover imediatamente esses comentários
- Rotacionar essas chaves na API Pacto
- Usar apenas sistema de criptografia do banco

---

## 🟠 TypeScript - Configuração e Tipos

### 8. **TypeScript Desabilitado no Build**

**Arquivo:** `next.config.mjs`

```javascript
typescript: {
  ignoreBuildErrors: true,  // 🔴 Péssima prática
},
eslint: {
  ignoreDuringBuilds: true, // 🔴 Péssima prática
},
```

**Problema:** Erros de TypeScript e ESLint são silenciados, acumulando dívida técnica invisível.

**Impacto:**
- Bugs de tipo não detectados em produção
- Refatoração futura muito mais custosa
- Falta de type-safety em todo o projeto

**Correção:**
```javascript
typescript: {
  // Remover completamente ou definir false explicitamente
  ignoreBuildErrors: false,
},
eslint: {
  ignoreDuringBuilds: false,
  dirs: ['app', 'components', 'lib', 'contexts'],
},
```

**Estatísticas encontradas:**
- **34 ocorrências de `: any`** no projeto
- **69 console.log/error/warn** em produção
- Zero testes automatizados

---

### 9. **Uso Excessivo de `any`**

**Arquivos afetados:**
- `components/checkout-modal.tsx` (2 ocorrências)
- `lib/pacto-api.ts` (3 ocorrências)
- `lib/repository.ts` (3 ocorrências)
- `app/api/*/route.ts` (múltiplas rotas)

**Exemplo ruim:**
```typescript
let body: any  // 🔴 Perde type safety
try { body = await req.json() } catch { ... }
```

**Correção com Zod:**
```typescript
const VendaBodySchema = z.object({
  slug: z.string(),
  planoId: z.string(),
  planoNome: z.string(),
  valor: z.number().positive(),
  paymentMethod: z.enum(['cartao', 'pix', 'boleto']),
  customer: CustomerSchema,
  cardData: CardDataSchema.optional(),
  cupom: z.string().optional(),
})

type VendaBody = z.infer<typeof VendaBodySchema>

export async function POST(req: NextRequest) {
  const rawBody = await req.json()
  const parseResult = VendaBodySchema.safeParse(rawBody)
  
  if (!parseResult.success) {
    return NextResponse.json({
      error: 'Payload inválido',
      details: parseResult.error.flatten()
    }, { status: 400 })
  }
  
  const body: VendaBody = parseResult.data // ✅ Type-safe
  // ...
}
```

---

### 10. **Tipos Inconsistentes para `valor`**

**Problema:** `valor` é ora `string`, ora `number`:

```typescript
// lib/pacto-schemas.ts:22
valor: z.union([z.string(), z.number()]),  // 🟡 Inconsistente

// components/checkout-modal.tsx:200
valor: parseFloat(plano!.price.replace(',', '.')),  // converte string -> number
```

**Impacto:** Bugs em tempo de execução ao fazer operações matemáticas.

**Correção:** Padronizar como `number` (centavos) em toda a aplicação:

```typescript
// Sempre armazenar em centavos (integer)
const PlanoSchema = z.object({
  codigo: z.string(),
  nome: z.string(),
  valorCentavos: z.number().int().positive(),  // ✅ Sempre integer
})

// Helpers para conversão
const toCentavos = (reais: string | number): number => {
  const num = typeof reais === 'string' 
    ? parseFloat(reais.replace(',', '.')) 
    : reais
  return Math.round(num * 100)
}

const toReais = (centavos: number): string => {
  return (centavos / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}
```

---

### 11. **Falta de Validação de Environment Variables**

**Arquivo:** `lib/env.ts`

**Problema:** Validação incompleta. Faltam variáveis críticas:

```typescript
// Falta validar:
// - ENCRYPTION_SECRET
// - SUPABASE_SERVICE_ROLE_KEY
// - NEXT_PUBLIC_SUPABASE_URL
```

**Correção completa:**
```typescript
import { z } from 'zod'

const envSchema = z.object({
  // Node
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Public (expostas no bundle)
  NEXT_PUBLIC_ENV: z.string().default('development'),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_GA4_ID: z.string().regex(/^G-/).optional(),
  NEXT_PUBLIC_GTM_ID: z.string().regex(/^GTM-/).optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().regex(/^\d+$/).optional(),
  
  // Server-only (NUNCA expostas)
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  ENCRYPTION_SECRET: z.string().min(32),
  PACTO_API_URL: z.string().url().default('https://apigw.pactosolucoes.com.br'),
})

export type AppEnv = z.infer<typeof envSchema>

let _cached: AppEnv | null = null

export function getEnv(): AppEnv {
  if (_cached) return _cached
  
  const parsed = envSchema.safeParse(process.env)
  
  if (!parsed.success) {
    const formatted = parsed.error.flatten()
    console.error('❌ Variáveis de ambiente inválidas:')
    console.error(JSON.stringify(formatted, null, 2))
    throw new Error('Environment validation failed')
  }
  
  _cached = parsed.data
  return _cached
}

// Validar na inicialização
if (typeof window === 'undefined') {
  getEnv()
}
```

---

## 🟡 Arquitetura e Padrões

### 12. **Estado Monolítico no Checkout Modal**

**Arquivo:** `components/checkout-modal.tsx` (705 linhas)

**Problemas:**
- Componente gigante com responsabilidades múltiplas
- Estado complexo gerenciado com `useState` primitivo
- Lógica de negócio misturada com apresentação
- Difícil de testar

**Estrutura atual:**
```typescript
const [step, setStep] = useState(1)
const [paymentMethod, setPaymentMethod] = useState<'cartao' | 'pix' | 'boleto'>('cartao')
const [loading, setLoading] = useState(false)
const [paymentResult, setPaymentResult] = useState<PactoResponse | null>(null)
const [simulation, setSimulation] = useState<SimulacaoResumo | null>(null)
const [simulationLoading, setSimulationLoading] = useState(false)
const [simulationError, setSimulationError] = useState<string | null>(null)
const [simulationFallback, setSimulationFallback] = useState(false)
const [formData, setFormData] = useState({ /* 9 campos */ })
```

**Refatoração recomendada:**

#### Opção 1: State Machine com XState

```typescript
// lib/checkout-machine.ts
import { createMachine, assign } from 'xstate'

export const checkoutMachine = createMachine({
  id: 'checkout',
  initial: 'collectingData',
  context: {
    formData: null,
    paymentMethod: 'cartao',
    simulation: null,
    error: null,
    result: null,
  },
  states: {
    collectingData: {
      on: {
        SUBMIT_DATA: {
          target: 'selectingPayment',
          actions: assign({ formData: (_, event) => event.data })
        }
      }
    },
    selectingPayment: {
      on: {
        SELECT_METHOD: {
          target: 'simulatingPayment',
          actions: assign({ paymentMethod: (_, event) => event.method })
        },
        BACK: 'collectingData'
      }
    },
    simulatingPayment: {
      invoke: {
        src: 'simulatePayment',
        onDone: {
          target: 'readyToProcess',
          actions: assign({ simulation: (_, event) => event.data })
        },
        onError: {
          target: 'simulationError',
          actions: assign({ error: (_, event) => event.data })
        }
      }
    },
    readyToProcess: {
      on: {
        PROCESS: 'processing',
        BACK: 'selectingPayment'
      }
    },
    processing: {
      invoke: {
        src: 'processPayment',
        onDone: {
          target: 'success',
          actions: assign({ result: (_, event) => event.data })
        },
        onError: {
          target: 'failed',
          actions: assign({ error: (_, event) => event.data })
        }
      }
    },
    simulationError: {
      on: {
        RETRY: 'simulatingPayment',
        BACK: 'selectingPayment'
      }
    },
    failed: {
      on: {
        RETRY: 'processing',
        BACK: 'selectingPayment'
      }
    },
    success: {
      type: 'final'
    }
  }
})
```

#### Opção 2: Zustand Store (Mais Simples)

```typescript
// stores/checkout-store.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface CheckoutState {
  step: 1 | 2 | 3 | 4
  formData: FormData | null
  paymentMethod: 'cartao' | 'pix' | 'boleto'
  simulation: Simulacao | null
  isLoading: boolean
  error: string | null
  result: PactoResponse | null
  
  // Actions
  setStep: (step: 1 | 2 | 3 | 4) => void
  setFormData: (data: FormData) => void
  setPaymentMethod: (method: 'cartao' | 'pix' | 'boleto') => void
  simulate: () => Promise<void>
  processPayment: () => Promise<void>
  reset: () => void
}

export const useCheckoutStore = create<CheckoutState>()(
  devtools(
    (set, get) => ({
      step: 1,
      formData: null,
      paymentMethod: 'cartao',
      simulation: null,
      isLoading: false,
      error: null,
      result: null,
      
      setStep: (step) => set({ step }),
      setFormData: (data) => set({ formData: data }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      
      simulate: async () => {
        set({ isLoading: true, error: null })
        try {
          const { formData, paymentMethod } = get()
          const response = await fetch('/api/pacto/simular', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formData, paymentMethod }),
          })
          const data = await response.json()
          set({ simulation: data.simulacao, isLoading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro desconhecido',
            isLoading: false 
          })
        }
      },
      
      processPayment: async () => {
        set({ isLoading: true, step: 3, error: null })
        try {
          const { formData, paymentMethod, simulation } = get()
          const response = await fetch('/api/pacto/venda', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formData, paymentMethod, simulation }),
          })
          const result = await response.json()
          set({ 
            result, 
            step: result.success ? 4 : 2,
            isLoading: false,
            error: result.success ? null : result.error
          })
        } catch (error) {
          set({ 
            step: 2,
            error: error instanceof Error ? error.message : 'Erro desconhecido',
            isLoading: false 
          })
        }
      },
      
      reset: () => set({
        step: 1,
        formData: null,
        paymentMethod: 'cartao',
        simulation: null,
        isLoading: false,
        error: null,
        result: null,
      }),
    }),
    { name: 'CheckoutStore' }
  )
)
```

**Componente simplificado:**
```typescript
// components/checkout-modal.tsx (agora apenas 200 linhas)
export default function CheckoutModal({ isOpen, onClose, plano, unidadeId }: Props) {
  const {
    step,
    formData,
    paymentMethod,
    simulation,
    isLoading,
    error,
    result,
    setStep,
    setFormData,
    setPaymentMethod,
    simulate,
    processPayment,
    reset,
  } = useCheckoutStore()
  
  useEffect(() => {
    if (isOpen) reset()
  }, [isOpen, reset])
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {step === 1 && <StepPersonalData onSubmit={setFormData} onNext={() => setStep(2)} />}
      {step === 2 && (
        <StepPaymentMethod 
          method={paymentMethod}
          onSelectMethod={setPaymentMethod}
          simulation={simulation}
          onSimulate={simulate}
          onProcess={processPayment}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && <StepProcessing />}
      {step === 4 && <StepSuccess result={result} onClose={onClose} />}
    </Modal>
  )
}
```

---

### 13. **Duplicação de Lógica de Formatação**

**Problema:** Funções de formatação duplicadas em múltiplos arquivos.

**Exemplo:**
- `formatCurrency` definida em `checkout-modal.tsx`, `planos-cards.tsx`, `unit-planos.tsx`
- `formatCPF`, `formatPhone`, `formatCardNumber` definidas inline no modal

**Solução:** Centralizar em `lib/formatters.ts`:

```typescript
// lib/formatters.ts
export const formatters = {
  currency: (value: number | string): string => {
    const num = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(num)
  },

  cpf: (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  },

  phone: (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  },

  cardNumber: (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .substring(0, 19)
  },

  cardExpiry: (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substring(0, 5)
  },
}

// Validators
export const validators = {
  cpf: (cpf: string): boolean => {
    const cleaned = cpf.replace(/\D/g, '')
    if (cleaned.length !== 11) return false
    if (/^(\d)\1+$/.test(cleaned)) return false
    
    // Validação dos dígitos verificadores
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleaned[i]) * (10 - i)
    }
    let digit = 11 - (sum % 11)
    if (digit >= 10) digit = 0
    if (parseInt(cleaned[9]) !== digit) return false
    
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleaned[i]) * (11 - i)
    }
    digit = 11 - (sum % 11)
    if (digit >= 10) digit = 0
    return parseInt(cleaned[10]) === digit
  },

  email: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  },

  phone: (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length >= 10 && cleaned.length <= 11
  },
}
```

---

### 14. **Fallback Estático em Múltiplos Lugares**

**Problema:** Lógica de fallback para `lib/locations.ts` repetida em 3 rotas diferentes:
- `app/api/pacto/planos/[slug]/route.ts`
- `components/unit-planos.tsx`
- `components/planos-section.tsx`

**Solução:** Criar um serviço único:

```typescript
// lib/services/planos-service.ts
import { getUnitBySlug } from '@/lib/repository'
import { pactoAPI } from '@/lib/pacto-api'
import { locations } from '@/lib/locations'
import type { Plano } from '@/lib/pacto-schemas'

interface PlanosResult {
  planos: Plano[]
  source: 'api' | 'db_cache' | 'static_fallback'
  cached: boolean
}

// Cache em memória (pode migrar para Redis futuramente)
const planosCache = new Map<string, { data: Plano[]; expiresAt: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutos

export async function getPlanosUnidade(slug: string): Promise<PlanosResult> {
  // 1. Tentar cache
  const cached = planosCache.get(slug)
  if (cached && cached.expiresAt > Date.now()) {
    return { planos: cached.data, source: 'db_cache', cached: true }
  }

  try {
    // 2. Tentar buscar do banco + API Pacto
    const unit = await getUnitBySlug(slug)
    
    if (unit?.apiKeyPlain && unit.chave_publica) {
      const planos = await pactoAPI.getPlanosUnidade(
        unit.apiKeyPlain,
        unit.chave_publica,
        unit.codigo_unidade || slug.toUpperCase()
      )
      
      if (planos.length > 0) {
        // Cachear resultado
        planosCache.set(slug, {
          data: planos,
          expiresAt: Date.now() + CACHE_TTL
        })
        return { planos, source: 'api', cached: false }
      }
    }
  } catch (error) {
    console.error(`[getPlanosUnidade] Erro ao buscar de ${slug}:`, error)
  }

  // 3. Fallback estático
  const location = locations.find(l => l.id === slug)
  if (location?.planos) {
    const staticPlanos = location.planos.map(p => ({
      codigo: `STATIC_${slug.toUpperCase()}_${p.name.replace(/\s/g, '_')}`,
      nome: p.name,
      valor: p.price,
    }))
    return { planos: staticPlanos, source: 'static_fallback', cached: false }
  }

  throw new Error(`Nenhum plano encontrado para unidade: ${slug}`)
}

// Função para invalidar cache (útil em webhooks)
export function invalidatePlanosCache(slug?: string) {
  if (slug) {
    planosCache.delete(slug)
  } else {
    planosCache.clear()
  }
}
```

**Uso nas rotas:**
```typescript
// app/api/pacto/planos/[slug]/route.ts
import { getPlanosUnidade } from '@/lib/services/planos-service'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  try {
    const result = await getPlanosUnidade(slug)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 404 }
    )
  }
}
```

---

### 15. **Mapeamento `UNIDADE_ID_MAP` Desnecessário**

**Arquivo:** `lib/pacto-api.ts` (linhas 313-341)

**Problema:** Mapeamento hardcoded de slug → código quando isso já deveria estar no banco de dados (`units.codigo_unidade`).

```typescript
export const UNIDADE_ID_MAP: Record<string, string> = {
  'bom-prato-diamante': 'BPD001',
  'ct-cidade-nova': 'CCN002',
  // ... 25 entradas
}
```

**Solução:** Remover completamente e usar `unit.codigo_unidade` do banco:

```typescript
// ANTES (❌ Ruim)
const codigo = getCodigoUnidade(slug)  // usa UNIDADE_ID_MAP

// DEPOIS (✅ Bom)
const unit = await getUnitBySlug(slug)
const codigo = unit.codigo_unidade || slug.toUpperCase()
```

Se precisar migrar dados antigos, criar um script one-time:

```typescript
// scripts/migrate-codigo-unidade.ts
import { supabaseAdmin } from '@/lib/supabase-server'
import { UNIDADE_ID_MAP } from '@/lib/pacto-api'

async function migrate() {
  for (const [slug, codigo] of Object.entries(UNIDADE_ID_MAP)) {
    await supabaseAdmin
      .from('units')
      .update({ codigo_unidade: codigo })
      .eq('slug', slug)
    console.log(`✅ Migrado: ${slug} -> ${codigo}`)
  }
}

migrate().then(() => console.log('Migração completa!'))
```

---

## 🟠 Performance

### 16. **Sem Cache de Requisições no Client**

**Problema:** Toda navegação refaz as mesmas queries (planos, unidades, etc.).

**Exemplo:**
- Usuário visita `/unidades/torres`
- Volta para home
- Visita `/unidades/torres` novamente
- → Faz novamente a mesma requisição

**Solução:** Usar SWR ou React Query:

```typescript
// hooks/use-planos.ts
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function usePlanos(slug: string) {
  const { data, error, isLoading } = useSWR(
    `/api/pacto/planos/${slug}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // Cache por 1 minuto
    }
  )
  
  return {
    planos: data?.planos,
    isLoading,
    error,
    fallback: data?.fallback,
  }
}

// Uso no componente
function UnitPlanos({ slug }: { slug: string }) {
  const { planos, isLoading, error } = usePlanos(slug)
  
  if (isLoading) return <Skeleton />
  if (error) return <ErrorState />
  
  return <PlanosList planos={planos} />
}
```

**Benefícios:**
- Menos requisições ao servidor
- UX mais rápida (carregamento instantâneo em navegação de volta)
- Sincronização automática entre tabs/componentes
- Retry automático em caso de falha

---

### 17. **Simulação Refetchada Desnecessariamente**

**Arquivo:** `components/checkout-modal.tsx` (linhas 165-169)

```typescript
useEffect(() => {
  if (step === 2 && plano) {
    runSimulation()  // 🔴 Refaz simulação toda vez que entra no step 2
  }
}, [step, plano, runSimulation])
```

**Problema:** Se usuário volta do step 3 para 2, refaz a simulação mesmo que nada tenha mudado.

**Solução:** Cachear resultado:

```typescript
const simulationRef = useRef<{
  key: string
  result: SimulacaoResumo
} | null>(null)

useEffect(() => {
  if (step !== 2 || !plano) return
  
  const key = `${plano.codigo}-${paymentMethod}-${plano.price}`
  
  // Se já temos simulação para essa combinação, reusar
  if (simulationRef.current?.key === key) {
    setSimulation(simulationRef.current.result)
    return
  }
  
  runSimulation().then(result => {
    if (result) {
      simulationRef.current = { key, result }
    }
  })
}, [step, plano, paymentMethod])
```

---

### 18. **Componentes Pesados sem Memoização**

**Problema:** Componentes grandes re-renderizam desnecessariamente.

**Exemplo:** `components/checkout-modal.tsx` re-renderiza todos os steps mesmo quando apenas um muda.

**Solução:** Quebrar em subcomponentes memoizados:

```typescript
// components/checkout/step-personal-data.tsx
import { memo } from 'react'

interface Props {
  formData: FormData
  onChange: (field: string, value: string) => void
  onSubmit: () => void
}

export const StepPersonalData = memo(function StepPersonalData({ 
  formData, 
  onChange, 
  onSubmit 
}: Props) {
  return (
    <form onSubmit={onSubmit}>
      {/* campos... */}
    </form>
  )
}, (prevProps, nextProps) => {
  // Custom comparison para evitar re-render desnecessário
  return (
    JSON.stringify(prevProps.formData) === JSON.stringify(nextProps.formData)
  )
})

// Uso
<StepPersonalData 
  formData={formData}
  onChange={handleInputChange}
  onSubmit={handleNextStep}
/>
```

---

### 19. **Imagens Não Otimizadas**

**Arquivo:** `next.config.mjs`

```javascript
images: {
  unoptimized: true,  // 🔴 Desabilitado
},
```

**Problema:** Imagens não são otimizadas pelo Next.js, resultando em carregamentos lentos.

**Impacto em `lib/locations.ts`:**
- 30+ unidades com fotos
- Algumas URLs retornam imagens de 2-3MB sem compressão
- Carregamento lento em mobile

**Correção:**
```javascript
// next.config.mjs
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'lh5.googleusercontent.com',
    },
    {
      protocol: 'https',
      hostname: 'www.liveacademia.com.br',
    },
    {
      protocol: 'https',
      hostname: 'cdn1.pactorian.net',
    },
  ],
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
},
```

Depois, migrar de `<img>` para `<Image>`:

```typescript
// ANTES
<img src={location.photo} alt={location.name} />

// DEPOIS
import Image from 'next/image'

<Image 
  src={location.photo}
  alt={location.name}
  width={500}
  height={300}
  priority={isAboveTheFold}
/>
```

---

## 🟡 Code Quality e Smells

### 20. **Console.log em Produção**

**Estatística:** **69 ocorrências** de `console.log/error/warn` no projeto.

**Problema:** Logs sensíveis expostos no browser em produção.

**Exemplo crítico:**
```typescript
// lib/pacto-api.ts:110
console.log(`[PactoAPI] Using direct auth: apiKey=${redeKey.substring(0,10)}...`)
```

**Solução:** Criar logger condicional:

```typescript
// lib/logger.ts
const isDev = process.env.NODE_ENV === 'development'
const isDebug = process.env.NEXT_PUBLIC_DEBUG === 'true'

export const logger = {
  debug: (message: string, ...args: any[]) => {
    if (isDev || isDebug) {
      console.log(`[DEBUG] ${message}`, ...args)
    }
  },
  
  info: (message: string, ...args: any[]) => {
    if (isDev) {
      console.info(`[INFO] ${message}`, ...args)
    }
  },
  
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN] ${message}`, ...args)
    // TODO: Enviar para Sentry/LogRocket em produção
  },
  
  error: (message: string, error?: Error, ...args: any[]) => {
    console.error(`[ERROR] ${message}`, error, ...args)
    // TODO: Enviar para Sentry com contexto completo
  },
}

// Uso
import { logger } from '@/lib/logger'

logger.debug('Fetching planos', { slug, redeKey: redeKey.substring(0, 8) })
```

**Então substituir todos os `console.*` por `logger.*` e configurar linter:**

```json
// .eslintrc.json
{
  "rules": {
    "no-console": ["error", { "allow": ["warn", "error"] }]
  }
}
```

---

### 21. **`alert()` ao Invés de UI Feedback**

**Arquivo:** `components/checkout-modal.tsx` (linhas 183, 233, 238)

```typescript
alert('Por favor, preencha todos os campos obrigatórios')  // 🔴 Péssima UX
```

**Problema:** `alert()` bloqueia a UI, não é customizável e tem má UX.

**Solução:** Usar toast system (já tem Sonner instalado!):

```typescript
import { toast } from 'sonner'

// Substituir alerts por:
toast.error('Por favor, preencha todos os campos obrigatórios', {
  description: 'Campos obrigatórios: Nome, Email, Telefone, CPF',
  duration: 5000,
})

toast.success('Matrícula realizada com sucesso!', {
  description: 'Você receberá um email com os detalhes',
  duration: 7000,
})

// No layout.tsx, adicionar:
import { Toaster } from 'sonner'

<Toaster 
  position="top-right"
  theme="dark"
  richColors
/>
```

---

### 22. **Funções Gigantes sem Decomposição**

**Exemplo:** `processPayment` em `checkout-modal.tsx` (linhas 190-243) - 53 linhas.

**Problema:** Faz múltiplas coisas (validação, transformação, request, tratamento de erro, UI update).

**Refatoração:**

```typescript
// lib/checkout/payment-processor.ts
interface ProcessPaymentInput {
  unidadeId: string
  plano: { codigo: string; name: string; price: string }
  paymentMethod: 'cartao' | 'pix' | 'boleto'
  customer: CustomerData
  cardData?: CardData
}

export class PaymentProcessor {
  async process(input: ProcessPaymentInput): Promise<PactoResponse> {
    const payload = this.buildPayload(input)
    this.validate(payload)
    return this.submit(payload)
  }
  
  private buildPayload(input: ProcessPaymentInput): VendaPayload {
    return {
      slug: input.unidadeId,
      planoId: input.plano.codigo || `PLANO_${input.unidadeId}`,
      planoNome: input.plano.name,
      valor: this.parsePrice(input.plano.price),
      paymentMethod: input.paymentMethod,
      customer: this.sanitizeCustomer(input.customer),
      cardData: input.paymentMethod === 'cartao' ? input.cardData : undefined,
    }
  }
  
  private parsePrice(price: string): number {
    return parseFloat(price.replace(',', '.'))
  }
  
  private sanitizeCustomer(customer: CustomerData): CustomerData {
    return {
      nome: customer.nome.trim(),
      email: customer.email.trim().toLowerCase(),
      telefone: customer.telefone.replace(/\D/g, ''),
      cpf: customer.cpf.replace(/\D/g, ''),
      endereco: customer.endereco?.trim() || '',
    }
  }
  
  private validate(payload: VendaPayload): void {
    if (!validators.email(payload.customer.email)) {
      throw new Error('Email inválido')
    }
    if (!validators.cpf(payload.customer.cpf)) {
      throw new Error('CPF inválido')
    }
    if (payload.paymentMethod === 'cartao' && !payload.cardData) {
      throw new Error('Dados do cartão ausentes')
    }
  }
  
  private async submit(payload: VendaPayload): Promise<PactoResponse> {
    const response = await fetch('/api/pacto/venda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Erro ao processar pagamento')
    }
    
    return response.json()
  }
}

// Uso no componente (agora 5 linhas)
const processPayment = async () => {
  setLoading(true)
  setStep(3)
  try {
    const processor = new PaymentProcessor()
    const result = await processor.process({
      unidadeId,
      plano: plano!,
      paymentMethod,
      customer: formData,
      cardData: paymentMethod === 'cartao' ? formData : undefined,
    })
    setPaymentResult(result)
    setStep(result.success ? 4 : 2)
  } catch (error) {
    toast.error('Erro ao processar pagamento', {
      description: error instanceof Error ? error.message : 'Erro desconhecido'
    })
    setStep(2)
  } finally {
    setLoading(false)
  }
}
```

---

### 23. **Nomes Confusos e Inconsistentes**

**Problemas encontrados:**

1. **`redeKey` não é chave de rede:**
```typescript
// lib/pacto-api.ts:104
private async authenticate(redeKey: string, publicKey: string)
```
Na verdade `redeKey` é a API key da unidade. Deveria ser `apiKey` ou `privateKey`.

2. **`chave_publica` não é realmente pública:**
```typescript
// lib/repository.ts
chave_publica?: string | null
```
É o `empresaId` da API Pacto. Deveria ser `empresa_id`.

3. **`codigo_unidade` vs `unidadeId` vs `slug`:**
Três conceitos misturados. Padronizar:
- `slug`: identificador URL (ex: "torres")
- `codigo_unidade`: código interno/externo (ex: "TOR026")
- `id`: UUID do banco

**Refatoração sugerida:**

```typescript
// Renomear em todo o projeto:
redeKey → apiKey (ou privateKey)
publicKey → empresaId
chave_api → encrypted_api_key
chave_publica → empresa_id
codigo_unidade → external_code (ou pacto_unit_code)
```

---

## 🟡 Overengineering

### 24. **Excesso de Wrappers e Abstrações**

**Arquivo:** `lib/pacto-api.ts`

**Problema:** Classe `PactoAPI` com múltiplas camadas de abstração que não agregam valor:

```typescript
// Tem método genérico authenticate() que só retorna a key sem processar
private async authenticate(redeKey: string, publicKey: string): Promise<string> {
  // ... validações
  return redeKey // Literalmente só retorna o input
}
```

**Simplificação:** Remover `authenticate()` e usar direto:

```typescript
// ANTES
const token = await this.authenticate(redeKey, publicKey)
const response = await this.request(url, {
  headers: { 'Authorization': `Bearer ${token}` }
})

// DEPOIS
const response = await this.request(url, {
  headers: { 
    'Authorization': `Bearer ${redeKey}`,
    'empresaId': publicKey
  }
})
```

---

### 25. **Cache de Tokens Desnecessário**

**Arquivo:** `lib/pacto-api.ts` (linha 72)

```typescript
/** cache de tokens por par (redeKey|publicKey) */
private tokenCache: Map<string, { token: string; expiresAt: number }> = new Map()
```

**Problema:** Cache nunca é usado porque `authenticate()` não busca token externo, só retorna a key passada.

**Solução:** Remover completamente o `tokenCache` se não for necessário.

---

### 26. **Fallback Triplo Desnecessário**

**Problema:** Sistema de fallback muito complexo com 3 níveis:
1. API Pacto (dinâmica)
2. Banco de dados (cache)
3. `lib/locations.ts` (estático)

**Quando usar cada um:**
- API Pacto: sempre que possível (dados atualizados)
- Banco: para cachear (5-10 minutos)
- Estático: apenas para desenvolvimento/testes

**Mas o código atual mistura todos em todas as camadas:**
- Rotas de API têm fallback estático
- Componentes também têm fallback estático
- Duplicação de lógica

**Solução:** Um único serviço (como sugerido no item #14).

---

### 27. **Arquivo `lib/pacto-api.ts.backup`**

**Problema:** Arquivo de backup versionado no Git (888 linhas).

**Ação:**
```bash
git rm lib/pacto-api.ts.backup
git commit -m "Remove backup file (use git history instead)"
```

Use Git para histórico, não crie arquivos `.backup`.

---

## 🔴 Falta de Testes

### 28. **Zero Cobertura de Testes**

**Estatística:** 
- 0 testes unitários
- 0 testes de integração
- 0 testes E2E

**Risco:** Bugs em produção, refatoração insegura, regressões não detectadas.

**Recomendação:** Começar pelos fluxos críticos:

#### 1. Testes Unitários (Vitest)

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```

```typescript
// __tests__/lib/formatters.test.ts
import { describe, it, expect } from 'vitest'
import { formatters, validators } from '@/lib/formatters'

describe('formatters', () => {
  describe('cpf', () => {
    it('formata CPF válido', () => {
      expect(formatters.cpf('12345678900')).toBe('123.456.789-00')
    })
    
    it('remove caracteres não numéricos', () => {
      expect(formatters.cpf('123.456.789-00')).toBe('123.456.789-00')
    })
  })
  
  describe('currency', () => {
    it('formata número como moeda', () => {
      expect(formatters.currency(12990)).toBe('R$ 129,90')
    })
    
    it('lida com string de entrada', () => {
      expect(formatters.currency('129.90')).toBe('R$ 129,90')
    })
  })
})

describe('validators', () => {
  describe('cpf', () => {
    it('valida CPF correto', () => {
      expect(validators.cpf('123.456.789-09')).toBe(true)
    })
    
    it('rejeita CPF inválido', () => {
      expect(validators.cpf('123.456.789-00')).toBe(false)
    })
    
    it('rejeita CPF com todos os dígitos iguais', () => {
      expect(validators.cpf('111.111.111-11')).toBe(false)
    })
  })
})
```

#### 2. Testes de Integração (API Routes)

```typescript
// __tests__/api/pacto/planos.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createMocks } from 'node-mocks-http'
import { GET } from '@/app/api/pacto/planos/[slug]/route'

describe('GET /api/pacto/planos/:slug', () => {
  it('retorna planos para slug válido', async () => {
    const { req } = createMocks({
      method: 'GET',
    })
    
    const response = await GET(req, { params: Promise.resolve({ slug: 'torres' }) })
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.planos).toBeInstanceOf(Array)
    expect(data.planos.length).toBeGreaterThan(0)
  })
  
  it('retorna 404 para slug inexistente', async () => {
    const { req } = createMocks({
      method: 'GET',
    })
    
    const response = await GET(req, { params: Promise.resolve({ slug: 'nao-existe' }) })
    
    expect(response.status).toBe(404)
  })
  
  it('usa fallback estático quando API falha', async () => {
    // Mock de erro na API
    const { req } = createMocks({
      method: 'GET',
    })
    
    const response = await GET(req, { params: Promise.resolve({ slug: 'torres' }) })
    const data = await response.json()
    
    expect(data.fallback).toBeDefined()
  })
})
```

#### 3. Testes E2E (Playwright)

```bash
pnpm add -D @playwright/test
```

```typescript
// e2e/checkout-flow.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Fluxo de Checkout', () => {
  test('completa matrícula com cartão', async ({ page }) => {
    // 1. Navegar para página de planos
    await page.goto('/planos')
    
    // 2. Selecionar plano
    await page.click('text=Matricular')
    
    // 3. Preencher dados pessoais
    await page.fill('input[name="nome"]', 'Teste da Silva')
    await page.fill('input[name="email"]', 'teste@example.com')
    await page.fill('input[name="telefone"]', '(92) 99999-9999')
    await page.fill('input[name="cpf"]', '123.456.789-09')
    await page.click('text=Continuar')
    
    // 4. Selecionar método de pagamento
    await page.click('text=Cartão de Crédito')
    
    // 5. Preencher dados do cartão (usar cartão de teste)
    await page.fill('input[name="numeroCartao"]', '4111 1111 1111 1111')
    await page.fill('input[name="nomeCartao"]', 'TESTE DA SILVA')
    await page.fill('input[name="validadeCartao"]', '12/25')
    await page.fill('input[name="cvvCartao"]', '123')
    
    // 6. Finalizar
    await page.click('text=Finalizar Pagamento')
    
    // 7. Aguardar sucesso
    await expect(page.locator('text=Matrícula Realizada!')).toBeVisible({ timeout: 30000 })
  })
  
  test('valida campos obrigatórios', async ({ page }) => {
    await page.goto('/planos')
    await page.click('text=Matricular')
    
    // Tentar avançar sem preencher
    await page.click('text=Continuar')
    
    // Deve mostrar erro
    await expect(page.locator('text=campos obrigatórios')).toBeVisible()
  })
  
  test('permite voltar entre steps', async ({ page }) => {
    await page.goto('/planos')
    await page.click('text=Matricular')
    
    // Preencher e avançar
    await page.fill('input[name="nome"]', 'Teste')
    await page.fill('input[name="email"]', 'teste@example.com')
    await page.fill('input[name="telefone"]', '(92) 99999-9999')
    await page.fill('input[name="cpf"]', '123.456.789-09')
    await page.click('text=Continuar')
    
    // Voltar
    await page.click('text=Voltar')
    
    // Verificar que dados foram mantidos
    await expect(page.locator('input[name="nome"]')).toHaveValue('Teste')
  })
})
```

**Configurar CI/CD:**
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: pnpm install
      - run: pnpm test
      - run: pnpm test:e2e
```

---

## 📊 Resumo de Prioridades

### 🔴 **CRÍTICO (Resolver Imediatamente)**

1. **Rotacionar credenciais hardcoded** (Supabase service key)
2. **Remover fallback de `ENCRYPTION_SECRET`**
3. **Implementar rate limiting** nas APIs
4. **Sanitizar inputs** do usuário
5. **Remover chaves de API dos comentários**

### 🟠 **ALTO (Resolver Esta Semana)**

6. **Habilitar TypeScript strict mode** (`ignoreBuildErrors: false`)
7. **Implementar state management** (Zustand) para checkout
8. **Adicionar validação completa de env vars**
9. **Substituir `alert()` por toast system**
10. **Centralizar lógica de formatação/validação**

### 🟡 **MÉDIO (Resolver Este Mês)**

11. **Implementar cache com SWR/React Query**
12. **Adicionar testes unitários** (cobertura mínima 60%)
13. **Otimizar imagens** (habilitar Next/Image)
14. **Criar serviço único de planos** (eliminar duplicação de fallback)
15. **Remover `console.log`** em produção (usar logger condicional)

### 🟢 **BAIXO (Melhorias Futuras)**

16. **Refatorar nomes** (`redeKey` → `apiKey`, etc.)
17. **Adicionar testes E2E** (Playwright)
18. **Implementar observability** (Sentry, LogRocket)
19. **Adicionar CSP headers**
20. **Documentar APIs** (OpenAPI/Swagger)

---

## 📋 Checklist de Ação Imediata

```bash
# 1. Segurança
[ ] Rotacionar Supabase service key
[ ] Criar .env.local com todas as variáveis
[ ] Adicionar .env.local ao .gitignore
[ ] Remover credenciais do lib/supabase-server.ts
[ ] Remover fallback hardcoded do lib/crypto.ts
[ ] Remover comentários com chaves de API
[ ] Adicionar rate limiting em rotas críticas

# 2. TypeScript
[ ] Remover ignoreBuildErrors e ignoreDuringBuilds
[ ] Criar schemas Zod para todos os payloads de API
[ ] Substituir todos os `: any` por tipos concretos
[ ] Configurar env validation completa

# 3. Arquitetura
[ ] Extrair lógica de checkout para Zustand store
[ ] Criar lib/services/planos-service.ts unificado
[ ] Centralizar formatters em lib/formatters.ts
[ ] Remover UNIDADE_ID_MAP (usar banco de dados)

# 4. Performance
[ ] Instalar e configurar SWR
[ ] Habilitar otimização de imagens do Next.js
[ ] Adicionar memoization em componentes pesados

# 5. Code Quality
[ ] Criar lib/logger.ts condicional
[ ] Substituir todos alert() por toast (Sonner)
[ ] Quebrar funções grandes (>50 linhas)
[ ] Adicionar ESLint rule para no-console

# 6. Testes
[ ] Configurar Vitest
[ ] Adicionar testes unitários para formatters/validators
[ ] Adicionar testes de API routes
[ ] Configurar Playwright para E2E

# 7. DevOps
[ ] Adicionar GitHub Actions para CI/CD
[ ] Configurar Vercel deployment com env vars
[ ] Adicionar health check endpoint
```

---

## 🎯 Métricas de Qualidade Recomendadas

| Métrica | Atual | Meta |
|---------|-------|------|
| Cobertura de Testes | 0% | 70%+ |
| TypeScript Strict | ❌ | ✅ |
| Uso de `any` | 34 | <5 |
| Console.log em prod | 69 | 0 |
| Lighthouse Performance | ? | 90+ |
| Lighthouse Security | ? | 100 |
| ESLint Errors | Ignorado | 0 |
| Vulnerabilidades npm | ? | 0 Critical |

---

## 📚 Recursos Recomendados

### Segurança
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/security)
- [Supabase Security Checklist](https://supabase.com/docs/guides/platform/security-checklist)

### TypeScript
- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Zod Documentation](https://zod.dev/)
- [TypeScript Strict Mode Guide](https://www.typescriptlang.org/tsconfig#strict)

### Testes
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

### Performance
- [SWR Documentation](https://swr.vercel.app/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web.dev Performance](https://web.dev/performance/)

---

**Fim do relatório. Análise completa realizada em 14/10/2025.**


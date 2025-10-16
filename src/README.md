# 📁 Estrutura do Diretório `src/`

Organização moderna e escalável seguindo as melhores práticas do Next.js 15 + App Router.

---

## 📂 Estrutura Geral

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── checkout/       # Componentes de checkout
│   ├── sections/       # Seções de páginas (hero, about, etc)
│   ├── layout/         # Header, Footer, navegação
│   └── shared/         # Componentes compartilhados
│
├── features/           # Features organizadas por domínio
│   ├── units/         # Funcionalidades de unidades
│   ├── plans/         # Funcionalidades de planos
│   └── payments/      # Funcionalidades de pagamento
│
├── lib/               # Lógica de negócio e utilitários
│   ├── api/          # Integrações com APIs externas
│   ├── services/     # Serviços de negócio
│   ├── utils/        # Utilitários gerais
│   ├── schemas/      # Schemas Zod de validação
│   └── config/       # Configurações e constantes
│
├── hooks/            # Custom React Hooks
├── contexts/         # React Contexts
└── types/            # TypeScript types globais
```

---

## 📖 Detalhamento

### 1. `components/`

Componentes React organizados por função e reusabilidade.

#### `components/ui/`
Componentes base do sistema de design (shadcn/ui):
- Primitivos: Button, Input, Select, Dialog, etc.
- Todos os componentes seguem padrão shadcn/ui
- Não modificar diretamente - use composição

**Exemplo:**
```tsx
import { Button } from '@/components/ui/button'

<Button variant="default">Matricular</Button>
```

#### `components/checkout/`
Componentes específicos do fluxo de checkout:
- `checkout-modal.tsx` - Modal principal do checkout
- `animated-payment-card.tsx` - Visualização do cartão

**Exemplo:**
```tsx
import CheckoutModal from '@/components/checkout/checkout-modal'

<CheckoutModal isOpen={open} onClose={() => setOpen(false)} />
```

#### `components/sections/`
Seções reutilizáveis de páginas (landingpage sections):
- `hero-section.tsx` - Hero da homepage
- `planos-section.tsx` - Exibição de planos
- `about-section.tsx` - Sobre nós
- `testimonial-section.tsx` - Depoimentos
- E mais...

**Quando usar:** Seções completas que aparecem em páginas inteiras.

**Exemplo:**
```tsx
import HeroSection from '@/components/sections/hero-section'
import PlanosSection from '@/components/sections/planos-section'

<HeroSection />
<PlanosSection />
```

#### `components/layout/`
Componentes de layout e navegação:
- `header.tsx` - Header global
- `footer.tsx` - Footer global
- `floating-button.tsx` - Botão flutuante de contato
- `theme-provider.tsx` - Provider de tema dark/light
- `scroll-to-top-button.tsx` - Botão scroll to top

**Quando usar:** Componentes que fazem parte do layout global.

**Exemplo:**
```tsx
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

<Header />
{children}
<Footer />
```

#### `components/shared/`
Componentes compartilhados entre múltiplas features:
- `live-logo.tsx` - Logo da Live Academia
- `location-carousel.tsx` - Carrossel de localizações
- `background-slideshow.tsx` - Slideshow de fundo
- `coach-module-card.tsx` - Card de módulo de coach

**Quando usar:** Componentes usados em 2+ features diferentes.

---

### 2. `features/`

Features organizadas por domínio de negócio (Domain-Driven Design).

#### `features/units/`
Tudo relacionado a unidades/academias:
- `unidade-card.tsx` - Card de unidade
- `unidades-section.tsx` - Seção de listagem
- `unit-planos.tsx` - Planos específicos de uma unidade

**Quando usar:** Funcionalidade específica de unidades.

**Exemplo:**
```tsx
import UnidadeCard from '@/features/units/unidade-card'

<UnidadeCard unit={unit} />
```

#### `features/plans/`
Tudo relacionado a planos:
- `planos-cards.tsx` - Cards de planos

**Quando usar:** Funcionalidade específica de planos.

#### `features/payments/`
Tudo relacionado a pagamentos:
- (Vazio por enquanto - pode adicionar processamento de pagamento)

**Quando adicionar:**
- Validação de cartão
- Processamento de PIX
- Status de pagamento

---

### 3. `lib/`

Lógica de negócio, integrações e utilitários.

#### `lib/api/`
Integrações com APIs externas:

**`pacto-api.ts`**
- Cliente da API Pacto Soluções
- Métodos: `getPlanosUnidade()`, `simularVenda()`, `vendaCartao()`, etc.
- **Server-side only!**

**`supabase.ts`** (antigo: `supabase-server.ts`)
- Cliente Supabase com service role
- **Server-side only!**

**`supabase-repository.ts`** (antigo: `repository.ts`)
- Operações de banco de dados
- `getUnitBySlug()`, `upsertUnit()`, `logApi()`

**Exemplo:**
```tsx
import { pactoAPI } from '@/lib/api/pacto-api'
import { getUnitBySlug } from '@/lib/api/supabase-repository'

const unit = await getUnitBySlug('torres')
const planos = await pactoAPI.getPlanosUnidade(...)
```

#### `lib/services/`
Serviços de negócio (lógica complexa):
- Futuro: `planos-service.ts`, `units-service.ts`
- Agregam múltiplas operações
- Implementam regras de negócio

**Quando criar:**
- Lógica complexa que envolve múltiplas APIs
- Regras de negócio específicas
- Cache e fallbacks

#### `lib/utils/`
Utilitários gerais reutilizáveis:

**`formatters.ts`**
- Formatação de dados (CPF, telefone, moeda, etc.)
- Validação (CPF, email, cartão, etc.)
- Parsers (converter string → número)

**`logger.ts`**
- Logging condicional
- Sanitização automática de dados sensíveis
- Preparado para Sentry/LogRocket

**`crypto.ts`**
- Criptografia AES-256-GCM
- Encrypt/decrypt de dados sensíveis

**`analytics.ts`**
- Tracking de eventos (GA4, Meta Pixel)
- DataLayer unificado

**Exemplo:**
```tsx
import { formatters, validators } from '@/lib/utils/formatters'
import { logger } from '@/lib/utils/logger'

const cpf = formatters.cpf("12345678900") // "123.456.789-00"
if (!validators.cpf(cpf)) {
  logger.error('CPF inválido', { cpf })
}
```

#### `lib/schemas/`
Schemas Zod para validação:

**`api-schemas.ts`**
- Schemas de payloads de API
- `VendaRequestSchema`, `CustomerDataSchema`, etc.

**`pacto-schemas.ts`**
- Schemas de respostas da API Pacto
- `PlanoSchema`, `SimulacaoSchema`, etc.

**Exemplo:**
```tsx
import { validateSchema, VendaRequestSchema } from '@/lib/schemas/api-schemas'

const result = validateSchema(VendaRequestSchema, body)
if (!result.success) {
  return NextResponse.json(result.error, { status: 400 })
}
```

#### `lib/config/`
Configurações e constantes:

**`env.ts`**
- Validação de environment variables
- Type-safe env access

**`locations.ts`**
- Dados estáticos de unidades (fallback)
- Constantes do projeto

**Exemplo:**
```tsx
import { getEnv } from '@/lib/config/env'
import { locations } from '@/lib/config/locations'

const env = getEnv()
const location = locations.find(l => l.id === 'torres')
```

---

### 4. `hooks/`

Custom React Hooks:
- `use-mobile.tsx` - Hook para detectar mobile
- `use-toast.ts` - Hook para toast notifications

**Quando criar:**
- Lógica stateful reutilizável
- Abstração de comportamento de UI

**Exemplo:**
```tsx
import { useMobile } from '@/hooks/use-mobile'

const isMobile = useMobile()
```

---

### 5. `contexts/`

React Contexts para estado global:
- `unit-context.tsx` - Context da unidade atual

**Quando criar:**
- Estado compartilhado entre múltiplos componentes
- Evitar prop drilling

**Exemplo:**
```tsx
import { useUnit } from '@/contexts/unit-context'

const { currentUnit } = useUnit()
```

---

### 6. `types/`

TypeScript types globais:
- Tipos compartilhados entre múltiplos arquivos
- Interfaces de domínio
- Tipos de utilidade

**Quando criar:**
```tsx
// types/index.ts
export interface Unit {
  id: string
  slug: string
  nome: string
  // ...
}

export type PaymentMethod = 'cartao' | 'pix' | 'boleto'
```

---

## 🎯 Convenções e Boas Práticas

### Imports
Usar paths absolutos com `@/`:

```tsx
// ✅ BOM
import Header from '@/components/layout/header'
import { logger } from '@/lib/utils/logger'
import { pactoAPI } from '@/lib/api/pacto-api'

// ❌ RUIM
import Header from '../../../components/layout/header'
```

### Naming
- **Componentes:** PascalCase (`CheckoutModal.tsx`)
- **Utilitários:** camelCase (`formatters.ts`)
- **Constantes:** UPPER_SNAKE_CASE
- **Types:** PascalCase

### Organização
- **1 componente = 1 arquivo**
- **Exportação default** para componentes
- **Exportação named** para utilitários
- **Colocar tests** ao lado do arquivo (`component.test.tsx`)

### Quando Criar Nova Feature?
Crie uma nova feature em `features/` quando:
1. Agrupa múltiplos componentes relacionados
2. Tem lógica de negócio específica
3. Pode ser desenvolvida independentemente
4. Tem seu próprio domínio de dados

**Exemplo de nova feature:**
```
features/
  ├── membership/
  │   ├── membership-card.tsx
  │   ├── membership-status.tsx
  │   └── membership-service.ts
```

---

## 🔄 Migração de Imports

Se você está migrando código antigo, use os novos caminhos:

| Antigo | Novo |
|--------|------|
| `@/lib/formatters` | `@/lib/utils/formatters` |
| `@/lib/logger` | `@/lib/utils/logger` |
| `@/lib/pacto-api` | `@/lib/api/pacto-api` |
| `@/lib/repository` | `@/lib/api/supabase-repository` |
| `@/lib/supabase-server` | `@/lib/api/supabase` |
| `@/lib/env` | `@/lib/config/env` |
| `@/lib/locations` | `@/lib/config/locations` |
| `@/components/header` | `@/components/layout/header` |
| `@/components/hero-section` | `@/components/sections/hero-section` |
| `@/components/checkout-modal` | `@/components/checkout/checkout-modal` |
| `@/components/unidade-card` | `@/features/units/unidade-card` |

**Script automático:**
```bash
node scripts/update-imports.js
```

---

## 📚 Recursos

- [Next.js Project Structure](https://nextjs.org/docs/app/building-your-application/routing/colocation)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

---

**Última atualização:** 15 de Outubro de 2025


# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Live Academia** is a Next.js 15 website (App Router) for the largest gym network in Manaus, Brazil. It features:
- Institutional pages (home, plans, classes, units)
- Transparent checkout integration with Pacto Soluções API (payment processing)
- Multi-unit support with dynamic plan fetching
- Analytics tracking (GA4, Meta Pixel via GTM dataLayer)
- **Sanity CMS** with automatic revalidation webhooks for instant content updates

**Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Radix UI/shadcn, Framer Motion, Supabase (Postgres), Sanity CMS, React Hook Form, Zod

## Development Commands

```bash
# Development
pnpm dev              # Start dev server (Next.js)
pnpm dev:fixed        # Alternative dev start via bash script

# Build & Production
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Database (Supabase)
pnpm seed             # Seed Supabase with units data
pnpm seed:reset       # Reset and reseed database

# API Discovery (internal scripts)
pnpm fetch:unit-keys  # Fetch unit API keys from external sources
```

## Architecture

### Core Concepts

1. **Multi-Unit System**: Each gym unit has its own:
   - Encrypted API key (`units.chave_api`) stored in Supabase
   - Public key (`units.chave_publica`) for scoped operations
   - Unique slug for routing (e.g., `/unidades/torres`)
   - Static fallback data in `lib/locations.ts` if DB unavailable

2. **Checkout Flow**: Modal-based multi-step process:
   - Step 1: Personal data collection
   - Step 2: Payment method selection (card/pix/boleto)
   - Step 3: Processing
   - Step 4: Success/error display
   - All payments proxied through `/api/pacto/*` routes (server-side only)

3. **API Integration**: `lib/pacto-api.ts` (V3 `/psec` endpoints)
   - Token caching per unit (redeKey|publicKey pairs)
   - Automatic retry + timeout handling
   - Response validation via Zod schemas (`lib/pacto-schemas.ts`)

### File Structure (Key Areas)

```
app/
├── page.tsx                    # Homepage with all sections
├── planos/                     # Plans page
├── unidades/                   # Units listing + detail pages
│   └── [slug]/                 # Dynamic unit detail
├── api/                        # Server-side API routes
│   ├── pacto/                  # Pacto API proxy (planos, venda, simular)
│   └── checkout/               # Legacy checkout routes
components/
├── ui/                         # shadcn/ui base components
├── *-section.tsx               # Homepage sections (hero, planos, etc.)
├── checkout-modal.tsx          # Multi-step checkout modal
├── unidade-card.tsx            # Unit card component
└── floating-button.tsx         # WhatsApp/contact floating action
lib/
├── pacto-api.ts                # Pacto API wrapper (V3)
├── pacto-schemas.ts            # Zod schemas for API responses
├── locations.ts                # Static unit data (fallback)
├── repository.ts               # Supabase data access (units, logs)
├── crypto.ts                   # AES-256-GCM encryption for API keys
├── analytics.ts                # Analytics event tracking wrapper
└── env.ts                      # Environment variable validation
contexts/
└── unit-context.tsx            # React context for current unit (client)
supabase/
└── schema.sql                  # Database schema (units, api_log)
scripts/
└── *.js                        # API key discovery tools (see README-API-DISCOVERY.md)
```

## Database (Supabase)

**Current Schema** (refactored - see README section "🗄 Persistência / Supabase"):

### Tables

1. **`units`** - Primary table for gym units
   - `id` (uuid PK)
   - `slug` (text UNIQUE) - URL identifier
   - `nome` (text) - Display name
   - `codigo_unidade` (text) - Internal/external code for Pacto API
   - Location fields: `cidade`, `estado`, `cep`, `endereco`, `complemento`, `latitude`, `longitude`
   - `logo` (text) - Logo URL
   - `imagens` (text[]) - Image gallery URLs
   - `chave_publica` (text) - Public key (not encrypted)
   - `chave_api` (text) - **Encrypted** private API key (AES-256-GCM JSON format)
   - `telefone`, `email`, `locale`, `moeda`, `usarSistemaInternacional`
   - `created_at`, `updated_at`

2. **`api_log`** - API call logging (request hash only, no sensitive data)
   - `id` (uuid PK)
   - `unidade_id` (uuid FK -> units.id)
   - `direction` (OUTBOUND/INBOUND)
   - `method`, `endpoint`, `status_code`, `latency_ms`
   - `error` (text) - Error summary
   - `request_hash` (text) - SHA-256 of request body

### Important Notes

- **Encryption**: `units.chave_api` uses AES-256-GCM (see `lib/crypto.ts`)
  - Format: `{"v":1,"iv":"...","tag":"...","data":"..."}`
  - Secret: `ENCRYPTION_SECRET` env var (32+ chars, never commit)
  - Decryption happens in `lib/repository.ts::getUnitBySlug()`

- **Legacy**: Old schema had `rede` + `unidade` tables - now consolidated into `units`
  - Scripts `lib/repository.ts` and `scripts/seed-supabase.ts` need updating to match new schema
  - DO NOT use old references to `rede.encrypted_api_key` or `unidade.encrypted_unit_key`

## Sanity CMS Integration

**Content Management**: All site content (homepage, units, plans, testimonials, etc.) is managed via Sanity Studio.

**Automatic Sync**: Webhooks configured to revalidate pages instantly when content changes in Sanity.

**How it works**:
1. User publishes changes in Sanity Studio
2. Sanity sends webhook to `/api/revalidate`
3. Next.js revalidates affected pages and cache tags
4. Changes appear on site within seconds (no manual rebuild needed!)

**Configuration**: See `docs/SANITY-WEBHOOK-SETUP.md` for complete webhook setup instructions.

**Important files**:
- `app/api/revalidate/route.ts` - Webhook endpoint with revalidation logic
- `lib/sanity.ts` - Sanity client + data fetching functions (all with cache tags)
- `sanity.config.ts` - Sanity Studio configuration

## Environment Variables

Required variables (create `.env.local` from `.env.example`):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Encryption (32+ chars, NEVER commit)
ENCRYPTION_SECRET=your-strong-secret-here

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=c9pbklm2
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-api-token
SANITY_REVALIDATE_SECRET=your-webhook-token  # for webhook authentication
SANITY_WEBHOOK_SECRET=your-webhook-secret    # optional, for signature validation

# Pacto API
PACTO_API_URL=https://apigw.pactosolucoes.com.br  # optional, has default

# Analytics (public)
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
NEXT_PUBLIC_SITE_URL=https://liveacademia.com.br
NEXT_PUBLIC_ENV=development  # dev/staging/prod
```

## Pacto API Integration

**Flow**:
1. User selects plan → opens checkout modal
2. Frontend calls `/api/pacto/planos/[slug]` (server route)
3. Server route:
   - Fetches unit from DB via `getUnitBySlug(slug)`
   - Decrypts `chave_api` → `apiKeyPlain`
   - Calls `pactoAPI.getPlanosUnidade(redeKey, publicKey, codigoUnidade)`
4. For payment: `/api/pacto/venda` → `pactoAPI.vendaCartao/vendaPix/vendaBoleto`
5. Fallback to static data from `lib/locations.ts` if DB/keys unavailable

**Key Points**:
- All Pacto calls are **server-side only** (`lib/pacto-api.ts` warns if imported in browser)
- Each unit has unique keys (no global `PACTO_REDE_KEY`)
- Token caching in-memory (Map) prevents re-auth on every request
- Timeout: 15s default, retry: 1 attempt

## Analytics / Tracking

Implemented via `lib/analytics.ts` (see `docs/analytics-tracking-plan.md`):

**Key Events**:
- `plan_select` - User clicks "Matricular" on plan card
- `checkout_start` - Checkout modal opens
- `checkout_step_view` - Each step transition
- `payment_attempt` - Before API call
- `payment_result` - After API response (success/error)
- `purchase` - Final conversion (GA4 ecommerce event)

**Usage**:
```ts
import { track, AnalyticsEvents } from '@/lib/analytics'

track({
  event: AnalyticsEvents.PLAN_SELECT,
  payload: { plano_id: 'diamante', plano_valor: 8990, unidade_id: 'torres' }
})
```

Push to `window.dataLayer` for GTM consumption (GA4 + Meta Pixel configured in GTM).

## Code Style & Patterns

### TypeScript
- Strict mode enabled (but `ignoreBuildErrors` temporarily ON - remove later)
- Zod for validation (API responses, forms)
- Type-safe analytics events via `AnalyticsEvent` enum

### Components
- shadcn/ui base components in `components/ui/`
- Prefer server components unless client interactivity needed (use `"use client"` directive)
- Framer Motion for animations (see `components/*-section.tsx` for patterns)

### API Routes (Next.js App Router)
- Always validate params/body with Zod
- Use `try/catch` + proper status codes
- Log to `api_log` table via `logApi()` from `lib/repository.ts`
- Never log sensitive data (mask CPF, never log card numbers)

## Common Workflows

### Adding a New Unit
1. Get API key from Pacto (via discovery scripts or manual)
2. Encrypt key: `const encrypted = encrypt(apiKeyPlain)` (see `lib/crypto.ts`)
3. Insert into DB:
   ```ts
   await supabase.from('units').insert({
     slug: 'nova-unidade',
     nome: 'Nova Unidade',
     codigo_unidade: 'NVU001',
     chave_api: encrypted,
     chave_publica: publicKey,
     // ... other fields
   })
   ```
4. Update `lib/locations.ts` with static fallback data
5. Verify by visiting `/unidades/nova-unidade`

### Updating Checkout Flow
- Main file: `components/checkout-modal.tsx`
- Steps managed via `currentStep` state (1-4)
- Payment processing in `handlePayment()` function
- **TODO**: Refactor to state machine (see `docs/architecture.md` roadmap)

### Analytics Changes
1. Update event definition in `lib/analytics.ts`
2. Document in `docs/analytics-tracking-plan.md`
3. Add tracking call in component where event occurs
4. Test in browser: open DevTools → Console → check `dataLayer` pushes

## Testing & Debugging

**Checkout Testing**:
- Use test cards from Pacto API docs (if available)
- Check Network tab for `/api/pacto/*` calls
- Inspect `dataLayer` for tracking events: `console.log(window.dataLayer)`

**Database**:
- Supabase Studio: [project].supabase.co
- Check `api_log` table for API call history
- Verify `units` table for encrypted keys (should be JSON string)

**Logs**:
- Server logs: check terminal running `pnpm dev`
- Client errors: browser DevTools Console
- API errors: check response bodies from `/api/pacto/*` routes

## Security Checklist

- ✅ Never commit `.env.local` or real API keys
- ✅ All Pacto API calls server-side only
- ✅ Keys encrypted at rest (AES-256-GCM)
- ✅ No card data stored (pass-through to Pacto)
- ✅ CPF/phone sanitized before sending (remove formatting)
- ❌ TODO: Add CSP headers + Referrer-Policy
- ❌ TODO: Remove `ignoreBuildErrors` from `next.config.js`

## Content Updates (Sanity CMS)

**How to update site content**:

1. Access Sanity Studio: `http://localhost:3000/studio` (dev) or `https://liveacademia.com.br/studio` (prod)
2. Make changes (edit text, swap images, reorder items, etc.)
3. Click **Publish**
4. Changes appear on site within seconds automatically via webhook

**What can be edited**:
- Homepage sections (hero, about, benefits, plans)
- Units (name, address, photos, gallery)
- Plans (name, price, features)
- Testimonials
- Modalities
- App section
- Contact/About pages
- All images and text content

**No code changes needed** - everything is managed via Sanity Studio!

## Known Issues / Technical Debt

1. **Checkout State Management**: Monolithic `useState` in modal - refactor to Zustand/state machine
2. **TypeScript Strictness**: `ignoreBuildErrors` enabled - needs gradual removal
3. **Repository Layer**: `lib/repository.ts` still references old `rede`/`unidade` schema - update to `units`
4. **Seed Script**: `scripts/seed-supabase.ts` needs refactor for new schema
5. **No Tests**: No e2e/integration tests for checkout flow (high priority)
6. **No Observability**: Missing Sentry, Web Vitals reporting (roadmap item)

## API Discovery Scripts

See `README-API-DISCOVERY.md` and `scripts/` folder for tools to find unit API keys from hotsites.

**Usage**:
```bash
node scripts/manual-key-tester.js <32-char-hex-key>  # Test single key
node scripts/batch-key-discovery.js                  # Auto-discover from known hotsites
```

## Deployment

See `docs/deployment.md` for full instructions.

**Quick Deploy** (Vercel):
1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy (automatic on push to `main`)

**Database**: Supabase project already provisioned (check `.env.local` for URL)

## Contributing

- Follow Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, etc.
- Update README/docs when changing architecture or adding events
- PR checklist in `docs/contributing.md`
- Never commit sensitive data or disable security features without approval

## Roadmap (Technical Priorities)

1. Refactor checkout modal (state machine)
2. Update `lib/repository.ts` + seed scripts to new schema
3. Add Sentry + Web Vitals monitoring
4. Remove `ignoreBuildErrors` (fix TS issues)
5. Add e2e tests for checkout (Playwright)
6. Implement circuit breaker for Pacto API calls
7. Migrate to `src/` structure with domain-first folders

---

For detailed docs see:
- Architecture: `docs/architecture.md`
- Analytics: `docs/analytics-tracking-plan.md`
- Payment Flow: `docs/fluxo-pagamento.md`
- Contributing: `docs/contributing.md`
- Deployment: `docs/deployment.md`

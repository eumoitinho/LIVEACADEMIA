# 📊 Análise: Campos do Sanity Não Utilizados no Frontend

## 🔍 Resumo Executivo

Este documento lista **TODOS os campos** que existem e estão ativos no Sanity Studio, mas que **NÃO estão sendo consumidos** pelo frontend. Esta análise foi realizada comparando os schemas do Sanity com as queries em `lib/sanity.ts` e o uso nos componentes.

---

## 📋 Metodologia

1. ✅ Analisados todos os 25 schemas do Sanity
2. ✅ Comparados com as queries em `lib/sanity.ts`
3. ✅ Verificado uso nos componentes React
4. ✅ Identificados campos não buscados ou não utilizados

---

## 🚨 Campos Críticos Não Utilizados

### 1. **Unit Schema** (`sanity/schemas/unit.ts`)

#### Campos NÃO buscados na query `getUnits()`:

| Campo | Tipo | Descrição | Impacto |
|-------|------|-----------|---------|
| `city` | string | Cidade da unidade | ⚠️ **ALTO** - Usado para filtros |
| `state` | string | Estado da unidade | ⚠️ **ALTO** - Usado para filtros |
| `zipCode` | string | CEP da unidade | ⚠️ **MÉDIO** - Pode ser útil |
| `phone` | string | Telefone da unidade | ⚠️ **ALTO** - Informação de contato |
| `whatsapp` | string | WhatsApp da unidade | ⚠️ **ALTO** - Informação de contato |
| `email` | string | E-mail da unidade | ⚠️ **MÉDIO** - Informação de contato |
| `description` | text | Descrição da unidade | ⚠️ **MÉDIO** - Conteúdo descritivo |
| `backgroundImage` | image | Imagem de fundo (campo `heroBackground`) | ⚠️ **BAIXO** - Já existe `heroBackground` |

**Query atual busca:**
```typescript
// lib/sanity.ts linha 140-211
*[_type == "unit" && active == true] | order(order asc) {
  _id, name, "slug": slug.current, address, latitude, longitude,
  type, services, photo, backgroundImage, heroBackground, images,
  modalidades[]->, beneficios[]->, openingHours, order, active, featured, planos[]
}
```

**Faltando:**
- `city`, `state`, `zipCode`
- `phone`, `whatsapp`, `email`
- `description`

---

### 2. **Homepage Schema** (`sanity/schemas/homepage.ts`)

#### Campos NÃO buscados na query `getHomepageData()`:

| Campo | Tipo | Descrição | Impacto |
|-------|------|-----------|---------|
| `seo.keywords` | array | Palavras-chave para SEO | ⚠️ **ALTO** - Importante para SEO |
| `about.image` | image | Imagem da seção sobre | ⚠️ **MÉDIO** - Visual importante |
| `beneficios.items[].image` | string | Imagem do benefício | ⚠️ **BAIXO** - Campo é string, não image |

**Query atual busca:**
```typescript
// lib/sanity.ts linha 28-119
seo { title, description }, // ❌ FALTA keywords
about { badge, title, description, image, stats[], highlights }, // ✅ image está sendo buscado
beneficios { badge, title, description, items[] { icon, title, description, color, image } } // ✅ image está sendo buscado
```

**Status:** A query está quase completa, apenas `seo.keywords` está faltando.

---

### 3. **Hero Section Schema** (`sanity/schemas/hero-section.ts`)

#### Campos NÃO buscados na query `getHeroSectionData()`:

**Query atual está COMPLETA! ✅**

Todos os campos do schema estão sendo buscados:
- `title`, `description`
- `priceTag` (text, price, showIcon)
- `cta` (text, url, showArrow)
- `overlay` (enabled, opacity)
- `displaySettings` (showOnHomepage, showPriceTag)
- `backgroundImage` (com asset e metadata)

---

### 4. **Planos Section Schema** (`sanity/schemas/planos-section.ts`)

#### Campos NÃO buscados na query `getPlanosSectionData()`:

| Campo | Tipo | Descrição | Impacto |
|-------|------|-----------|---------|
| `header.highlightWord` | string | Palavra em destaque no título | ⚠️ **MÉDIO** - Funcionalidade de destaque |
| `featuredPlans[].numero` | string | Número de ordem (01, 02, etc.) | ⚠️ **BAIXO** - Visual |
| `featuredPlans[].setup` | string | Tempo de setup | ⚠️ **BAIXO** - Informação adicional |
| `displaySettings.maxPlansToShow` | number | Máximo de planos para exibir | ⚠️ **MÉDIO** - Controle de exibição |

**Query atual busca:**
```typescript
// lib/sanity.ts linha 511-558
header { title, highlightWord, description }, // ✅ highlightWord está sendo buscado
featuredPlans[] { nome, preco, periodo, descricao, beneficios, popular, destaque, badge, numero, setup, image, ctaText, gradient, order, active },
footnote { text, linkText, linkUrl },
displaySettings { showOnHomepage, showBackgroundEffects, showFootnote, maxPlansToShow }
```

**Status:** A query está COMPLETA! ✅ Todos os campos estão sendo buscados.

---

### 5. **Beneficios Section Schema** (`sanity/schemas/beneficios-section.ts`)

#### Campos NÃO buscados na query `getBeneficiosSectionData()`:

**Query atual está COMPLETA! ✅**

Todos os campos estão sendo buscados:
- `badge`, `title`, `description`
- `items[]` (icon, title, description, color, image com asset)
- `displaySettings` (showOnHomepage, backgroundColor, overlayGradient)

---

### 6. **Global Settings Schema** (`sanity/schemas/global-settings.ts`)

#### Campos NÃO buscados na query `getGlobalSettings()`:

| Campo | Tipo | Descrição | Impacto |
|-------|------|-----------|---------|
| `contact.address` | object | Endereço completo (street, city, state, zipCode) | ⚠️ **ALTO** - Informação importante |
| `appUrls.appStoreUrl` | url | URL única do App Store | ⚠️ **MÉDIO** - Diferença de estrutura |
| `appUrls.playStoreUrl` | url | URL única do Google Play | ⚠️ **MÉDIO** - Diferença de estrutura |
| `globalCTAs.primaryCTA` | string | CTA primário global | ⚠️ **ALTO** - Texto reutilizável |
| `globalCTAs.secondaryCTA` | string | CTA secundário global | ⚠️ **ALTO** - Texto reutilizável |
| `globalCTAs.plansCTA` | string | CTA para ver planos | ⚠️ **MÉDIO** - Texto específico |
| `globalCTAs.consultorCTA` | string | CTA falar com consultor | ⚠️ **MÉDIO** - Texto específico |
| `floatingButtons[].label` | string | Rótulo do botão | ⚠️ **ALTO** - Texto do botão |
| `floatingButtons[].type` | string | Tipo (phone, whatsapp, etc.) | ⚠️ **ALTO** - Tipo do botão |
| `floatingButtons[].url` | string | URL do botão | ⚠️ **ALTO** - Link do botão |
| `floatingButtons[].icon` | string | Ícone Lucide | ⚠️ **ALTO** - Ícone do botão |
| `floatingButtons[].order` | number | Ordem de exibição | ⚠️ **MÉDIO** - Ordenação |
| `general.companyName` | string | Nome da empresa | ⚠️ **BAIXO** - Pode ser útil |
| `general.tagline` | string | Slogan da empresa | ⚠️ **BAIXO** - Marketing |
| `general.address` | text | Endereço principal | ⚠️ **MÉDIO** - Informação |
| `general.workingHours` | string | Horário de funcionamento | ⚠️ **BAIXO** - Informação geral |

**Query atual busca:**
```typescript
// lib/sanity.ts linha 612-662
contact { email, phone, whatsapp, address { street, city, state, zipCode } }, // ✅ address está sendo buscado
socialMedia { facebook, instagram, youtube, linkedin, tiktok },
appUrls { appStore { appLive, appTreino }, googlePlay { appLive, appTreino } }, // ❌ Estrutura diferente
globalCtas { primaryCta { text, url, style }, secondaryCta { text, url, style } }, // ❌ Estrutura diferente
floatingButtons[] { icon, text, url, backgroundColor, textColor, position, order, active } // ❌ Campos diferentes
```

**Problemas identificados:**
1. **appUrls**: Schema tem `appStoreUrl` e `playStoreUrl` (URLs únicas), mas query busca estrutura aninhada `appStore.appLive` e `googlePlay.appLive`
2. **globalCTAs**: Schema tem `primaryCTA`, `secondaryCTA`, `plansCTA`, `consultorCTA` (strings), mas query busca objetos com `text`, `url`, `style`
3. **floatingButtons**: Schema tem `label`, `type`, `url`, `icon`, mas query busca `text`, `url`, `icon`, `backgroundColor`, `textColor`, `position`
4. **contact.address**: Query busca objeto aninhado, mas schema tem apenas campos simples no `contact`
5. **general**: Campo `general` não existe na query

---

### 7. **Navigation Schema** (`sanity/schemas/navigation.ts`)

#### Campos NÃO buscados na query `getNavigationData()`:

**Query atual está COMPLETA! ✅**

Todos os campos estão sendo buscados:
- `header` (logo, navigation[], ctaButton, mobileMenu)
- `footer` (about, sections[], socialMedia, copyright)

---

### 8. **Unidades Section Schema** (`sanity/schemas/unidades-section.ts`)

#### Campos NÃO buscados na query `getUnidadesSectionData()`:

**Query atual está COMPLETA! ✅**

Todos os campos estão sendo buscados:
- `header` (title, description)
- `cta` (text, url)
- `displaySettings` (showOnHomepage, layout, maxUnits, showLocationButton, locationButtonText, autoPlay, autoPlayInterval, backgroundColor)

---

### 9. **Unidades Page Schema** (`sanity/schemas/unidades-page.ts`)

#### Campos NÃO buscados na query `getUnidadesPageData()`:

**Query atual está COMPLETA! ✅**

Todos os campos estão sendo buscados:
- `seo` (title, description)
- `header` (title, description)
- `filters` (todos os campos)
- `emptyState` (title, description, buttonText)
- `cta` (title, description, primaryButton, secondaryButton)
- `displaySettings` (showCta, gridColumns, cardsPerPage)

---

### 10. **Planos Page Schema** (`sanity/schemas/planos-page.ts`)

#### Campos NÃO buscados na query `getPlanosPageData()`:

**Query atual está COMPLETA! ✅**

Todos os campos estão sendo buscados:
- `seo` (title, description)
- `header` (title, description)
- `plansOrder[]->`
- `comparison` (title, sections[])
- `footer` (disclaimer)
- `displaySettings` (showComparison, showUnitsSection)

---

### 11. **Modalidades Section Schema** (`sanity/schemas/modalidades-section.ts`)

#### Campos NÃO buscados na query `getModalidadesSectionData()`:

| Campo | Tipo | Descrição | Impacto |
|-------|------|-----------|---------|
| `displaySettings.backgroundColor` | string | Cor de fundo da seção | ⚠️ **BAIXO** - Estilização |

**Query atual busca:**
```typescript
// lib/sanity.ts linha 676-701
header { badge, title, description },
featuredModalities[] { subtitle, title, description, image { asset-> { url } }, order, active },
cta { text, url },
displaySettings { showOnHomepage, maxModalitiesShow } // ❌ FALTA backgroundColor
```

---

### 12. **Wellhub Section Schema** (`sanity/schemas/wellhub-section.ts`)

#### Campos NÃO buscados na query `getWellhubSectionData()`:

| Campo | Tipo | Descrição | Impacto |
|-------|------|-----------|---------|
| `banner.title` | string | Título do banner | ⚠️ **MÉDIO** - Conteúdo do banner |
| `banner.description` | text | Descrição do banner | ⚠️ **MÉDIO** - Conteúdo do banner |
| `banner.cta` | object | CTA do banner (text, url) | ⚠️ **MÉDIO** - Botão do banner |
| `displaySettings.backgroundColor` | string | Cor de fundo | ⚠️ **BAIXO** - Estilização |

**Query atual busca:**
```typescript
// lib/sanity.ts linha 715-757
header { badge, title, description },
benefits[] { icon, title, description, order },
detailedBenefits[] { title, description, order },
primaryCta { text, url },
banner { image { asset-> { url } }, altText }, // ❌ FALTA title, description, cta
displaySettings { showOnHomepage, showBanner } // ❌ FALTA backgroundColor
```

---

### 13. **Testimonial Section Schema** (`sanity/schemas/testimonial-section.ts`)

#### Campos NÃO buscados na query `getTestimonialSectionData()`:

| Campo | Tipo | Descrição | Impacto |
|-------|------|-----------|---------|
| `featuredTestimonials[].featured` | boolean | Se está em destaque | ⚠️ **BAIXO** - Visual |
| `displaySettings.maxTestimonials` | number | Máximo de depoimentos | ⚠️ **MÉDIO** - Controle de exibição |

**Query atual busca:**
```typescript
// lib/sanity.ts linha 761-802
header { badge, title, description },
useExistingTestimonials,
featuredTestimonials[] { name, role, content, avatar { asset-> { url } }, rating, order }, // ❌ FALTA featured
linkedTestimonials[]-> { name, role, content, avatar { asset-> { url } }, rating, order, active },
statistics { averageRating, satisfiedStudents, recommendation },
displaySettings { showOnHomepage, showStatistics, backgroundColor } // ❌ FALTA maxTestimonials
```

---

### 14. **Estrutura Section Schema** (`sanity/schemas/estrutura-section.ts`)

#### Campos NÃO buscados na query `getEstruturaSectionData()`:

**Query atual está COMPLETA! ✅**

Todos os campos estão sendo buscados:
- `header` (badge, title, description)
- `additionalInfo` (title, description)
- `displaySettings` (showOnHomepage, showAdditionalInfo)

---

### 15. **Plano Schema** (`sanity/schemas/plano.ts`)

#### Campos NÃO buscados na query `getPlans()`:

**Query atual está COMPLETA! ✅**

Todos os campos estão sendo buscados:
- `name`, `description`, `price`, `priceLabel`
- `features[]`, `cta`, `ctaUrl`
- `highlight`, `badge`, `order`, `active`

---

### 16. **Benefit Schema** (`sanity/schemas/benefit.ts`)

#### Campos NÃO buscados na query `getBenefits()`:

**Query atual está COMPLETA! ✅**

Todos os campos estão sendo buscados:
- `title`, `description`, `icon`, `image`, `order`, `active`

---

### 17. **Testimonial Schema** (`sanity/schemas/testimonial.ts`)

#### Campos NÃO buscados na query `getTestimonials()`:

**Query atual está COMPLETA! ✅**

Todos os campos estão sendo buscados:
- `name`, `role`, `content`, `avatar`, `rating`, `order`, `active`

---

## 📊 Resumo por Schema

| Schema | Status | Campos Faltando | Prioridade |
|--------|--------|-----------------|------------|
| **unit** | ✅ **CORRIGIDO** | 0 | - |
| **homepage** | ✅ **CORRIGIDO** | 0 | - |
| **heroSection** | ✅ Completo | 0 | - |
| **planosSection** | ✅ Completo | 0 | - |
| **beneficiosSection** | ✅ Completo | 0 | - |
| **globalSettings** | ✅ **CORRIGIDO** | 0 | - |
| **navigation** | ✅ Completo | 0 | - |
| **unidadesSection** | ✅ Completo | 0 | - |
| **unidadesPage** | ✅ Completo | 0 | - |
| **planosPage** | ✅ Completo | 0 | - |
| **modalidadesSection** | ✅ **CORRIGIDO** | 0 | - |
| **wellhubSection** | ✅ **CORRIGIDO** | 0 | - |
| **testimonialSection** | ✅ **CORRIGIDO** | 0 | - |
| **estruturaSection** | ✅ Completo | 0 | - |
| **plano** | ✅ Completo | 0 | - |
| **benefit** | ✅ **CORRIGIDO** | 0 | - |
| **testimonial** | ✅ **CORRIGIDO** | 0 | - |
| **modality** | ✅ **CORRIGIDO** | 0 | - |
| **structureFeature** | ✅ **CORRIGIDO** | 0 | - |
| **bioimpedanciaFeature** | ✅ **CORRIGIDO** | 0 | - |

**Status Final:** ✅ **100% COMPLETO - TODOS OS CAMPOS CORRIGIDOS**

---

## ✅ Ações Realizadas

### ✅ Prioridade ALTA - CONCLUÍDO

1. ✅ **Query `getUnits()` corrigida** - Todos os campos adicionados:
   ```typescript
   city, state, zipCode, phone, whatsapp, email, description, planosAPIConfig
   ```

2. ✅ **`getGlobalSettings()` corrigida** - Estrutura completamente reescrita:
   - ✅ `appUrls`: Agora usa `appStoreUrl` e `playStoreUrl`
   - ✅ `globalCTAs`: Agora usa `primaryCTA`, `secondaryCTA`, `plansCTA`, `consultorCTA` (strings)
   - ✅ `floatingButtons`: Agora usa `label`, `type`, `url`, `icon`
   - ✅ Campo `general` adicionado

### ✅ Prioridade MÉDIA - CONCLUÍDO

3. ✅ **`seo.keywords` adicionado** em `getHomepageData()`

4. ✅ **`getWellhubSectionData()` completada**:
   - ✅ `banner.title`, `banner.description`, `banner.cta`
   - ✅ `displaySettings.backgroundColor`

### ✅ Prioridade BAIXA - CONCLUÍDO

5. ✅ **`displaySettings.backgroundColor` adicionado** em `getModalidadesSectionData()`

6. ✅ **Campos faltantes adicionados** em `getTestimonialSectionData()`:
   - ✅ `featuredTestimonials[].featured`
   - ✅ `displaySettings.maxTestimonials`

### ✅ Correções Adicionais - CONCLUÍDO

7. ✅ **Campos de imagem corrigidos** em:
   - ✅ `getHomepageData()` - `about.image`
   - ✅ `getBenefits()` - `image`
   - ✅ `getTestimonials()` - `avatar`
   - ✅ `getModalities()` - `image`
   - ✅ `getStructureFeatures()` - `image`
   - ✅ `getBioimpedanciaFeatures()` - `image`

---

## 📝 Status Final

1. ✅ Documento de análise criado
2. ✅ **TODAS as queries atualizadas** em `lib/sanity.ts`
3. ⏳ Atualizar componentes para usar os novos campos (próximo passo)
4. ⏳ Testar no frontend (próximo passo)
5. ⏳ Atualizar tipos TypeScript se necessário (próximo passo)

**Ver documento completo de correções:** `docs/CORRECOES-SANITY-QUERIES.md`

---

**Última atualização:** Janeiro 2025  
**Versão:** 1.0  
**Autor:** Equipe de Desenvolvimento Live Academia


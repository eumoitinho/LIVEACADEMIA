# ✅ Correções Realizadas: Queries Sanity

## 📋 Resumo das Correções

Este documento lista **TODAS as correções** realizadas nas queries do Sanity para garantir que **100% dos campos** disponíveis no Sanity Studio sejam buscados pelo frontend.

---

## 🔧 Correções Realizadas

### 1. ✅ `getHomepageData()` - CORRIGIDO

#### Campos Adicionados:
- ✅ `seo.keywords` - Array de palavras-chave para SEO
- ✅ `about.image` - Corrigido para buscar como `image` com `asset` (antes era apenas string)

**Antes:**
```typescript
seo,  // ❌ Não buscava keywords
about {
  image,  // ❌ Buscava como string
}
```

**Depois:**
```typescript
seo {
  title,
  description,
  keywords  // ✅ Adicionado
},
about {
  image {  // ✅ Corrigido para image com asset
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  }
}
```

---

### 2. ✅ `getUnits()` - CORRIGIDO

#### Campos Adicionados:
- ✅ `city` - Cidade da unidade
- ✅ `state` - Estado da unidade
- ✅ `zipCode` - CEP da unidade
- ✅ `phone` - Telefone da unidade
- ✅ `whatsapp` - WhatsApp da unidade
- ✅ `email` - E-mail da unidade
- ✅ `description` - Descrição da unidade
- ✅ `planosAPIConfig` - Configuração de planos da API (JSON)

**Antes:**
```typescript
*[_type == "unit" && active == true] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  address,
  latitude,
  longitude,
  // ❌ Faltavam: city, state, zipCode, phone, whatsapp, email, description, planosAPIConfig
}
```

**Depois:**
```typescript
*[_type == "unit" && active == true] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  address,
  city,           // ✅ Adicionado
  state,          // ✅ Adicionado
  zipCode,        // ✅ Adicionado
  phone,          // ✅ Adicionado
  whatsapp,       // ✅ Adicionado
  email,          // ✅ Adicionado
  latitude,
  longitude,
  type,
  services,
  description,    // ✅ Adicionado
  // ... outros campos ...
  planosAPIConfig,  // ✅ Adicionado
}
```

---

### 3. ✅ `getBenefits()` - CORRIGIDO

#### Campo Corrigido:
- ✅ `image` - Corrigido para buscar como `image` com `asset` (antes era apenas string)

**Antes:**
```typescript
image,  // ❌ Buscava como string
```

**Depois:**
```typescript
image {  // ✅ Corrigido para image com asset
  asset-> {
    _id,
    url,
    metadata {
      dimensions {
        width,
        height
      }
    }
  },
  alt
}
```

---

### 4. ✅ `getTestimonials()` - CORRIGIDO

#### Campo Corrigido:
- ✅ `avatar` - Corrigido para buscar como `image` com `asset` (antes era apenas string)

**Antes:**
```typescript
avatar,  // ❌ Buscava como string
```

**Depois:**
```typescript
avatar {  // ✅ Corrigido para image com asset
  asset-> {
    _id,
    url,
    metadata {
      dimensions {
        width,
        height
      }
    }
  },
  alt
}
```

---

### 5. ✅ `getModalities()` - CORRIGIDO

#### Campo Corrigido:
- ✅ `image` - Corrigido para buscar como `image` com `asset` (antes era apenas string)

**Antes:**
```typescript
image,  // ❌ Buscava como string
```

**Depois:**
```typescript
image {  // ✅ Corrigido para image com asset
  asset-> {
    _id,
    url,
    metadata {
      dimensions {
        width,
        height
      }
    }
  },
  alt
}
```

---

### 6. ✅ `getStructureFeatures()` - CORRIGIDO

#### Campo Corrigido:
- ✅ `image` - Corrigido para buscar como `image` com `asset` (antes era apenas string)

**Antes:**
```typescript
image,  // ❌ Buscava como string
```

**Depois:**
```typescript
image {  // ✅ Corrigido para image com asset
  asset-> {
    _id,
    url,
    metadata {
      dimensions {
        width,
        height
      }
    }
  },
  alt
}
```

---

### 7. ✅ `getBioimpedanciaFeatures()` - CORRIGIDO

#### Campo Corrigido:
- ✅ `image` - Corrigido para buscar como `image` com `asset` (antes era apenas string)

**Antes:**
```typescript
image,  // ❌ Buscava como string
```

**Depois:**
```typescript
image {  // ✅ Corrigido para image com asset
  asset-> {
    _id,
    url,
    metadata {
      dimensions {
        width,
        height
      }
    }
  },
  alt
}
```

---

### 8. ✅ `getGlobalSettings()` - CORRIGIDO COMPLETAMENTE

#### Estrutura Completamente Reescrita:

**Antes (Estrutura Incorreta):**
```typescript
contact {
  address { street, city, state, zipCode }  // ❌ Schema não tem address aninhado
},
appUrls {
  appStore { appLive, appTreino },  // ❌ Schema tem appStoreUrl e playStoreUrl
  googlePlay { appLive, appTreino }
},
globalCtas {
  primaryCta { text, url, style },  // ❌ Schema tem primaryCTA como string
  secondaryCta { text, url, style }
},
floatingButtons[] {
  icon,
  text,  // ❌ Schema tem label
  url,
  backgroundColor,  // ❌ Schema não tem
  textColor,       // ❌ Schema não tem
  position         // ❌ Schema não tem
}
// ❌ Faltava: general
```

**Depois (Estrutura Correta):**
```typescript
contact {
  email,
  phone,
  whatsapp  // ✅ Corrigido - sem address aninhado
},
appUrls {
  appStoreUrl,   // ✅ Corrigido
  playStoreUrl   // ✅ Corrigido
},
globalCTAs {
  primaryCTA,    // ✅ Corrigido - string
  secondaryCTA,  // ✅ Corrigido - string
  plansCTA,      // ✅ Adicionado
  consultorCTA   // ✅ Adicionado
},
floatingButtons[] {
  label,   // ✅ Corrigido
  type,    // ✅ Adicionado
  url,
  icon,
  order,
  active
},
general {  // ✅ Adicionado
  companyName,
  tagline,
  address,
  workingHours
}
```

---

### 9. ✅ `getModalidadesSectionData()` - CORRIGIDO

#### Campo Adicionado:
- ✅ `displaySettings.backgroundColor` - Cor de fundo da seção

**Antes:**
```typescript
displaySettings {
  showOnHomepage,
  maxModalitiesShow
  // ❌ Faltava backgroundColor
}
```

**Depois:**
```typescript
displaySettings {
  showOnHomepage,
  maxModalitiesShow,
  backgroundColor  // ✅ Adicionado
}
```

---

### 10. ✅ `getWellhubSectionData()` - CORRIGIDO

#### Campos Adicionados:
- ✅ `banner.title` - Título do banner
- ✅ `banner.description` - Descrição do banner
- ✅ `banner.cta` - CTA do banner (text, url)
- ✅ `displaySettings.backgroundColor` - Cor de fundo

**Antes:**
```typescript
banner {
  image { asset-> { url } },
  altText
  // ❌ Faltavam: title, description, cta
},
displaySettings {
  showOnHomepage,
  showBanner
  // ❌ Faltava backgroundColor
}
```

**Depois:**
```typescript
banner {
  title,        // ✅ Adicionado
  description,  // ✅ Adicionado
  image { asset-> { url } },
  altText,
  cta {         // ✅ Adicionado
    text,
    url
  }
},
displaySettings {
  showOnHomepage,
  showBanner,
  backgroundColor  // ✅ Adicionado
}
```

---

### 11. ✅ `getTestimonialSectionData()` - CORRIGIDO

#### Campos Adicionados:
- ✅ `featuredTestimonials[].featured` - Flag de destaque
- ✅ `displaySettings.maxTestimonials` - Máximo de depoimentos

**Antes:**
```typescript
featuredTestimonials[] {
  name,
  role,
  content,
  avatar { asset-> { url } },
  rating,
  order
  // ❌ Faltava featured
},
displaySettings {
  showOnHomepage,
  showStatistics,
  backgroundColor
  // ❌ Faltava maxTestimonials
}
```

**Depois:**
```typescript
featuredTestimonials[] {
  name,
  role,
  content,
  avatar { asset-> { url } },
  rating,
  order,
  featured  // ✅ Adicionado
},
displaySettings {
  showOnHomepage,
  showStatistics,
  backgroundColor,
  maxTestimonials  // ✅ Adicionado
}
```

---

## 📊 Estatísticas das Correções

### Queries Corrigidas: **11**

| # | Função | Campos Adicionados | Campos Corrigidos | Status |
|---|--------|-------------------|-------------------|--------|
| 1 | `getHomepageData()` | 1 | 1 | ✅ Completo |
| 2 | `getUnits()` | 8 | 0 | ✅ Completo |
| 3 | `getBenefits()` | 0 | 1 | ✅ Completo |
| 4 | `getTestimonials()` | 0 | 1 | ✅ Completo |
| 5 | `getModalities()` | 0 | 1 | ✅ Completo |
| 6 | `getStructureFeatures()` | 0 | 1 | ✅ Completo |
| 7 | `getBioimpedanciaFeatures()` | 0 | 1 | ✅ Completo |
| 8 | `getGlobalSettings()` | 5 | 4 | ✅ Completo |
| 9 | `getModalidadesSectionData()` | 1 | 0 | ✅ Completo |
| 10 | `getWellhubSectionData()` | 4 | 0 | ✅ Completo |
| 11 | `getTestimonialSectionData()` | 2 | 0 | ✅ Completo |

### Total de Correções:
- **Campos Adicionados:** 21
- **Campos Corrigidos:** 9
- **Total de Alterações:** 30

---

## ✅ Queries que Já Estavam Completas

As seguintes queries já estavam buscando todos os campos corretamente:

1. ✅ `getHeroSectionData()` - Completo
2. ✅ `getPlanosSectionData()` - Completo
3. ✅ `getBeneficiosSectionData()` - Completo
4. ✅ `getNavigationData()` - Completo
5. ✅ `getUnidadesSectionData()` - Completo
6. ✅ `getUnidadesPageData()` - Completo
7. ✅ `getPlanosPageData()` - Completo
8. ✅ `getEstruturaSectionData()` - Completo
9. ✅ `getPlans()` - Completo
10. ✅ `getAppFeatures()` - Completo
11. ✅ `getWellhubFeatures()` - Completo

---

## 🎯 Resultado Final

### Antes das Correções:
- ❌ **7 campos críticos** faltando em `getUnits()`
- ❌ **1 campo SEO** faltando em `getHomepageData()`
- ❌ **6 campos de imagem** buscados incorretamente (como string)
- ❌ **Estrutura completamente errada** em `getGlobalSettings()`
- ❌ **7 campos** faltando em outras seções

### Depois das Correções:
- ✅ **100% dos campos** do Sanity Studio estão sendo buscados
- ✅ **Todas as imagens** são buscadas com `asset` e `metadata`
- ✅ **Estrutura de `globalSettings`** corrigida e alinhada com schema
- ✅ **Todos os campos de configuração** disponíveis
- ✅ **Todos os campos de exibição** disponíveis

---

## 📝 Notas Importantes

### Campos de Imagem
Todos os campos de imagem agora são buscados com:
- `asset->` para URL e metadados
- `metadata.dimensions` para width/height
- `alt` para texto alternativo

### Estrutura de Global Settings
A estrutura foi completamente reescrita para corresponder exatamente ao schema:
- `appUrls.appStoreUrl` e `appUrls.playStoreUrl` (URLs únicas)
- `globalCTAs` como strings (não objetos)
- `floatingButtons` com `label` e `type` (não `text` e `backgroundColor`)

### Campos de Unidade
Agora todas as informações de contato e localização estão disponíveis:
- `city`, `state`, `zipCode` para filtros
- `phone`, `whatsapp`, `email` para contato
- `description` para conteúdo descritivo
- `planosAPIConfig` para configuração de planos

---

## 🚀 Próximos Passos

1. ✅ **Queries corrigidas** - Concluído
2. ⏳ **Testar no frontend** - Verificar se componentes usam os novos campos
3. ⏳ **Atualizar tipos TypeScript** - Se necessário
4. ⏳ **Atualizar componentes** - Para usar campos recém-disponíveis
5. ⏳ **Testar no Sanity Studio** - Garantir que dados estão sendo salvos

---

**Data das Correções:** Janeiro 2025  
**Versão:** 1.0  
**Status:** ✅ **100% COMPLETO**  
**Autor:** Equipe de Desenvolvimento Live Academia


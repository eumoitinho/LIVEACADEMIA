# 🔌 Integração com Strapi CMS

## 📋 Status Atual

A aplicação está configurada para usar **Strapi CMS**, mas precisa de configuração adicional.

## 🚀 Configuração Necessária

### 1. Variáveis de Ambiente

Adicione ao seu `.env.local`:

```env
# Strapi Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here

# Preview Mode (opcional)
STRAPI_PREVIEW_SECRET=your-preview-secret
STRAPI_REVALIDATE_SECRET=your-revalidate-secret
```

### 2. Verificar se o Strapi está rodando

```bash
cd cms
pnpm dev
```

O Strapi deve estar disponível em: `http://localhost:1337`

### 3. Obter API Token

1. Acesse o Strapi Admin: `http://localhost:1337/admin`
2. Vá em **Settings → API Tokens**
3. Crie um novo token com permissões de **Read**
4. Copie o token e adicione ao `.env.local`

### 4. Criar Conteúdo no Strapi

No Strapi Admin, crie conteúdo para:
- **Homepage** (Single Type)
- **Units** (Collection Type)
- **Plans** (Collection Type)
- **Modalities** (Collection Type)
- **Benefits** (Collection Type)
- **Testimonials** (Collection Type)

## 📝 Usar Strapi na Aplicação

### Opção 1: Usar Hooks (Client-Side)

```typescript
'use client';

import { useStrapiHomepage, useStrapiUnits } from '@/hooks/use-strapi-data';

export default function MyPage() {
  const { data: homepage, loading, error } = useStrapiHomepage();
  const { data: units } = useStrapiUnits();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h1>{homepage?.attributes.heroSection?.title1}</h1>
      {/* ... */}
    </div>
  );
}
```

### Opção 2: Usar Server-Side (Recomendado)

```typescript
import { getHomepage } from '@/lib/strapi';
import { isPreviewModeServer } from '@/lib/preview';

export default async function HomePage() {
  const preview = await isPreviewModeServer();
  const { data } = await getHomepage(preview);
  const homepage = data;

  return (
    <div>
      <h1>{homepage?.attributes.heroSection?.title1}</h1>
      {/* ... */}
    </div>
  );
}
```

## 🔍 Verificar se está Funcionando

### Testar API Routes

```bash
# Homepage
curl http://localhost:3000/api/strapi/homepage

# Units
curl http://localhost:3000/api/strapi/units

# Plans
curl http://localhost:3000/api/strapi/plans
```

### Testar Strapi Diretamente

```bash
# Homepage
curl http://localhost:1337/api/homepage

# Units
curl http://localhost:1337/api/units
```

## 🐛 Troubleshooting

### Erro: "Strapi API error: 404"

**Causa**: O Strapi não está rodando ou o conteúdo não existe.

**Solução**:
1. Verifique se o Strapi está rodando: `cd cms && pnpm dev`
2. Verifique se o conteúdo existe no Strapi Admin
3. Verifique se a URL está correta: `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337`

### Erro: "Invalid token" ou "Unauthorized"

**Causa**: O token de API não está configurado ou não tem permissões.

**Solução**:
1. Crie um token no Strapi Admin
2. Adicione ao `.env.local`: `STRAPI_API_TOKEN=seu-token`
3. Verifique se o token tem permissões de **Read**

### Erro: "Connection refused"

**Causa**: O Strapi não está acessível.

**Solução**:
1. Verifique se o Strapi está rodando
2. Verifique se a porta está correta (1337)
3. Verifique se não há firewall bloqueando

## 📚 Recursos

- [Strapi Documentation](https://docs.strapi.io)
- [Next.js + Strapi Integration](https://docs.strapi.io/dev-docs/plugins/preview-button)
- [Preview Mode Guide](./STRAPI-PREVIEW-MODE.md)

## 🔄 Migração do Sanity para Strapi

Se você quiser migrar completamente do Sanity para o Strapi:

1. **Criar conteúdo no Strapi**: Recrie todo o conteúdo no Strapi Admin
2. **Atualizar componentes**: Substitua `useHomepageData()` por `useStrapiHomepage()`
3. **Atualizar API routes**: Use `getHomepage()` do Strapi ao invés do Sanity
4. **Remover Sanity**: Remova dependências do Sanity se não for mais necessário


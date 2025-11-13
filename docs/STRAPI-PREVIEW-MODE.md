# 🎯 Strapi Preview Mode & Live Edit

Este documento explica como usar o Preview Mode e Live Edit com Strapi CMS.

## 📋 Visão Geral

O Preview Mode permite visualizar conteúdo não publicado (drafts) antes de publicar. O Live Edit permite ver mudanças em tempo real quando você edita conteúdo no Strapi.

## 🚀 Como Usar Preview Mode

### 1. Configurar Variáveis de Ambiente

Adicione as seguintes variáveis ao seu arquivo `.env`:

```env
# Preview Mode Secret (use um valor seguro em produção)
STRAPI_PREVIEW_SECRET=your-preview-secret-change-this

# Revalidation Secret (para live edit)
STRAPI_REVALIDATE_SECRET=your-revalidate-secret-change-this

# Strapi URL
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token
```

### 2. Ativar Preview Mode

Para ativar o preview mode, acesse:

```
http://localhost:3000/api/preview?secret=your-preview-secret-change-this&slug=homepage
```

Parâmetros:
- `secret`: O valor de `STRAPI_PREVIEW_SECRET`
- `slug`: O slug da página (opcional, padrão: `homepage`)
- `contentType`: O tipo de conteúdo (opcional, padrão: `homepage`)

### 3. Sair do Preview Mode

Para sair do preview mode, clique no botão "Exit Preview" no banner amarelo no topo da página, ou acesse:

```
http://localhost:3000/api/exit-preview
```

## 🔄 Live Edit (Revalidação em Tempo Real)

### Configurar Webhook no Strapi

1. Acesse o Strapi Admin: `http://localhost:1337/admin`
2. Vá em **Settings → Webhooks**
3. Crie um novo webhook com:
   - **Name**: Next.js Revalidation
   - **URL**: `http://localhost:3000/api/revalidate?secret=your-revalidate-secret-change-this&path=/`
   - **Events**: Selecione:
     - `entry.create`
     - `entry.update`
     - `entry.delete`
     - `entry.publish`
     - `entry.unpublish`

**Nota**: Em produção, use a URL do seu site (ex: `https://liveacademia.com.br/api/revalidate?secret=...`)

### Usar em Páginas

Para usar preview mode em uma página, importe e use a função helper:

```typescript
import { isPreviewModeServer } from '@/lib/preview';
import { getHomepage } from '@/lib/strapi';

export default async function HomePage() {
  const preview = await isPreviewModeServer();
  const response = await getHomepage(preview);
  const homepage = response.data;

  return (
    <div>
      {/* Seu conteúdo aqui */}
    </div>
  );
}
```

## 🎨 Componente Preview Banner

O componente `PreviewBanner` é automaticamente exibido quando o preview mode está ativo. Ele mostra:
- Um banner amarelo no topo da página
- Indicador de que você está visualizando conteúdo draft
- Botão para sair do preview mode

## 📝 Exemplo Completo

```typescript
// app/homepage/page.tsx
import { isPreviewModeServer } from '@/lib/preview';
import { getHomepage } from '@/lib/strapi';

export default async function HomepagePage() {
  const preview = await isPreviewModeServer();
  const { data } = await getHomepage(preview);
  
  return (
    <div>
      <h1>{data.attributes.heroSection.title}</h1>
      {/* Resto do conteúdo */}
    </div>
  );
}
```

## 🔐 Segurança

⚠️ **IMPORTANTE**: Em produção, certifique-se de:

1. Usar secrets fortes e únicos
2. Não commitar os secrets no repositório
3. Configurar os secrets nas variáveis de ambiente do Vercel/plataforma
4. Usar HTTPS para os webhooks

## 🐛 Troubleshooting

### Preview Mode não funciona

1. Verifique se `STRAPI_PREVIEW_SECRET` está configurado corretamente
2. Verifique se o token de API do Strapi tem permissões de leitura
3. Verifique os logs do console do navegador

### Live Edit não funciona

1. Verifique se o webhook está configurado corretamente no Strapi
2. Verifique se `STRAPI_REVALIDATE_SECRET` está configurado
3. Verifique se a URL do webhook está acessível (não use `localhost` em produção)
4. Verifique os logs do servidor Next.js

### Banner de preview não aparece

1. Verifique se o componente `PreviewBanner` está no layout
2. Verifique se o cookie `__prerender_bypass` está sendo definido
3. Limpe os cookies e tente novamente

## 📚 Referências

- [Next.js Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)
- [Strapi Preview Plugin](https://docs.strapi.io/dev-docs/plugins/preview-button)
- [Next.js Revalidation](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)


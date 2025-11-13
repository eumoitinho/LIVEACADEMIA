# 🎯 Preview Mode & Live Edit - Guia Rápido

## ⚡ Início Rápido

### 1. Configurar Variáveis de Ambiente

Adicione ao seu `.env`:

```env
STRAPI_PREVIEW_SECRET=seu-secret-aqui
STRAPI_REVALIDATE_SECRET=seu-secret-revalidate-aqui
```

### 2. Ativar Preview Mode

Acesse no navegador:
```
http://localhost:3000/api/preview?secret=seu-secret-aqui
```

### 3. Sair do Preview Mode

Clique no botão "Exit Preview" no banner amarelo, ou acesse:
```
http://localhost:3000/api/exit-preview
```

## 📝 Usar em Páginas

```typescript
import { isPreviewModeServer } from '@/lib/preview';
import { getHomepage } from '@/lib/strapi';

export default async function HomePage() {
  const preview = await isPreviewModeServer();
  const { data } = await getHomepage(preview);
  
  return <div>{/* Seu conteúdo */}</div>;
}
```

## 🔄 Configurar Webhook para Live Edit

1. Strapi Admin → Settings → Webhooks
2. Criar webhook:
   - URL: `http://localhost:3000/api/revalidate?secret=seu-secret-revalidate-aqui&path=/`
   - Events: `entry.create`, `entry.update`, `entry.publish`

## 📚 Documentação Completa

Veja `docs/STRAPI-PREVIEW-MODE.md` para documentação detalhada.


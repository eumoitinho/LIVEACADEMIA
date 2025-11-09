# 🔍 Troubleshooting: Mudanças do Sanity Não Aparecem no Site

## ❌ Problema Reportado

Cliente relata que mudanças feitas no Sanity há 2 semanas não estão aparecendo no site.

---

## 🔎 Diagnóstico Passo a Passo

### 1. Verificar se as Mudanças Foram Publicadas no Sanity

**No Sanity Studio:**
1. Acesse o documento que foi editado
2. Verifique se há um botão **"Publish"** visível (indica que há alterações não publicadas)
3. Se houver, clique em **"Publish"** para publicar as alterações
4. Verifique o histórico de alterações (ícone de relógio no canto superior direito)

**Importante:** Alterações salvas mas não publicadas não aparecem no site!

---

### 2. Verificar Configuração do CDN

O CDN do Sanity pode estar cacheando dados por até 60 segundos ou mais em produção.

**Verificar configuração atual:**

```bash
# Verificar variável de ambiente
echo $SANITY_USE_CDN
```

**Localização da configuração:** `lib/sanity.ts` linha 8

```typescript
useCdn: process.env.NODE_ENV === 'production' && process.env.SANITY_USE_CDN !== 'false'
```

**Status:**
- ✅ Se `SANITY_USE_CDN=false` → CDN desabilitado (mudanças aparecem imediatamente)
- ❌ Se `SANITY_USE_CDN` não está definido ou é `true` → CDN habilitado (pode haver cache)

---

### 3. Verificar Cache do Next.js

Mesmo com `revalidate = 0`, pode haver cache em produção.

**Verificar configuração da página:** `app/page.tsx`

```typescript
export const dynamic = 'force-dynamic'
export const revalidate = 0 // Sem cache
export const fetchCache = 'force-no-store'
```

**Se essas configurações estão presentes, o Next.js não deve cachear.**

---

### 4. Verificar Dataset e Projeto

**Confirmar que está usando o dataset correto:**

1. No Sanity Studio, verifique o dataset no canto superior direito
2. Deve ser: `production`
3. Verificar variável de ambiente:
   ```bash
   echo $NEXT_PUBLIC_SANITY_DATASET
   ```
4. Deve retornar: `production`

**Verificar Project ID:**

```bash
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
# Deve retornar: c9pbklm2
```

---

### 5. Testar Busca Direta da API

**Testar se os dados estão atualizados na API do Sanity:**

```bash
# Substitua YOUR_TOKEN pelo token do Sanity
curl "https://c9pbklm2.api.sanity.io/v2024-01-01/data/query/production?query=*[_type == 'homepage'][0]" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Ou testar via browser:**
```
https://c9pbklm2.api.sanity.io/v2024-01-01/data/query/production?query=*[_type == 'homepage'][0]
```

Se os dados retornados estão atualizados, o problema é cache. Se não estão atualizados, o problema é no Sanity.

---

## ✅ Soluções

### Solução 1: Desabilitar CDN Temporariamente (Recomendado para Teste)

**Passo 1:** Adicionar variável de ambiente

**No Vercel (Produção):**
1. Acesse o painel do Vercel
2. Vá em Settings → Environment Variables
3. Adicione:
   - **Key:** `SANITY_USE_CDN`
   - **Value:** `false`
4. Salve e faça redeploy

**Localmente (.env.local):**
```bash
SANITY_USE_CDN=false
```

**Passo 2:** Fazer redeploy
```bash
# Se estiver usando Vercel
vercel --prod

# Ou faça push para trigger deploy automático
git commit --allow-empty -m "Force redeploy to clear Sanity cache"
git push
```

**Passo 3:** Aguardar alguns minutos e testar

---

### Solução 2: Forçar Revalidação via API (Solução Permanente)

Criar endpoint de revalidação que pode ser chamado após publicar no Sanity.

**Criar arquivo:** `app/api/revalidate/sanity/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  try {
    const { secret, path } = await req.json()

    // Verificar secret para segurança
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    // Revalidar caminho específico ou toda a aplicação
    if (path) {
      revalidatePath(path)
    } else {
      revalidatePath('/')
      revalidatePath('/planos')
      revalidatePath('/unidades')
      // Adicionar outras rotas conforme necessário
    }

    return NextResponse.json({ 
      revalidated: true, 
      path: path || 'all',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 })
  }
}
```

**Configurar Webhook no Sanity:**
1. Acesse [sanity.io/manage](https://sanity.io/manage)
2. Vá em API → Webhooks
3. Crie novo webhook:
   - **Name:** Revalidate Next.js
   - **URL:** `https://seu-site.com/api/revalidate/sanity`
   - **Dataset:** `production`
   - **Trigger on:** `Create`, `Update`, `Delete`
   - **HTTP method:** `POST`
   - **HTTP Headers:**
     ```json
     {
       "Content-Type": "application/json"
     }
     ```
   - **Body:**
     ```json
     {
       "secret": "SEU_SECRET_AQUI",
       "path": "/"
     }
     ```

**Adicionar secret no Vercel:**
```bash
SANITY_REVALIDATE_SECRET=seu-secret-super-seguro-aqui
```

---

### Solução 3: Usar Perspective 'previewDrafts' Temporariamente

**Modificar:** `lib/sanity.ts`

```typescript
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Desabilitar CDN
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published', // Usar 'previewDrafts' para ver rascunhos
  stega: {
    enabled: false,
  },
})
```

**⚠️ Atenção:** Isso desabilita o CDN completamente e pode impactar performance.

---

### Solução 4: Limpar Cache do Navegador e CDN

**Para usuários finais:**
1. Limpar cache do navegador (Ctrl+Shift+Delete)
2. Fazer hard refresh (Ctrl+Shift+R ou Cmd+Shift+R)
3. Testar em modo anônimo/privado

**Para desenvolvedores:**
1. Limpar cache do Next.js:
   ```bash
   rm -rf .next
   ```
2. Limpar cache do Vercel (se aplicável):
   - Acesse Vercel Dashboard
   - Vá em Deployments
   - Clique nos três pontos do último deploy
   - Selecione "Redeploy"

---

## 🧪 Teste Rápido

Execute este script para verificar a configuração atual:

```bash
#!/bin/bash

echo "=== Verificação de Configuração Sanity ==="
echo ""
echo "1. Project ID:"
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
echo ""
echo "2. Dataset:"
echo $NEXT_PUBLIC_SANITY_DATASET
echo ""
echo "3. CDN Status:"
if [ "$SANITY_USE_CDN" = "false" ]; then
  echo "✅ CDN DESABILITADO"
else
  echo "❌ CDN HABILITADO (pode causar cache)"
fi
echo ""
echo "4. API Token:"
if [ -z "$SANITY_API_TOKEN" ]; then
  echo "❌ NÃO CONFIGURADO"
else
  echo "✅ Configurado"
fi
echo ""
echo "5. Ambiente:"
echo $NODE_ENV
```

---

## 📋 Checklist de Diagnóstico

Use este checklist para diagnosticar o problema:

- [ ] Alterações foram **publicadas** no Sanity (não apenas salvas)
- [ ] Dataset correto (`production`)
- [ ] Project ID correto (`c9pbklm2`)
- [ ] API Token configurado e válido
- [ ] CDN desabilitado ou revalidação configurada
- [ ] Cache do navegador limpo
- [ ] Cache do Next.js limpo (`.next` removido)
- [ ] Deploy recente feito após mudanças
- [ ] Dados atualizados na API do Sanity (teste direto)

---

## 🚀 Solução Recomendada (Produção)

Para produção, recomendo:

1. **Desabilitar CDN do Sanity** (melhor para conteúdo que muda frequentemente)
   ```bash
   SANITY_USE_CDN=false
   ```

2. **Implementar revalidação via webhook** (Solução 2 acima)
   - Permite cache quando não há mudanças
   - Força atualização quando há mudanças no Sanity
   - Melhor performance + atualizações imediatas

3. **Manter `revalidate = 0`** nas páginas principais
   - Garante que sempre busca dados atualizados
   - Impacto mínimo se CDN estiver desabilitado

---

## 🔧 Comandos Úteis

### Verificar dados diretamente da API
```bash
# Substitua YOUR_TOKEN
curl "https://c9pbklm2.api.sanity.io/v2024-01-01/data/query/production?query=*[_type == 'homepage'][0]" \
  -H "Authorization: Bearer YOUR_TOKEN" | jq
```

### Limpar cache local
```bash
# Limpar cache do Next.js
rm -rf .next

# Limpar node_modules e reinstalar (se necessário)
rm -rf node_modules
pnpm install
```

### Forçar redeploy no Vercel
```bash
# Criar commit vazio para trigger deploy
git commit --allow-empty -m "Force redeploy"
git push
```

---

## 📞 Próximos Passos

1. **Imediato:** Desabilitar CDN (`SANITY_USE_CDN=false`) e fazer redeploy
2. **Curto prazo:** Implementar webhook de revalidação
3. **Longo prazo:** Monitorar performance e ajustar estratégia de cache

---

**Última atualização:** Janeiro 2025  
**Versão:** 1.0  
**Autor:** Equipe de Desenvolvimento Live Academia


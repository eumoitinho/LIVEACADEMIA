# Configuração do Webhook do Sanity para Revalidação Automática

## 🎯 Objetivo

Este documento explica como configurar o webhook do Sanity para garantir que **100% das mudanças feitas no CMS sejam automaticamente refletidas no site**.

## ✅ O que foi implementado

1. **Endpoint de revalidação**: `/api/revalidate` que recebe notificações do Sanity
2. **Tags de cache**: Todos os fetches do Sanity agora têm tags para revalidação seletiva
3. **Mapeamento inteligente**: Cada tipo de documento sabe quais páginas e tags revalidar
4. **Segurança**: Token de autenticação para proteger o endpoint

## 🔧 Configuração Passo a Passo

### 1. Adicionar variáveis de ambiente

Adicione estas variáveis ao seu `.env.local` (e também no Vercel/ambiente de produção):

```bash
# Token secreto para autenticar requisições de webhook (gere um aleatório)
SANITY_REVALIDATE_SECRET=seu_token_secreto_aqui_min_32_chars

# (Opcional) Secret adicional para validar assinatura do webhook
SANITY_WEBHOOK_SECRET=outro_token_secreto_diferente
```

**Como gerar tokens seguros:**
```bash
# No terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Configurar Webhook no Sanity Studio

1. Acesse o **Sanity Management Console**: https://www.sanity.io/manage
2. Selecione o projeto: **Live Academia** (project ID: `c9pbklm2`)
3. Vá em **API** → **Webhooks**
4. Clique em **Add Webhook**
5. Configure:

**Nome:** `Live Academia - Revalidação de Produção`

**URL:**
```
https://seusite.com.br/api/revalidate
```
(Substitua `seusite.com.br` pelo domínio real)

**Dataset:** `production`

**Trigger on:** Selecione:
- ✅ Create
- ✅ Update
- ✅ Delete

**Filter (opcional):**
```groq
_type in [
  "homepage",
  "unit",
  "plano",
  "benefit",
  "testimonial",
  "appFeature",
  "appSection",
  "modality",
  "structureFeature",
  "wellhubFeature",
  "bioimpedanciaFeature",
  "beneficiosSection",
  "dayUse",
  "sobreNos",
  "contato",
  "trabalheConosco",
  "sobre"
]
```

**HTTP method:** `POST`

**HTTP Headers:**
```
x-sanity-webhook-token: SEU_SANITY_REVALIDATE_SECRET_AQUI
```
(Use o mesmo valor de `SANITY_REVALIDATE_SECRET` do .env)

**Secret (opcional mas recomendado):**
Cole o valor de `SANITY_WEBHOOK_SECRET` (se você configurou)

6. Clique em **Save**

### 3. Testar o Webhook

#### Teste manual (desenvolvimento):

```bash
# Testar revalidação de unidades
curl http://localhost:3000/api/revalidate?type=unit

# Testar revalidação da homepage
curl http://localhost:3000/api/revalidate?type=homepage

# Testar revalidação de planos
curl http://localhost:3000/api/revalidate?type=plano
```

#### Teste via Sanity Studio:

1. Faça uma pequena alteração em qualquer documento (ex: mude o título de uma unidade)
2. Clique em **Publish**
3. Verifique os logs do webhook no Sanity Management Console
4. Acesse o site e confirme que a mudança apareceu

### 4. Monitoramento

#### Logs do Webhook (Sanity):
- Acesse: https://www.sanity.io/manage/personal/project/c9pbklm2/api/webhooks
- Clique no webhook configurado
- Veja a aba **Deliveries** para ver todas as requisições

#### Logs do Next.js:
Procure no console por mensagens como:
```
✅ Revalidado path: /
✅ Revalidado tag: homepage
🔄 Revalidação completa para tipo: homepage
```

## 📋 Mapeamento de Revalidação

Cada tipo de documento revalida automaticamente:

| Tipo do Sanity | Páginas Revalidadas | Tags |
|----------------|---------------------|------|
| `homepage` | `/` | homepage, hero, about, planos, testimonials |
| `unit` | `/`, `/unidades`, `/unidades/[slug]` | units, unit |
| `plano` | `/`, `/planos` | planos, plans |
| `benefit` | `/` | benefits |
| `testimonial` | `/` | testimonials |
| `appFeature` | `/` | appFeatures |
| `appSection` | `/` | appSection |
| `modality` | `/aulas-coletivas` | modalities |
| `structureFeature` | `/` | structureFeatures |
| `wellhubFeature` | `/` | wellhubFeatures |
| `bioimpedanciaFeature` | `/` | bioimpedanciaFeatures |
| `beneficiosSection` | `/` | beneficiosSection |
| `dayUse` | `/day-use` | dayUse |
| `sobreNos` | `/sobre-nos` | sobreNos |
| `contato` | `/contato` | contato |
| `trabalheConosco` | `/trabalhe-conosco` | trabalheConosco |
| `sobre` | `/sobre` | sobre |

## 🔒 Segurança

### Proteções implementadas:

1. ✅ **Token de autenticação** via header `x-sanity-webhook-token`
2. ✅ **Validação de assinatura** via `SANITY_WEBHOOK_SECRET` (opcional mas recomendado)
3. ✅ **Validação de body** - verifica se o tipo de documento existe
4. ✅ **Rate limiting implícito** - Next.js ISR já tem proteção contra rebuild storms

### Boas práticas:

- 🔐 Nunca commite os tokens no Git
- 🔄 Rotacione os tokens periodicamente (a cada 6 meses)
- 📊 Monitore os logs do webhook regularmente
- 🚨 Configure alertas para falhas consecutivas

## 🐛 Troubleshooting

### Problema: Mudanças não aparecem no site

**Possíveis causas:**

1. **Webhook não configurado ou desabilitado**
   - Verifique no Sanity Management Console se o webhook está ativo
   - Veja a aba "Deliveries" para confirmar que está sendo disparado

2. **Token incorreto**
   - Verifique se `SANITY_REVALIDATE_SECRET` no .env é igual ao header do webhook
   - Procure por erros 401 nos logs do webhook

3. **Cache do navegador**
   - Faça hard refresh: Ctrl+Shift+R (Windows/Linux) ou Cmd+Shift+R (Mac)
   - Teste em aba anônima

4. **CDN/Proxy intermediário**
   - Se usar Cloudflare ou similar, pode haver cache adicional
   - Configure o CDN para respeitar os headers de cache do Next.js

### Problema: Erro 500 no webhook

**Soluções:**

1. Verifique os logs do Next.js/Vercel:
   ```bash
   # Desenvolvimento
   pnpm dev
   # Produção (Vercel)
   vercel logs
   ```

2. Teste o endpoint manualmente:
   ```bash
   curl -X POST https://seusite.com.br/api/revalidate \
     -H "x-sanity-webhook-token: SEU_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"_type": "unit"}'
   ```

3. Verifique se todas as variáveis de ambiente estão configuradas no Vercel

### Problema: Webhook dispara mas nada acontece

**Possível causa:** O tipo de documento não está mapeado

**Solução:** Adicione o tipo ao `REVALIDATION_MAP` em `/app/api/revalidate/route.ts`

## 🚀 Deploy em Produção

### Vercel (recomendado):

1. Configure as variáveis de ambiente no dashboard do Vercel:
   - `SANITY_REVALIDATE_SECRET`
   - `SANITY_WEBHOOK_SECRET` (opcional)

2. Faça deploy:
   ```bash
   vercel --prod
   ```

3. Configure o webhook no Sanity com a URL de produção:
   ```
   https://liveacademia.com.br/api/revalidate
   ```

### Outras plataformas:

1. Configure as variáveis de ambiente na plataforma
2. Certifique-se de que o endpoint `/api/revalidate` está acessível publicamente
3. Configure o webhook com a URL pública do seu site

## 📝 Manutenção

### Adicionar novo tipo de conteúdo:

1. Crie o schema no Sanity
2. Adicione o mapeamento em `/app/api/revalidate/route.ts`:
   ```typescript
   const REVALIDATION_MAP = {
     // ... outros tipos
     novoTipo: {
       paths: ['/pagina-relacionada'],
       tags: ['novoTipo'],
     },
   }
   ```
3. Se necessário, adicione tags ao fetch em `lib/sanity.ts`

### Remover tipo de conteúdo:

1. Remova o mapeamento de `/app/api/revalidate/route.ts`
2. Atualize o filter do webhook no Sanity (opcional)

## 🎓 Conceitos importantes

### O que é Revalidação?

Revalidação é o processo de regenerar páginas estáticas quando o conteúdo muda. O Next.js 15 usa **Incremental Static Regeneration (ISR)** com revalidação on-demand.

### Tags vs Paths

- **Tags**: Invalidam cache de fetches específicos (mais granular)
- **Paths**: Regeneram páginas inteiras

Usamos ambos para garantir cobertura 100%.

### Por que desabilitamos o CDN do Sanity?

```typescript
useCdn: false
```

Para garantir que sempre buscamos dados frescos após revalidação. O cache é gerenciado pelo Next.js, não pelo CDN do Sanity.

## ✅ Checklist de Validação

Antes de considerar a configuração completa, teste:

- [ ] Mudança em unidade aparece em `/unidades` e `/unidades/[slug]`
- [ ] Mudança na homepage aparece em `/`
- [ ] Mudança em plano aparece em `/` e `/planos`
- [ ] Troca de foto aparece no site
- [ ] Mudança em modal "Sobre Nós" aparece em `/sobre-nos`
- [ ] Mudança em modal "Contato" aparece em `/contato`
- [ ] Desabilitar uma unidade (active=false) remove da listagem
- [ ] Alterar ordem dos planos reflete na homepage
- [ ] Webhook aparece como "Success" (status 200) nos logs do Sanity

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do webhook no Sanity
2. Verifique os logs do Next.js/Vercel
3. Teste o endpoint manualmente com curl
4. Revise este documento novamente
5. Consulte a documentação oficial:
   - [Next.js Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating)
   - [Sanity Webhooks](https://www.sanity.io/docs/webhooks)

---

**Última atualização:** 2025-11-09
**Versão do Next.js:** 15
**Versão do Sanity:** 3.x

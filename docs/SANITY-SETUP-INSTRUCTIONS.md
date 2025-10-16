# 🚀 Instruções de Configuração do Sanity CMS

## ❌ Erro Atual
Você está enfrentando o erro: `Configuration must contain 'projectId'`

## ✅ Solução

### 1. Criar arquivo `.env.local`

Crie o arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```bash
# ====================================
# LIVE ACADEMIA - Environment Variables
# ====================================

# Node
NODE_ENV=development

# Site (Public)
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=c9pbklm2
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-token-here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://sgntnwnngdskwyuywksk.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Criptografia
ENCRYPTION_SECRET=your-encryption-secret

# Pacto API
PACTO_API_URL=https://apigw.pactosolucoes.com.br

# Analytics
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789012345

# Debug
NEXT_PUBLIC_DEBUG=false
```

### 2. Obter Token do Sanity

1. **Acesse** [sanity.io/manage](https://sanity.io/manage)
2. **Faça login** na sua conta
3. **Selecione** o projeto "Live Academias" (ID: `c9pbklm2`)
4. **Vá para** "API" → "Tokens"
5. **Crie um novo token** com permissões de:
   - Read
   - Write
   - Create
   - Delete
6. **Copie o token** e substitua `your-sanity-token-here` no `.env.local`

### 3. Executar Comandos

Após configurar o `.env.local`:

```bash
# Popular dados iniciais
npm run sanity:seed

# Executar Sanity Studio
npm run sanity:studio

# Deploy do Studio (opcional)
npm run sanity:deploy
```

### 4. Acessar o CMS

- **URL Local**: `http://localhost:3000/studio`
- **URL Deploy**: Será fornecida após o deploy

## 🔧 Comandos Disponíveis

```bash
# Seed (popular dados)
npm run sanity:seed

# Studio local
npm run sanity:studio

# Deploy
npm run sanity:deploy

# Build
npm run build
```

## 📝 Estrutura do Projeto

```
LIVEACADEMIA/
├── .env.local                 # ← CRIAR ESTE ARQUIVO
├── sanity.config.ts          # Configuração principal
├── sanity.cli.ts             # Configuração CLI
├── lib/sanity.ts             # Cliente Sanity
├── hooks/use-sanity-data.ts  # Hooks para dados
├── types/sanity.ts           # Tipos TypeScript
└── sanity/schemas/           # Schemas dos componentes
```

## 🎯 Project ID

O **Project ID** do Sanity é: **`c9pbklm2`**

Este ID foi encontrado em:
- `live-academias/sanity.config.ts` (linha 10)
- `live-academias/sanity.cli.ts` (linha 5)

## 🚨 Importante

- **Nunca commite** o arquivo `.env.local`
- **Mantenha o token** seguro e privado
- **Use o mesmo Project ID** em todas as configurações

## ✅ Verificação

Após configurar, execute:

```bash
npm run sanity:seed
```

Se funcionar sem erros, a configuração está correta!

---

**🎊 Com essas configurações, o Sanity CMS estará funcionando perfeitamente!**

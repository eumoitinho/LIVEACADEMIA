# 🌱 Guia de Seed do Strapi

## 📋 Visão Geral

Este guia explica como popular o Strapi com dados iniciais equivalentes ao Sanity.

## 🚀 Como Usar

### 1. Configurar Variáveis de Ambiente

Adicione ao `.env.local` (na raiz do projeto) ou `.env` (no diretório `cms/`):

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=seu-token-aqui
```

### 2. Obter API Token

1. Acesse o Strapi Admin: `http://localhost:1337/admin`
2. Vá em **Settings → API Tokens**
3. Crie um novo token com permissões de **Full Access** (para desenvolvimento)
4. Copie o token e adicione ao `.env.local`

### 3. Executar o Seed

```bash
cd cms
npm run seed
```

Ou manualmente:

```bash
cd cms
node scripts/seed-strapi.js
```

## 📦 Dados que serão Criados

O script cria os seguintes conteúdos:

### 1. Homepage (Single Type)
- SEO metadata
- Hero Section (títulos, descrição, CTAs, rating)
- About Section (badge, título, descrição, stats, highlights)
- Benefits Section (badge, título, descrição)
- Plans Section (badge, título, descrição)
- Testimonials Section (badge, título, descrição)

### 2. Planos (Collection Type)
- Plano Tradicional (R$ 119,90/mês)
- Plano Diamante (R$ 159,90/mês)

### 3. Unidades (Collection Type)
- Live Academia Centro
- Live Academia Cidade Nova
- Live Academia Compensa
- Live Academia Vieiralves

### 4. Benefícios (Collection Type)
- Sem Fidelidade
- Equipamentos Modernos
- Aulas Coletivas

### 5. Modalidades (Collection Type)
- Spinning
- Yoga
- Pilates

## 🔄 Atualização de Dados

O script verifica se o conteúdo já existe:
- **Se existir**: Atualiza o conteúdo existente
- **Se não existir**: Cria novo conteúdo

## ⚠️ Importante

1. **Publicar Conteúdo**: Após executar o seed, você precisa publicar o conteúdo no Strapi Admin:
   - Acesse **Content Manager**
   - Selecione cada conteúdo
   - Clique em **Publish**

2. **Adicionar Imagens**: O script não adiciona imagens. Você precisa:
   - Fazer upload das imagens no Strapi Admin
   - Associar as imagens aos conteúdos

3. **Relacionamentos**: Alguns relacionamentos (como planos na homepage) precisam ser configurados manualmente no Strapi Admin após criar os conteúdos.

## 🐛 Troubleshooting

### Erro: "STRAPI_API_TOKEN não configurado"

**Solução**: Adicione `STRAPI_API_TOKEN` ao `.env.local` ou `.env`

### Erro: "Unauthorized" (401)

**Solução**: 
1. Verifique se o token está correto
2. Verifique se o token tem permissões de **Full Access**
3. Crie um novo token se necessário

### Erro: "Connection refused"

**Solução**: 
1. Verifique se o Strapi está rodando: `cd cms && pnpm dev`
2. Verifique se a URL está correta: `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337`

### Erro: "Validation failed"

**Solução**: 
1. Verifique se os schemas do Strapi estão corretos
2. Verifique se os dados do seed correspondem aos schemas
3. Verifique os logs do Strapi para mais detalhes

## 📚 Próximos Passos

Após executar o seed:

1. **Publicar Conteúdo**: Publique todos os conteúdos no Strapi Admin
2. **Adicionar Imagens**: Faça upload e associe imagens aos conteúdos
3. **Configurar Relacionamentos**: Configure relacionamentos (ex: planos na homepage)
4. **Testar API**: Teste a API: `curl http://localhost:1337/api/homepage`
5. **Testar na Aplicação**: Teste na aplicação Next.js: `curl http://localhost:3000/api/strapi/homepage`

## 🔄 Re-executar o Seed

Para re-executar o seed e atualizar os dados:

```bash
cd cms
npm run seed
```

O script atualizará os conteúdos existentes ao invés de criar duplicatas.

## 📝 Personalização

Para personalizar os dados do seed, edite o arquivo `cms/scripts/seed-strapi.js` e modifique os objetos de dados (`homepageData`, `plansData`, `unitsData`, etc.).


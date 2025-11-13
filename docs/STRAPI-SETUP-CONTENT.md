# 🚀 Configurando Conteúdo no Strapi

## 📋 Problema Atual

O Strapi está rodando, mas **não há conteúdo criado**. Você precisa criar o conteúdo no Strapi Admin.

## ✅ Passo a Passo

### 1. Acessar o Strapi Admin

1. Abra o navegador em: `http://localhost:1337/admin`
2. Faça login (ou crie uma conta se for a primeira vez)

### 2. Criar Homepage (Single Type)

1. Vá em **Content Manager**
2. Clique em **Homepage** (Single Type)
3. Clique em **Create new entry**
4. Preencha os campos:
   - **Hero Section**: Título, subtítulo, descrição, etc.
   - **About Section**: Badge, título, descrição, imagem, estatísticas
   - **Benefits Section**: Badge, título, descrição, benefícios
   - **Plans Section**: Badge, título, descrição, planos
   - **Testimonials Section**: Badge, título, descrição, depoimentos
5. Clique em **Save**
6. Clique em **Publish**

### 3. Criar Units (Collection Type)

1. Vá em **Content Manager**
2. Clique em **Unit** (Collection Type)
3. Clique em **Create new entry**
4. Preencha os campos:
   - **Name**: Nome da unidade
   - **Slug**: URL slug (ex: `centro`, `cidade-nova`)
   - **Address**: Endereço completo
   - **City**: Cidade
   - **State**: Estado
   - **Phone**: Telefone
   - **WhatsApp**: WhatsApp
   - **Type**: Tipo (diamante, premium, tradicional)
   - **Main Photo**: Foto principal
   - **Background Image**: Imagem de fundo
   - **Features**: Lista de características
   - **Plans**: Planos disponíveis
   - **Active**: Marque como ativo
5. Clique em **Save**
6. Clique em **Publish**
7. Repita para outras unidades

### 4. Criar Plans (Collection Type)

1. Vá em **Content Manager**
2. Clique em **Plan** (Collection Type)
3. Clique em **Create new entry**
4. Preencha os campos:
   - **Plan ID**: ID do plano (ex: `basic`, `premium`)
   - **Name**: Nome do plano
   - **Description**: Descrição
   - **Price**: Preço
   - **Price Label**: Label do preço (ex: "R$ 99,90/mês")
   - **Period**: Período (ex: "mensal", "anual")
   - **Features**: Lista de características
   - **Highlight**: Marque se é destaque
   - **Popular**: Marque se é popular
   - **Badge**: Badge (opcional)
   - **Active**: Marque como ativo
5. Clique em **Save**
6. Clique em **Publish**
7. Repita para outros planos

### 5. Criar API Token

1. Vá em **Settings → API Tokens**
2. Clique em **Create new API Token**
3. Preencha:
   - **Name**: Next.js App
   - **Token type**: Read-only (ou Full access para desenvolvimento)
   - **Token duration**: Unlimited
4. Clique em **Save**
5. **Copie o token** e adicione ao `.env.local`:
   ```env
   STRAPI_API_TOKEN=seu-token-aqui
   ```

### 6. Testar Conexão

Execute o script de teste:

```bash
node scripts/test-strapi-connection.js
```

Ou teste manualmente:

```bash
# Homepage
curl http://localhost:1337/api/homepage

# Units
curl http://localhost:1337/api/units

# Plans
curl http://localhost:1337/api/plans
```

### 7. Testar na Aplicação

1. Inicie o Next.js: `pnpm dev`
2. Acesse: `http://localhost:3000/api/strapi/homepage`
3. Verifique se os dados estão sendo retornados

## 🐛 Troubleshooting

### Erro: "Not Found" (404)

**Causa**: O conteúdo não existe ou não foi publicado.

**Solução**:
1. Verifique se o conteúdo foi criado no Strapi Admin
2. Verifique se o conteúdo foi **publicado** (não apenas salvo)
3. Verifique se o tipo de conteúdo está correto (Single Type vs Collection Type)

### Erro: "Unauthorized" (401)

**Causa**: O token de API não está configurado ou não tem permissões.

**Solução**:
1. Crie um token no Strapi Admin
2. Adicione ao `.env.local`: `STRAPI_API_TOKEN=seu-token`
3. Reinicie o servidor Next.js

### Erro: "Connection refused"

**Causa**: O Strapi não está rodando.

**Solução**:
1. Inicie o Strapi: `cd cms && pnpm dev`
2. Verifique se está rodando na porta 1337
3. Verifique se a URL está correta: `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337`

## 📚 Recursos

- [Strapi Documentation](https://docs.strapi.io)
- [Content Manager Guide](https://docs.strapi.io/user-docs/content-manager)
- [API Tokens](https://docs.strapi.io/user-docs/settings/managing-global-settings#api-tokens)


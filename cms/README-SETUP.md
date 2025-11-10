# 🚀 Strapi CMS - Guia de Configuração

## ✅ Configuração Completa

O arquivo `.env` foi criado automaticamente com todas as variáveis necessárias.

## 🏃 Como Rodar

```bash
cd cms
pnpm dev
```

O Strapi estará disponível em:
- **Admin Panel**: http://localhost:1337/admin
- **API**: http://localhost:1337/api

## 📋 Variáveis Configuradas

- ✅ `APP_KEYS` - 4 chaves para o servidor
- ✅ `ADMIN_JWT_SECRET` - Secret para autenticação do admin
- ✅ `API_TOKEN_SALT` - Salt para tokens da API
- ✅ `TRANSFER_TOKEN_SALT` - Salt para transfer tokens
- ✅ `ENCRYPTION_KEY` - Chave de criptografia
- ✅ `DATABASE_CLIENT` - SQLite (padrão)
- ✅ `PORT` - 1337 (padrão)

## 🔧 Primeira Execução

1. **Rodar o Strapi**:
   ```bash
   cd cms
   pnpm dev
   ```

2. **Criar conta de admin**:
   - Acesse: http://localhost:1337/admin
   - Preencha os dados do primeiro administrador
   - Clique em "Let's start"

3. **Configurar Content Types**:
   - Os content types já estão criados em `src/api/`
   - Você pode editá-los no admin panel

## 📁 Estrutura

```
cms/
├── config/           # Configurações do Strapi
│   ├── admin.ts     # Configuração do admin
│   ├── api.ts       # Configuração da API
│   ├── database.ts  # Configuração do banco
│   └── server.ts    # Configuração do servidor
├── src/
│   ├── api/         # Content Types
│   └── components/  # Componentes reutilizáveis
└── .env             # Variáveis de ambiente (não commitado)
```

## 🔐 Segurança

- ⚠️ **NUNCA** commite o arquivo `.env` no git
- O `.env` já está no `.gitignore`
- Use `.env.example` como referência

## 🐛 Problemas Comuns

### Erro: "Missing admin.auth.secret"
- **Solução**: Verifique se o arquivo `.env` existe e tem `ADMIN_JWT_SECRET`

### Erro: "Missing APP_KEYS"
- **Solução**: Verifique se o arquivo `.env` existe e tem `APP_KEYS` com 4 chaves

### Banco de dados não encontrado
- **Solução**: O Strapi criará automaticamente o banco SQLite em `.tmp/data.db`

## 📚 Documentação

- [Strapi Docs](https://docs.strapi.io/)
- [Strapi API](https://docs.strapi.io/dev-docs/api/rest)

## 🎯 Próximos Passos

1. Criar conteúdo no admin panel
2. Configurar permissões de API
3. Integrar com o frontend Next.js
4. Configurar upload de imagens


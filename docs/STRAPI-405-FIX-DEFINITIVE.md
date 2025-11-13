# 🚨 SOLUÇÃO DEFINITIVA - Erro 405 Method Not Allowed

## ❌ O Problema Real

O erro **405 Method Not Allowed** NÃO é problema de permissões do role Public. É problema de **permissões do API Token**!

No Strapi 5, **API Tokens têm suas próprias permissões** que são **diferentes** das permissões do role Public.

## ✅ Solução 1: Verificar/Criar Token com Full Access (RECOMENDADO)

### Passo 1: Acesse o Strapi Admin

```
http://localhost:1337/admin
```

### Passo 2: Vá para API Tokens

1. Clique em **Settings** (⚙️) no menu lateral
2. Clique em **API Tokens**
3. Verifique se o token que você está usando tem **"Full Access"**

### Passo 3: Criar Novo Token com Full Access

Se o token não tiver "Full Access":

1. Clique em **Create new API Token**
2. Preencha:
   - **Name**: `Seed Script` (ou qualquer nome)
   - **Token duration**: `Unlimited`
   - **Token type**: `Full access` ← **IMPORTANTE!**
3. Clique em **Save**
4. **Copie o token** (você só verá uma vez!)
5. Atualize o token no script ou no `.env.local`

### Passo 4: Atualizar o Token no Script

Edite `cms/scripts/seed-strapi.js` e substitua o token:

```javascript
const STRAPI_API_TOKEN = 'SEU_NOVO_TOKEN_AQUI';
```

Ou adicione ao `.env.local`:

```env
STRAPI_API_TOKEN=seu_novo_token_aqui
```

### Passo 5: Executar o Seed

```bash
cd cms
pnpm run seed
```

## ✅ Solução 2: Usar Autenticação de Administrador

Se você não conseguir criar um token com Full Access, use autenticação de administrador:

### Passo 1: Configurar Credenciais

Adicione ao `.env.local`:

```env
STRAPI_ADMIN_EMAIL=seu-email@admin.com
STRAPI_ADMIN_PASSWORD=sua-senha-admin
```

### Passo 2: Usar Script com Autenticação Admin

```bash
cd cms
node scripts/seed-with-admin-auth.js
```

## 🔍 Verificar o Problema

Execute o script de teste:

```bash
cd cms
node scripts/test-api-direct.js
```

Isso mostrará exatamente qual é o problema.

## 📋 Checklist

- [ ] Token de API tem **"Full Access"**?
- [ ] Token está correto no script?
- [ ] Strapi está rodando?
- [ ] Permissões do role Public estão configuradas? (ainda necessário para requisições públicas)
- [ ] Testei com o script de verificação?

## 🎯 Resumo

**O problema NÃO é de permissões do role Public!**

**O problema É de permissões do API Token!**

1. ✅ Crie um token com **"Full Access"**
2. ✅ Use esse token no script
3. ✅ Execute o seed
4. ✅ Funciona! 🎉

## ❓ Ainda Não Funciona?

Se ainda receber erro 405 após criar token com Full Access:

1. **Verifique os logs do Strapi** - podem ter mais informações
2. **Teste manualmente**:
   ```bash
   curl -X PUT http://localhost:1337/api/homepage \
     -H "Authorization: Bearer SEU_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"data":{"seo":{"metaTitle":"Test"}}}'
   ```
3. **Verifique se o endpoint está correto** - Single Types usam `/api/homepage`, Collection Types usam `/api/plans` (plural)

## 📚 Referências

- [Strapi API Tokens Documentation](https://docs.strapi.io/dev-docs/plugins/users-permissions#api-tokens)
- [Strapi Permissions](https://docs.strapi.io/dev-docs/plugins/users-permissions#permissions)


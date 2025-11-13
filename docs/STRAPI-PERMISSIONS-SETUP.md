# 🔐 Configuração de Permissões do Strapi

## 📋 Problema

Ao executar o seed, você pode receber o erro `405 Method Not Allowed`. Isso acontece porque o Strapi, por padrão, não permite operações na API sem permissões explícitas.

## ✅ Solução Automática (Recomendado)

Execute o script de configuração de permissões antes do seed:

```bash
cd cms
pnpm run setup-permissions
```

Ou execute tudo de uma vez:

```bash
cd cms
pnpm run setup
```

Isso irá:
1. Configurar automaticamente todas as permissões necessárias
2. Executar o seed

## 🔧 Solução Manual

Se preferir configurar manualmente:

### 1. Acesse o Strapi Admin

```
http://localhost:1337/admin
```

### 2. Configure Permissões

1. Vá em **Settings → Users & Permissions Plugin → Roles → Public**
2. Para cada Content Type, habilite as permissões:
   - **Single Types** (homepage, contact-page, etc.):
     - ✅ `find`
     - ✅ `update`
   - **Collection Types** (plan, unit, benefit, modality):
     - ✅ `find`
     - ✅ `findOne`
     - ✅ `create`
     - ✅ `update`
     - ✅ `delete`

### 3. Content Types que precisam de permissões

#### Single Types
- `homepage`
- `contact-page`
- `day-use-page`
- `about-page`
- `trabalhe-conosco-page`
- `global-setting`

#### Collection Types
- `plan`
- `unit`
- `benefit`
- `modality`

### 4. Salve as alterações

Clique em **Save** após configurar todas as permissões.

## 🚀 Após Configurar Permissões

Execute o seed:

```bash
cd cms
pnpm run seed
```

## 🐛 Troubleshooting

### Erro: "Public role not found"

**Causa**: O Strapi ainda não foi inicializado completamente.

**Solução**:
1. Certifique-se de que o Strapi está rodando
2. Acesse o Strapi Admin pelo menos uma vez
3. Execute o script novamente

### Erro: "Failed to update permissions"

**Causa**: O token de API não tem permissões suficientes.

**Solução**:
1. Verifique se o token de API tem permissões **Full Access**
2. Crie um novo token em **Settings → API Tokens**
3. Atualize o token no `.env.local`

### Erro: "405 Method Not Allowed"

**Causa**: As permissões não foram configuradas.

**Solução**:
1. Execute `pnpm run setup-permissions`
2. Ou configure manualmente no Strapi Admin
3. Execute o seed novamente

## 📚 Referências

- [Strapi Permissions Documentation](https://docs.strapi.io/dev-docs/plugins/users-permissions)
- [Strapi API Permissions](https://docs.strapi.io/dev-docs/plugins/users-permissions#permissions)


# 🚨 CORREÇÃO URGENTE - Permissões do Strapi

## ❌ Problema Atual

Você está recebendo o erro **405 Method Not Allowed** para todos os endpoints. Isso significa que **as permissões não estão configuradas**.

## ✅ Solução IMEDIATA (5 minutos)

### Passo 1: Acesse o Strapi Admin

Abra no navegador:
```
http://localhost:1337/admin
```

### Passo 2: Vá para Permissões

1. Clique em **Settings** (ícone de engrenagem ⚙️) no menu lateral esquerdo
2. Clique em **Users & Permissions Plugin**
3. Clique em **Roles**
4. Clique em **Public**

### Passo 3: Habilite TODAS as Permissões

**IMPORTANTE**: Você precisa habilitar permissões para **TODOS** os Content Types listados.

#### Para cada Content Type, marque:

**Single Types** (homepage, contact-page, etc.):
- ✅ `find`
- ✅ `update`

**Collection Types** (plan, unit, etc.):
- ✅ `find`
- ✅ `findOne`
- ✅ `create`
- ✅ `update`
- ✅ `delete`

### Passo 4: Salve

1. Role até o final da página
2. Clique no botão **Save** (canto superior direito)
3. Aguarde a confirmação

### Passo 5: Verifique

Execute o script de verificação:

```bash
cd cms
pnpm run check-permissions
```

Você deve ver mensagens como:
```
✅ homepage (Single Type): Permissão OK
✅ plans (Collection Type): Permissão OK
```

### Passo 6: Execute o Seed

```bash
cd cms
pnpm run seed
```

Agora deve funcionar! 🎉

## 🎯 Dica Rápida

No Strapi Admin, na página de permissões:

1. **Procure por um botão "Select All"** ou similar
2. **Ou use Ctrl+A** (Cmd+A no Mac) para selecionar tudo
3. **Marque todas as checkboxes** de uma vez
4. **Salve**

## 📸 Visual Guide

```
Strapi Admin
└── Settings (⚙️)
    └── Users & Permissions Plugin
        └── Roles
            └── Public
                └── Permissions
                    ├── Application
                    │   ├── Homepage
                    │   │   ├── ✅ find
                    │   │   └── ✅ update
                    │   ├── Contact Page
                    │   │   ├── ✅ find
                    │   │   └── ✅ update
                    │   ├── Plan
                    │   │   ├── ✅ find
                    │   │   ├── ✅ findOne
                    │   │   ├── ✅ create
                    │   │   ├── ✅ update
                    │   │   └── ✅ delete
                    │   └── ... (todos os outros)
                    └── [Save Button]
```

## 🔍 Verificar se Funcionou

Após configurar, teste:

```bash
# Testar homepage
curl http://localhost:1337/api/homepage

# Testar plans
curl http://localhost:1337/api/plans
```

Se retornar dados ou erro 404 (não 405), as permissões estão funcionando!

## ❓ Ainda Não Funciona?

### Erro 401/403
- O token de API não tem permissões
- Crie um novo token em **Settings → API Tokens** com permissões **Full Access**

### Erro 405
- As permissões não foram salvas
- Volte para **Settings → Users & Permissions Plugin → Roles → Public**
- Verifique se todas as checkboxes estão marcadas
- Clique em **Save** novamente

### Não vejo os Content Types
- Os Content Types podem não ter sido criados
- Verifique em **Content Manager** se os Content Types existem

## 📚 Mais Informações

- Guia completo: `docs/STRAPI-PERMISSIONS-QUICK-FIX.md`
- Documentação Strapi: https://docs.strapi.io/dev-docs/plugins/users-permissions

## ✅ Checklist

- [ ] Acessei o Strapi Admin
- [ ] Fui em Settings → Users & Permissions Plugin → Roles → Public
- [ ] Habilitei permissões para TODOS os Content Types
- [ ] Cliquei em Save
- [ ] Executei `pnpm run check-permissions` e vi mensagens de sucesso
- [ ] Executei `pnpm run seed` e funcionou

---

**⚡ Faça isso AGORA e o seed vai funcionar!**


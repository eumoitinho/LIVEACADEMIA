# 🔐 Configuração Rápida de Permissões - Strapi

## ⚡ Solução Rápida (2 minutos)

O erro `405 Method Not Allowed` ocorre porque as permissões da API não estão configuradas. Siga estes passos:

### 1. Acesse o Strapi Admin

```
http://localhost:1337/admin
```

### 2. Vá para Permissões

1. Clique em **Settings** (⚙️) no menu lateral
2. Clique em **Users & Permissions Plugin**
3. Clique em **Roles**
4. Clique em **Public**

### 3. Habilite as Permissões

Para cada Content Type listado abaixo, habilite as permissões:

#### Single Types (habilitar: `find` e `update`)

- ✅ **homepage**
  - ✅ `find`
  - ✅ `update`

- ✅ **contact-page**
  - ✅ `find`
  - ✅ `update`

- ✅ **day-use-page**
  - ✅ `find`
  - ✅ `update`

- ✅ **about-page**
  - ✅ `find`
  - ✅ `update`

- ✅ **trabalhe-conosco-page**
  - ✅ `find`
  - ✅ `update`

- ✅ **global-setting**
  - ✅ `find`
  - ✅ `update`

#### Collection Types (habilitar: `find`, `findOne`, `create`, `update`, `delete`)

- ✅ **plan**
  - ✅ `find`
  - ✅ `findOne`
  - ✅ `create`
  - ✅ `update`
  - ✅ `delete`

- ✅ **unit**
  - ✅ `find`
  - ✅ `findOne`
  - ✅ `create`
  - ✅ `update`
  - ✅ `delete`

- ✅ **benefit**
  - ✅ `find`
  - ✅ `findOne`
  - ✅ `create`
  - ✅ `update`
  - ✅ `delete`

- ✅ **modality**
  - ✅ `find`
  - ✅ `findOne`
  - ✅ `create`
  - ✅ `update`
  - ✅ `delete`

### 4. Salve

Clique no botão **Save** no canto superior direito.

### 5. Execute o Seed

```bash
cd cms
pnpm run seed
```

## 🎯 Dica Rápida

Você pode habilitar **todas as permissões de uma vez**:

1. Na página de permissões do Public role
2. Role até o final da página
3. Clique em **Select All** (se disponível)
4. Ou marque manualmente todas as checkboxes
5. Clique em **Save**

## ✅ Verificação

Após configurar, você pode testar:

```bash
curl http://localhost:1337/api/homepage
```

Se retornar dados (ou erro 404 se não houver conteúdo), as permissões estão funcionando!

## 🐛 Problemas?

### Não vejo os Content Types listados

**Solução**: Certifique-se de que os Content Types foram criados no Strapi.

### Ainda recebo erro 405

**Solução**: 
1. Verifique se salvou as alterações
2. Reinicie o Strapi: `cd cms && pnpm dev`
3. Tente novamente

### Não consigo salvar

**Solução**: Verifique se você está logado como administrador no Strapi Admin.

## 📚 Documentação Completa

Para mais detalhes, veja: `docs/STRAPI-PERMISSIONS-SETUP.md`


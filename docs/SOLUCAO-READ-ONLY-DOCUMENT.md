# 🔧 Solução: "Attempted to patch a read-only document"

## Problema
Erro: `Attempted to patch a read-only document`

Isso acontece quando você tenta editar um documento que está **publicado** no Sanity. Documentos publicados são read-only por design - você precisa criar um **draft** para editá-los.

## ✅ Solução: Criar um Draft

### Opção 1: No Sanity Studio (Recomendado)

1. **Acesse o Sanity Studio**
2. **Vá para a lista de documentos "Homepage"**
3. **Você verá:**
   - Documento publicado (read-only, não editável)
   - Botão **"Create"** ou **"+"** para criar novo

4. **Clique em "Create" → "Homepage"**
   - Isso criará um **novo DRAFT**
   - Drafts são **SEMPRE editáveis**

5. **Preencha os campos:**
   - SEO Title: `Live Academia | Rede de Academias em Manaus`
   - Hero Title: `Transforme.`
   - Hero Subtitle: `Evolua.`
   - Hero Third Title: `Viva.`
   - (Outros campos conforme necessário)

6. **Clique em "Publish"**
   - Isso publicará o draft
   - O documento antigo será substituído
   - O novo documento estará ativo

### Opção 2: Duplicar Documento Publicado

1. **No Sanity Studio, abra o documento publicado**
2. **Clique nos 3 pontos (...)** no canto superior direito
3. **Selecione "Duplicate"**
4. **Um novo draft será criado** (editável)
5. **Edite o draft**
6. **Publique quando estiver pronto**

### Opção 3: Deletar e Criar Novo

1. **Delete o documento publicado:**
   - Clique no documento
   - Clique nos 3 pontos (...)
   - Selecione "Delete"
   - Confirme a exclusão

2. **Crie um novo documento:**
   - Clique em "Create" → "Homepage"
   - Preencha os campos
   - Publique

## 💡 Por Que Isso Acontece?

No Sanity:
- **Documentos publicados** = Read-only (não podem ser editados diretamente)
- **Drafts** = Sempre editáveis
- Para editar um documento publicado, você precisa:
  1. Criar um draft (novo ou duplicando)
  2. Editar o draft
  3. Publicar o draft (substitui o publicado)

## ✅ Resultado

Após criar um draft e publicar:
- ✅ Documento estará editável no futuro (quando criar novo draft)
- ✅ Site carregará os dados atualizados
- ✅ Você poderá editar sempre que precisar (criando novos drafts)

## 🆘 Se Ainda Não Funcionar

### Verificar Permissões

1. Verifique se você tem permissões de Editor/Admin
2. Verifique se está no dataset correto (production)
3. Tente fazer logout e login novamente

### Verificar Estado do Documento

1. No Studio, verifique se o documento está:
   - ✅ Published (publicado - read-only)
   - ✅ Draft (rascunho - editável)
   - ✅ Deleted (deletado)

2. Se estiver publicado, crie um draft
3. Se estiver deletado, crie um novo documento

## 📝 Resumo Rápido

1. **Documento publicado = Read-only**
2. **Para editar: Crie um DRAFT**
3. **Edite o draft**
4. **Publique o draft**
5. **Pronto!**

## 🎯 Comando Alternativo

Se quiser tentar via script (requer token com permissões):

```bash
node scripts/create-homepage-draft.js
```

Mas a **solução manual no Studio é sempre mais confiável**.

---

**TEMPO ESTIMADO: 2-5 minutos**

**DIFICULDADE: Fácil**

**RESULTADO: Documento editável garantido**


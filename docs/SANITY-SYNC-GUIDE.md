# Guia de Sincronização Sanity Studio

## ⚠️ IMPORTANTE: Antes de fazer Deploy

O Studio Cloud e Local podem estar com estruturas diferentes. Fazer deploy sem verificar pode **sobrescrever** a estrutura do cloud.

## 🔍 Verificação Atual

### Arquivos Modificados Localmente:
```
M sanity.config.ts                    # Estrutura do menu alterada
M sanity/schemas/app-feature.ts
M sanity/schemas/contato.ts
M sanity/schemas/plano.ts
?? sanity/schemas/modalidades-page.ts  # NOVO schema (não existe no cloud)
?? sanity/schemas/wellhub-section.ts   # NOVO schema (não existe no cloud)
```

## 🎯 Estratégias de Sincronização

### Opção 1: Deploy Incremental (RECOMENDADO)

**Quando usar**: Você quer manter a estrutura atual do cloud + adicionar novos schemas.

**Passos**:

1. **Fazer backup da configuração atual**:
```bash
cp sanity.config.ts sanity.config.ts.backup
```

2. **Verificar schemas que faltam no cloud**:
   - `modalidades-page.ts` ✅ (adicionado hoje)
   - `wellhub-section.ts` ✅ (pode já existir)

3. **Commit das mudanças** (para ter histórico):
```bash
git add sanity/schemas/modalidades-page.ts sanity/schemas/wellhub-section.ts
git commit -m "feat(sanity): add modalidades-page and wellhub-section schemas"
```

4. **Deploy apenas dos novos schemas**:
```bash
# O deploy é incremental - não remove schemas existentes
pnpm sanity:deploy
```

5. **Verificar no cloud**:
   - Acesse https://www.sanity.io/manage/personal/project/c9pbklm2
   - Verifique se "🎯 Seção Modalidades" aparece no menu

### Opção 2: Restaurar do Cloud (se algo der errado)

**Quando usar**: Se fizer deploy e perceber que perdeu alguma estrutura.

**Não há comando direto para "baixar" configuração do cloud**, mas você pode:

1. **Verificar no Git** a última versão estável:
```bash
git log --oneline sanity.config.ts
git checkout <commit-hash> sanity.config.ts
```

2. **Fazer novo deploy com a versão restaurada**:
```bash
pnpm sanity:deploy
```

### Opção 3: Deploy Completo (cuidado!)

**Quando usar**: Você tem certeza que quer substituir TUDO no cloud.

```bash
# Fazer backup primeiro!
cp sanity.config.ts sanity.config.ts.backup

# Deploy
pnpm sanity:deploy

# Se der problema, restaurar:
cp sanity.config.ts.backup sanity.config.ts
pnpm sanity:deploy
```

## 📋 Checklist Antes de Deploy

- [ ] Backup criado (`sanity.config.ts.backup`)
- [ ] Schemas novos testados localmente
- [ ] Mudanças commitadas no Git
- [ ] Equipe avisada sobre mudanças
- [ ] Tem acesso para reverter se necessário

## 🔄 Como o Deploy Funciona

```
┌─────────────────┐
│  Local          │
│  sanity.config  │───┐
│  + schemas/     │   │
└─────────────────┘   │
                      │ pnpm sanity:deploy
                      │ (envia código fonte)
                      ▼
            ┌─────────────────┐
            │  Sanity Cloud   │
            │  Compila e      │
            │  Serve Studio   │
            └─────────────────┘
                      │
                      ▼
            https://sanity.io
```

**O que é enviado**:
- ✅ Configuração do Studio (`sanity.config.ts`)
- ✅ Schemas (`sanity/schemas/*.ts`)
- ✅ Estrutura do menu
- ✅ Plugins configurados

**O que NÃO é afetado**:
- ✅ Dados (documentos criados)
- ✅ Imagens/assets
- ✅ Usuários e permissões

## 🛡️ Segurança

O deploy de schemas é **aditivo por padrão**:
- Adicionar novos campos: ✅ Seguro
- Adicionar novos schemas: ✅ Seguro
- Renomear campos: ⚠️ Dados antigos ficam órfãos
- Remover schemas: ⚠️ Documentos ficam inacessíveis (mas não são deletados)

## 🚀 Deploy Seguro (Passo a Passo)

```bash
# 1. Backup
cp sanity.config.ts sanity.config.ts.backup

# 2. Commit (histórico)
git add sanity/
git commit -m "feat(sanity): add modalidades landing page schema"

# 3. Deploy
pnpm sanity:deploy

# 4. Verificar
# Acesse https://www.sanity.io/manage/personal/project/c9pbklm2
# Verifique se mudanças apareceram

# 5. Se algo der errado - REVERTER
git revert HEAD
pnpm sanity:deploy
```

## 📞 Suporte

Se algo der errado:
1. Restaurar do backup: `cp sanity.config.ts.backup sanity.config.ts`
2. Deploy da versão restaurada: `pnpm sanity:deploy`
3. Verificar histórico Git: `git log sanity.config.ts`

## ✅ Recomendação Final

**Para o seu caso específico** (adicionar `modalidades-page.ts`):

```bash
# É seguro fazer deploy!
# O schema novo será adicionado sem afetar o restante
pnpm sanity:deploy
```

Motivo: Você está apenas **adicionando** um novo schema, não removendo nada.

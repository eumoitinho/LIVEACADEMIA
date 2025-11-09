# 🔄 Como Recuperar o Sanity Studio

## ⚠️ Problema
Ao fazer deploy/upload do Sanity Studio, a versão antiga substituiu a nova configuração.

---

## 🔍 Opções de Recuperação

### 1. **Verificar Histórico do Git** (Recomendado)

Se você tem o código versionado no Git, pode recuperar a versão anterior:

```bash
# Ver histórico de mudanças no sanity.config.ts
git log --oneline --all -20 -- sanity.config.ts

# Ver diferenças entre commits
git diff HEAD~1 sanity.config.ts

# Restaurar versão anterior (substitua <commit-hash> pelo hash do commit)
git checkout <commit-hash> -- sanity.config.ts
```

### 2. **Verificar no Sanity Cloud**

O Sanity mantém histórico de documentos, mas não de schemas. Você pode:

1. Acessar o [Sanity Dashboard](https://www.sanity.io/manage)
2. Ir em **Settings** > **API** > **Datasets**
3. Verificar se há datasets de backup ou staging

### 3. **Restaurar do Código Local**

Se você tem a configuração correta no código local:

```bash
# Verificar se há diferenças
git diff sanity.config.ts

# Se o arquivo local está correto, fazer commit
git add sanity.config.ts
git commit -m "Restaurar configuração do Sanity Studio"
```

### 4. **Recriar a Configuração**

Se não houver backup, você precisará recriar baseado nos schemas existentes:

1. Verificar quais schemas estão em `sanity/schemas/`
2. Garantir que todos estão importados em `sanity.config.ts`
3. Verificar a estrutura do menu em `structureTool()`

---

## 📋 Checklist de Recuperação

- [ ] Verificar histórico do Git
- [ ] Comparar `sanity.config.ts` atual vs. versão anterior
- [ ] Verificar se todos os schemas estão importados
- [ ] Verificar se a estrutura do menu está correta
- [ ] Testar o Studio localmente: `npm run dev` e acessar `/studio`
- [ ] Fazer deploy novamente após confirmar que está correto

---

## 🛠️ Configuração Atual

### Schemas Disponíveis:
- ✅ homepage
- ✅ unit
- ✅ plano
- ✅ benefit
- ✅ testimonial
- ✅ appFeature
- ✅ modality
- ✅ structureFeature
- ✅ wellhubFeature
- ✅ bioimpedanciaFeature
- ✅ appSection
- ✅ beneficiosSection
- ✅ dayUse
- ✅ sobreNos
- ✅ contato
- ✅ trabalheConosco
- ✅ sobre

### Project ID: `c9pbklm2`
### Dataset: `production`

---

## 💡 Prevenção Futura

1. **Sempre commitar mudanças no Git antes de fazer deploy**
2. **Manter backup da configuração em arquivo separado**
3. **Usar branches para testar mudanças**
4. **Documentar mudanças importantes**

---

## 🆘 Se Nada Funcionar

1. Verificar se há backup no Sanity Cloud (Settings > Datasets)
2. Verificar histórico completo do Git: `git log --all --full-history -- sanity.config.ts`
3. Recriar a configuração baseada nos schemas existentes
4. Contatar suporte do Sanity se necessário


# 🔄 Recuperar Sanity Studio - Guia Rápido

## ⚠️ Problema
Ao fazer deploy do Sanity Studio, a versão antiga substituiu a nova.

## ✅ Solução Rápida

### 1. Verificar se o código local está correto

O arquivo `sanity.config.ts` local parece estar completo com todos os schemas:
- ✅ Todos os 17 schemas importados
- ✅ Estrutura do menu completa
- ✅ Configuração correta

### 2. Fazer Deploy Novamente

```bash
# 1. Verificar se está tudo commitado
git status

# 2. Fazer deploy do Studio
npm run sanity:deploy
# ou
sanity deploy
```

### 3. Se o problema persistir

O Sanity Studio Cloud pode estar usando uma versão antiga. Você precisa:

1. **Acessar o Sanity Dashboard**: https://www.sanity.io/manage
2. **Ir em Deployments**: Verificar qual versão está deployada
3. **Fazer deploy manual**:
   ```bash
   sanity deploy --force
   ```

### 4. Verificar se há conflito com `live-academias/`

Há uma pasta `live-academias/` com outra configuração do Sanity. Isso pode estar causando conflito.

**Solução**: Verificar qual configuração está sendo usada no deploy.

---

## 🔍 Verificações

1. ✅ Código local está correto (confirmado)
2. ⏳ Verificar qual versão está deployada no Sanity Cloud
3. ⏳ Fazer deploy novamente com `--force`
4. ⏳ Verificar se não há conflito com outra configuração

---

## 📝 Comandos Úteis

```bash
# Ver configuração atual
cat sanity.config.ts

# Ver histórico de mudanças
git log --oneline -10 -- sanity.config.ts

# Fazer deploy forçado
sanity deploy --force

# Verificar deployments
sanity deployments list
```

---

## 🆘 Se Nada Funcionar

1. Verificar no Sanity Dashboard qual versão está ativa
2. Comparar com o código local
3. Fazer deploy manual através do dashboard
4. Contatar suporte do Sanity se necessário


# 🔧 Solução Rápida: Erro ECONNRESET no Sanity Deploy

## ❌ Problema
```
✗ read ECONNRESET
⠴ Checking project info
```

## ✅ Solução Rápida

### **O problema é falta de autenticação!**

Execute o comando de login:

```bash
sanity login
```

Isso vai:
1. Abrir o navegador
2. Pedir para você fazer login na sua conta Sanity
3. Autorizar o CLI
4. Salvar as credenciais localmente

### Depois do Login

Após fazer login, tente novamente:

```bash
sanity deploy
```

## 🔍 Verificar se Está Autenticado

Execute o script de diagnóstico:

```bash
./scripts/check-sanity-auth.sh
```

Ou verifique manualmente:

```bash
# Listar projetos (só funciona se estiver autenticado)
sanity projects list
```

## 📝 Passo a Passo Completo

1. **Fazer login no Sanity:**
   ```bash
   sanity login
   ```

2. **Verificar autenticação:**
   ```bash
   sanity projects list
   ```
   Se mostrar os projetos, está autenticado ✅

3. **Fazer deploy:**
   ```bash
   sanity deploy
   ```

## 🆘 Se Ainda Não Funcionar

### 1. Verificar Variáveis de Ambiente

Crie/verifique o arquivo `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=c9pbklm2
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=seu-token-aqui
```

### 2. Obter Token do Sanity

1. Acesse: https://www.sanity.io/manage
2. Selecione o projeto: `c9pbklm2`
3. Vá em **API** → **Tokens**
4. Crie um novo token com permissões de:
   - Read
   - Write
   - Create
   - Delete
5. Copie o token e adicione no `.env.local`

### 3. Limpar Cache

```bash
# Limpar cache do Sanity
rm -rf .sanity
rm -rf node_modules/.cache

# Tentar novamente
sanity login
sanity deploy
```

### 4. Verificar Conexão de Rede

```bash
# Testar conexão
curl -I https://api.sanity.io

# Se não funcionar, pode ser proxy/firewall
```

## 💡 Dicas

- O login precisa ser feito apenas uma vez
- As credenciais são salvas localmente
- Se mudar de máquina, precisa fazer login novamente
- O token no `.env.local` é diferente do login do CLI

## 🎯 Resumo

**Problema**: `ECONNRESET` = Não autenticado  
**Solução**: `sanity login`  
**Depois**: `sanity deploy`

---

**Execute agora:**
```bash
sanity login
```


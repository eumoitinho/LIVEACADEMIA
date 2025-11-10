# 🔧 Fix: Erro ECONNRESET no Deploy do Sanity

## ⚠️ Problema
```
✗ read ECONNRESET
⠴ Checking project info
```

Este erro indica que a conexão com os servidores do Sanity foi resetada durante o processo de deploy.

## 🔍 Possíveis Causas

1. **Problema de rede/conexão**
2. **Autenticação expirada ou inválida**
3. **Problema com proxy/firewall**
4. **Variáveis de ambiente faltando**
5. **Problema temporário nos servidores do Sanity**

## ✅ Soluções

### 1. Verificar Autenticação

```bash
# Verificar se está autenticado
sanity login

# Se não estiver autenticado, fazer login
sanity login

# Verificar token
sanity debug --secrets
```

### 2. Verificar Variáveis de Ambiente

Certifique-se de que as variáveis estão definidas:

```bash
# Verificar variáveis
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
echo $SANITY_API_TOKEN
```

Ou no arquivo `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=c9pbklm2
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=seu-token-aqui
```

### 3. Tentar com Timeout Maior

```bash
# Tentar deploy com mais informações de debug
sanity deploy --debug

# Ou tentar com timeout maior (se suportado)
SANITY_HTTP_TIMEOUT=60000 sanity deploy
```

### 4. Verificar Conexão de Rede

```bash
# Testar conexão com API do Sanity
curl -I https://api.sanity.io/v1/projects/c9pbklm2

# Testar conexão com CDN
curl -I https://cdn.sanity.io
```

### 5. Limpar Cache e Tentar Novamente

```bash
# Limpar cache do Sanity
rm -rf .sanity
rm -rf node_modules/.cache

# Limpar cache do pnpm (se usando)
pnpm store prune

# Tentar novamente
sanity deploy
```

### 6. Usar Deploy Manual pelo Dashboard

Se o problema persistir, você pode fazer deploy manual:

1. Acesse: https://www.sanity.io/manage
2. Selecione o projeto: `c9pbklm2`
3. Vá em **Deployments**
4. Clique em **Deploy Studio**
5. Faça upload dos arquivos do build

### 7. Verificar Proxy/Firewall

Se estiver em rede corporativa:

```bash
# Verificar se há proxy configurado
echo $HTTP_PROXY
echo $HTTPS_PROXY

# Se necessário, configurar proxy
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080

# Ou desabilitar proxy temporariamente
unset HTTP_PROXY
unset HTTPS_PROXY
```

### 8. Tentar Build Local Primeiro

```bash
# Fazer build local primeiro
sanity build

# Se build funcionar, os arquivos estarão em .sanity/output
# Você pode fazer upload manual se necessário
```

## 🔄 Fluxo de Troubleshooting Recomendado

1. ✅ **Verificar autenticação**: `sanity login`
2. ✅ **Verificar variáveis de ambiente**: `.env.local`
3. ✅ **Limpar cache**: `rm -rf .sanity`
4. ✅ **Tentar novamente**: `sanity deploy`
5. ✅ **Se falhar, tentar com debug**: `sanity deploy --debug`
6. ✅ **Se persistir, verificar rede**: `curl https://api.sanity.io`
7. ✅ **Último recurso**: Deploy manual pelo dashboard

## 📝 Comandos Úteis

```bash
# Ver status da autenticação
sanity whoami

# Ver configuração do projeto
sanity projects list

# Ver informações do projeto atual
cat sanity.cli.ts

# Ver logs detalhados
sanity deploy --debug

# Verificar versão do Sanity CLI
sanity --version
```

## 🆘 Se Nada Funcionar

1. **Verificar status do Sanity**: https://status.sanity.io
2. **Tentar em outra rede**: WiFi diferente ou rede móvel
3. **Contatar suporte do Sanity**: https://www.sanity.io/support
4. **Usar deploy manual**: Através do dashboard do Sanity

## 💡 Dicas

- O erro `ECONNRESET` geralmente é temporário
- Tente novamente após alguns minutos
- Verifique se há atualizações do Sanity CLI: `npm install -g sanity@latest`
- Mantenha o token do Sanity atualizado


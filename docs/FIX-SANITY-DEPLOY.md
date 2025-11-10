# 🔧 Fix: Problemas no Deploy do Sanity Studio

## ⚠️ Problemas Identificados

1. **Erro de configuração `autoUpdates`**: Precisa estar dentro de `deployment`
2. **Erro de fetch do CDN**: Problema de conexão ao verificar versões remotas
3. **Warning de versão do `@sanity/ui`**: Versão pode estar desatualizada

## ✅ Correções Aplicadas

### 1. Corrigido `sanity.cli.ts`

```typescript
deployment: {
  appId: 'rpg83gvhhsfs8sb6yu013emv',
  autoUpdates: false, // Desabilitado para evitar problemas de conexão
}
```

### 2. Soluções para o Erro de Fetch

#### Opção 1: Desabilitar Auto-Updates (Já aplicado)
- Auto-updates desabilitado em `sanity.cli.ts`
- Isso evita o fetch do CDN durante o build

#### Opção 2: Tentar Novamente
O erro pode ser temporário de conexão. Tente:

```bash
# Tentar deploy novamente
sanity deploy

# Ou build local primeiro
sanity build
```

#### Opção 3: Verificar Conexão
```bash
# Testar conexão com CDN do Sanity
curl -I https://sanity-cdn.com

# Verificar se há proxy/firewall bloqueando
```

### 3. Verificar Versão do @sanity/ui

O warning diz que a versão instalada é `3111.0.0`, mas no `package.json` está `^3.1.11`.

**Solução:**
```bash
# Limpar cache e reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Ou forçar reinstalação do @sanity/ui
pnpm add @sanity/ui@^3.1.11
```

## 🚀 Próximos Passos

1. ✅ Corrigido `sanity.cli.ts` com `autoUpdates: false`
2. ⏳ Tentar fazer deploy novamente: `sanity deploy`
3. ⏳ Se ainda falhar, verificar conexão de rede
4. ⏳ Se persistir, tentar fazer deploy pelo dashboard do Sanity

## 📝 Comandos Úteis

```bash
# Verificar configuração
cat sanity.cli.ts

# Fazer build local (testar antes de deployar)
sanity build

# Fazer deploy
sanity deploy

# Ver deployments existentes
sanity deployments list

# Ver logs de erro
sanity deploy --debug
```

## 🔍 Troubleshooting

### Se o erro persistir:

1. **Verificar variáveis de ambiente:**
   ```bash
   echo $NEXT_PUBLIC_SANITY_PROJECT_ID
   echo $SANITY_API_TOKEN
   ```

2. **Verificar autenticação:**
   ```bash
   sanity login
   ```

3. **Limpar cache do Sanity:**
   ```bash
   rm -rf .sanity
   sanity deploy
   ```

4. **Tentar deploy sem auto-updates:**
   - Já está configurado com `autoUpdates: false`

## 💡 Notas

- O erro de fetch pode ser temporário (problema de rede/CDN)
- Auto-updates desabilitado evita verificação de versões remotas
- Se o problema persistir, pode ser necessário verificar firewall/proxy


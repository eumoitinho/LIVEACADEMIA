# 🚀 Setup Rápido - Live Academia

**IMPORTANTE:** Antes de rodar o projeto após as correções de segurança!

---

## ⚠️ AÇÃO CRÍTICA IMEDIATA

### 1. Rotacionar Credenciais Expostas

A **service role key do Supabase** estava hardcoded no código e precisa ser rotacionada **IMEDIATAMENTE**!

```bash
# 1. Acesse o dashboard do Supabase
# https://app.supabase.com/project/sgntnwnngdskwyuywksk/settings/api

# 2. Vá em Settings > API

# 3. Na seção "Service role key", clique em "Reset"

# 4. Copie a NOVA chave gerada
```

---

## 📋 Passo a Passo

### Passo 1: Criar Arquivo de Ambiente

```bash
# Na raiz do projeto
cp .env.local.template .env.local
```

### Passo 2: Gerar Chave de Criptografia

```bash
# Gerar chave forte de 32+ caracteres
openssl rand -base64 32

# Copie o resultado (será algo como: a+oZvP9a2ob1vl54zwT9BlSCxHgI4o+lfMXPyjnDc2g=)
```

### Passo 3: Preencher `.env.local`

Edite `.env.local` e preencha:

```bash
# Node
NODE_ENV=development

# Site
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://sgntnwnngdskwyuywksk.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<NOVA_CHAVE_ROTACIONADA_DO_PASSO_1>

# Criptografia
ENCRYPTION_SECRET=<CHAVE_GERADA_NO_PASSO_2>

# Pacto API
PACTO_API_URL=https://apigw.pactosolucoes.com.br

# Analytics (opcional - pode deixar comentado por enquanto)
# NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
# NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
# NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

### Passo 4: Verificar `.gitignore`

Certifique-se que `.env.local` está no `.gitignore`:

```bash
# Adicionar ao .gitignore se não estiver
echo ".env.local" >> .gitignore
```

### Passo 5: Instalar Dependências (se necessário)

```bash
pnpm install
# ou
npm install
```

### Passo 6: Testar Build

```bash
# Testar se o projeto compila sem erros
pnpm build

# Se houver erros de TypeScript, corrija-os antes de prosseguir
```

### Passo 7: Iniciar Servidor de Desenvolvimento

```bash
pnpm dev
```

Se tudo estiver correto, você verá:

```
✅ [env] Variáveis de ambiente validadas com sucesso
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

---

## 🔍 Solução de Problemas

### Erro: "NEXT_PUBLIC_SUPABASE_URL não definida!"

**Causa:** `.env.local` não foi criado ou variável está faltando.

**Solução:**
```bash
# Verifique se .env.local existe
ls -la .env.local

# Se não existir, crie a partir do template
cp .env.local.template .env.local
```

---

### Erro: "ENCRYPTION_SECRET não definida!"

**Causa:** Variável `ENCRYPTION_SECRET` não foi definida no `.env.local`.

**Solução:**
```bash
# Gerar nova chave
openssl rand -base64 32

# Adicionar ao .env.local
# ENCRYPTION_SECRET=<resultado_do_comando_acima>
```

---

### Erro: "SUPABASE_SERVICE_ROLE_KEY não definida!"

**Causa:** Variável não foi definida ou você esqueceu de rotacionar a chave.

**Solução:**
1. Acesse https://app.supabase.com/project/sgntnwnngdskwyuywksk/settings/api
2. Rotacione a service role key
3. Copie a nova chave
4. Adicione ao `.env.local`:
   ```
   SUPABASE_SERVICE_ROLE_KEY=<nova_chave_aqui>
   ```

---

### Erro de TypeScript ao buildar

**Causa:** TypeScript strict mode foi habilitado e há erros de tipo no código.

**Isso é esperado!** Os erros estavam sendo silenciados antes.

**Solução:**
```bash
# Listar todos os erros
pnpm build 2>&1 | grep "error TS"

# Corrigir cada erro antes de prosseguir
```

Erros comuns:
- `: any` - Substituir por tipo concreto
- Variável pode ser `undefined` - Adicionar verificação
- Prop faltando - Adicionar prop obrigatória

---

### Página não carrega / Erro 500

**Causa:** Alguma variável crítica está faltando ou inválida.

**Solução:**
```bash
# Ver logs do servidor
pnpm dev

# Procure por mensagens de erro relacionadas a env vars
# Exemplo: "❌ ENCRYPTION_SECRET não definida!"
```

---

## ✅ Checklist Pós-Setup

Após seguir todos os passos acima, verifique:

- [ ] `.env.local` existe e está preenchido
- [ ] `.env.local` está no `.gitignore`
- [ ] Service role key do Supabase foi **ROTACIONADA**
- [ ] `ENCRYPTION_SECRET` foi gerada com `openssl rand -base64 32`
- [ ] `pnpm build` executa sem erros de TypeScript
- [ ] `pnpm dev` inicia sem erros
- [ ] Homepage carrega corretamente em http://localhost:3000
- [ ] Não há credenciais hardcoded no código

---

## 📚 Documentos Relacionados

- **Análise completa:** `ANALISE-COMPLETA.md`
- **Correções implementadas:** `CORRECOES-IMPLEMENTADAS.md`
- **README principal:** `README.md`

---

## 🆘 Precisa de Ajuda?

Se encontrar problemas:

1. Verifique os logs do servidor (`pnpm dev`)
2. Verifique o console do navegador (F12)
3. Consulte `ANALISE-COMPLETA.md` seção de troubleshooting
4. Revise `CORRECOES-IMPLEMENTADAS.md` para ver o que mudou

---

## 🎯 Próximos Passos

Após o setup funcionar:

1. **Fase 2:** Aplicar schemas Zod em todas as APIs
2. **Fase 3:** Refatorar checkout modal com Zustand
3. **Fase 4:** Substituir `console.log` por `logger` (69 ocorrências)
4. **Fase 5:** Migrar `<img>` para `<Image>` do Next.js
5. **Fase 6:** Adicionar testes automatizados

Consulte o roadmap completo em `ANALISE-COMPLETA.md`.

---

**Última atualização:** 15 de Outubro de 2025


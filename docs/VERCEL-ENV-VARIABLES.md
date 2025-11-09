# 🔧 Configuração de Variáveis de Ambiente na Vercel

## ❌ Problema: Variáveis de Ambiente Não Estão Sendo Carregadas

Se você está vendo o erro `"Chave da unidade {slug} não configurada"` para TODAS as unidades, isso significa que as variáveis de ambiente não estão configuradas corretamente na Vercel.

## ✅ Solução Passo a Passo

### 1. Acessar o Painel da Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login na sua conta
3. Selecione o projeto **LIVEACADEMIA**

### 2. Configurar Variáveis de Ambiente

1. Vá em **Settings** → **Environment Variables**
2. Adicione as variáveis para **cada unidade** no seguinte formato:

#### Para Produção (Production)

```
PACTO_SECRET_KEY_CAMAPUA=sua_chave_secreta_aqui
PACTO_SECRET_KEY_CENTRO=sua_chave_secreta_aqui
PACTO_SECRET_KEY_TORRES=sua_chave_secreta_aqui
... (uma para cada unidade)
```

#### Para Desenvolvimento (Development/Preview) - Opcional

```
PACTO_SECRET_KEY_DEV_CAMAPUA=sua_chave_dev_aqui
PACTO_SECRET_KEY_DEV_CENTRO=sua_chave_dev_aqui
... (uma para cada unidade)
```

#### Códigos de Unidade (Obrigatório para todas as unidades)

```
NEXT_PUBLIC_UNIDADE_CAMAPUA=22
NEXT_PUBLIC_UNIDADE_CENTRO=1
NEXT_PUBLIC_UNIDADE_TORRES=2
... (uma para cada unidade)
```

### 3. Formatos de Nome de Variáveis

As variáveis devem seguir estes padrões:

- **Chave Secreta (Produção)**: `PACTO_SECRET_KEY_{NOME_UNIDADE}`
  - Exemplo: `PACTO_SECRET_KEY_CAMAPUA`
  - O nome da unidade deve estar em **MAIÚSCULAS** e com **UNDERSCORES** em vez de hífens

- **Chave Secreta (Dev)**: `PACTO_SECRET_KEY_DEV_{NOME_UNIDADE}`
  - Exemplo: `PACTO_SECRET_KEY_DEV_CAMAPUA`

- **Código da Unidade**: `NEXT_PUBLIC_UNIDADE_{NOME_UNIDADE}`
  - Exemplo: `NEXT_PUBLIC_UNIDADE_CAMAPUA`

### 4. Conversão de Slug para Nome de Variável

O sistema converte automaticamente os slugs para nomes de variáveis:

| Slug | Variável Esperada |
|------|-------------------|
| `camapua` | `PACTO_SECRET_KEY_CAMAPUA` |
| `dom-pedro` | `PACTO_SECRET_KEY_DOM_PEDRO` |
| `chapeu-goiano` | `PACTO_SECRET_KEY_GOIANO` (mapeamento especial) |

### 5. Após Adicionar Variáveis

⚠️ **IMPORTANTE**: Após adicionar variáveis de ambiente na Vercel:

1. **Faça um novo deploy** - As variáveis só são carregadas no próximo deploy
2. Ou **Redeploy** a última versão:
   - Vá em **Deployments**
   - Clique nos 3 pontos (...) do último deploy
   - Selecione **Redeploy**

### 6. Verificar se Funcionou

#### Opção 1: Rota de Debug

Acesse: `https://seu-dominio.com/api/debug-env-all`

Isso mostrará todas as variáveis encontradas e quais unidades estão configuradas.

#### Opção 2: Logs da Vercel

1. Vá em **Deployments** → Selecione o último deploy
2. Clique em **Functions** → Selecione a função `/api/pacto-v3/planos/[slug]`
3. Verifique os logs para ver quais variáveis estão sendo procuradas

### 7. Mapeamentos Especiais

Algumas unidades têm mapeamentos especiais definidos em `src/config/unidades-chaves.ts`:

- `chapeu-goiano` → `PACTO_SECRET_KEY_GOIANO` (não `CHAPEU_GOIANO`)

Verifique o arquivo `src/config/unidades-chaves.ts` para ver todos os mapeamentos.

## 🔍 Debug

### Verificar Variáveis Carregadas

Use a rota de debug:

```bash
curl https://seu-dominio.com/api/debug-env-all
```

### Verificar uma Unidade Específica

```bash
curl https://seu-dominio.com/api/debug-unit?slug=camapua
```

### Logs Detalhados

As rotas de API agora fazem logs detalhados sobre quais variáveis estão sendo procuradas. Verifique os logs no painel da Vercel.

## ⚠️ Problemas Comuns

### 1. Variáveis Não Aparecem Após Adicionar

**Solução**: Faça um novo deploy ou redeploy. Variáveis de ambiente só são carregadas no momento do build.

### 2. Erro "Chave não configurada" Mesmo com Variáveis Configuradas

**Possíveis causas**:
- Nome da variável incorreto (verifique maiúsculas/minúsculas)
- Variável configurada no ambiente errado (Production vs Preview)
- Deploy não foi refeito após adicionar variáveis

### 3. Funciona Local mas Não na Vercel

**Causa**: Variáveis estão no `.env.local` mas não na Vercel.

**Solução**: Configure as mesmas variáveis no painel da Vercel.

## 📋 Checklist

- [ ] Todas as variáveis `PACTO_SECRET_KEY_{UNIDADE}` estão configuradas
- [ ] Todas as variáveis `NEXT_PUBLIC_UNIDADE_{UNIDADE}` estão configuradas
- [ ] Variáveis estão configuradas para o ambiente correto (Production/Preview)
- [ ] Deploy foi refeito após adicionar variáveis
- [ ] Nomes das variáveis estão em MAIÚSCULAS e com UNDERSCORES
- [ ] Verificou os logs da Vercel para erros específicos

## 🆘 Ainda Não Funciona?

1. Verifique os logs da Vercel para mensagens de erro específicas
2. Use a rota `/api/debug-env-all` para ver quais variáveis estão carregadas
3. Verifique se os nomes das variáveis correspondem exatamente ao esperado (incluindo maiúsculas/minúsculas)
4. Certifique-se de que fez um novo deploy após adicionar as variáveis



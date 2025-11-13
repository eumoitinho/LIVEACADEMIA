# Guia de Restauração do Sanity CMS

Este guia explica como restaurar o conteúdo do Sanity CMS para um estado anterior (2 semanas atrás).

## 📋 Pré-requisitos

### 1. Token de API do Sanity

Você precisa de um token de API do Sanity com permissões de escrita.

**Como obter o token:**

1. Acesse: https://www.sanity.io/manage
2. Selecione o projeto: **Live Academia** (c9pbklm2)
3. Vá em **API > Tokens**
4. Crie um novo token com permissões de **Editor** ou **Administrator**
5. Copie o token

### 2. Configurar Token no Projeto

Adicione o token no arquivo `.env.local`:

```bash
SANITY_API_TOKEN=seu-token-aqui
```

**⚠️ IMPORTANTE:**
- Nunca commite o arquivo `.env.local` com o token!
- O token DEVE ser do projeto **Live Academia (c9pbklm2)**
- O erro "Session does not match project host" significa que o token é de outro projeto

**Como verificar se o token é correto:**
```bash
# O script agora mostra informações do token e testa a conexão antes de começar
pnpm sanity:restore:dry-run
```

---

## 🚀 Como Usar

### Opção 1: Teste Primeiro (Dry Run) - RECOMENDADO

Antes de fazer mudanças reais, teste o que será restaurado:

```bash
pnpm sanity:restore:dry-run
```

Este comando vai:
- ✅ Mostrar quais documentos serão restaurados
- ✅ Indicar as datas das versões que serão restauradas
- ✅ **NÃO fazer nenhuma alteração** no Sanity

**Saída esperada:**
```
╔════════════════════════════════════════════════════════════╗
║   RESTAURAÇÃO DE CONTEÚDO DO SANITY                        ║
╚════════════════════════════════════════════════════════════╝

📅 Data atual: 2024-11-13T...
📅 Data alvo: 2024-10-30T...
⏰ Restaurando para: 2 semanas atrás

🔍 MODO DRY RUN - Nenhuma alteração será feita

📄 Buscando documentos do tipo: homepage
   ✓ Encontrados 1 documentos
   📄 Processando singleton: homepage
   📅 Versão encontrada: 2024-10-30T14:23:45.000Z
   🔄 [DRY RUN] Restauraria documento homepage

...

╔════════════════════════════════════════════════════════════╗
║   RESUMO DA RESTAURAÇÃO                                    ║
╚════════════════════════════════════════════════════════════╝

   Tipos processados:    17
   ✓ Documentos restaurados: 45
   ✗ Falhas:                 0
   ⚠️  Ignorados:              3

   🔍 Este foi um DRY RUN - nenhuma alteração foi feita.
   Execute novamente sem --dry-run para aplicar as mudanças.
```

### Opção 2: Restaurar Conteúdo (Modo Produção)

Depois de verificar o dry run, execute a restauração real:

```bash
pnpm sanity:restore
```

**⚠️ ATENÇÃO:**
- Este comando **VAI FAZER ALTERAÇÕES REAIS** no Sanity
- Você tem **5 segundos** para cancelar (Ctrl+C)
- Faça backup antes se necessário

**Saída esperada:**
```
╔════════════════════════════════════════════════════════════╗
║   RESTAURAÇÃO DE CONTEÚDO DO SANITY                        ║
╚════════════════════════════════════════════════════════════╝

📅 Data atual: 2024-11-13T...
📅 Data alvo: 2024-10-30T...
⏰ Restaurando para: 2 semanas atrás

⚠️  MODO DE PRODUÇÃO - Alterações serão aplicadas!

   Pressione Ctrl+C nos próximos 5 segundos para cancelar...

🔄 Restaurando tipo: homepage
   Data alvo: 2024-10-30T...
   📄 Processando singleton: homepage
   📅 Versão de: 2024-10-30T14:23:45.000Z
   ✓ Restaurado: homepage

...

╔════════════════════════════════════════════════════════════╗
║   RESUMO DA RESTAURAÇÃO                                    ║
╚════════════════════════════════════════════════════════════╝

   Tipos processados:    17
   ✓ Documentos restaurados: 45
   ✗ Falhas:                 0
   ⚠️  Ignorados:              3

   ✓ Restauração concluída!
```

---

## 📊 O Que É Restaurado

O script restaura **TODOS** os tipos de conteúdo do Sanity:

### Singletons (Documentos Únicos):
- ✅ Homepage
- ✅ Seção do App
- ✅ Seção de Benefícios
- ✅ Day Use
- ✅ Sobre Nós
- ✅ Contato
- ✅ Trabalhe Conosco
- ✅ Sobre

### Collections (Múltiplos Documentos):
- ✅ Unidades (Units)
- ✅ Planos
- ✅ Benefícios
- ✅ Depoimentos
- ✅ Recursos do App
- ✅ Modalidades
- ✅ Estrutura
- ✅ Wellhub
- ✅ Bioimpedância

---

## ⚙️ Configurações Avançadas

### Alterar o Período de Restauração

Por padrão, o script restaura para **2 semanas atrás**. Para mudar:

Edite o arquivo `scripts/restore-sanity-content.ts`:

```typescript
// Linha ~247
const WEEKS_AGO = 2; // Altere para o número de semanas desejado
```

Exemplos:
- `WEEKS_AGO = 1` → 1 semana atrás
- `WEEKS_AGO = 3` → 3 semanas atrás
- `WEEKS_AGO = 4` → 1 mês atrás

### Restaurar Apenas Tipos Específicos

Se você quiser restaurar apenas alguns tipos de documentos, edite:

```typescript
// Linha ~18
const DOCUMENT_TYPES = [
  'homepage',      // Manter
  // 'unit',       // Comentar para não restaurar
  // 'plano',      // Comentar para não restaurar
  'testimonial',   // Manter
  // ... outros
];
```

---

## 🔄 Verificar se a Restauração Funcionou

### 1. Verificar no Sanity Studio

```bash
pnpm sanity:studio
```

Acesse http://localhost:3333 e verifique:
- Homepage
- Unidades
- Planos
- Outros conteúdos

### 2. Verificar no Site

```bash
pnpm dev
```

Acesse http://localhost:3000 e confirme que:
- O conteúdo está correto
- Imagens estão carregando
- Todas as seções aparecem

---

## 🛟 Solução de Problemas

### Erro: "Session does not match project host"

**Causa:** O token não pertence ao projeto c9pbklm2

**Solução:**
1. Acesse https://www.sanity.io/manage
2. **CERTIFIQUE-SE** de selecionar o projeto **Live Academia (c9pbklm2)**
3. Vá em **API > Tokens**
4. Crie um NOVO token **neste projeto específico**
5. Copie o token e adicione no `.env.local`:
   ```bash
   SANITY_API_TOKEN=seu-novo-token-aqui
   ```
6. Teste novamente: `pnpm sanity:restore:dry-run`

**Dica:** O script agora mostra informações sobre o token e testa a conexão primeiro!

### Erro: "SANITY_API_TOKEN não encontrado"

**Causa:** Token não está configurado no `.env.local`

**Solução:**
1. Obtenha o token no Sanity.io (veja "Pré-requisitos")
2. Adicione no `.env.local`:
   ```bash
   SANITY_API_TOKEN=seu-token-aqui
   ```

### Erro: "Token inválido" ou "Unauthorized"

**Causa:** Token sem permissões adequadas

**Solução:**
1. Verifique se o token tem permissões de **Editor** ou **Administrator**
2. Crie um novo token com permissões corretas
3. Atualize o `.env.local`

### Erro: "Sem histórico disponível"

**Causa:** Documento foi criado há menos de 2 semanas

**Solução:**
- O documento será **ignorado** (está no resumo final)
- Isso é normal para documentos novos

### Nenhum documento foi restaurado

**Causa:** Pode não haver mudanças entre agora e 2 semanas atrás

**Solução:**
1. Execute com `--dry-run` para ver detalhes
2. Verifique se realmente houve alterações no período
3. Tente alterar `WEEKS_AGO` para um período maior

### Website ainda mostra conteúdo antigo

**Causa:** Cache do Next.js

**Solução:**
```bash
# Limpar cache do Next.js
rm -rf .next

# Reiniciar dev server
pnpm dev
```

---

## 📝 Notas Importantes

### ✅ Segurança
- O Sanity mantém **histórico completo** de todos os documentos
- Você pode restaurar novamente para outra data se necessário
- O histórico **não é apagado** pela restauração

### ⚠️ Limitações
- Não restaura **assets/imagens** deletados
- Apenas restaura documentos que existem atualmente
- Não recria documentos que foram **deletados permanentemente**

### 💡 Dicas
- Sempre use `--dry-run` primeiro
- Faça backup do Sanity antes de restaurações grandes
- Verifique o resumo final para confirmar o que foi restaurado
- Teste o site após a restauração

---

## 🔗 Recursos Adicionais

- **Sanity Documentation**: https://www.sanity.io/docs
- **Sanity Management**: https://www.sanity.io/manage
- **Project Overview**: `CLAUDE.md`

---

## 📞 Suporte

Em caso de problemas:

1. Verifique este guia
2. Execute com `--dry-run` para diagnóstico
3. Verifique os logs do script
4. Contate o time de desenvolvimento

---

**Última atualização:** Novembro 2024

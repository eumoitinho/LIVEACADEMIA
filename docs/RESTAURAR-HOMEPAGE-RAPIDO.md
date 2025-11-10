# 🚀 Restaurar Homepage no Sanity - Guia Rápido

## Problema
O documento da homepage foi deletado no Sanity Studio, mostrando "This document has been deleted", ou não está editável.

## ⚠️ IMPORTANTE: Solução Manual (Recomendada)

Se o script automático não funcionar (problemas de permissão), use a **solução manual**:

👉 **Veja o guia completo**: `docs/CRIAR-HOMEPAGE-EDITAVEL-MANUAL.md`

**Resumo rápido**:
1. Acesse o Sanity Studio
2. Delete documentos homepage antigos (se houver)
3. Crie um novo documento do tipo "Homepage"
4. Preencha com os valores padrão
5. Publique o documento

## Solução Automática (3 passos) - Requer Token com Permissões

### 1. Obter Token do Sanity

1. Acesse: https://sanity.io/manage
2. Selecione seu projeto
3. Vá em **API** → **Tokens**
4. Crie um novo token com permissões de **Editor** (read + write)
5. Copie o token

### 2. Configurar Variáveis de Ambiente

Adicione ao `.env.local` (ou configure na Vercel):

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=seu-token-aqui
```

### 3. Executar Script de Restauração

```bash
pnpm run sanity:restore-homepage
```

**OU** manualmente:

```bash
node scripts/restore-homepage-sanity.js
```

## ✅ Verificação

Após executar o script:

1. **Verifique no Sanity Studio:**
   - Acesse: `http://localhost:3000/studio` ou seu Studio na cloud
   - O documento "Homepage" deve aparecer
   - Todos os campos devem estar preenchidos com valores padrão

2. **Verifique no site:**
   - Acesse a homepage: `http://localhost:3000`
   - A página deve carregar sem erros
   - Os conteúdos padrão devem aparecer

## 🔧 Alternativa: Restaurar via Sanity Studio (Manual)

Se preferir fazer manualmente:

1. Acesse o Sanity Studio
2. Clique em **Create** → **Homepage**
3. Preencha os campos básicos:
   - **SEO Title**: `Live Academia | Rede de Academias em Manaus`
   - **Hero Title**: `Transforme.`
   - **Hero Subtitle**: `Evolua.`
   - **Hero Third Title**: `Viva.`
   - Preencha os demais campos conforme necessário
4. Clique em **Publish**

## 📋 Valores Padrão

O script cria/atualiza a homepage com estes valores:

### SEO
- **Title**: `Live Academia | Rede de Academias em Manaus`
- **Description**: `Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha.`

### Hero
- **Title**: `Transforme.`
- **Subtitle**: `Evolua.`
- **Third Title**: `Viva.`
- **Rating**: `4.9` - `Elite rating` - `15k+ atletas`
- **Primary CTA**: `Comece Agora` → `/planos`
- **Secondary CTA**: `Ver as aulas` → `/aulas-coletivas`

### About
- **Title**: `Seu treino, suas regras`
- **Stats**: `10+ Anos de Experiência`, `15k+ Alunos Ativos`

### Benefícios, Planos, Testimonials
- Estrutura básica criada (arrays vazios)
- Podem ser preenchidos posteriormente no Studio

## 🆘 Problemas Comuns

### Erro: "SANITY_API_TOKEN não está configurado"

**Solução**: Adicione o token ao `.env.local` ou configure na Vercel

### Erro: "NEXT_PUBLIC_SANITY_PROJECT_ID não está configurado"

**Solução**: Verifique se o project ID está correto no `.env.local`

### Documento não aparece no Studio

**Solução**: 
- Verifique se está usando o dataset correto (`production` vs `development`)
- Verifique se o documento foi publicado (não apenas salvo como rascunho)

### Site ainda mostra erro

**Solução**:
- Faça um hard refresh (Ctrl+Shift+R ou Cmd+Shift+R)
- Limpe o cache do Next.js: `rm -rf .next`
- Reinicie o servidor: `pnpm dev`

## 📚 Documentação Completa

Para mais detalhes, consulte: `docs/RESTAURAR-HOMEPAGE-SANITY.md`


# 🔧 Solução: Homepage Não Está Editável no Sanity

## Problema
O documento homepage não está editável no Sanity Studio, ou aparece como deletado.

## ✅ Solução Definitiva (Manual)

### Por que o script automático pode falhar?
- Token sem permissões adequadas (create/update/delete)
- Documentos em estado inconsistente
- Problemas de permissão no projeto

### Solução Manual (Sempre Funciona)

**Siga este guia passo a passo**: `docs/CRIAR-HOMEPAGE-EDITAVEL-MANUAL.md`

### Resumo Rápido

1. **Acesse o Sanity Studio**
   - Local: `http://localhost:3000/studio`
   - Cloud: Seu Studio na cloud

2. **Limpe documentos antigos**
   - Liste todos os documentos "homepage"
   - Delete os antigos/duplicados
   - Mantenha apenas o que você quer usar

3. **Crie um novo documento**
   - Clique em "Create" → "Homepage"
   - Preencha os campos básicos
   - Publique o documento

4. **Verifique**
   - O documento deve estar editável
   - Você deve conseguir clicá-lo e editá-lo
   - O site deve carregar os dados

## 🎯 Valores Padrão para Copiar/Colar

### SEO
- **Título**: `Live Academia | Rede de Academias em Manaus`
- **Descrição**: `Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha.`

### Hero
- **Título**: `Transforme.`
- **Subtítulo**: `Evolua.`
- **Terceiro Título**: `Viva.`
- **Descrição**: `Transforme seu corpo e sua vida na maior rede de academias de Manaus. Construído para atletas que exigem excelência em cada repetição.`
- **Rating**: `4.9` - `Elite rating` - `15k+ atletas`
- **CTA Principal**: `Comece Agora` → `/planos`
- **CTA Secundário**: `Ver as aulas` → `/aulas-coletivas`

### About
- **Título**: `Seu treino, suas regras`
- **Stats**: `10+ Anos de Experiência`, `15k+ Alunos Ativos`

## 🆘 Se Ainda Não Funcionar

1. **Verifique permissões do token**
   - Acesse: https://sanity.io/manage
   - Verifique se o token tem permissões de Editor/Admin
   - Crie um novo token se necessário

2. **Verifique o dataset**
   - Certifique-se de estar no dataset `production`
   - Verifique se há múltiplos datasets

3. **Recarregue o Studio**
   - Faça um hard refresh (Ctrl+Shift+R)
   - Limpe o cache do browser

4. **Verifique o schema**
   - Certifique-se de que o schema `homepage.ts` está correto
   - Faça deploy do Studio se necessário

## 📚 Documentação Relacionada

- `docs/CRIAR-HOMEPAGE-EDITAVEL-MANUAL.md` - Guia completo manual
- `docs/RESTAURAR-HOMEPAGE-SANITY.md` - Documentação completa
- `sanity/schemas/homepage.ts` - Schema da homepage

## 💡 Dica

A solução manual é sempre mais confiável que scripts automáticos quando há problemas de permissão. Use o guia manual e você terá um documento editável garantido.


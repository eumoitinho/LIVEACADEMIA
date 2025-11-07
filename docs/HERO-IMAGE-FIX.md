# 🖼️ Fix: Imagem do Hero não Atualiza

## ❌ Problema
A foto do hero não estava trocando quando alterada no Sanity Studio.

## ✅ Solução Implementada

### 1. **Adicionado campo `backgroundImage` no schema**
   - ✅ `sanity/schemas/homepage.ts` - Campo `backgroundImage` no objeto `hero`
   - ✅ `sanity/schemas/hero-section.ts` - Campo `backgroundImage` também adicionado (para uso futuro)

### 2. **Atualizada a query do Sanity**
   - ✅ `lib/sanity.ts` - `getHomepageData()` agora busca a imagem corretamente
   - ✅ `lib/sanity.ts` - `getHeroSectionData()` também busca a imagem

### 3. **Atualizado o componente**
   - ✅ `src/components/sections/hero-section-editable.tsx` - Agora renderiza a imagem de background
   - ✅ Usa `Next/Image` para otimização
   - ✅ Ocultar background padrão do layout quando há imagem do Sanity

## 🔧 Como Funciona

1. **Quando há imagem no Sanity:**
   - A imagem do Sanity é exibida como background
   - O background padrão do layout (`/hero.jpg`) é ocultado

2. **Quando não há imagem no Sanity:**
   - O background padrão do layout continua funcionando
   - Fallback para `/hero.jpg`

## 📝 Como Usar

1. **No Sanity Studio:**
   - Acesse "Homepage" → "Seção Hero"
   - Faça upload da imagem em "Imagem de Fundo"
   - Salve as alterações

2. **Verificar no Site:**
   - Limpe o cache do navegador (Ctrl+Shift+Del)
   - Recarregue a página (Ctrl+F5)
   - A nova imagem deve aparecer

## 🔍 Troubleshooting

### Problema: Imagem não aparece
**Soluções:**
1. Verifique se a imagem foi salva no Sanity Studio
2. Limpe o cache do Next.js:
   ```bash
   rm -rf .next
   npm run dev
   ```
3. Limpe o cache do navegador
4. Verifique o console do navegador para erros

### Problema: Imagem antiga ainda aparece
**Soluções:**
1. O Sanity CDN pode ter cache
2. Aguarde alguns minutos ou limpe o cache
3. Verifique se está usando `useCdn: false` em desenvolvimento

### Problema: Background padrão aparece junto
**Soluções:**
1. Verifique se a imagem foi salva corretamente no Sanity
2. Verifique o console do navegador para erros
3. Confirme que `data.backgroundImage?.asset?.url` existe

## 🎯 Próximos Passos

1. **Testar no Sanity Studio:**
   - Faça upload de uma nova imagem
   - Salve as alterações
   - Verifique se aparece no site

2. **Verificar Performance:**
   - A imagem é otimizada pelo Next.js Image
   - Use imagens em formato WebP quando possível
   - Tamanho recomendado: 1920x1080px

3. **Cache:**
   - Em produção, o Next.js CDN cacheia imagens
   - Para forçar atualização, altere o nome da imagem no Sanity
   - Ou use `revalidate` nas rotas


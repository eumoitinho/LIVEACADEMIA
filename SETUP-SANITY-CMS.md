# Setup do Sanity CMS - Live Academia

## Visão Geral

Este documento explica como configurar e usar o Sanity CMS para tornar toda a homepage da Live Academia editável, mantendo exatamente o mesmo design, layout e cores atuais.

## Funcionalidades Implementadas

### ✅ Homepage Totalmente Editável
- **Hero Section**: Imagem de fundo, título, subtítulo, descrição, CTAs, estatísticas
- **About Section**: Título, descrição, estatísticas, destaques
- **Benefícios Section**: Lista de benefícios com ícones, imagens e descrições
- **Planos Section**: Planos com preços, benefícios, badges e CTAs
- **Unidades Carousel**: Lista completa de unidades com filtros e ordenação

### ✅ CMS Features
- Interface intuitiva no Sanity Studio
- Upload de imagens otimizado
- Preview em tempo real
- Validação de campos
- Organização por seções
- Dados estruturados

## Configuração

### 1. Instalar Dependências

```bash
npm install @sanity/client @sanity/image-url next-sanity sanity @sanity/vision --legacy-peer-deps
```

### 2. Configurar Variáveis de Ambiente

Crie/edite o arquivo `.env.local`:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=seu-token-completo

# Exemplo:
# NEXT_PUBLIC_SANITY_PROJECT_ID=abc123def
# NEXT_PUBLIC_SANITY_DATASET=production
# SANITY_API_TOKEN=skAbc123Def456Ghi789...
```

### 3. Criar Projeto Sanity

1. Acesse [sanity.io](https://sanity.io)
2. Crie uma nova conta ou faça login
3. Crie um novo projeto:
   - Nome: "Live Academia CMS"
   - Dataset: "production"
   - Template: "Clean project with no predefined schemas"

### 4. Obter Credenciais

1. No dashboard do Sanity, vá em **API**
2. Copie o **Project ID**
3. Gere um novo token:
   - Nome: "Live Academia Frontend"
   - Permissões: **Editor** (para criar/editar conteúdo)

### 5. Popular com Dados Iniciais

Execute o script de seed:

```bash
node scripts/seed-sanity.js
```

Este script criará:
- Dados da homepage (hero, about, beneficios, planos)
- Unidades de exemplo
- Estrutura básica do CMS

## Como Usar

### 1. Acessar o CMS

- URL: `http://localhost:3000/studio`
- Faça login com sua conta Sanity
- Configure o conteúdo conforme necessário

### 2. Estrutura do CMS

#### Homepage
- **Hero**: Imagem, textos, CTAs, estatísticas
- **About**: Informações sobre a academia
- **Benefícios**: Lista de vantagens com imagens
- **Planos**: Planos disponíveis com preços

#### Unidades
- Lista completa de unidades
- Informações de contato
- Localização (lat/lng)
- Serviços disponíveis
- Imagens das unidades
- Ordem de exibição no carousel

### 3. Upload de Imagens

1. No Sanity Studio, vá em **Media**
2. Faça upload das imagens necessárias:
   - Imagem de fundo do hero
   - Imagens dos benefícios
   - Fotos das unidades
3. As imagens serão automaticamente otimizadas

### 4. Editar Conteúdo

1. **Homepage**: Edite textos, preços, CTAs
2. **Unidades**: Adicione/edite unidades, serviços
3. **SEO**: Configure título, descrição, keywords

## Estrutura dos Arquivos

```
├── lib/
│   ├── sanity.ts                 # Cliente Sanity
│   └── sanity-queries.ts         # Queries GraphQL
├── sanity/
│   ├── schemas/
│   │   ├── homepage.ts           # Schema da homepage
│   │   └── unit.ts              # Schema das unidades
│   └── data/
│       └── seed-data.js         # Dados iniciais
├── src/components/
│   ├── sections/
│   │   ├── hero-section-editable.tsx
│   │   ├── about-section-editable.tsx
│   │   ├── beneficios-section-editable.tsx
│   │   └── planos-section-editable.tsx
│   ├── shared/
│   │   └── unidades-carousel-editable.tsx
│   └── homepage-editable.tsx
├── types/
│   └── sanity.ts                # Tipos TypeScript
├── hooks/
│   └── use-sanity-data.ts       # Hooks para dados
└── app/
    ├── page.tsx                 # Homepage (editável)
    └── studio/[[...tool]]/      # Sanity Studio
```

## Componentes Editáveis

### HeroSectionEditable
- Imagem de fundo editável
- Título e subtítulo
- Descrição
- CTAs principais e secundários
- Estatísticas

### AboutSectionEditable
- Badge e título
- Descrição
- Estatísticas com ícones
- Lista de destaques

### BeneficiosSectionEditable
- Lista de benefícios
- Ícones (emojis)
- Imagens para cada benefício
- Cores de gradiente

### PlanosSectionEditable
- Planos com preços
- Lista de benefícios
- Badges de destaque
- CTAs personalizados

### UnidadesCarouselEditable
- Lista de unidades
- Ordenação por distância
- Filtros por tipo/serviço
- Informações completas

## Manutenção

### Adicionar Nova Seção

1. Crie o schema no Sanity (`sanity/schemas/`)
2. Adicione os tipos TypeScript (`types/sanity.ts`)
3. Crie o componente editável (`src/components/sections/`)
4. Adicione a query (`lib/sanity-queries.ts`)
5. Integre na homepage (`src/components/homepage-editable.tsx`)

### Adicionar Novo Campo

1. Edite o schema do Sanity
2. Atualize os tipos TypeScript
3. Modifique o componente editável
4. Teste no Sanity Studio

## Troubleshooting

### Erro de Token
```
Error: Invalid token
```
**Solução**: Verifique se o `SANITY_API_TOKEN` está correto e tem permissões de Editor.

### Imagens não carregam
```
Error loading images
```
**Solução**: Verifique se as imagens foram feitas upload no Sanity Studio.

### Dados não aparecem
```
No data found
```
**Solução**: Execute o script de seed e verifique as queries.

### Build falha
```
Type error in sanity
```
**Solução**: Verifique se todos os tipos TypeScript estão atualizados.

## Performance

### Otimizações Implementadas
- Imagens otimizadas automaticamente pelo Sanity
- Queries eficientes com apenas campos necessários
- Cache de dados no frontend
- Lazy loading de componentes
- Fallbacks para dados estáticos

### Monitoramento
- Logs de erro no console
- Fallbacks para dados estáticos
- Loading states visuais
- Tratamento de erros de rede

## Próximos Passos

1. **Configurar CDN**: Para melhor performance das imagens
2. **Preview Mode**: Para preview de mudanças antes de publicar
3. **Webhooks**: Para rebuild automático do site
4. **Analytics**: Integração com Google Analytics
5. **SEO**: Meta tags dinâmicas baseadas no conteúdo

## Suporte

Para dúvidas ou problemas:
1. Verifique este README
2. Consulte a documentação do Sanity
3. Verifique os logs do console
4. Teste em ambiente de desenvolvimento

---

**Status**: ✅ Implementado e Funcional
**Versão**: 1.0.0
**Última Atualização**: Outubro 2024

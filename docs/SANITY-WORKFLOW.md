# Workflow Sanity CMS - Live Academia

## 🎯 Duas formas de usar o Studio

### Opção 1: Sanity Cloud (Recomendado para edições)
- **URL**: https://www.sanity.io/manage/personal/project/c9pbklm2
- **Uso**: Editar conteúdo (textos, imagens, modalidades, etc.)
- **Interface**: Moderna, completa, com emojis
- **Quando usar**: Para edições diárias de conteúdo

### Opção 2: Studio Local (Para desenvolvimento)
- **URL**: http://localhost:3002/studio
- **Uso**: Testar mudanças antes de fazer deploy
- **Quando usar**: Ao desenvolver novos schemas ou mudar estrutura

## 🔄 Fluxo de Desenvolvimento

### 1. Editar Schema Local
```bash
# Editar arquivos em:
# - sanity.config.ts (estrutura do menu)
# - sanity/schemas/*.ts (tipos de documento)
```

### 2. Testar Localmente
```bash
# Rodar dev server
pnpm dev

# Acessar Studio local
# http://localhost:3002/studio
```

### 3. Deploy para Cloud
```bash
# Fazer deploy das mudanças
pnpm sanity:deploy

# Isso atualiza o Studio em sanity.io
```

### 4. Editar Conteúdo no Cloud
- Acesse https://www.sanity.io/
- Faça login
- Edite conteúdo na interface moderna

## 📂 Arquivos Importantes

### Configuração Principal
- `sanity.config.ts` - Configuração do Studio, plugins, estrutura do menu

### Schemas (Tipos de Documento)
```
sanity/schemas/
├── homepage.ts              # Homepage principal
├── unit.ts                  # Unidades/academias
├── plano.ts                 # Planos de assinatura
├── modality.ts              # Modalidades de aulas
├── modalidades-page.ts      # Landing de modalidades (seção homepage)
├── benefit.ts               # Benefícios
├── testimonial.ts           # Depoimentos
├── app-feature.ts           # Recursos do app
├── structure-feature.ts     # Estrutura física
├── wellhub-feature.ts       # Wellhub/Gympass
├── bioimpedancia-feature.ts # Bioimpedância
├── app-section.ts           # Seção do app (singleton)
├── beneficios-section.ts    # Seção de benefícios (singleton)
├── wellhub-section.ts       # Seção Wellhub (singleton)
├── day-use.ts               # Day Use
├── sobre-nos.ts             # Sobre Nós
├── contato.ts               # Contato
├── trabalhe-conosco.ts      # Trabalhe Conosco
└── sobre.ts                 # Sobre
```

## 🛠 Comandos Úteis

```bash
# Deploy Studio para Cloud
pnpm sanity:deploy

# Verificar dados de modalidades
pnpm sanity:check-modalidades

# Popular documento modalidadesPage
pnpm sanity:seed-modalidades

# Popular unidades
pnpm sanity:seed-units

# Rodar Studio local (junto com Next.js)
pnpm dev
```

## 📋 Exemplo: Adicionar novo campo

### 1. Editar schema local
```typescript
// sanity/schemas/modality.ts
defineField({
  name: 'category',
  title: 'Categoria',
  type: 'string',
  options: {
    list: [
      { title: 'Cardio', value: 'cardio' },
      { title: 'Força', value: 'strength' },
      { title: 'Flexibilidade', value: 'flexibility' },
    ],
  },
})
```

### 2. Testar localmente
```bash
pnpm dev
# Acesse http://localhost:3002/studio
# Verifique se o campo aparece
```

### 3. Deploy para Cloud
```bash
pnpm sanity:deploy
```

### 4. Atualizar componente React
```typescript
// src/components/sections/modalidades-section.tsx
// Usar o novo campo 'category'
```

## ⚠️ Importante

- **Dados são compartilhados**: Studio local e cloud usam o mesmo dataset (`production`)
- **Schemas são locais**: Mudanças em schemas precisam de deploy
- **Conteúdo é global**: Edições de conteúdo aparecem em tempo real
- **Deploy é seguro**: Não afeta dados, apenas atualiza interface do Studio

## 🔐 Variáveis de Ambiente

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=c9pbklm2
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3002/studio
```

## 📚 Documentação Oficial

- Sanity Docs: https://www.sanity.io/docs
- Schema Types: https://www.sanity.io/docs/schema-types
- Structure Builder: https://www.sanity.io/docs/structure-builder

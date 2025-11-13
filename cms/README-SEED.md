# 🌱 Seed do Strapi - Guia Rápido

## 🚀 Como Usar

### 1. Configurar Token de API

Adicione ao `.env.local` (raiz do projeto) ou `.env` (diretório `cms/`):

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=seu-token-aqui
```

### 2. Obter Token

1. Acesse: `http://localhost:1337/admin`
2. Vá em **Settings → API Tokens**
3. Crie token com permissões **Full Access**
4. Copie e adicione ao `.env.local`

### 3. Executar Seed

```bash
cd cms
npm run seed
```

## 📦 O que é Criado

- ✅ **Homepage** (Single Type) - Conteúdo da página inicial
- ✅ **Planos** (2 planos: Tradicional e Diamante)
- ✅ **Unidades** (4 unidades: Centro, Cidade Nova, Compensa, Vieiralves)
- ✅ **Benefícios** (3 benefícios)
- ✅ **Modalidades** (3 modalidades: Spinning, Yoga, Pilates)

## ⚠️ Importante

Após executar o seed:

1. **Publique o conteúdo** no Strapi Admin
2. **Adicione imagens** aos conteúdos
3. **Configure relacionamentos** (ex: planos na homepage)

## 🐛 Troubleshooting

- **Token não configurado**: Adicione `STRAPI_API_TOKEN` ao `.env.local`
- **Strapi não está rodando**: Execute `cd cms && pnpm dev`
- **Erro 401**: Verifique se o token tem permissões corretas

## 📚 Documentação Completa

Veja `docs/STRAPI-SEED-GUIDE.md` para documentação detalhada.


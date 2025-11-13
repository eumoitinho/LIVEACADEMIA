# 🎯 Setup Completo do Strapi - Guia Definitivo

## 📋 Visão Geral

Este guia cobre a configuração completa do Strapi CMS para a Live Academia, incluindo:
- ✅ Todos os conteúdos estáticos (páginas, textos, imagens)
- ✅ Integração com APIs externas (Pacto)
- ✅ Configuração de chaves de API
- ✅ Dados iniciais (seed)

## 🚀 Passo a Passo Completo

### 1. Configurar Variáveis de Ambiente

Adicione ao `.env.local` (raiz do projeto):

```env
# Strapi Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=seu-token-aqui

# Pacto API (para dados dinâmicos)
PACTO_API_URL=https://apigw.pactosolucoes.com.br
PACTO_SECRET_KEY=suas-chave-secreta-aqui

# Preview Mode (opcional)
STRAPI_PREVIEW_SECRET=seu-preview-secret
STRAPI_REVALIDATE_SECRET=seu-revalidate-secret
```

### 2. Obter Token de API do Strapi

1. Acesse: `http://localhost:1337/admin`
2. Vá em **Settings → API Tokens**
3. Crie um token com permissões **Full Access**
4. Copie o token e adicione ao `.env.local`

### 3. Executar Seed

```bash
cd cms
npm run seed
```

Isso criará:
- ✅ Homepage (com todas as seções)
- ✅ Planos (2 planos estáticos - os dinâmicos vêm da API Pacto)
- ✅ Unidades (4 unidades)
- ✅ Benefícios
- ✅ Modalidades
- ✅ Página de Contato
- ✅ Página Day Use
- ✅ Página Sobre Nós
- ✅ Página Trabalhe Conosco
- ✅ Configurações Globais

### 4. Publicar Conteúdo

1. Acesse o Strapi Admin: `http://localhost:1337/admin`
2. Vá em **Content Manager**
3. Para cada conteúdo criado:
   - Abra o conteúdo
   - Clique em **Publish**
   - Adicione imagens se necessário

### 5. Configurar Chaves de API do Pacto

Para cada unidade no Strapi:

1. Vá em **Content Manager → Unit**
2. Selecione uma unidade
3. Configure:
   - **codigoUnidade**: Código da unidade na API do Pacto (ex: `1`, `2`, `3`)
   - **chavePublica**: Chave pública da API do Pacto (fornecida pela Pacto)
4. Salve e publique

### 6. Adicionar Imagens

1. Vá em **Media Library**
2. Faça upload das imagens
3. Associe as imagens aos conteúdos:
   - Homepage → Hero Section → Background Image
   - Homepage → About Section → Image
   - Units → Main Photo, Background Image, Gallery
   - etc.

## 🔄 Dados Estáticos vs Dinâmicos

### ✅ Dados no Strapi (Estáticos)

- Homepage (textos, seções, imagens)
- Páginas (Contato, Day Use, Sobre Nós, Trabalhe Conosco)
- Unidades (informações básicas, endereço, fotos)
- Benefícios
- Modalidades
- Depoimentos
- Configurações Globais

### ⚡ Dados da API Pacto (Dinâmicos)

- **Planos**: Preços, descrições, features (vêm da API Pacto)
- **Vendas**: Processamento de pagamentos
- **Cupons**: Validação de cupons
- **Simulações**: Simulação de vendas
- **PAR-Q**: Questionário de avaliação física
- **Leads**: Cadastro de leads
- **Configurações de Vendas**: Configurações da API Pacto

**⚠️ IMPORTANTE**: Os planos dinâmicos vêm da API do Pacto. Os planos no Strapi são apenas referência/fallback.

## 📊 Estrutura de Dados

### Homepage
- SEO
- Hero Section
- About Section
- Benefits Section
- Plans Section (referências a planos)
- App Section
- Wellhub Section
- Bioimpedância Section
- Structure Section
- Modalities Section
- Testimonials Section

### Unidades
- Informações básicas (nome, endereço, telefone)
- Localização (latitude, longitude)
- Fotos (main photo, background, gallery)
- Features (características da unidade)
- **codigoUnidade**: Código da API Pacto
- **chavePublica**: Chave pública da API Pacto

### Planos (Strapi)
- Planos estáticos de referência
- **Os planos dinâmicos vêm da API Pacto**

## 🔑 Configuração de Chaves de API

### Nas Unidades do Strapi

Cada unidade precisa ter:
- **codigoUnidade**: Código da unidade na API do Pacto
- **chavePublica**: Chave pública da API do Pacto

### Variáveis de Ambiente

```env
# Chave secreta da API Pacto (usada para todas as unidades)
PACTO_SECRET_KEY=your-secret-key

# URL da API Pacto
PACTO_API_URL=https://apigw.pactosolucoes.com.br
```

## 🧪 Testar a Integração

### 1. Testar Strapi

```bash
# Homepage
curl http://localhost:1337/api/homepage

# Units
curl http://localhost:1337/api/units

# Plans
curl http://localhost:1337/api/plans
```

### 2. Testar API Routes do Next.js

```bash
# Homepage
curl http://localhost:3000/api/strapi/homepage

# Units
curl http://localhost:3000/api/strapi/units

# Plans
curl http://localhost:3000/api/strapi/plans
```

### 3. Testar API Pacto

```bash
# Planos (requer chaves configuradas)
curl http://localhost:3000/api/pacto-v3/planos/centro

# Configurações de vendas
curl http://localhost:3000/api/pacto-v3/vendas/configs/centro
```

## 📚 Documentação Relacionada

- [Guia de Seed](./STRAPI-SEED-GUIDE.md) - Como popular o Strapi
- [Integração com APIs](./STRAPI-API-INTEGRATION.md) - Dados estáticos vs dinâmicos
- [Preview Mode](./STRAPI-PREVIEW-MODE.md) - Como usar preview mode
- [Integração Pacto](./API-V3-IMPLEMENTATION.md) - Documentação da API Pacto

## 🐛 Troubleshooting

### Erro: "Planos não encontrados"

**Causa**: Os planos dinâmicos vêm da API do Pacto, não do Strapi.

**Solução**:
1. Verifique se `PACTO_SECRET_KEY` está configurada
2. Verifique se `codigoUnidade` está correto no Strapi
3. Verifique se a API do Pacto está acessível
4. Os planos no Strapi são apenas referência/fallback

### Erro: "Chave da unidade não configurada"

**Causa**: `codigoUnidade` ou `chavePublica` não está configurado no Strapi.

**Solução**:
1. Acesse o Strapi Admin
2. Vá em **Content Manager → Unit**
3. Configure `codigoUnidade` e `chavePublica` para cada unidade

### Erro: "Unauthorized" na API Pacto

**Causa**: A chave secreta da API Pacto está incorreta.

**Solução**:
1. Verifique se `PACTO_SECRET_KEY` está correta no `.env.local`
2. Verifique se a chave tem permissões para acessar a API
3. Entre em contato com a Pacto para verificar a chave

## 📝 Notas Importantes

1. **Planos são dinâmicos**: Os planos reais vêm da API do Pacto. Os planos no Strapi são apenas referência/fallback.

2. **Chaves de API**: Cada unidade precisa ter `codigoUnidade` e `chavePublica` configurados no Strapi para que a integração com a API Pacto funcione.

3. **Cache**: As respostas da API Pacto são cacheadas para melhor performance.

4. **Rate Limiting**: A API Pacto tem limites de taxa de requisições. O sistema implementa rate limiting.

5. **Preview Mode**: Use preview mode para visualizar drafts antes de publicar.

## 🔄 Atualização de Dados

### Conteúdo Estático (Strapi)
- Atualize no Strapi Admin
- Publique as alterações
- As alterações aparecem imediatamente (ou após revalidação)

### Dados Dinâmicos (API Pacto)
- Atualizados automaticamente pela API Pacto
- Não requerem ação no Strapi
- Refletem mudanças em tempo real

## ✅ Checklist de Configuração

- [ ] Strapi está rodando (`cd cms && pnpm dev`)
- [ ] Token de API criado e configurado
- [ ] Seed executado (`cd cms && npm run seed`)
- [ ] Conteúdo publicado no Strapi Admin
- [ ] Imagens adicionadas aos conteúdos
- [ ] Chaves de API do Pacto configuradas nas unidades
- [ ] `PACTO_SECRET_KEY` configurada no `.env.local`
- [ ] Testes realizados (API Strapi e API Pacto)
- [ ] Preview mode testado (se necessário)
- [ ] Webhook de revalidação configurado (se necessário)

## 🎯 Próximos Passos

1. **Configurar produção**: Configure as variáveis de ambiente na Vercel/plataforma de deploy
2. **Adicionar mais conteúdo**: Adicione mais unidades, benefícios, modalidades, etc.
3. **Otimizar imagens**: Otimize as imagens para melhor performance
4. **Configurar webhooks**: Configure webhooks para revalidação automática
5. **Monitorar**: Monitore os logs e erros da API Pacto

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do Strapi
2. Verifique os logs da API Pacto
3. Consulte a documentação relacionada
4. Verifique as variáveis de ambiente
5. Teste as APIs manualmente


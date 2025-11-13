# 🔌 Integração Strapi com APIs Externas

## 📋 Visão Geral

A aplicação Live Academia usa uma combinação de:
- **Strapi CMS**: Conteúdo estático (páginas, textos, imagens, configurações)
- **API Pacto**: Dados dinâmicos (planos, vendas, cupons, simulações, PAR-Q, leads)

## 🔄 Dados que vêm do Strapi

### Conteúdo Estático
- ✅ Homepage (seções, textos, imagens)
- ✅ Páginas (Contato, Day Use, Sobre Nós, Trabalhe Conosco)
- ✅ Unidades (informações básicas, endereço, fotos)
- ✅ Benefícios
- ✅ Modalidades
- ✅ Depoimentos
- ✅ Configurações Globais (SEO, redes sociais, contato)

## 🔄 Dados que vêm da API Pacto

### Dados Dinâmicos
- ⚡ **Planos**: Planos de mensalidade (preços, descrições, features)
  - Endpoint: `/api/pacto-v3/planos/[slug]`
  - Fonte: API Pacto V2/V3
  - **NÃO são gerenciados no Strapi** (são buscados em tempo real da API)

- ⚡ **Vendas**: Processamento de pagamentos
  - Endpoint: `/api/pacto-v3/venda/[slug]`
  - Fonte: API Pacto V3
  - **NÃO são gerenciados no Strapi**

- ⚡ **Cupons**: Validação de cupons de desconto
  - Endpoint: `/api/pacto-v3/cupom/[slug]`
  - Fonte: API Pacto V3
  - **NÃO são gerenciados no Strapi**

- ⚡ **Simulações**: Simulação de vendas
  - Endpoint: `/api/pacto-v3/simular/[slug]/[plano]`
  - Fonte: API Pacto V3
  - **NÃO são gerenciados no Strapi**

- ⚡ **PAR-Q**: Questionário de avaliação física
  - Endpoint: `/api/pacto-v3/parq/[slug]`
  - Fonte: API Pacto V3
  - **NÃO é gerenciado no Strapi**

- ⚡ **Leads**: Cadastro de leads
  - Endpoint: `/api/pacto-v3/lead/[slug]`
  - Fonte: API Pacto V3
  - **NÃO são gerenciados no Strapi**

- ⚡ **Configurações de Vendas**: Configurações da API Pacto
  - Endpoint: `/api/pacto-v3/vendas/configs/[slug]`
  - Fonte: API Pacto V3
  - **NÃO são gerenciadas no Strapi**

## 🔑 Configuração de Chaves de API

### Nas Unidades do Strapi

Cada unidade no Strapi precisa ter os seguintes campos configurados para integração com a API Pacto:

- **codigoUnidade**: Código da unidade na API do Pacto
- **chavePublica**: Chave pública da API do Pacto

### Variáveis de Ambiente

As chaves secretas da API Pacto são configuradas via variáveis de ambiente:

```env
# Chave secreta da API Pacto (usada para todas as unidades)
PACTO_SECRET_KEY=your-secret-key

# Códigos de unidades (opcional, se não estiver no Strapi)
NEXT_PUBLIC_UNIDADE_CENTRO=1
NEXT_PUBLIC_UNIDADE_CIDADE_NOVA=2
# etc...
```

## 📊 Fluxo de Dados

### Homepage
```
Strapi → Homepage (textos, imagens, seções)
API Pacto → Planos (preços dinâmicos)
```

### Página de Planos
```
Strapi → Informações da página (título, descrição)
API Pacto → Lista de planos disponíveis (preços, features)
```

### Página de Unidade
```
Strapi → Informações da unidade (endereço, fotos, descrição)
API Pacto → Planos específicos da unidade (preços, disponibilidade)
```

### Checkout
```
API Pacto → Processamento de pagamento
API Pacto → Validação de cupom
API Pacto → Simulação de venda
API Pacto → PAR-Q (questionário)
API Pacto → Cadastro de lead
```

## 🎯 O que Configurar no Strapi

### 1. Conteúdo Estático
- ✅ Homepage (todas as seções)
- ✅ Páginas (Contato, Day Use, Sobre Nós, Trabalhe Conosco)
- ✅ Unidades (informações básicas)
- ✅ Benefícios
- ✅ Modalidades
- ✅ Depoimentos
- ✅ Configurações Globais

### 2. Chaves de API (nas Unidades)
- ✅ `codigoUnidade`: Código da unidade na API do Pacto
- ✅ `chavePublica`: Chave pública da API do Pacto

### 3. Imagens
- ✅ Upload de imagens no Strapi Admin
- ✅ Associação de imagens aos conteúdos

## ⚠️ O que NÃO Configurar no Strapi

### Dados Dinâmicos da API Pacto
- ❌ Planos (vêm da API Pacto)
- ❌ Preços (vêm da API Pacto)
- ❌ Vendas (processadas pela API Pacto)
- ❌ Cupons (validados pela API Pacto)
- ❌ Simulações (calculadas pela API Pacto)
- ❌ PAR-Q (buscado da API Pacto)
- ❌ Leads (cadastrados na API Pacto)

## 🔧 Configuração de Unidades

### No Strapi Admin

1. Acesse **Content Manager → Unit**
2. Selecione uma unidade
3. Configure os campos:
   - **codigoUnidade**: Código da unidade na API do Pacto (ex: `1`, `2`, `3`)
   - **chavePublica**: Chave pública da API do Pacto (fornecida pela Pacto)

### Exemplo

```
Unidade: Live Academia Centro
- codigoUnidade: 1
- chavePublica: abc123def456...
```

## 📚 Endpoints da API Pacto

### Planos
- `GET /api/pacto-v3/planos/[slug]` - Buscar planos da unidade

### Vendas
- `POST /api/pacto-v3/venda/[slug]` - Processar venda
- `POST /api/pacto-v3/simular/[slug]/[plano]` - Simular venda

### Cupons
- `POST /api/pacto-v3/cupom/[slug]` - Validar cupom

### PAR-Q
- `GET /api/pacto-v3/parq/[slug]` - Buscar questionário
- `POST /api/pacto-v3/parq/[slug]` - Submeter respostas

### Leads
- `POST /api/pacto-v3/lead/[slug]` - Cadastrar lead

### Configurações
- `GET /api/pacto-v3/vendas/configs/[slug]` - Buscar configurações de vendas

## 🐛 Troubleshooting

### Erro: "Chave da unidade não configurada"

**Causa**: O campo `codigoUnidade` ou `chavePublica` não está configurado no Strapi.

**Solução**:
1. Acesse o Strapi Admin
2. Vá em **Content Manager → Unit**
3. Configure `codigoUnidade` e `chavePublica` para cada unidade

### Erro: "Planos não encontrados"

**Causa**: A API do Pacto não está retornando planos.

**Solução**:
1. Verifique se `PACTO_SECRET_KEY` está configurada no `.env.local`
2. Verifique se `codigoUnidade` está correto no Strapi
3. Verifique se a API do Pacto está acessível
4. Verifique os logs: `curl http://localhost:3000/api/pacto-v3/planos/centro`

### Erro: "Unauthorized" na API Pacto

**Causa**: A chave secreta da API Pacto está incorreta.

**Solução**:
1. Verifique se `PACTO_SECRET_KEY` está correta no `.env.local`
2. Verifique se a chave tem permissões para acessar a API
3. Entre em contato com a Pacto para verificar a chave

## 📝 Notas Importantes

1. **Planos são dinâmicos**: Os planos vêm da API do Pacto, não do Strapi. Isso permite que preços e disponibilidade sejam atualizados em tempo real.

2. **Chaves de API**: Cada unidade precisa ter `codigoUnidade` e `chavePublica` configurados no Strapi para que a integração com a API Pacto funcione.

3. **Cache**: As respostas da API Pacto são cacheadas para melhor performance. O cache é invalidado automaticamente após um período determinado.

4. **Rate Limiting**: A API Pacto tem limites de taxa de requisições. O sistema implementa rate limiting para evitar exceder esses limites.

## 🔄 Atualização de Dados

### Conteúdo Estático (Strapi)
- Atualize no Strapi Admin
- Publique as alterações
- As alterações aparecem imediatamente (ou após revalidação)

### Dados Dinâmicos (API Pacto)
- Atualizados automaticamente pela API Pacto
- Não requerem ação no Strapi
- Refletem mudanças em tempo real

## 📚 Referências

- [Documentação da API Pacto](./API-V3-IMPLEMENTATION.md)
- [Guia de Integração Pacto](./INTEGRACAO-PACTO-V3-CHECKOUT.md)
- [Documentação do Strapi](https://docs.strapi.io)


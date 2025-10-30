# Configuração de Conversões GTM - Live Academia

## 📋 Visão Geral

Este documento contém todas as configurações necessárias para implementar conversões personalizadas no Google Tag Manager (GTM) para a Live Academia.

## 🎯 Conversões Principais

### 1. Compra de Plano (Purchase)
**Evento GTM**: `purchase`
**Descrição**: Conversão quando uma compra de plano é finalizada com sucesso

**Parâmetros dataLayer**:
```javascript
{
  event: 'purchase',
  transaction_id: 'TRANS123456',
  value: 119.90,
  currency: 'BRL',
  plano_id: 'tradicional',
  plano_nome: 'Plano Tradicional',
  unidade_id: 'centro',
  payment_method: 'cartao|pix|boleto',
  installments: 1
}
```

### 2. Início do Checkout (Begin Checkout)
**Evento GTM**: `begin_checkout`
**Descrição**: Quando o usuário abre o modal de checkout

**Parâmetros dataLayer**:
```javascript
{
  event: 'begin_checkout',
  value: 119.90,
  currency: 'BRL',
  plano_id: 'tradicional',
  plano_nome: 'Plano Tradicional',
  unidade_id: 'centro'
}
```

### 3. Lead WhatsApp (WhatsApp Lead Submit)
**Evento GTM**: `whatsapp_lead_submit`
**Descrição**: Quando o usuário clica em um botão do WhatsApp

**Parâmetros dataLayer**:
```javascript
{
  event: 'whatsapp_lead_submit',
  lead_type: 'whatsapp',
  lead_source: 'rd_station|website|widget',
  contact_method: 'whatsapp',
  button_text: 'Falar no WhatsApp',
  page_path: '/unidades/centro'
}
```

### 4. Seleção de Plano (Plan Select)
**Evento GTM**: `select_item`
**Descrição**: Quando o usuário clica em "Matricular" em um plano

**Parâmetros dataLayer**:
```javascript
{
  event: 'select_item',
  item_id: 'tradicional',
  item_name: 'Plano Tradicional',
  price: 119.90,
  item_category: 'plano',
  unidade_id: 'centro'
}
```

## 🏷️ Tags do GTM

### 1. Tag Google Analytics 4
**Tipo**: Google Analytics: GA4 Configuration
**Measurement ID**: G-XXXXXXXXXX (usar variável {{GA4 ID}})

### 2. Tag Google Ads Conversion - Purchase
**Tipo**: Google Ads: Google Ads Conversion Tracking
**Conversion ID**: AW-XXXXXXXXX
**Conversion Label**: XXXXXXXXX (para compras)
**Conversion Value**: {{Purchase Value}}
**Trigger**: Custom Event - purchase

### 3. Tag Google Ads Conversion - Lead
**Tipo**: Google Ads: Google Ads Conversion Tracking
**Conversion ID**: AW-XXXXXXXXX
**Conversion Label**: YYYYYYYYY (para leads)
**Trigger**: Custom Event - whatsapp_lead_submit

### 4. Tag Meta Pixel - Purchase
**Tipo**: Custom HTML
**HTML**:
```html
<script>
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Purchase', {
      value: {{Purchase Value}},
      currency: 'BRL',
      content_ids: [{{Plano ID}}],
      content_type: 'product',
      content_name: {{Plano Name}},
      num_items: 1
    });
  }
</script>
```
**Trigger**: Custom Event - purchase

### 5. Tag Meta Pixel - InitiateCheckout
**Tipo**: Custom HTML
**HTML**:
```html
<script>
  if (typeof fbq !== 'undefined') {
    fbq('track', 'InitiateCheckout', {
      value: {{Checkout Value}},
      currency: 'BRL',
      content_ids: [{{Plano ID}}],
      content_type: 'product',
      content_name: {{Plano Name}}
    });
  }
</script>
```
**Trigger**: Custom Event - begin_checkout

### 6. Tag Meta Pixel - Lead
**Tipo**: Custom HTML
**HTML**:
```html
<script>
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Lead', {
      content_name: {{Lead Source}},
      content_category: {{Lead Type}}
    });
  }
</script>
```
**Trigger**: Custom Event - whatsapp_lead_submit

## 📊 Triggers

### 1. Purchase Event
**Tipo**: Custom Event
**Event Name**: purchase

### 2. Begin Checkout Event
**Tipo**: Custom Event
**Event Name**: begin_checkout

### 3. WhatsApp Lead Submit
**Tipo**: Custom Event
**Event Name**: whatsapp_lead_submit

### 4. Plan Select Event
**Tipo**: Custom Event
**Event Name**: select_item

### 5. Page View - Unit Pages
**Tipo**: Page View
**Conditions**: Page Path matches RegEx \/unidades\/.*

## 🔧 Variáveis

### 1. GA4 ID
**Tipo**: Constant
**Value**: G-XXXXXXXXXX

### 2. Meta Pixel ID
**Tipo**: Constant
**Value**: 123456789012345

### 3. Google Ads ID
**Tipo**: Constant
**Value**: AW-XXXXXXXXX

### 4. Purchase Value
**Tipo**: Data Layer Variable
**Data Layer Variable Name**: value

### 5. Plano ID
**Tipo**: Data Layer Variable
**Data Layer Variable Name**: plano_id

### 6. Plano Name
**Tipo**: Data Layer Variable
**Data Layer Variable Name**: plano_nome

### 7. Unidade ID
**Tipo**: Data Layer Variable
**Data Layer Variable Name**: unidade_id

### 8. Transaction ID
**Tipo**: Data Layer Variable
**Data Layer Variable Name**: transaction_id

### 9. Payment Method
**Tipo**: Data Layer Variable
**Data Layer Variable Name**: payment_method

### 10. Lead Source
**Tipo**: Data Layer Variable
**Data Layer Variable Name**: lead_source

### 11. Lead Type
**Tipo**: Data Layer Variable
**Data Layer Variable Name**: lead_type

## 🎛️ Configurações Avançadas

### Enhanced Ecommerce (GA4)
Para rastreamento completo de ecommerce, configurar os seguintes eventos GA4:

1. **view_item** - Visualização de plano individual
2. **add_to_cart** - Seleção de plano
3. **begin_checkout** - Início do checkout
4. **purchase** - Compra finalizada

### Custom Dimensions (GA4)
1. **unidade_id** - ID da unidade onde ocorreu a ação
2. **plano_tipo** - Tipo do plano (tradicional, diamante)
3. **payment_method** - Método de pagamento utilizado
4. **user_type** - Tipo de usuário (new, returning)

### Audience Building
**Audiências para Remarketing**:
1. Usuários que visitaram páginas de unidades
2. Usuários que iniciaram checkout mas não finalizaram
3. Usuários que selecionaram planos específicos
4. Usuários que interagiram com WhatsApp

## 🚀 Implementação

### Passo 1: Criar Container GTM
1. Acesse Google Tag Manager
2. Crie novo container para liveacademia.com.br
3. Copie o GTM ID (GTM-XXXXXXX)

### Passo 2: Configurar Variáveis
1. Criar todas as variáveis listadas acima
2. Configurar valores reais dos IDs

### Passo 3: Criar Triggers
1. Configurar todos os triggers listados
2. Testar com Preview Mode

### Passo 4: Configurar Tags
1. Criar tags para GA4, Google Ads e Meta Pixel
2. Associar aos triggers corretos
3. Configurar parâmetros usando as variáveis

### Passo 5: Teste e Publicação
1. Usar Preview Mode para testar
2. Verificar se eventos estão sendo enviados
3. Publicar versão final

## 🔍 Debugging

### Ferramentas de Teste
1. **GTM Preview Mode**: Para testar tags antes da publicação
2. **GA4 DebugView**: Para verificar eventos em tempo real
3. **Meta Events Manager**: Para verificar eventos do Pixel
4. **Google Ads**: Para verificar conversões

### Verificação de Eventos
```javascript
// No console do navegador
console.log(window.dataLayer);

// Para verificar se eventos estão sendo enviados
window.dataLayer.push({
  event: 'test_event',
  test_value: 'debug'
});
```

## 📈 Relatórios e Análises

### GA4 Reports
1. **Conversions**: Acompanhar compras e leads
2. **Ecommerce**: Análise de funil de vendas
3. **Custom Reports**: Por unidade e tipo de plano

### Google Ads
1. **Conversion Tracking**: ROI das campanhas
2. **Audience Insights**: Perfil dos convertidos

### Meta Ads
1. **Pixel Events**: Performance dos eventos
2. **Custom Audiences**: Remarketing baseado em eventos

## 🎯 Metas de Conversão

### Principais KPIs
1. **Taxa de Conversão**: % de visitantes que compram
2. **Valor Médio por Transação**: Ticket médio
3. **Cost per Acquisition (CPA)**: Custo por conversão
4. **Return on Ad Spend (ROAS)**: Retorno sobre investimento

### Metas por Canal
- **Organic Search**: 3-5% de conversão
- **Google Ads**: 5-8% de conversão
- **Meta Ads**: 2-4% de conversão
- **WhatsApp**: 15-25% de conversão (leads qualificados)

---

**🔄 Atualização**: Este documento deve ser atualizado sempre que novos eventos ou conversões forem implementados.
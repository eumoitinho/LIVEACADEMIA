# 🎯 Guia de Configuração do Analytics - Live Academia

## 📋 Visão Geral

Este guia contém todas as instruções para configurar o sistema de tagueamento completo da Live Academia, incluindo:

- ✅ **Google Analytics 4 (GA4)**
- ✅ **Google Tag Manager (GTM)**
- ✅ **Google Ads Conversion Tracking**
- ✅ **Meta Pixel (Facebook/Instagram)**
- ✅ **Eventos customizados**
- ✅ **Conversões personalizadas**

---

## 🔧 Configuração das Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
# ========================================
# CONFIGURAÇÕES DE ANALYTICS
# ========================================

# Google Analytics 4
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Meta Pixel (Facebook/Instagram)
NEXT_PUBLIC_META_PIXEL_ID=123456789012345

# Google Ads
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_PURCHASE=XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LEAD=YYYYYYYYY

# Ambiente
NEXT_PUBLIC_ENV=prod
```

---

## 📊 1. Configuração do Google Analytics 4

### Passo 1: Criar Propriedade GA4
1. Acesse [Google Analytics](https://analytics.google.com)
2. Crie uma nova propriedade para "Live Academia"
3. Configure para "Web"
4. Copie o **Measurement ID** (formato: `G-XXXXXXXXXX`)

### Passo 2: Configurar Enhanced Ecommerce
1. Em **Admin** → **Data Streams**
2. Selecione seu stream
3. Ative **Enhanced Ecommerce**
4. Configure os seguintes eventos:
   - `purchase`
   - `begin_checkout`
   - `select_item`
   - `generate_lead`

### Passo 3: Configurar Conversões
1. Em **Admin** → **Events**
2. Marque como conversão:
   - `purchase`
   - `generate_lead`
   - `begin_checkout`

---

## 🏷️ 2. Configuração do Google Tag Manager

### Passo 1: Criar Container
1. Acesse [Google Tag Manager](https://tagmanager.google.com)
2. Crie novo container: "Live Academia - Production"
3. Copie o **Container ID** (formato: `GTM-XXXXXXX`)

### Passo 2: Importar Container
1. Use o arquivo `docs/gtm-container-config.json`
2. Em **Admin** → **Import Container**
3. Selecione o arquivo JSON
4. Revise e publique

### Passo 3: Configurar Tags
O container já inclui todas as tags necessárias:
- ✅ **GA4 Configuration**
- ✅ **GA4 Events** (Purchase, Begin Checkout, Select Item)
- ✅ **Google Ads Conversions**
- ✅ **Meta Pixel Events**

---

## 📱 3. Configuração do Meta Pixel

### Passo 1: Criar Pixel
1. Acesse [Facebook Business Manager](https://business.facebook.com)
2. Em **Data Sources** → **Pixels**
3. Crie novo pixel: "Live Academia"
4. Copie o **Pixel ID** (formato: `123456789012345`)

### Passo 2: Configurar Eventos
O sistema já está configurado para enviar:
- ✅ **PageView** (automático)
- ✅ **Purchase** (conversão principal)
- ✅ **Lead** (conversão de lead)
- ✅ **InitiateCheckout** (funil)

### Passo 3: Configurar Conversões
1. Em **Events Manager** → **Custom Conversions**
2. Crie conversões para:
   - **Purchase**: Valor da transação
   - **Lead**: Qualidade do lead

---

## 🎯 4. Configuração do Google Ads

### Passo 1: Criar Conta
1. Acesse [Google Ads](https://ads.google.com)
2. Crie conta para "Live Academia"
3. Copie o **Customer ID** (formato: `AW-XXXXXXXXX`)

### Passo 2: Configurar Conversões
1. Em **Tools & Settings** → **Conversions**
2. Crie conversões:

**Purchase Conversion:**
- Nome: "Purchase - Live Academia"
- Categoria: Purchase
- Valor: Valor da transação
- Contagem: Uma
- Categoria da conversão: Primary

**Lead Conversion:**
- Nome: "Lead - Live Academia"
- Categoria: Lead
- Valor: Não usar valor
- Contagem: Uma
- Categoria da conversão: Secondary

### Passo 3: Obter Labels
1. Após criar as conversões, copie os **Conversion Labels**
2. Adicione ao `.env.local`

---

## 🚀 5. Implementação no Código

### Passo 1: Instalar Dependências
```bash
npm install
# Não são necessárias dependências adicionais
```

### Passo 2: Configurar Layout
O GTM já está integrado no `app/layout.tsx`:
```tsx
<GTM gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'} />
```

### Passo 3: Usar Hook de Analytics
```tsx
import { useAnalytics } from '@/src/hooks/use-analytics'

function MeuComponente() {
  const { trackCTAClick, trackPurchase } = useAnalytics()
  
  const handleClick = () => {
    trackCTAClick('Matricular-se', 'hero_section')
  }
  
  return <button onClick={handleClick}>Matricular-se</button>
}
```

---

## 📈 6. Eventos Implementados

### Eventos de Navegação
- ✅ `page_view` - Visualização de página
- ✅ `scroll_depth` - Profundidade de scroll

### Eventos de Produtos
- ✅ `plan_view` - Visualização de plano
- ✅ `plan_select` - Seleção de plano
- ✅ `plan_compare` - Comparação de planos

### Eventos de Checkout
- ✅ `checkout_start` - Início do checkout
- ✅ `checkout_step_view` - Visualização de etapa
- ✅ `checkout_step_complete` - Etapa concluída
- ✅ `checkout_abandon` - Abandono do checkout

### Eventos de Pagamento
- ✅ `payment_attempt` - Tentativa de pagamento
- ✅ `payment_result` - Resultado do pagamento
- ✅ `pix_qr_generated` - QR Code PIX gerado
- ✅ `boleto_generated` - Boleto gerado
- ✅ `card_token_generated` - Token do cartão

### Eventos de Conversão
- ✅ `purchase` - Compra concluída
- ✅ `lead_submit` - Lead enviado
- ✅ `generate_lead` - Lead gerado

### Eventos de Engajamento
- ✅ `cta_click` - Clique em CTA
- ✅ `video_play` - Reprodução de vídeo
- ✅ `form_start` - Início de formulário
- ✅ `form_complete` - Formulário concluído

---

## 🔍 7. Verificação e Testes

### Teste 1: Google Tag Manager
1. Instale a extensão [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Navegue pelo site
3. Verifique se os eventos estão sendo disparados

### Teste 2: Google Analytics 4
1. Acesse **GA4** → **Reports** → **Realtime**
2. Navegue pelo site
3. Verifique eventos em tempo real

### Teste 3: Meta Pixel
1. Instale a extensão [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Navegue pelo site
3. Verifique se o pixel está disparando

### Teste 4: Google Ads
1. Em **Google Ads** → **Tools** → **Conversions**
2. Verifique se as conversões estão sendo registradas

---

## 📊 8. Dashboards e Relatórios

### Google Analytics 4
Configure os seguintes relatórios:
- **Funil de Conversão**: Checkout → Purchase
- **Abandono de Carrinho**: Begin Checkout vs Purchase
- **Performance de Planos**: Select Item vs Purchase
- **Leads Qualificados**: Lead Submit

### Meta Pixel
Configure os seguintes relatórios:
- **Funil de Conversão**: InitiateCheckout → Purchase
- **Retargeting**: Audiences baseadas em eventos
- **Lookalike Audiences**: Baseadas em conversões

### Google Ads
Configure os seguintes relatórios:
- **Conversões por Campanha**: Purchase e Lead
- **ROAS**: Return on Ad Spend
- **Funil de Conversão**: Impression → Click → Conversion

---

## 🛠️ 9. Manutenção e Monitoramento

### Verificações Diárias
- [ ] Eventos sendo disparados corretamente
- [ ] Conversões sendo registradas
- [ ] Taxa de conversão dentro do esperado

### Verificações Semanais
- [ ] Performance dos funis
- [ ] Qualidade dos dados
- [ ] Novos eventos necessários

### Verificações Mensais
- [ ] Auditoria completa dos eventos
- [ ] Otimização dos funis
- [ ] Análise de conversões

---

## 🚨 10. Troubleshooting

### Problema: Eventos não aparecem no GA4
**Solução:**
1. Verifique se o GTM está publicado
2. Confirme as variáveis de ambiente
3. Teste com Tag Assistant

### Problema: Conversões não são registradas
**Solução:**
1. Verifique se os eventos estão marcados como conversão
2. Confirme os valores dos parâmetros
3. Teste o fluxo completo

### Problema: Meta Pixel não dispara
**Solução:**
1. Verifique se o Pixel ID está correto
2. Confirme se o container GTM está publicado
3. Teste com Pixel Helper

---

## 📞 11. Suporte

Para dúvidas ou problemas:
1. Consulte este guia
2. Verifique os logs do console do navegador
3. Use as ferramentas de debug mencionadas
4. Entre em contato com a equipe técnica

---

## ✅ Checklist de Implementação

- [ ] Variáveis de ambiente configuradas
- [ ] GA4 configurado e testado
- [ ] GTM container importado e publicado
- [ ] Meta Pixel configurado e testado
- [ ] Google Ads conversões configuradas
- [ ] Eventos implementados nos componentes
- [ ] Testes realizados em todas as plataformas
- [ ] Dashboards configurados
- [ ] Monitoramento ativo
- [ ] Equipe treinada no uso

---

**🎉 Parabéns! Seu sistema de analytics está configurado e funcionando perfeitamente!**

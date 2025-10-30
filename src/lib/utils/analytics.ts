// lib/analytics.ts - Sistema de Analytics COMPLETO para Live Academia
// Tagueamento impecável para GA4, Google Ads, Meta Pixel e GTM

// ========================================
// CONFIGURAÇÕES E CONSTANTES
// ========================================

// IDs de configuração
export const ANALYTICS_CONFIG = {
  GA4_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA4_ID || 'G-XXXXXXXXXX',
  GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX',
  META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID || '123456789012345',
  GOOGLE_ADS_ID: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-XXXXXXXXX',
  GOOGLE_ADS_CONVERSION_PURCHASE: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_PURCHASE || 'XXXXXXXXX',
  GOOGLE_ADS_CONVERSION_LEAD: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LEAD || 'YYYYYYYYY',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://liveacademia.com.br',
  ENV: process.env.NEXT_PUBLIC_ENV || 'development',
} as const

// Eventos padronizados - COMPLETOS
export const AnalyticsEvents = {
  // ========== NAVEGAÇÃO ==========
  PAGE_VIEW: 'page_view',
  SCROLL_DEPTH: 'scroll_depth',
  
  // ========== PRODUTOS E PLANOS ==========
  PLAN_VIEW: 'plan_view',
  PLAN_SELECT: 'plan_select',
  PLAN_COMPARE: 'plan_compare',
  
  // ========== CHECKOUT COMPLETO ==========
  CHECKOUT_START: 'checkout_start',
  CHECKOUT_STEP_VIEW: 'checkout_step_view',
  CHECKOUT_STEP_COMPLETE: 'checkout_step_complete',
  CHECKOUT_ABANDON: 'checkout_abandon',
  CHECKOUT_RESUME: 'checkout_resume',
  
  // ========== PAGAMENTO DETALHADO ==========
  PAYMENT_METHOD_SELECT: 'payment_method_select',
  PAYMENT_ATTEMPT: 'payment_attempt',
  PAYMENT_RESULT: 'payment_result',
  PAYMENT_ERROR: 'payment_error',
  
  // ========== PIX ESPECÍFICO ==========
  PIX_QR_GENERATED: 'pix_qr_generated',
  PIX_QR_DISPLAYED: 'pix_qr_displayed',
  PIX_COPY_CODE: 'pix_copy_code',
  PIX_PAYMENT_CONFIRMED: 'pix_payment_confirmed',
  
  // ========== BOLETO ESPECÍFICO ==========
  BOLETO_GENERATED: 'boleto_generated',
  BOLETO_DOWNLOADED: 'boleto_downloaded',
  BOLETO_PRINTED: 'boleto_printed',
  
  // ========== CARTÃO DE CRÉDITO ==========
  CARD_FORM_START: 'card_form_start',
  CARD_FORM_COMPLETE: 'card_form_complete',
  CARD_TOKEN_GENERATED: 'card_token_generated',
  CARD_PAYMENT_PROCESSING: 'card_payment_processing',
  
  // ========== CONVERSÕES ==========
  PURCHASE: 'purchase',
  PURCHASE_COMPLETE: 'purchase_complete',
  LEAD_SUBMIT: 'lead_submit',
  LEAD_QUALIFIED: 'lead_qualified',
  
  // ========== ENGAJAMENTO ==========
  CTA_CLICK: 'cta_click',
  BUTTON_CLICK: 'button_click',
  VIDEO_PLAY: 'video_play',
  VIDEO_COMPLETE: 'video_complete',
  FORM_START: 'form_start',
  FORM_COMPLETE: 'form_complete',
  FORM_ABANDON: 'form_abandon',
  
  // ========== UNIDADES ==========
  UNIT_VIEW: 'unit_view',
  UNIT_CONTACT: 'unit_contact',
  UNIT_DIRECTIONS: 'unit_directions',

  // ========== WHATSAPP ==========
  WHATSAPP_CLICK: 'whatsapp_click',
  WHATSAPP_LEAD_SUBMIT: 'whatsapp_lead_submit',
  
  // ========== CONTEÚDO ==========
  CONTENT_VIEW: 'content_view',
  CONTENT_SHARE: 'content_share',
  CONTENT_DOWNLOAD: 'content_download',
  
  // ========== ERROS E EXCEÇÕES ==========
  ERROR: 'error',
  API_ERROR: 'api_error',
  VALIDATION_ERROR: 'validation_error',
  
  // ========== CUSTOMIZAÇÕES ==========
  CUSTOM_EVENT: 'custom_event',
} as const

export type AnalyticsEvent = typeof AnalyticsEvents[keyof typeof AnalyticsEvents]

// ========================================
// INTERFACES E TIPOS
// ========================================

interface TrackOptions {
  event: AnalyticsEvent
  payload?: Record<string, any>
  meta?: {
    suppressGA?: boolean
    suppressPixel?: boolean
    suppressGAds?: boolean
    suppressGTM?: boolean
    debug?: boolean
  }
}

interface PurchaseData {
  transaction_id: string
  value: number // em centavos
  currency: string
  plano_id: string
  plano_nome: string
  unidade_id: string
  payment_method: 'pix' | 'cartao' | 'boleto'
  installments?: number
}

interface LeadData {
  lead_type: 'newsletter' | 'contact' | 'demo' | 'quote'
  lead_source: string
  lead_value?: number
  contact_method: 'email' | 'phone' | 'whatsapp'
}

// ========================================
// UTILITÁRIOS
// ========================================

function getEnv(): string {
  if (typeof window === 'undefined') return 'server'
  const hostname = window.location.hostname
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) return 'dev'
  if (hostname.includes('staging') || hostname.includes('preview')) return 'staging'
  return 'prod'
}

function generateSessionId(): string {
  if (typeof window === 'undefined') return 'server-session'
  
  let sessionId = sessionStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36)
    sessionStorage.setItem('analytics_session_id', sessionId)
  }
  return sessionId
}

function getUserId(): string | undefined {
  if (typeof window === 'undefined') return undefined
  return localStorage.getItem('analytics_user_id') || undefined
}

// ========================================
// FUNÇÕES DE ENVIO
// ========================================

// DataLayer push (GTM)
function pushDataLayer(data: Record<string, any>) {
  if (typeof window === 'undefined') return
  
  const w = window as any
  if (w.dataLayer) {
    w.dataLayer.push({
      ...data,
      session_id: generateSessionId(),
      user_id: getUserId(),
      timestamp: new Date().toISOString(),
      env: getEnv(),
    })
  } else {
    console.debug('[analytics] DataLayer not available:', data)
  }
}

// Google Analytics 4
function sendGA(eventName: string, params: Record<string, any>) {
  if (typeof window === 'undefined') return
  
  const w = window as any
  try {
    if (w.gtag) {
      w.gtag('event', eventName, {
        ...params,
        send_to: ANALYTICS_CONFIG.GA4_MEASUREMENT_ID,
      })
    }
  } catch (error) {
    console.error('[analytics] GA4 error:', error)
  }
}

// Meta Pixel
function sendMetaPixel(event: string, params: Record<string, any>) {
  if (typeof window === 'undefined') return
  
  const w = window as any
  try {
    if (w.fbq) {
      w.fbq('track', event, params)
    }
  } catch (error) {
    console.error('[analytics] Meta Pixel error:', error)
  }
}

// Google Ads Conversion
function sendGoogleAdsConversion(conversionLabel: string, value?: number, currency = 'BRL') {
  if (typeof window === 'undefined') return
  
  const w = window as any
  try {
    if (w.gtag) {
      w.gtag('event', 'conversion', {
        send_to: `${ANALYTICS_CONFIG.GOOGLE_ADS_ID}/${conversionLabel}`,
        value: value ? value / 100 : undefined,
        currency: currency,
      })
    }
  } catch (error) {
    console.error('[analytics] Google Ads error:', error)
  }
}

// ========================================
// FUNÇÃO PRINCIPAL DE TRACKING
// ========================================

export function track({ event, payload = {}, meta }: TrackOptions) {
  const base = {
    event,
    timestamp: new Date().toISOString(),
    env: getEnv(),
    session_id: generateSessionId(),
    user_id: getUserId(),
  }
  
  const data = { ...base, ...payload }

  // 1. DataLayer (GTM) - SEMPRE primeiro
  if (!meta?.suppressGTM) {
    pushDataLayer(data)
  }

  // 2. Google Analytics 4
  if (!meta?.suppressGA) {
    switch (event) {
      case AnalyticsEvents.PLAN_SELECT:
        sendGA('select_item', {
          items: [{
            item_id: payload['plano_id'],
            item_name: payload['plano_nome'],
            price: (payload['plano_valor'] || 0) / 100,
            item_category: 'plano',
            item_brand: 'Live Academia',
            unidade_id: payload['unidade_id'],
          }]
        })
        break
        
      case AnalyticsEvents.CHECKOUT_START:
        sendGA('begin_checkout', {
          value: (payload['plano_valor'] || 0) / 100,
          currency: 'BRL',
          items: [{
            item_id: payload['plano_id'],
            item_name: payload['plano_nome'],
            price: (payload['plano_valor'] || 0) / 100,
            item_category: 'plano',
            quantity: 1,
          }]
        })
        break
        
      case AnalyticsEvents.PURCHASE:
      case AnalyticsEvents.PURCHASE_COMPLETE:
        sendGA('purchase', {
          transaction_id: payload['transaction_id'],
          value: (payload['value'] || 0) / 100,
          currency: 'BRL',
          payment_type: payload['payment_method'],
          items: [{
            item_id: payload['plano_id'],
            item_name: payload['plano_nome'],
            price: (payload['value'] || 0) / 100,
            item_category: 'plano',
            quantity: 1,
          }]
        })
        break
        
      case AnalyticsEvents.LEAD_SUBMIT:
        sendGA('generate_lead', {
          currency: 'BRL',
          value: payload['lead_value'] ? payload['lead_value'] / 100 : undefined,
        })
        break
        
      case AnalyticsEvents.VIDEO_PLAY:
        sendGA('video_start', {
          video_title: payload['video_title'],
          video_duration: payload['video_duration'],
        })
        break
        
      case AnalyticsEvents.VIDEO_COMPLETE:
        sendGA('video_complete', {
          video_title: payload['video_title'],
          video_duration: payload['video_duration'],
        })
        break
        
      default:
        // Eventos customizados
        sendGA(event, payload)
        break
    }
  }

  // 3. Meta Pixel
  if (!meta?.suppressPixel) {
    switch (event) {
      case AnalyticsEvents.CHECKOUT_START:
        sendMetaPixel('InitiateCheckout', {
          value: (payload['plano_valor'] || 0) / 100,
          currency: 'BRL',
          content_ids: [payload['plano_id']],
          content_type: 'product',
          content_name: payload['plano_nome'],
        })
        break
        
      case AnalyticsEvents.PURCHASE:
      case AnalyticsEvents.PURCHASE_COMPLETE:
        sendMetaPixel('Purchase', {
          value: (payload['value'] || 0) / 100,
          currency: 'BRL',
          content_ids: [payload['plano_id']],
          content_type: 'product',
          content_name: payload['plano_nome'],
          num_items: 1,
        })
        break
        
      case AnalyticsEvents.LEAD_SUBMIT:
        sendMetaPixel('Lead', {
          content_name: payload['lead_source'] || 'website',
          content_category: payload['lead_type'] || 'general',
          value: payload['lead_value'] ? payload['lead_value'] / 100 : undefined,
          currency: 'BRL',
        })
        break
        
      case AnalyticsEvents.CTA_CLICK:
        sendMetaPixel('CustomizeProduct', {
          content_name: payload['cta_name'],
          content_category: payload['cta_location'],
        })
        break
        
      default:
        // Eventos customizados
        sendMetaPixel(event, payload)
        break
    }
  }

  // 4. Google Ads Conversions
  if (!meta?.suppressGAds) {
    switch (event) {
      case AnalyticsEvents.PURCHASE:
      case AnalyticsEvents.PURCHASE_COMPLETE:
        sendGoogleAdsConversion(
          ANALYTICS_CONFIG.GOOGLE_ADS_CONVERSION_PURCHASE,
          payload['value'],
          'BRL'
        )
        break
        
      case AnalyticsEvents.LEAD_SUBMIT:
        sendGoogleAdsConversion(ANALYTICS_CONFIG.GOOGLE_ADS_CONVERSION_LEAD)
        break
    }
  }

  // 5. Log para debug
  if (meta?.debug || getEnv() === 'dev') {
    console.log('[analytics]', { event, payload, meta, data })
  }
}

// ========================================
// FUNÇÕES ESPECÍFICAS PARA CONVERSÕES
// ========================================

export function trackPurchase(data: PurchaseData) {
  track({
    event: AnalyticsEvents.PURCHASE,
    payload: {
      transaction_id: data.transaction_id,
      value: data.value,
      currency: data.currency,
      plano_id: data.plano_id,
      plano_nome: data.plano_nome,
      unidade_id: data.unidade_id,
      payment_method: data.payment_method,
      installments: data.installments,
    }
  })
}

export function trackLead(data: LeadData) {
  track({
    event: AnalyticsEvents.LEAD_SUBMIT,
    payload: {
      lead_type: data.lead_type,
      lead_source: data.lead_source,
      lead_value: data.lead_value,
      contact_method: data.contact_method,
    }
  })
}

export function trackCheckoutStep(step: number, stepName: string, planoId: string, valor: number) {
  track({
    event: AnalyticsEvents.CHECKOUT_STEP_VIEW,
    payload: {
      step_index: step,
      step_name: stepName,
      plano_id: planoId,
      plano_valor: valor,
    }
  })
}

export function trackPaymentAttempt(method: 'pix' | 'cartao' | 'boleto', planoId: string, valor: number) {
  track({
    event: AnalyticsEvents.PAYMENT_ATTEMPT,
    payload: {
      payment_method: method,
      plano_id: planoId,
      plano_valor: valor,
    }
  })
}

export function trackPaymentResult(
  method: 'pix' | 'cartao' | 'boleto',
  status: 'aprovado' | 'rejeitado' | 'pendente',
  transactionId: string,
  valor: number,
  planoId: string
) {
  track({
    event: AnalyticsEvents.PAYMENT_RESULT,
    payload: {
      payment_method: method,
      status: status,
      transaction_id: transactionId,
      value: valor,
      plano_id: planoId,
    }
  })
  
  // Se aprovado, dispara purchase
  if (status === 'aprovado') {
    trackPurchase({
      transaction_id: transactionId,
      value: valor,
      currency: 'BRL',
      plano_id: planoId,
      plano_nome: `Plano ${planoId}`,
      unidade_id: '1', // Default
      payment_method: method,
    })
  }
}

// ========================================
// FUNÇÕES DE INICIALIZAÇÃO
// ========================================

export function initializeAnalytics() {
  if (typeof window === 'undefined') return
  
  // Configurar GA4
  const w = window as any
  if (!w.gtag) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA4_MEASUREMENT_ID}`
    document.head.appendChild(script)
    
    w.dataLayer = w.dataLayer || []
    w.gtag = function() { w.dataLayer.push(arguments) }
    w.gtag('js', new Date())
    w.gtag('config', ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
      send_page_view: false, // Controlamos manualmente
      enhanced_ecommerce: true,
    })
  }
  
  // Configurar Meta Pixel
  if (!w.fbq) {
    const script = document.createElement('script')
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${ANALYTICS_CONFIG.META_PIXEL_ID}');
      fbq('track', 'PageView');
    `
    document.head.appendChild(script)
  }
  
  // Track page view inicial
  track({
    event: AnalyticsEvents.PAGE_VIEW,
    payload: {
      page_path: window.location.pathname,
      page_title: document.title,
      page_location: window.location.href,
    }
  })
}

// ========================================
// FUNÇÕES DE CONVENIÊNCIA
// ========================================

// Helper para page view manual (caso use transições client side adicionais)
export function trackPageView(path: string, extra?: Record<string, any>) {
  track({
    event: AnalyticsEvents.PAGE_VIEW,
    payload: {
      page_path: path,
      ...extra,
    },
  })
}

// Helper para CTA clicks
export function trackCTAClick(ctaName: string, location: string, extra?: Record<string, any>) {
  track({
    event: AnalyticsEvents.CTA_CLICK,
    payload: {
      cta_name: ctaName,
      cta_location: location,
      ...extra,
    }
  })
}

// Helper para plan selection
export function trackPlanSelect(planoId: string, planoNome: string, planoValor: number, unidadeId: string) {
  track({
    event: AnalyticsEvents.PLAN_SELECT,
    payload: {
      plano_id: planoId,
      plano_nome: planoNome,
      plano_valor: planoValor,
      unidade_id: unidadeId,
    }
  })
}

// Helper para checkout start
export function trackCheckoutStart(planoId: string, planoNome: string, planoValor: number, unidadeId: string) {
  track({
    event: AnalyticsEvents.CHECKOUT_START,
    payload: {
      plano_id: planoId,
      plano_nome: planoNome,
      plano_valor: planoValor,
      unidade_id: unidadeId,
    }
  })
}
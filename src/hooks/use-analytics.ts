'use client'

import { useCallback } from 'react'
import { 
  track, 
  trackPurchase, 
  trackLead, 
  trackCheckoutStep, 
  trackPaymentAttempt, 
  trackPaymentResult,
  trackCTAClick,
  trackPlanSelect,
  trackCheckoutStart,
  trackPageView,
  AnalyticsEvents,
  type AnalyticsEvent 
} from '@/src/lib/utils/analytics'

export function useAnalytics() {
  // Função genérica de tracking
  const trackEvent = useCallback((event: AnalyticsEvent, payload?: Record<string, any>, meta?: any) => {
    track({ event, payload, meta })
  }, [])

  // Eventos específicos do checkout
  const trackCheckoutStepEvent = useCallback((step: number, stepName: string, planoId: string, valor: number) => {
    trackCheckoutStep(step, stepName, planoId, valor)
  }, [])

  const trackPaymentAttemptEvent = useCallback((method: 'pix' | 'cartao' | 'boleto', planoId: string, valor: number) => {
    trackPaymentAttempt(method, planoId, valor)
  }, [])

  const trackPaymentResultEvent = useCallback((
    method: 'pix' | 'cartao' | 'boleto',
    status: 'aprovado' | 'rejeitado' | 'pendente',
    transactionId: string,
    valor: number,
    planoId: string
  ) => {
    trackPaymentResult(method, status, transactionId, valor, planoId)
  }, [])

  // Eventos de conversão
  const trackPurchaseEvent = useCallback((data: {
    transaction_id: string
    value: number
    currency: string
    plano_id: string
    plano_nome: string
    unidade_id: string
    payment_method: 'pix' | 'cartao' | 'boleto'
    installments?: number
  }) => {
    trackPurchase(data)
  }, [])

  const trackLeadEvent = useCallback((data: {
    lead_type: 'newsletter' | 'contact' | 'demo' | 'quote'
    lead_source: string
    lead_value?: number
    contact_method: 'email' | 'phone' | 'whatsapp'
  }) => {
    trackLead(data)
  }, [])

  // Eventos de engajamento
  const trackCTAClickEvent = useCallback((ctaName: string, location: string, extra?: Record<string, any>) => {
    trackCTAClick(ctaName, location, extra)
  }, [])

  const trackPlanSelectEvent = useCallback((planoId: string, planoNome: string, planoValor: number, unidadeId: string) => {
    trackPlanSelect(planoId, planoNome, planoValor, unidadeId)
  }, [])

  const trackCheckoutStartEvent = useCallback((planoId: string, planoNome: string, planoValor: number, unidadeId: string) => {
    trackCheckoutStart(planoId, planoNome, planoValor, unidadeId)
  }, [])

  // Page view
  const trackPageViewEvent = useCallback((path: string, extra?: Record<string, any>) => {
    trackPageView(path, extra)
  }, [])

  // Eventos específicos do negócio
  const trackPlanView = useCallback((planoId: string, planoNome: string, valor: number, unidadeId?: string) => {
    trackEvent(AnalyticsEvents.PLAN_VIEW, {
      plano_id: planoId,
      plano_nome: planoNome,
      plano_valor: valor,
      unidade_id: unidadeId,
    })
  }, [trackEvent])

  const trackUnitView = useCallback((unitId: string, unitName: string) => {
    trackEvent(AnalyticsEvents.UNIT_VIEW, {
      unit_id: unitId,
      unit_name: unitName,
    })
  }, [trackEvent])

  const trackVideoPlay = useCallback((videoTitle: string, videoDuration?: number) => {
    trackEvent(AnalyticsEvents.VIDEO_PLAY, {
      video_title: videoTitle,
      video_duration: videoDuration,
    })
  }, [trackEvent])

  const trackFormStart = useCallback((formType: string, formLocation: string) => {
    trackEvent(AnalyticsEvents.FORM_START, {
      form_type: formType,
      form_location: formLocation,
    })
  }, [trackEvent])

  const trackFormComplete = useCallback((formType: string, formLocation: string, success: boolean) => {
    trackEvent(AnalyticsEvents.FORM_COMPLETE, {
      form_type: formType,
      form_location: formLocation,
      success: success,
    })
  }, [trackEvent])

  const trackError = useCallback((errorType: string, errorMessage: string, context?: string) => {
    trackEvent(AnalyticsEvents.ERROR, {
      error_type: errorType,
      error_message: errorMessage,
      error_context: context,
    })
  }, [trackEvent])

  // PIX específicos
  const trackPixQRGenerated = useCallback((transactionId: string, valor: number) => {
    trackEvent(AnalyticsEvents.PIX_QR_GENERATED, {
      transaction_id: transactionId,
      value: valor,
    })
  }, [trackEvent])

  const trackPixQRDisplayed = useCallback((transactionId: string) => {
    trackEvent(AnalyticsEvents.PIX_QR_DISPLAYED, {
      transaction_id: transactionId,
    })
  }, [trackEvent])

  const trackPixCopyCode = useCallback((transactionId: string) => {
    trackEvent(AnalyticsEvents.PIX_COPY_CODE, {
      transaction_id: transactionId,
    })
  }, [trackEvent])

  // Boleto específicos
  const trackBoletoGenerated = useCallback((transactionId: string, valor: number) => {
    trackEvent(AnalyticsEvents.BOLETO_GENERATED, {
      transaction_id: transactionId,
      value: valor,
    })
  }, [trackEvent])

  const trackBoletoDownloaded = useCallback((transactionId: string) => {
    trackEvent(AnalyticsEvents.BOLETO_DOWNLOADED, {
      transaction_id: transactionId,
    })
  }, [trackEvent])

  // Cartão específicos
  const trackCardFormStart = useCallback((transactionId: string) => {
    trackEvent(AnalyticsEvents.CARD_FORM_START, {
      transaction_id: transactionId,
    })
  }, [trackEvent])

  const trackCardTokenGenerated = useCallback((transactionId: string, success: boolean) => {
    trackEvent(AnalyticsEvents.CARD_TOKEN_GENERATED, {
      transaction_id: transactionId,
      success: success,
    })
  }, [trackEvent])

  return {
    // Genéricos
    trackEvent,
    trackPageView: trackPageViewEvent,
    
    // Checkout
    trackCheckoutStep: trackCheckoutStepEvent,
    trackPaymentAttempt: trackPaymentAttemptEvent,
    trackPaymentResult: trackPaymentResultEvent,
    
    // Conversões
    trackPurchase: trackPurchaseEvent,
    trackLead: trackLeadEvent,
    
    // Engajamento
    trackCTAClick: trackCTAClickEvent,
    trackPlanSelect: trackPlanSelectEvent,
    trackCheckoutStart: trackCheckoutStartEvent,
    trackPlanView,
    trackUnitView,
    trackVideoPlay,
    trackFormStart,
    trackFormComplete,
    trackError,
    
    // PIX
    trackPixQRGenerated,
    trackPixQRDisplayed,
    trackPixCopyCode,
    
    // Boleto
    trackBoletoGenerated,
    trackBoletoDownloaded,
    
    // Cartão
    trackCardFormStart,
    trackCardTokenGenerated,
  }
}

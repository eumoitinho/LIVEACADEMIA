// Analytics utilitário centralizado
// Implementa wrapper seguro para dataLayer / gtag / pixel
// Eventos documentados em: docs/analytics-tracking-plan.md

export const AnalyticsEvents = {
  PAGE_VIEW: 'page_view',
  CTA_CLICK: 'cta_click',
  PLAN_VIEW: 'plan_view',
  PLAN_SELECT: 'plan_select',
  CHECKOUT_START: 'checkout_start',
  CHECKOUT_STEP_VIEW: 'checkout_step_view',
  CHECKOUT_ABANDON: 'checkout_abandon',
  PAYMENT_METHOD_SELECT: 'payment_method_select',
  COUPON_VALIDATE: 'coupon_validate',
  PAYMENT_ATTEMPT: 'payment_attempt',
  PAYMENT_RESULT: 'payment_result',
  PIX_QR_GENERATED: 'pix_qr_generated',
  PIX_CONFIRMED: 'pix_confirmed',
  BOLETO_GENERATED: 'boleto_generated',
  BOLETO_PAID: 'boleto_paid',
  PURCHASE: 'purchase',
  LEAD_SUBMIT: 'lead_submit',
  CAROUSEL_INTERACTION: 'carousel_interaction',
  UNIT_VIEW: 'unit_view',
} as const

export type AnalyticsEvent = typeof AnalyticsEvents[keyof typeof AnalyticsEvents]

interface TrackOptions<T extends Record<string, any> = Record<string, any>> {
  event: AnalyticsEvent
  payload?: T
  meta?: {
    debug?: boolean
    suppressPixel?: boolean
    suppressGA?: boolean
  }
}

function getEnv() {
  return process.env.NEXT_PUBLIC_ENV || 'dev'
}

function safeWindow(): any | null {
  if (typeof window === 'undefined') return null
  return window as any
}

function pushDataLayer(data: Record<string, any>) {
  const w = safeWindow()
  if (!w) return
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push(data)
}

function sendGA(event: string, params: Record<string, any>) {
  const w = safeWindow()
  if (!w || !(w as any).gtag) return
  try {
    w.gtag('event', event, params)
  } catch {}
}

function sendMetaPixel(event: string, params: Record<string, any>) {
  const w = safeWindow()
  if (!w || !(w as any).fbq) return
  try {
    w.fbq('trackCustom', event, params)
  } catch {}
}

export function track({ event, payload = {}, meta }: TrackOptions) {
  const base = {
    event,
    timestamp: new Date().toISOString(),
    env: getEnv(),
  }
  const data = { ...base, ...payload }

  // DataLayer sempre primeiro
  pushDataLayer(data)

  // GA4 mapping simplificado (detalhes completos podem ser refinados)
  if (!meta?.suppressGA) {
    switch (event) {
      case AnalyticsEvents.PLAN_SELECT:
        sendGA('select_item', {
          items: [
            {
              item_id: payload['plano_id'],
              item_name: payload['plano_nome'],
              price: (payload['plano_valor'] || 0) / 100,
              unidade_id: payload['unidade_id'],
            },
          ],
        })
        break
      case AnalyticsEvents.CHECKOUT_START:
        sendGA('begin_checkout', {
          value: (payload['plano_valor'] || 0) / 100,
          currency: 'BRL',
          items: [
            {
              item_id: payload['plano_id'],
              price: (payload['plano_valor'] || 0) / 100,
            },
          ],
        })
        break
      case AnalyticsEvents.PURCHASE:
      case AnalyticsEvents.PAYMENT_RESULT:
        if (payload['status'] === 'aprovado' || event === AnalyticsEvents.PURCHASE) {
          sendGA('purchase', {
            transaction_id: payload['transacao_id'] || payload['transaction_id'],
            value: (payload['valor'] || payload['value'] || 0) / 100,
            currency: 'BRL',
            items: [
              {
                item_id: payload['plano_id'] || payload['item_id'],
                price: (payload['valor'] || payload['value'] || 0) / 100,
              },
            ],
          })
        }
        break
      default:
        // Eventos genéricos podem ser adicionados conforme necessidade
        break
    }
  }

  // Meta Pixel básico (custom events)
  if (!meta?.suppressPixel) {
    switch (event) {
      case AnalyticsEvents.CHECKOUT_START:
        sendMetaPixel('InitiateCheckout', {
          value: (payload['plano_valor'] || 0) / 100,
          currency: 'BRL',
          content_ids: [payload['plano_id']],
        })
        break
      case AnalyticsEvents.PAYMENT_RESULT:
        if (payload['status'] === 'aprovado') {
          sendMetaPixel('Purchase', {
            value: (payload['valor'] || 0) / 100,
            currency: 'BRL',
            content_ids: [payload['plano_id']],
          })
        }
        break
      default:
        // Custom genérico
        sendMetaPixel(event, payload)
    }
  }

  if (meta?.debug) {
    // eslint-disable-next-line no-console
    console.debug('[analytics:debug]', data)
  }
}

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

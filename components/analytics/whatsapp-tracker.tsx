'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/hooks/use-analytics'

export default function WhatsAppTracker() {
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // Método 1: Interceptar clicks em links do WhatsApp
    const trackWhatsAppLinks = () => {
      const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"], a[href*="api.whatsapp.com"]')

      whatsappLinks.forEach(link => {
        link.addEventListener('click', (event) => {
          const target = event.target as HTMLElement
          const href = (link as HTMLAnchorElement).href

          trackEvent('whatsapp_click' as any, {
            whatsapp_type: 'link',
            whatsapp_url: href,
            element_text: target.textContent || target.innerText,
            element_class: target.className,
            page_location: window.location.href,
            timestamp: new Date().toISOString()
          })

          // Push to dataLayer for GTM
          if (typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
              event: 'whatsapp_lead_submit',
              lead_type: 'whatsapp',
              lead_source: 'website',
              contact_method: 'whatsapp',
              button_text: target.textContent || target.innerText,
              page_path: window.location.pathname
            })
          }
        })
      })
    }

    // Método 2: Observador de mutação para capturar elementos dinâmicos (RD Station)
    const observeWhatsAppElements = () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element

              // Procurar por elementos do RD Station WhatsApp
              const rdWhatsAppElements = element.querySelectorAll('[data-rd-element="whatsapp"], .rd-whatsapp, [class*="rd-whatsapp"], [id*="rd-whatsapp"]')

              rdWhatsAppElements.forEach(rdElement => {
                rdElement.addEventListener('click', () => {
                  track({
                    event: 'whatsapp_click',
                    payload: {
                      whatsapp_type: 'rd_station',
                      element_id: rdElement.id,
                      element_class: rdElement.className,
                      page_location: window.location.href,
                      timestamp: new Date().toISOString()
                    }
                  })

                  // GTM dataLayer
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      event: 'whatsapp_lead_submit',
                      lead_type: 'whatsapp',
                      lead_source: 'rd_station',
                      contact_method: 'whatsapp',
                      page_path: window.location.pathname
                    })
                  }
                })
              })

              // Também procurar por iframes (caso o RD Station use iframe)
              const iframes = element.querySelectorAll('iframe[src*="rdstation"], iframe[src*="whatsapp"]')
              iframes.forEach(iframe => {
                iframe.addEventListener('load', () => {
                  try {
                    // Tentar acessar o conteúdo do iframe (pode não funcionar por CORS)
                    const iframeDoc = (iframe as HTMLIFrameElement).contentDocument
                    if (iframeDoc) {
                      const whatsappButtons = iframeDoc.querySelectorAll('button, a, [onclick*="whatsapp"]')
                      whatsappButtons.forEach(button => {
                        button.addEventListener('click', () => {
                          track({
                            event: 'whatsapp_click',
                            payload: {
                              whatsapp_type: 'rd_station_iframe',
                              iframe_src: (iframe as HTMLIFrameElement).src,
                              page_location: window.location.href,
                              timestamp: new Date().toISOString()
                            }
                          })
                        })
                      })
                    }
                  } catch (e) {
                    // CORS bloqueado - normal para iframes externos
                    console.debug('Iframe WhatsApp detectado (CORS bloqueado):', iframe.src)
                  }
                })
              })
            }
          })
        })
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })

      return observer
    }

    // Método 3: Interceptar eventos globais do window
    const interceptWindowEvents = () => {
      // Interceptar postMessage (usado por muitos widgets)
      window.addEventListener('message', (event) => {
        if (event.data && typeof event.data === 'object') {
          // Procurar por eventos relacionados ao WhatsApp
          const data = event.data
          if (
            data.type === 'whatsapp' ||
            data.action === 'whatsapp_click' ||
            data.source === 'rd-station' ||
            (typeof data === 'string' && data.includes('whatsapp'))
          ) {
            track({
              event: 'whatsapp_click',
              payload: {
                whatsapp_type: 'postmessage',
                message_data: JSON.stringify(data),
                origin: event.origin,
                page_location: window.location.href,
                timestamp: new Date().toISOString()
              }
            })

            // GTM dataLayer
            if (typeof window !== 'undefined' && (window as any).dataLayer) {
              (window as any).dataLayer.push({
                event: 'whatsapp_lead_submit',
                lead_type: 'whatsapp',
                lead_source: 'widget',
                contact_method: 'whatsapp',
                page_path: window.location.pathname
              })
            }
          }
        }
      })

      // Interceptar clicks em elementos que contenham "whatsapp" no texto ou atributos
      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement
        const elementText = target.textContent?.toLowerCase() || ''
        const elementClass = target.className?.toLowerCase() || ''
        const elementId = target.id?.toLowerCase() || ''

        if (
          elementText.includes('whatsapp') ||
          elementClass.includes('whatsapp') ||
          elementId.includes('whatsapp') ||
          target.closest('[data-rd-element]') ||
          target.closest('[class*="rd-"]')
        ) {
          track({
            event: 'whatsapp_click',
            payload: {
              whatsapp_type: 'generic_element',
              element_text: target.textContent,
              element_class: target.className,
              element_id: target.id,
              page_location: window.location.href,
              timestamp: new Date().toISOString()
            }
          })

          // GTM dataLayer
          if (typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
              event: 'whatsapp_lead_submit',
              lead_type: 'whatsapp',
              lead_source: 'website',
              contact_method: 'whatsapp',
              button_text: target.textContent,
              page_path: window.location.pathname
            })
          }
        }
      })
    }

    // Executar todos os métodos
    trackWhatsAppLinks()
    const observer = observeWhatsAppElements()
    interceptWindowEvents()

    // Cleanup
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [track])

  return null // Este componente não renderiza nada
}

// Hook customizado para uso em componentes específicos
export function useWhatsAppTracking() {
  const { track } = useAnalytics()

  const trackWhatsAppClick = (context: string, extra?: Record<string, any>) => {
    track({
      event: 'whatsapp_click',
      payload: {
        whatsapp_type: 'manual',
        context,
        page_location: window.location.href,
        timestamp: new Date().toISOString(),
        ...extra
      }
    })

    // GTM dataLayer
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'whatsapp_lead_submit',
        lead_type: 'whatsapp',
        lead_source: context,
        contact_method: 'whatsapp',
        page_path: window.location.pathname,
        ...extra
      })
    }
  }

  return { trackWhatsAppClick }
}
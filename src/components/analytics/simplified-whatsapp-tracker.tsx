'use client'

import { useEffect } from 'react'

export default function SimplifiedWhatsAppTracker() {
  useEffect(() => {
    // Método simplificado para capturar cliques em WhatsApp
    const handleWhatsAppClick = (event: Event) => {
      const target = event.target as HTMLElement
      const link = target.closest('a') as HTMLAnchorElement

      if (link && (
        link.href.includes('wa.me') ||
        link.href.includes('whatsapp.com') ||
        link.href.includes('api.whatsapp.com') ||
        target.textContent?.toLowerCase().includes('whatsapp') ||
        target.className?.toLowerCase().includes('whatsapp')
      )) {
        // Push para dataLayer do GTM
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'whatsapp_lead_submit',
            lead_type: 'whatsapp',
            lead_source: 'website',
            contact_method: 'whatsapp',
            button_text: target.textContent || target.innerText,
            page_path: window.location.pathname,
            whatsapp_url: link.href
          })
        }
      }
    }

    // Adicionar listener para cliques
    document.addEventListener('click', handleWhatsAppClick)

    // Observador para elementos dinâmicos (RD Station)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element

            // Elementos do RD Station
            const rdElements = element.querySelectorAll('[data-rd-element], [class*="rd-"], [id*="rd-"]')
            rdElements.forEach(rdElement => {
              rdElement.addEventListener('click', () => {
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
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      document.removeEventListener('click', handleWhatsAppClick)
      observer.disconnect()
    }
  }, [])

  return null
}
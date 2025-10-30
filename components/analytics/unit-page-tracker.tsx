'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/hooks/use-analytics'

interface UnitPageTrackerProps {
  unidadeId: string
  unidadeName: string
  planos?: Array<{
    name: string
    price: string
    codigo?: string
  }>
}

export default function UnitPageTracker({ unidadeId, unidadeName, planos }: UnitPageTrackerProps) {
  const { trackUnitEvent, track } = useAnalytics()

  useEffect(() => {
    // Track unit page view
    trackUnitEvent('unit_page_view', {
      unidade_id: unidadeId,
      unidade_nome: unidadeName,
      has_planos: !!planos && planos.length > 0,
      total_planos: planos?.length || 0
    })

    // Setup scroll tracking
    let scrollDepths = [25, 50, 75, 90]
    let triggeredDepths: number[] = []

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100)

      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !triggeredDepths.includes(depth)) {
          triggeredDepths.push(depth)
          track({
            event: 'scroll_depth',
            payload: {
              scroll_depth: depth,
              unidade_id: unidadeId,
              unidade_nome: unidadeName,
              page_type: 'unit_page'
            }
          })
        }
      })
    }

    // Setup click tracking for unit-specific elements
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const clickedElement = target.closest('[data-track]') || target

      // Track plan selection buttons
      if (clickedElement.matches('[data-plan-id], .plan-button, [data-action="select-plan"]')) {
        const planId = clickedElement.getAttribute('data-plan-id') || clickedElement.textContent
        track({
          event: 'plan_select',
          payload: {
            plano_id: planId,
            unidade_id: unidadeId,
            unidade_nome: unidadeName,
            element_type: 'plan_button',
            click_location: 'unit_page'
          }
        })
      }

      // Track contact buttons
      if (clickedElement.matches('[href*="tel:"], [href*="mailto:"], .contact-button')) {
        const contactType = clickedElement.getAttribute('href')?.startsWith('tel:') ? 'phone' :
                           clickedElement.getAttribute('href')?.startsWith('mailto:') ? 'email' : 'contact'

        trackUnitEvent('unit_contact', {
          contact_type: contactType,
          contact_value: clickedElement.getAttribute('href'),
          button_text: clickedElement.textContent
        })
      }

      // Track directions/map buttons
      if (clickedElement.matches('[href*="maps."], [href*="goo.gl"], .directions-button, .map-button')) {
        trackUnitEvent('unit_directions', {
          map_link: clickedElement.getAttribute('href'),
          button_text: clickedElement.textContent
        })
      }

      // Track WhatsApp buttons specifically for units
      if (clickedElement.matches('[href*="wa.me"], [href*="whatsapp"], .whatsapp-button')) {
        trackUnitEvent('unit_whatsapp', {
          whatsapp_link: clickedElement.getAttribute('href'),
          button_text: clickedElement.textContent
        })
      }

      // Track modal opens
      if (clickedElement.matches('[data-modal], .modal-trigger')) {
        const modalName = clickedElement.getAttribute('data-modal') || 'unknown'
        track({
          event: 'modal_open',
          payload: {
            modal_name: modalName,
            unidade_id: unidadeId,
            trigger_element: clickedElement.textContent,
            page_type: 'unit_page'
          }
        })
      }

      // Track image gallery interactions
      if (clickedElement.matches('.gallery-image, [data-gallery], .image-zoom')) {
        track({
          event: 'image_view',
          payload: {
            image_src: clickedElement.getAttribute('src') || clickedElement.getAttribute('data-src'),
            unidade_id: unidadeId,
            interaction_type: 'gallery_click'
          }
        })
      }
    }

    // Setup video tracking
    const setupVideoTracking = () => {
      const videos = document.querySelectorAll('video')
      videos.forEach(video => {
        video.addEventListener('play', () => {
          track({
            event: 'video_play',
            payload: {
              video_src: video.src,
              video_duration: video.duration,
              unidade_id: unidadeId,
              page_type: 'unit_page'
            }
          })
        })

        video.addEventListener('ended', () => {
          track({
            event: 'video_complete',
            payload: {
              video_src: video.src,
              video_duration: video.duration,
              unidade_id: unidadeId,
              page_type: 'unit_page'
            }
          })
        })
      })
    }

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClick)
    setupVideoTracking()

    // Track time on page
    const startTime = Date.now()
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      track({
        event: 'time_on_page',
        payload: {
          time_spent_seconds: timeSpent,
          unidade_id: unidadeId,
          page_type: 'unit_page'
        }
      })
    }

    // Track time spent every 30 seconds and on page unload
    const timeInterval = setInterval(() => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      if (timeSpent % 30 === 0) { // Every 30 seconds
        track({
          event: 'engagement_milestone',
          payload: {
            time_spent_seconds: timeSpent,
            unidade_id: unidadeId,
            page_type: 'unit_page'
          }
        })
      }
    }, 1000)

    window.addEventListener('beforeunload', trackTimeOnPage)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick)
      window.removeEventListener('beforeunload', trackTimeOnPage)
      clearInterval(timeInterval)
    }
  }, [unidadeId, unidadeName, planos, trackUnitEvent, track])

  return null // Este componente não renderiza nada
}
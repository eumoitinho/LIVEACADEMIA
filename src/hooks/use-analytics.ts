'use client'

import { useCallback } from 'react'
import { usePathname } from 'next/navigation'
import {
  track,
  trackPlanSelect,
  trackCheckoutStart,
  trackCTAClick,
  trackPageView,
  AnalyticsEvents
} from '@/lib/utils/analytics'

export function useAnalytics() {
  const pathname = usePathname()

  // Track page view
  const trackPage = useCallback((customPath?: string, extra?: Record<string, any>) => {
    trackPageView(customPath || pathname, {
      page_title: document.title,
      page_location: window.location.href,
      ...extra
    })
  }, [pathname])

  // Track plan selection with unit context
  const trackPlan = useCallback((
    planoId: string,
    planoNome: string,
    planoValor: number,
    unidadeId?: string,
    extra?: Record<string, any>
  ) => {
    const unitId = unidadeId || extractUnitFromPath(pathname) || 'homepage'
    trackPlanSelect(planoId, planoNome, planoValor, unitId)

    // Track additional context
    if (extra) {
      track({
        event: AnalyticsEvents.CUSTOM_EVENT,
        payload: {
          custom_event: 'plan_select_extended',
          plano_id: planoId,
          plano_nome: planoNome,
          plano_valor: planoValor,
          unidade_id: unitId,
          page_location: pathname,
          ...extra
        }
      })
    }
  }, [pathname])

  // Track checkout start with enhanced context
  const trackCheckout = useCallback((
    planoId: string,
    planoNome: string,
    planoValor: number,
    unidadeId?: string
  ) => {
    const unitId = unidadeId || extractUnitFromPath(pathname) || 'homepage'
    trackCheckoutStart(planoId, planoNome, planoValor, unitId)
  }, [pathname])

  // Track CTA clicks with automatic location detection
  const trackCTA = useCallback((ctaName: string, extra?: Record<string, any>) => {
    const location = determinePageLocation(pathname)
    trackCTAClick(ctaName, location, {
      page_path: pathname,
      unidade_id: extractUnitFromPath(pathname),
      ...extra
    })
  }, [pathname])

  // Track unit-specific events
  const trackUnitEvent = useCallback((eventType: string, extra?: Record<string, any>) => {
    const unidadeId = extractUnitFromPath(pathname)

    if (!unidadeId) return

    track({
      event: AnalyticsEvents.UNIT_VIEW,
      payload: {
        unidade_id: unidadeId,
        event_type: eventType,
        page_path: pathname,
        ...extra
      }
    })
  }, [pathname])

  // Track modal events
  const trackModal = useCallback((modalName: string, action: 'open' | 'close' | 'step', extra?: Record<string, any>) => {
    track({
      event: AnalyticsEvents.CUSTOM_EVENT,
      payload: {
        custom_event: 'modal_interaction',
        modal_name: modalName,
        modal_action: action,
        page_path: pathname,
        unidade_id: extractUnitFromPath(pathname),
        ...extra
      }
    })
  }, [pathname])

  // Track form interactions
  const trackForm = useCallback((
    formName: string,
    action: 'start' | 'complete' | 'abandon' | 'error',
    extra?: Record<string, any>
  ) => {
    const eventMap = {
      start: AnalyticsEvents.FORM_START,
      complete: AnalyticsEvents.FORM_COMPLETE,
      abandon: AnalyticsEvents.FORM_ABANDON,
      error: AnalyticsEvents.ERROR
    }

    track({
      event: eventMap[action],
      payload: {
        form_name: formName,
        page_path: pathname,
        unidade_id: extractUnitFromPath(pathname),
        ...extra
      }
    })
  }, [pathname])

  // Track scroll depth
  const trackScroll = useCallback((depth: number) => {
    track({
      event: AnalyticsEvents.SCROLL_DEPTH,
      payload: {
        scroll_depth: depth,
        page_path: pathname,
        unidade_id: extractUnitFromPath(pathname)
      }
    })
  }, [pathname])

  // Track video interactions
  const trackVideo = useCallback((
    action: 'play' | 'complete' | 'pause',
    videoTitle: string,
    duration?: number,
    currentTime?: number
  ) => {
    const eventMap = {
      play: AnalyticsEvents.VIDEO_PLAY,
      complete: AnalyticsEvents.VIDEO_COMPLETE,
      pause: AnalyticsEvents.CUSTOM_EVENT
    }

    track({
      event: eventMap[action],
      payload: {
        video_title: videoTitle,
        video_duration: duration,
        video_current_time: currentTime,
        page_path: pathname,
        unidade_id: extractUnitFromPath(pathname),
        ...(action === 'pause' && { custom_event: 'video_pause' })
      }
    })
  }, [pathname])

  // Track user engagement
  const trackEngagement = useCallback((
    engagementType: string,
    value?: number,
    extra?: Record<string, any>
  ) => {
    track({
      event: AnalyticsEvents.CUSTOM_EVENT,
      payload: {
        custom_event: 'user_engagement',
        engagement_type: engagementType,
        engagement_value: value,
        page_path: pathname,
        unidade_id: extractUnitFromPath(pathname),
        ...extra
      }
    })
  }, [pathname])

  return {
    trackPage,
    trackPageView: trackPage, // Alias for compatibility
    trackPlan,
    trackCheckout,
    trackCTA,
    trackUnitEvent,
    trackModal,
    trackForm,
    trackScroll,
    trackVideo,
    trackEngagement,
    trackEvent: track, // Alias for compatibility
    // Direct access to track function for custom events
    track
  }
}

// Helper functions
function extractUnitFromPath(pathname: string): string | null {
  const match = pathname.match(/\/unidades\/([^/]+)/)
  return match ? match[1] : null
}

function determinePageLocation(pathname: string): string {
  if (pathname === '/') return 'homepage'
  if (pathname.startsWith('/unidades/')) {
    const unitId = extractUnitFromPath(pathname)
    return unitId ? `unidade_${unitId}` : 'unidades_list'
  }
  if (pathname.startsWith('/planos')) return 'planos'
  if (pathname.startsWith('/aulas')) return 'aulas'
  if (pathname.startsWith('/sobre')) return 'sobre'
  if (pathname.startsWith('/contato')) return 'contato'
  return pathname.replace(/^\//, '').replace(/\//g, '_') || 'unknown'
}
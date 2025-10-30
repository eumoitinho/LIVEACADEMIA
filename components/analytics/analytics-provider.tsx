'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initializeAnalytics } from '@/src/lib/utils/analytics'
import { useAnalytics } from '@/hooks/use-analytics'
import SimplifiedWhatsAppTracker from './simplified-whatsapp-tracker'

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { trackPageView } = useAnalytics()

  // Initialize analytics on mount
  useEffect(() => {
    initializeAnalytics()
  }, [])

  // Track page views on route changes
  useEffect(() => {
    // Wait a bit for the page to fully load
    const timer = setTimeout(() => {
      trackPageView(pathname, {
        search_params: searchParams.toString(),
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname, searchParams, trackPageView])

  return (
    <>
      {children}
      <SimplifiedWhatsAppTracker />
    </>
  )
}
import { ANALYTICS_CONFIG } from '@/src/lib/utils/analytics'

export default function GTMNoScript() {
  const gtmId = ANALYTICS_CONFIG.GTM_ID

  if (!gtmId || gtmId === 'GTM-XXXXXXX' || ANALYTICS_CONFIG.ENV === 'development') {
    return null
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      ></iframe>
    </noscript>
  )
}
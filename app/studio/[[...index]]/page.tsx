// Rota embutida do Sanity Studio (/studio)
// Deploy: basta fazer o deploy normal do Next.js (Vercel, etc.) e acessar /studio
// Esta página não deve ser indexada por motores de busca.

import dynamic from 'next/dynamic'

export const revalidate = 0
// avoid naming conflict with `next/dynamic` import
export const forceDynamic = 'force-dynamic'

export const metadata = {
  title: 'Studio | LIVE Academia',
  robots: { index: false, follow: false },
}

// Dynamically load the client-only Studio wrapper with SSR disabled.
const StudioClient = dynamic(() => import('./StudioClient'), { ssr: false })

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* StudioClient is a client component that renders NextStudio; loaded only on the client. */}
      <StudioClient />
    </div>
  )
}

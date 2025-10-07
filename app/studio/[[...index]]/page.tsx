// Rota embutida do Sanity Studio (/studio)
// Deploy: basta fazer o deploy normal do Next.js (Vercel, etc.) e acessar /studio
// Esta página não deve ser indexada por motores de busca.

// Import the client component directly. Next will automatically treat it as a client
// component because `StudioClient.tsx` contains `"use client"`.
import StudioClient from './StudioClient'

export const revalidate = 0
// avoid naming conflict with `next/dynamic` import
export const forceDynamic = 'force-dynamic'

export const metadata = {
  title: 'Studio | LIVE Academia',
  robots: { index: false, follow: false },
}

// StudioClient is a client component that renders NextStudio; imported directly
// so Next will render it on the client.

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* StudioClient is a client component that renders NextStudio; loaded only on the client. */}
      <StudioClient />
    </div>
  )
}

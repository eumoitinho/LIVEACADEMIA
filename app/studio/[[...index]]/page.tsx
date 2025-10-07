// Rota embutida do Sanity Studio (/studio)
// Deploy: basta fazer o deploy normal do Next.js (Vercel, etc.) e acessar /studio
// Esta página não deve ser indexada por motores de busca.

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity/config'
import React from 'react'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Studio | LIVE Academia',
  robots: { index: false, follow: false },
}

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <NextStudio config={config} />
    </div>
  )
}

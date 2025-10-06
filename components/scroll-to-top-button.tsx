"use client"

import { ArrowUp } from "lucide-react"

export default function ScrollToTopButton() {
  return (
    <button
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }}
      className="hover:text-white transition inline-flex items-center gap-1"
      aria-label="Voltar ao topo"
      type="button"
    >
      <ArrowUp className="w-4 h-4" /> Voltar ao topo
    </button>
  )
}

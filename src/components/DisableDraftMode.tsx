"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { disableDraftMode } from "@/app/actions"
import { useDraftModeEnvironment } from "next-sanity/hooks"

export function DisableDraftMode() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const environment = useDraftModeEnvironment()

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== "live" && environment !== "unknown") {
    return null
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode()
      router.refresh()
    })

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {pending ? (
        <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg">
          Desabilitando modo de rascunho...
        </div>
      ) : (
        <button
          type="button"
          onClick={disable}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg shadow-lg font-medium transition-colors"
        >
          Desabilitar Modo de Rascunho
        </button>
      )}
    </div>
  )
}

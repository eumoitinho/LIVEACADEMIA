"use client"

import { usePathname } from "next/navigation"
import Header from "./header"

/**
 * Header condicional que não aparece no /studio
 */
export default function ConditionalHeader() {
  const pathname = usePathname()
  
  // Não mostrar header no /studio
  if (pathname?.startsWith('/studio')) {
    return null
  }
  
  return <Header />
}


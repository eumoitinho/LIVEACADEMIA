"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface UnitContextType {
  currentUnit: {
    name: string
    logo: string
  } | null
  setCurrentUnit: (unit: { name: string; logo: string } | null) => void
}

const UnitContext = createContext<UnitContextType | undefined>(undefined)

export function UnitProvider({ children }: { children: ReactNode }) {
  const [currentUnit, setCurrentUnit] = useState<{ name: string; logo: string } | null>(null)

  return (
    <UnitContext.Provider value={{ currentUnit, setCurrentUnit }}>
      {children}
    </UnitContext.Provider>
  )
}

export function useUnit() {
  const context = useContext(UnitContext)
  if (context === undefined) {
    throw new Error('useUnit must be used within a UnitProvider')
  }
  return context
}
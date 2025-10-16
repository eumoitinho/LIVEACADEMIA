'use client'

import { ThemeProvider as CustomThemeProvider } from '@/src/hooks/use-theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <CustomThemeProvider>{children}</CustomThemeProvider>
}
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Verificar se há tema salvo no localStorage
    const savedTheme = localStorage.getItem('live-academia-theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Verificar preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      // Salvar tema no localStorage
      localStorage.setItem('live-academia-theme', theme)
      
      // Aplicar classe ao documento
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(theme)
      
      // Atualizar CSS custom properties
      const root = document.documentElement
      
      if (theme === 'light') {
        root.style.setProperty('--background', '0 0% 100%') // #ffffff
        root.style.setProperty('--foreground', '0 0% 10%') // #1a1a1a
        root.style.setProperty('--card', '0 0% 98%') // #fafafa
        root.style.setProperty('--card-foreground', '0 0% 29%') // #4a4a4a
        root.style.setProperty('--popover', '0 0% 100%') // #ffffff
        root.style.setProperty('--popover-foreground', '0 0% 10%') // #1a1a1a
        root.style.setProperty('--primary', '51 100% 50%') // #ffcb00
        root.style.setProperty('--primary-foreground', '0 0% 10%') // #1a1a1a
        root.style.setProperty('--secondary', '0 0% 96%') // #f5f5f5
        root.style.setProperty('--secondary-foreground', '0 0% 29%') // #4a4a4a
        root.style.setProperty('--muted', '0 0% 96%') // #f5f5f5
        root.style.setProperty('--muted-foreground', '0 0% 43%') // #6b7280
        root.style.setProperty('--accent', '51 100% 70%') // #ffd740
        root.style.setProperty('--accent-foreground', '0 0% 10%') // #1a1a1a
        root.style.setProperty('--destructive', '0 84% 60%') // #ef4444
        root.style.setProperty('--destructive-foreground', '0 0% 98%') // #fafafa
        root.style.setProperty('--border', '0 0% 90%') // #e5e7eb
        root.style.setProperty('--input', '0 0% 90%') // #e5e7eb
        root.style.setProperty('--ring', '51 100% 50%') // #ffcb00
      } else {
        root.style.setProperty('--background', '0 0% 4%') // #0a0a0a
        root.style.setProperty('--foreground', '0 0% 100%') // #fefefe
        root.style.setProperty('--card', '0 0% 9%') // #161616
        root.style.setProperty('--card-foreground', '0 0% 80%') // rgba(254, 254, 254, 0.8)
        root.style.setProperty('--popover', '0 0% 9%') // #161616
        root.style.setProperty('--popover-foreground', '0 0% 100%') // #fefefe
        root.style.setProperty('--primary', '51 100% 50%') // #ffcb00
        root.style.setProperty('--primary-foreground', '0 0% 4%') // #0a0a0a
        root.style.setProperty('--secondary', '0 0% 12%') // #1f1f1f
        root.style.setProperty('--secondary-foreground', '0 0% 80%') // rgba(254, 254, 254, 0.8)
        root.style.setProperty('--muted', '0 0% 12%') // #1f1f1f
        root.style.setProperty('--muted-foreground', '0 0% 63%') // #9ca3af
        root.style.setProperty('--accent', '51 100% 70%') // #ffd740
        root.style.setProperty('--accent-foreground', '0 0% 4%') // #0a0a0a
        root.style.setProperty('--destructive', '0 84% 60%') // #ef4444
        root.style.setProperty('--destructive-foreground', '0 0% 100%') // #fefefe
        root.style.setProperty('--border', '0 0% 22%') // #374151
        root.style.setProperty('--input', '0 0% 22%') // #374151
        root.style.setProperty('--ring', '51 100% 50%') // #ffcb00
      }
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Evitar hidratação incorreta
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

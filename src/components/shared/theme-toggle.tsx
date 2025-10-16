'use client'

import { useTheme } from '@/src/hooks/use-theme'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full border border-live-border bg-live-bgSecondary hover:bg-live-bgTertiary transition-all duration-200"
      aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      <div className="relative h-5 w-5">
        <Sun 
          className={`absolute h-5 w-5 transition-all duration-300 ${
            theme === 'light' 
              ? 'rotate-0 scale-100 text-live-yellow' 
              : 'rotate-90 scale-0 text-live-yellowLight'
          }`}
        />
        <Moon 
          className={`absolute h-5 w-5 transition-all duration-300 ${
            theme === 'dark' 
              ? 'rotate-0 scale-100 text-live-yellow' 
              : '-rotate-90 scale-0 text-live-yellowLight'
          }`}
        />
      </div>
      
      {/* Efeito de brilho */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-live-yellow/20 to-live-yellowAccent/20 opacity-0 hover:opacity-100 transition-opacity duration-200" />
    </Button>
  )
}

export function ThemeToggleWithLabel() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-live-border bg-live-bgSecondary hover:bg-live-bgTertiary transition-all duration-200"
      aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      <div className="relative h-5 w-5">
        <Sun 
          className={`absolute h-5 w-5 transition-all duration-300 ${
            theme === 'light' 
              ? 'rotate-0 scale-100 text-live-yellow' 
              : 'rotate-90 scale-0 text-live-yellowLight'
          }`}
        />
        <Moon 
          className={`absolute h-5 w-5 transition-all duration-300 ${
            theme === 'dark' 
              ? 'rotate-0 scale-100 text-live-yellow' 
              : '-rotate-90 scale-0 text-live-yellowLight'
          }`}
        />
      </div>
      
      <span className="text-sm font-medium text-live-textPrimary">
        {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
      </span>
      
      {/* Efeito de brilho */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-live-yellow/10 to-live-yellowAccent/10 opacity-0 hover:opacity-100 transition-opacity duration-200" />
    </Button>
  )
}

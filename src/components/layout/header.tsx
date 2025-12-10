"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import LiveLogo from "@/components/shared/live-logo"
import { useUnit } from "@/contexts/unit-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentUnit } = useUnit()

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-md shadow-2xl">
        <div className="lg:px-8 max-w-7xl mx-auto px-6">
          <div className="flex pt-5 pb-5 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center justify-center">
            <LiveLogo className="h-8 w-auto brightness-0 invert" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/sobre-nos" className="hover:text-white/90 transition text-sm font-normal text-white/80">
              Sobre
            </Link>
            <Link
              href="/#beneficios"
              className="hover:text-white/90 transition text-sm font-normal text-white/80"
            >
              Benefícios
            </Link>
            <Link href="/unidades" className="hover:text-white/90 transition text-sm font-normal text-white/80">
              Unidades
            </Link>
            <Link href="/aulas-coletivas" className="hover:text-white/90 transition text-sm font-normal text-white/80">
              Aulas Coletivas
            </Link>
            <Link href="/day-use" className="hover:text-white/90 transition text-sm font-normal text-white/80">
              Day Use
            </Link>
            <Link href="/planos" className="hover:text-white/90 transition text-sm font-normal text-white/80">
              Planos
            </Link>
            <Link
              href="/planos"
              className="inline-flex gap-2 transition hover:from-amber-200 hover:to-amber-300 hover:shadow-[0_8px_20px_rgba(251,191,36,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-sm font-bold text-black bg-gradient-to-b from-amber-300 to-amber-400 rounded-full pt-2.5 pr-5 pb-2.5 pl-5 shadow-[0_4px_12px_rgba(251,191,36,0.3)] items-center"
            >
              Matricule-se
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            id="mobile-menu-button" 
            className="lg:hidden inline-flex transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 text-sm font-normal text-white/90 bg-white/10 border-white/10 border rounded-full pt-2 pr-4 pb-2 pl-4 backdrop-blur gap-x-2 gap-y-2 items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
            <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Navigation Menu - Outside header for proper positioning */}
    {isMenuOpen && (
      <div className="lg:hidden fixed inset-0 bg-black/98 backdrop-blur-xl z-[100] transition-all duration-300 ease-out">
        <div className="flex flex-col h-full pt-6 pb-8 px-6 overflow-y-auto">
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button 
                  className="inline-flex transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 text-sm font-normal text-white/90 bg-white/10 border-white/10 border rounded-full pt-3 pr-3 pb-3 pl-3 backdrop-blur"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <nav className="flex-1">
                <div className="space-y-6">
                  <Link 
                    href="/sobre-nos" 
                    className="block hover:text-white transition text-2xl font-normal text-white/80"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sobre
                  </Link>
                  <Link
                    href="/#beneficios"
                    className="block hover:text-white transition text-2xl font-normal text-white/80"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Benefícios
                  </Link>
                  <Link 
                    href="/unidades" 
                    className="block hover:text-white transition text-2xl font-normal text-white/80"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Unidades
                  </Link>
                  <Link 
                    href="/aulas-coletivas" 
                    className="block hover:text-white transition text-2xl font-normal text-white/80"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Aulas Coletivas
                  </Link>
                  <Link 
                    href="/day-use" 
                    className="block hover:text-white transition text-2xl font-normal text-white/80"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Day Use
                  </Link>
                  <Link
                    href="/planos"
                    className="block hover:text-white transition text-2xl font-normal text-white/80"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Planos
                  </Link>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10">
                  <Link
                    href="/planos"
                    className="w-full inline-flex gap-2 transition hover:from-amber-200 hover:to-amber-300 hover:shadow-[0_8px_20px_rgba(251,191,36,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-base font-bold text-black bg-gradient-to-b from-amber-300 to-amber-400 rounded-full pt-4 pr-6 pb-4 pl-6 shadow-[0_4px_12px_rgba(251,191,36,0.3)] items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Matricule-se Agora
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </>
    )
  }
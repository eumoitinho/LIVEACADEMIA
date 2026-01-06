"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const logoUrl = "/studio/logolivestudio.png"

export default function StudioHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/live-studio" className="flex items-center gap-2">
            <img src={logoUrl} alt="LIVE STUDIO" className="h-8 md:h-10 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="#beneficios"
              className="text-white/70 hover:text-yellow-400 transition-colors text-sm font-medium tracking-wide uppercase"
            >
              Benefícios
            </Link>
            <Link
              href="#faq"
              className="text-white/70 hover:text-yellow-400 transition-colors text-sm font-medium tracking-wide uppercase"
            >
              FAQ
            </Link>
            <Link
              href="#planos"
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] shadow-[0_0_10px_rgba(250,204,21,0.2)]"
            >
              Comprar Créditos
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-8 w-8" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] flex flex-col p-6 animate-in slide-in-from-right duration-300">
          <div className="flex justify-end mb-12">
            <button
              className="p-2 text-white/50 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          <nav className="flex flex-col gap-8 items-center text-center">
            <Link
              href="#beneficios"
              className="text-2xl font-medium text-white hover:text-yellow-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Benefícios
            </Link>
            <Link
              href="#faq"
              className="text-2xl font-medium text-white hover:text-yellow-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="pt-8 w-full max-w-xs">
              <Link
                href="#planos"
                className="flex items-center justify-center w-full bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wide transition-all shadow-lg shadow-yellow-400/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Comprar Créditos
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

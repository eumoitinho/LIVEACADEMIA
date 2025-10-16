"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import LiveLogo from "@/components/shared/live-logo"
import { useUnit } from "@/contexts/unit-context"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { currentUnit } = useUnit()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Detect active section for navigation highlighting
      const sections = ["sobre", "beneficios", "planos", "contato"]
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      setActiveSection(current || "")
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const smoothScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const isActiveSection = (section: string) => activeSection === section

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-5 lg:px-20 py-3 transition-all duration-500">
      <div
        className={`max-w-[1000px] mx-auto p-4 backdrop-blur-xl rounded-3xl shadow-2xl border flex justify-between items-center transition-all duration-500 ${
          isScrolled 
            ? "bg-black/80 border-zinc-800/50 shadow-black/20" 
            : "bg-black/20 border-zinc-800/20 shadow-black/10"
        }`}
      >
        {/* Left Side - Logo + Navigation */}
        <div className="flex justify-start items-center gap-9">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex flex-col items-center gap-1">
                <LiveLogo className={`h-8 w-auto transition-all duration-500 ${isScrolled ? "" : "brightness-0 invert"}`} />
                {currentUnit && (
                  <span className={`text-xs font-semibold transition-all duration-500 ${
                    isScrolled ? "text-white" : "text-white"
                  }`}>
                    {currentUnit.name}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-start items-start gap-4">
            <button
              onClick={() => smoothScrollTo("sobre")}
              className={`px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? `${isActiveSection("sobre") ? "text-white bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-500/30" : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"}`
                  : `${isActiveSection("sobre") ? "text-white bg-gradient-to-r from-yellow-400/30 to-amber-500/30 border border-yellow-500/50" : "text-zinc-300 hover:text-white hover:bg-white/10"}`
              }`}
            >
              <div className="text-xs font-medium">Sobre Nós</div>
            </button>

            <button
              onClick={() => smoothScrollTo("beneficios")}
              className={`px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? `${isActiveSection("beneficios") ? "text-white bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-500/30" : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"}`
                  : `${isActiveSection("beneficios") ? "text-white bg-gradient-to-r from-yellow-400/30 to-amber-500/30 border border-yellow-500/50" : "text-zinc-300 hover:text-white hover:bg-white/10"}`
              }`}
            >
              <div className="text-xs font-medium">Benefícios</div>
            </button>

            <Link
              href="/unidades"
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                isScrolled ? "text-zinc-300 hover:text-white hover:bg-zinc-800/50" : "text-zinc-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="text-xs font-medium">Unidades</div>
            </Link>

            <Link
              href="/aulas-coletivas"
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                isScrolled ? "text-zinc-300 hover:text-white hover:bg-zinc-800/50" : "text-zinc-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="text-xs font-medium">Aulas Coletivas</div>
            </Link>

            <button
              onClick={() => smoothScrollTo("planos")}
              className={`px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? `${isActiveSection("planos") ? "text-white bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-500/30" : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"}`
                  : `${isActiveSection("planos") ? "text-white bg-gradient-to-r from-yellow-400/30 to-amber-500/30 border border-yellow-500/50" : "text-zinc-300 hover:text-white hover:bg-white/10"}`
              }`}
            >
              <div className="text-xs font-medium">Planos</div>
            </button>

            <button
              onClick={() => smoothScrollTo("contato")}
              className={`px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? `${isActiveSection("contato") ? "text-white bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-500/30" : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"}`
                  : `${isActiveSection("contato") ? "text-white bg-gradient-to-r from-yellow-400/30 to-amber-500/30 border border-yellow-500/50" : "text-zinc-300 hover:text-white hover:bg-white/10"}`
              }`}
            >
              <div className="text-xs font-medium">Contato</div>
            </button>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="hidden lg:flex justify-start items-center gap-4">
          {/* Phone */}
          <Link
            href="tel:+5592999999999"
            className={`px-4 py-2 rounded-xl transition-all duration-300 ${
              isScrolled ? "text-zinc-300 hover:text-white hover:bg-zinc-800/50" : "text-zinc-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <div className="text-xs font-medium">(92) 99999-9999</div>
          </Link>

          {/* Matricule-se Button */}
          <Link
            href="/planos"
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 rounded-2xl border border-yellow-500/30 flex justify-center items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
          >
            <div className="text-black text-xs font-semibold">Matricule-se</div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden transition-colors duration-300 ${isScrolled ? "text-zinc-300 hover:text-white" : "text-zinc-300 hover:text-white"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          className={`lg:hidden mt-3 max-w-[1000px] mx-auto p-6 backdrop-blur-xl rounded-3xl shadow-2xl border animate-in slide-in-from-top duration-300 ${
            isScrolled ? "bg-black/80 border-zinc-800/50" : "bg-black/20 border-zinc-800/20"
          }`}
        >
          <nav className="space-y-4">
            <button
              onClick={() => {
                smoothScrollTo("sobre")
                setIsMenuOpen(false)
              }}
              className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-xs font-medium cursor-pointer ${
                isScrolled
                  ? `${isActiveSection("sobre") ? "text-white bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-500/30" : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"}`
                  : `${isActiveSection("sobre") ? "text-white bg-gradient-to-r from-yellow-400/30 to-amber-500/30 border border-yellow-500/50" : "text-zinc-300 hover:text-white hover:bg-white/10"}`
              }`}
            >
              Sobre Nós
            </button>
            
            <button
              onClick={() => {
                smoothScrollTo("beneficios")
                setIsMenuOpen(false)
              }}
              className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-xs font-medium cursor-pointer ${
                isScrolled
                  ? `${isActiveSection("beneficios") ? "text-white bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-500/30" : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"}`
                  : `${isActiveSection("beneficios") ? "text-white bg-gradient-to-r from-yellow-400/30 to-amber-500/30 border border-yellow-500/50" : "text-zinc-300 hover:text-white hover:bg-white/10"}`
              }`}
            >
              Benefícios
            </button>
            <Link
              href="/unidades"
              className={`block px-4 py-3 rounded-xl transition-all duration-300 text-xs font-medium ${
                isScrolled ? "text-zinc-300 hover:text-white hover:bg-zinc-800/50" : "text-zinc-300 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Unidades
            </Link>
            <Link
              href="/aulas-coletivas"
              className={`block px-4 py-3 rounded-xl transition-all duration-300 text-xs font-medium ${
                isScrolled ? "text-zinc-300 hover:text-white hover:bg-zinc-800/50" : "text-zinc-300 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Aulas Coletivas
            </Link>
            <button
              onClick={() => {
                smoothScrollTo("planos")
                setIsMenuOpen(false)
              }}
              className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-xs font-medium cursor-pointer ${
                isScrolled
                  ? `${isActiveSection("planos") ? "text-white bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-500/30" : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"}`
                  : `${isActiveSection("planos") ? "text-white bg-gradient-to-r from-yellow-400/30 to-amber-500/30 border border-yellow-500/50" : "text-zinc-300 hover:text-white hover:bg-white/10"}`
              }`}
            >
              Planos
            </button>
            <button
              onClick={() => {
                smoothScrollTo("contato")
                setIsMenuOpen(false)
              }}
              className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-xs font-medium cursor-pointer ${
                isScrolled
                  ? `${isActiveSection("contato") ? "text-white bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-500/30" : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"}`
                  : `${isActiveSection("contato") ? "text-white bg-gradient-to-r from-yellow-400/30 to-amber-500/30 border border-yellow-500/50" : "text-zinc-300 hover:text-white hover:bg-white/10"}`
              }`}
            >
              Contato
            </button>
            <div className={`pt-4 border-t space-y-3 ${isScrolled ? "border-zinc-800" : "border-zinc-800/30"}`}>
              
              <Link
                href="tel:+5592999999999"
                className={`block px-4 py-3 rounded-xl transition-all duration-300 text-xs font-medium ${
                  isScrolled ? "text-zinc-300 hover:text-white hover:bg-zinc-800/50" : "text-zinc-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>(92) 99999-9999</span>
                </div>
              </Link>
              <Link
                href="/planos"
                className="block w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 rounded-2xl text-black text-xs font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
                onClick={() => setIsMenuOpen(false)}
              >
                Matricule-se
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
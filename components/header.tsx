"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import LiveLogo from "./live-logo"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Detect active section for navigation highlighting
      const sections = ["sobre", "servicos", "contato"]
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
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
        className={`max-w-[1000px] mx-auto p-4 backdrop-blur-md rounded-[20px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.07)] border flex justify-between items-center transition-all duration-500 ${
          isScrolled ? "bg-white/95 border-gray-200" : "bg-white/5 border-white/10"
        }`}
      >
        {/* Left Side - Logo + Navigation */}
        <div className="flex justify-start items-center gap-9">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <LiveLogo className={`h-8 w-auto transition-all duration-500 ${isScrolled ? "" : "brightness-0 invert"}`} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-start items-start gap-4">
            <button
              onClick={() => smoothScrollTo("sobre")}
              className={`px-3 py-2 flex justify-start items-center gap-2 rounded-lg transition-all duration-500 cursor-pointer ${
                isScrolled
                  ? `${isActiveSection("sobre") ? "text-live-accent bg-live-accent/10" : "text-[#1b304a]"} hover:bg-gray-100`
                  : `${isActiveSection("sobre") ? "text-live-accent bg-white/20" : "text-white"} hover:bg-white/10`
              }`}
            >
              <div className="text-sm font-normal">Sobre Nós</div>
            </button>

            <button
              onClick={() => smoothScrollTo("servicos")}
              className={`px-3 py-2 flex justify-start items-center gap-2 rounded-lg transition-all duration-500 cursor-pointer ${
                isScrolled
                  ? `${isActiveSection("servicos") ? "text-live-accent bg-live-accent/10" : "text-[#1b304a]"} hover:bg-gray-100`
                  : `${isActiveSection("servicos") ? "text-live-accent bg-white/20" : "text-white"} hover:bg-white/10`
              }`}
            >
              <div className="text-sm font-normal">Modalidades</div>
            </button>

            <Link
              href="/planos"
              className={`px-3 py-2 flex justify-start items-center gap-2 rounded-lg transition-all duration-500 ${
                isScrolled ? "text-[#1b304a] hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              <div className="text-sm font-normal">Planos</div>
            </Link>

            <button
              onClick={() => smoothScrollTo("contato")}
              className={`px-3 py-2 flex justify-start items-center gap-2 rounded-lg transition-all duration-500 cursor-pointer ${
                isScrolled
                  ? `${isActiveSection("contato") ? "text-live-accent bg-live-accent/10" : "text-[#1b304a]"} hover:bg-gray-100`
                  : `${isActiveSection("contato") ? "text-live-accent bg-white/20" : "text-white"} hover:bg-white/10`
              }`}
            >
              <div className="text-sm font-normal">Contato</div>
            </button>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="hidden lg:flex justify-start items-center gap-4">
          {/* Phone */}
          <Link
            href="tel:+5592920000000"
            className={`px-3 py-2 rounded-lg flex justify-center items-center transition-all duration-500 ${
              isScrolled ? "text-[#1b304a] hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
          >
            <div className="text-sm font-normal">(92) 92000-0000</div>
          </Link>

          {/* Matricule-se Button */}
          <Link
            href="/planos"
            className="px-6 py-2.5 bg-live-accent hover:bg-opacity-90 rounded-full border-2 border-live-accent flex justify-center items-center gap-2 transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-white text-sm font-medium">Matricule-se</div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden transition-colors duration-500 ${isScrolled ? "text-[#1b304a]" : "text-white"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          className={`lg:hidden mt-3 max-w-[1000px] mx-auto p-4 backdrop-blur-md rounded-[20px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.07)] border animate-in slide-in-from-top duration-300 ${
            isScrolled ? "bg-white/95 border-gray-200" : "bg-white/5 border-white/10"
          }`}
        >
          <nav className="space-y-4">
            <button
              onClick={() => {
                smoothScrollTo("sobre")
                setIsMenuOpen(false)
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-colors font-normal cursor-pointer ${
                isScrolled
                  ? `${isActiveSection("sobre") ? "text-live-accent bg-live-accent/10" : "text-[#1b304a]"} hover:bg-gray-100`
                  : `${isActiveSection("sobre") ? "text-live-accent bg-white/20" : "text-white"} hover:bg-white/10`
              }`}
            >
              Sobre Nós
            </button>
            <button
              onClick={() => {
                smoothScrollTo("servicos")
                setIsMenuOpen(false)
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-colors font-normal cursor-pointer ${
                isScrolled
                  ? `${isActiveSection("servicos") ? "text-live-accent bg-live-accent/10" : "text-[#1b304a]"} hover:bg-gray-100`
                  : `${isActiveSection("servicos") ? "text-live-accent bg-white/20" : "text-white"} hover:bg-white/10`
              }`}
            >
              Modalidades
            </button>
            <Link
              href="/planos"
              className={`block px-4 py-3 rounded-lg transition-colors font-normal ${
                isScrolled ? "text-[#1b304a] hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Planos
            </Link>
            <button
              onClick={() => {
                smoothScrollTo("contato")
                setIsMenuOpen(false)
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-colors font-normal cursor-pointer ${
                isScrolled
                  ? `${isActiveSection("contato") ? "text-live-accent bg-live-accent/10" : "text-[#1b304a]"} hover:bg-gray-100`
                  : `${isActiveSection("contato") ? "text-live-accent bg-white/20" : "text-white"} hover:bg-white/10`
              }`}
            >
              Contato
            </button>
            <div className={`pt-4 border-t space-y-3 ${isScrolled ? "border-gray-200" : "border-white/20"}`}>
              <Link
                href="tel:+5592920000000"
                className={`block px-4 py-3 rounded-lg transition-colors font-normal ${
                  isScrolled ? "text-[#1b304a] hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
              >
                (92) 92000-0000
              </Link>
              <Link
                href="/planos"
                className="w-full bg-live-accent hover:bg-opacity-90 text-white rounded-full font-medium flex items-center justify-center gap-2 px-4 py-3"
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
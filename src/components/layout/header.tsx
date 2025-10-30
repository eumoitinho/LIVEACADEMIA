"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import LiveLogo from "@/components/shared/live-logo"
import { useUnit } from "@/contexts/unit-context"
import { useNavigationData } from "../../../hooks/use-sanity-data"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentUnit } = useUnit()
  const { data: navigationData, loading } = useNavigationData()

  const navigation = navigationData?.header?.navigation || []
  const ctaButton = navigationData?.header?.ctaButton
  const mobileMenu = navigationData?.header?.mobileMenu
  const showUnitName = navigationData?.header?.logo?.showUnitName !== false

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
            <div className="flex flex-col items-center gap-1">
              <LiveLogo className="h-8 w-auto brightness-0 invert" />
              {showUnitName && currentUnit && (
                <span className="text-xs font-semibold text-white/80">
                  {currentUnit.name}
                </span>
              )}
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation
              .filter((item: any) => item.showOnDesktop !== false)
              .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
              .map((item: any, index: number) => {
                if (item.type === 'scroll') {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        const element = document.getElementById(item.url)
                        if (element) element.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="hover:text-white/90 transition text-sm font-normal text-white/80"
                    >
                      {item.label}
                    </button>
                  )
                }

                if (item.type === 'external') {
                  return (
                    <a
                      key={index}
                      href={item.url}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                      className="hover:text-white/90 transition text-sm font-normal text-white/80"
                    >
                      {item.label}
                    </a>
                  )
                }

                return (
                  <Link
                    key={index}
                    href={item.url}
                    className="hover:text-white/90 transition text-sm font-normal text-white/80"
                  >
                    {item.label}
                  </Link>
                )
              })}

            {ctaButton?.show && (
              <Link
                href={ctaButton.url || '/planos'}
                className="inline-flex gap-2 transition hover:from-amber-200 hover:to-amber-300 hover:shadow-[0_8px_20px_rgba(251,191,36,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-sm font-bold text-black bg-gradient-to-b from-amber-300 to-amber-400 rounded-full pt-2.5 pr-5 pb-2.5 pl-5 shadow-[0_4px_12px_rgba(251,191,36,0.3)] items-center"
              >
                {ctaButton.text || 'Matricule-se'}
              </Link>
            )}
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
            <span>{isMenuOpen ? (mobileMenu?.closeText || 'Close') : (mobileMenu?.openText || 'Menu')}</span>
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
                  {navigation
                    .filter((item: any) => item.showOnMobile !== false)
                    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                    .map((item: any, index: number) => {
                      if (item.type === 'scroll') {
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              const element = document.getElementById(item.url)
                              if (element) element.scrollIntoView({ behavior: "smooth" })
                              setIsMenuOpen(false)
                            }}
                            className="block w-full text-left hover:text-white transition text-2xl font-normal text-white/80"
                          >
                            {item.label}
                          </button>
                        )
                      }

                      if (item.type === 'external') {
                        return (
                          <a
                            key={index}
                            href={item.url}
                            target={item.openInNewTab ? "_blank" : undefined}
                            rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                            className="block hover:text-white transition text-2xl font-normal text-white/80"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.label}
                          </a>
                        )
                      }

                      return (
                        <Link
                          key={index}
                          href={item.url}
                          className="block hover:text-white transition text-2xl font-normal text-white/80"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                </div>

                {ctaButton?.show && (
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <Link
                      href={ctaButton.url || '/planos'}
                      className="w-full inline-flex gap-2 transition hover:from-amber-200 hover:to-amber-300 hover:shadow-[0_8px_20px_rgba(251,191,36,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-base font-bold text-black bg-gradient-to-b from-amber-300 to-amber-400 rounded-full pt-4 pr-6 pb-4 pl-6 shadow-[0_4px_12px_rgba(251,191,36,0.3)] items-center justify-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {ctaButton.mobileText || ctaButton.text || 'Matricule-se Agora'}
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          </div>
        )}
      </>
    )
  }
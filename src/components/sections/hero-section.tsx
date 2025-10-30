"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { useHeroSectionData } from "../../../hooks/use-sanity-data"

declare global {
  interface Window {
    __inViewIO?: IntersectionObserver
    initInViewAnimations?: (selector?: string) => void
  }
}

export default function HeroSection() {
  const { data: sectionData, loading } = useHeroSectionData()

  useEffect(() => {
    if (typeof window === "undefined") return

    if (!window.__inViewIO) {
      const style = document.createElement("style")
      style.textContent = `
        .animate-on-scroll { animation-play-state: paused !important; }
        .animate-on-scroll.animate { animation-play-state: running !important; }
      `
      document.head.appendChild(style)

      window.__inViewIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate")
              window.__inViewIO?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
      )
    }

    window.initInViewAnimations = function (selector = ".animate-on-scroll") {
      document.querySelectorAll(selector).forEach((el) => {
        window.__inViewIO?.observe(el)
      })
    }

    window.initInViewAnimations()

    return () => {
      window.__inViewIO?.disconnect()
    }
  }, [])

  if (loading) {
    return (
      <section className="relative z-20 flex min-h-[100vh] items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </section>
    )
  }

  if (!sectionData?.displaySettings?.showOnHomepage) {
    return null
  }

  const { title, description, priceTag, cta, overlay, displaySettings } = sectionData

  return (
    <section className="relative z-20 flex min-h-[100vh] items-end">
      {/* Overlay para melhorar a legibilidade apenas na hero */}
      {overlay?.enabled && (
        <div className={`absolute inset-0 w-full h-full bg-gradient-to-r ${overlay.opacity}`} />
      )}
      
      <div className="lg:px-8 max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
          {/* Left Column - Heading */}
          <div className="order-1 opacity-0 animate-[slideInBlur_1.2s_ease-out_0.4s_forwards]" style={{transform: "translateY(30px)", filter: "blur(10px)"}}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white">
              {title}
            </h1>
          </div>

          {/* Right Column - Content */}
          <div className="order-2 lg:order-2">
            {displaySettings?.showPriceTag && priceTag && (
              <div className="flex gap-3 animate-[fadeInSlide_0.8s_ease-out_0.6s_forwards] text-xs text-white/70 opacity-0 mb-6 gap-x-3 gap-y-3 items-center" style={{transform: "translateX(20px)"}}>
                <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 backdrop-blur border border-primary/20">
                  {priceTag.showIcon && <Star className="w-[14px] h-[14px] text-primary" />}
                  <span className="font-normal">{priceTag.text}</span>
                  <span className="font-medium text-primary">{priceTag.price}</span>
                </div>
              </div>
            )}

            <p className="section-description animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] opacity-0 mb-8" style={{transform: "translateY(20px)", filter: "blur(5px)"}}>
              {description}
            </p>

            <Link
              href={cta?.url || '/planos'}
              className="animate-[slideInBlur_0.8s_ease-out_1.2s_forwards] z-10 transition-colors duration-200 text-black bg-amber-400 hover:bg-amber-300 opacity-0 rounded-full pt-3 pr-6 pb-3 pl-6 cursor-pointer inline-block"
              style={{transform: "translateX(-30px)", filter: "blur(8px)"}}
            >
              <span className="inline-flex items-center gap-2 font-bold">
                {cta?.text || 'MATRICULE-SE AGORA'}
                {cta?.showArrow && <ArrowRight className="h-5 w-5" />}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { urlFor } from '../../../lib/sanity'
import type { HeroSection } from '../../../types/sanity'

declare global {
  interface Window {
    __inViewIO?: IntersectionObserver
    initInViewAnimations?: (selector?: string) => void
  }
}

interface HeroSectionEditableProps {
  data: HeroSection
}

export default function HeroSectionEditable({ data }: HeroSectionEditableProps) {
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

  if (!data) return null

  return (
    <section className="relative z-20 flex min-h-[100vh] items-end">
      {/* Overlay para melhorar a legibilidade apenas na hero */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      
      <div className="lg:px-8 max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
          {/* Left Column - Heading */}
          <div className="order-1 opacity-0 animate-[slideInBlur_1.2s_ease-out_0.4s_forwards]" style={{transform: "translateY(30px)", filter: "blur(10px)"}}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white">
              {data.title || "Transforme."}<br />
              {data.subtitle || "Evolua."}<br />
              {data.thirdTitle || "Viva."}<br />
            </h1>
          </div>

          {/* Right Column - Content */}
          <div className="order-2 lg:order-2">
            <div className="flex gap-3 animate-[fadeInSlide_0.8s_ease-out_0.6s_forwards] text-xs text-white/70 opacity-0 mb-6 gap-x-3 gap-y-3 items-center" style={{transform: "translateX(20px)"}}>
             
            </div>

            <p className="section-description animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] opacity-0 mb-8" style={{transform: "translateY(20px)", filter: "blur(5px)"}}>
              {data.description || "A maior rede de academias de Manaus, com planos flexíveis e sem fidelidade para você treinar do seu jeito."}
            </p>

            <Link
              href={data.primaryCta?.link || "/planos"}
              className="animate-[slideInBlur_0.8s_ease-out_1.2s_forwards] z-10 transition-colors duration-200 text-black bg-amber-400 hover:bg-amber-300 opacity-0 rounded-full pt-3 pr-6 pb-3 pl-6 cursor-pointer inline-block"
              style={{transform: "translateX(-30px)", filter: "blur(8px)"}}
            >
              <span className="inline-flex items-center gap-2 font-bold">
                {data.primaryCta?.text || "MATRICULE-SE AGORA"}
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
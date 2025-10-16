"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"

declare global {
  interface Window {
    __inViewIO?: IntersectionObserver
    initInViewAnimations?: (selector?: string) => void
  }
}

export default function HeroSection() {
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

  return (
    <section className="relative z-20 flex min-h-[100vh] items-end">
      {/* Overlay para melhorar a legibilidade apenas na hero */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      
      <div className="lg:px-8 max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
          {/* Left Column - Heading */}
          <div className="order-1 opacity-0 animate-[slideInBlur_1.2s_ease-out_0.4s_forwards]" style={{transform: "translateY(30px)", filter: "blur(10px)"}}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white">
              Transforme.
              <br />
              Evolua.
              <br />
              Viva.
            </h1>
          </div>

          {/* Right Column - Content */}
          <div className="order-2 lg:order-2">
            <div className="flex gap-3 animate-[fadeInSlide_0.8s_ease-out_0.6s_forwards] text-xs text-white/70 opacity-0 mb-6 gap-x-3 gap-y-3 items-center" style={{transform: "translateX(20px)"}}>
              <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 backdrop-blur border border-primary/20">
                <Star className="w-[14px] h-[14px] text-primary" />
                <span className="font-normal">Elite</span>
                <span className="font-medium text-primary">4.9</span>
                <span className="text-white/60">rating</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-white/20"></div>
              <span className="hidden md:inline font-normal">Junte-se a 15k+ atletas</span>
            </div>

            <p className="section-description animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] opacity-0 mb-8" style={{transform: "translateY(20px)", filter: "blur(5px)"}}>
              Transforme seu corpo e sua vida na maior rede de academias de Manaus.
              Construído para atletas que exigem excelência em cada repetição.
            </p>

            <div className="border-t border-white/10 pt-6 mb-6 opacity-0 animate-[fadeInScale_0.8s_ease-out_1s_forwards]" style={{transform: "scale(0.95)", filter: "blur(3px)"}}>
              <div className="flex flex-wrap gap-4 gap-x-4 gap-y-4 items-center">
                <div className="relative inline-block group rounded-full">
                  <Link
                    href="/planos"
                    className="animate-[slideInBlur_0.8s_ease-out_1.2s_forwards] z-10 overflow-hidden transition-all duration-150 ease-out active:scale-[0.98] hover:from-amber-200 hover:to-amber-300 hover:shadow-[0_12px_30px_rgba(251,191,36,0.5)] text-black bg-gradient-to-b from-amber-300 to-amber-400 opacity-0 rounded-full pt-3 pr-6 pb-3 pl-6 relative shadow-[0_8px_20px_rgba(251,191,36,0.4)] cursor-pointer"
                    style={{transform: "translateX(-30px)", filter: "blur(8px)"}}
                  >
                    <span className="relative z-10 inline-flex items-center gap-2 font-bold rounded-full">
                      Comece Agora
                      <ArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 rounded-full" />
                    </span>
                  </Link>
                  <span className="pointer-events-none absolute -bottom-3 left-1/2 z-0 h-6 w-44 -translate-x-1/2 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 rounded-full" style={{background: "radial-gradient(60% 100% at 50% 50%, rgba(255,203,0,.55), rgba(255,215,64,.28) 35%, transparent 70%)", filter: "blur(10px) saturate(120%)"}} aria-hidden="true"></span>
                </div>

                <div className="w-px h-6 bg-white/20"></div>

                <Link
                  href="/aulas-coletivas"
                  className="inline-flex gap-2 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 animate-[fadeInSlide_0.8s_ease-out_1.4s_forwards] text-base font-normal text-white/90 opacity-0 border-white/10 border rounded-full pt-2.5 pr-5 pb-2.5 pl-5 backdrop-blur gap-x-2 gap-y-2 items-center cursor-pointer"
                  style={{transform: "translateX(20px)", filter: "blur(4px)"}}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                  </svg>
                  Veja o método
                </Link>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_1.6s_forwards]" style={{transform: "translateY(15px)", filter: "blur(2px)"}}>
              <p className="text-sm text-white/45">
                Protocolos de treino de elite. Suporte premium. Todos os dispositivos suportados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
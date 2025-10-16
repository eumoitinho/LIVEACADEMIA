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
      {/* Background específico do hero se tiver imagem */}
      {data.backgroundImage && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center -z-10" 
          style={{
            backgroundImage: `url('${urlFor(data.backgroundImage).width(1920).height(1080).url()}')`,
            backgroundPosition: "center center"
          }}
        />
      )}
      
      {/* Overlay para melhorar a legibilidade apenas na hero */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      
      <div className="lg:px-8 max-w-7xl mx-auto px-6 pt-20 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
          {/* Left Column - Heading */}
          <div className="order-1 opacity-0 animate-[slideInBlur_1.2s_ease-out_0.4s_forwards]" style={{transform: "translateY(30px)", filter: "blur(10px)"}}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white mb-8">
              {data.title}
              <br />
              {data.subtitle}
              <br />
              {data.thirdTitle}
            </h1>
          </div>

          {/* Right Column - Content */}
          <div className="order-2 lg:order-2">
            <div className="flex gap-3 animate-[fadeInSlide_0.8s_ease-out_0.6s_forwards] text-xs text-white/70 opacity-0 mb-6 gap-x-3 gap-y-3 items-center" style={{transform: "translateX(20px)"}}>
              <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 backdrop-blur border border-primary/20">
                <Star className="w-[14px] h-[14px] text-primary" />
                <span className="font-normal">{data.rating.label}</span>
                <span className="font-medium text-primary">{data.rating.value}</span>
                <span className="text-white/60">rating</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-white/20"></div>
              <span className="hidden md:inline font-normal">{data.rating.subscribers}</span>
            </div>

            <p className="section-description animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] opacity-0 mb-10" style={{transform: "translateY(20px)", filter: "blur(5px)"}}>
              {data.description}
            </p>

            <div className="border-t border-white/10 pt-6 mb-6 opacity-0 animate-[fadeInScale_0.8s_ease-out_1s_forwards]" style={{transform: "scale(0.95)", filter: "blur(3px)"}}>
              <div className="flex flex-wrap gap-4 gap-x-4 gap-y-4 items-center">
                <div className="relative inline-block group rounded-full">
                  <Link
                    href={data.primaryCta.link}
                    className="animate-[slideInBlur_0.8s_ease-out_1.2s_forwards] z-10 overflow-hidden transition-[transform] duration-150 ease-out active:scale-[0.98] hover:bg-primary/20 text-primary-foreground bg-primary opacity-0 border-primary/30 border rounded-full pt-3 pr-6 pb-3 pl-6 relative shadow-[inset_0_1px_0_rgba(255,203,0,0.2)] cursor-pointer"
                    style={{transform: "translateX(-30px)", filter: "blur(8px)"}}
                  >
                    <span className="relative z-10 inline-flex items-center gap-2 font-normal rounded-full">
                      {data.primaryCta.text}
                      <ArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 rounded-full" />
                    </span>
                    <span className="pointer-events-none absolute bottom-0 left-1/2 right-1/2 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80 transition-[left,right] duration-500 ease-out group-hover:left-0 group-hover:right-0 rounded-full"></span>
                    <span className="glow pointer-events-none absolute inset-0 -z-10 rounded-full" aria-hidden="true" style={{transform: "scale(0.95) translate(0px, -24px)"}}></span>
                  </Link>
                  <span className="pointer-events-none absolute -bottom-3 left-1/2 z-0 h-6 w-44 -translate-x-1/2 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 rounded-full" style={{background: "radial-gradient(60% 100% at 50% 50%, rgba(255,203,0,.55), rgba(255,215,64,.28) 35%, transparent 70%)", filter: "blur(10px) saturate(120%)"}} aria-hidden="true"></span>
                </div>

                <div className="w-px h-6 bg-white/20"></div>

                <Link
                  href={data.secondaryCta.link}
                  className="inline-flex gap-2 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 animate-[fadeInSlide_0.8s_ease-out_1.4s_forwards] text-base font-normal text-white/90 opacity-0 border-white/10 border rounded-full pt-2.5 pr-5 pb-2.5 pl-5 backdrop-blur gap-x-2 gap-y-2 items-center cursor-pointer"
                  style={{transform: "translateX(20px)", filter: "blur(4px)"}}
                >
                  {data.secondaryCta.text}
                </Link>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_1.6s_forwards]" style={{transform: "translateY(15px)", filter: "blur(2px)"}}>
              <p className="text-sm text-white/45">
                {data.footerText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
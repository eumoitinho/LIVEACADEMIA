"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { urlFor } from '@/src/lib/sanity'
import type { HeroSection } from '@/types/sanity'

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

  // Get background image URL
  // urlFor precisa do objeto de imagem completo com asset._ref ou asset completo
  let backgroundImageUrl: string | null = null
  
  if (data.backgroundImage) {
    try {
      // Verificar se temos os dados necessários
      const bgImage = data.backgroundImage
      
      // Se já tem URL direta no asset, usar ela (mais confiável)
      if (bgImage.asset?.url) {
        backgroundImageUrl = bgImage.asset.url
      } 
      // Se tem _id no asset, usar urlFor para construir a URL otimizada
      else if (bgImage.asset?._id) {
        try {
          backgroundImageUrl = urlFor(bgImage).width(1920).height(1080).quality(90).url()
        } catch (urlForError) {
          console.warn('Error using urlFor, trying direct asset:', urlForError)
          // Se urlFor falhar, tentar construir URL manualmente
          if (bgImage.asset?._id) {
            const projectId = typeof window !== 'undefined' 
              ? (window as any).__ENV__?.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ocjqsglj'
              : 'ocjqsglj'
            const dataset = typeof window !== 'undefined'
              ? (window as any).__ENV__?.NEXT_PUBLIC_SANITY_DATASET || 'production'
              : 'production'
            // Extrair ID da imagem do _id (formato: image-xxxxx-1920x1080-jpg)
            // O _id pode ser algo como "image-abc123-1920x1080-jpg" ou apenas a referência
            const imageId = bgImage.asset._id.includes('-') 
              ? bgImage.asset._id.split('-').slice(1, 2).join('-') || bgImage.asset._id
              : bgImage.asset._id
            backgroundImageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId}?w=1920&h=1080&q=90&auto=format`
          }
        }
      }
      // Se tem _ref, usar urlFor com referência
      else if (bgImage.asset?._ref) {
        backgroundImageUrl = urlFor(bgImage).width(1920).height(1080).quality(90).url()
      }
    } catch (error) {
      console.error('Error building background image URL:', error, 'Image data:', data.backgroundImage)
    }
  }
  
  // Fallback se não conseguir construir a URL
  if (!backgroundImageUrl) {
    backgroundImageUrl = '/images/hero.jpg'
  }

  return (
    <section className="relative z-20 flex min-h-[100vh] items-end">
      {/* Background Image */}
      {backgroundImageUrl && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImageUrl}')`,
            backgroundPosition: 'center center'
          }}
        />
      )}
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
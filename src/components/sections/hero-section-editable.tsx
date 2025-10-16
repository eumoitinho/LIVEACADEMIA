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

const HERO_BG = "hero.jpg"

interface HeroSectionProps {
  data: {
    badge: string
    title: string
    subtitle: string
    description: string
    primaryCta: { text: string; link: string }
    secondaryCta: { text: string; link: string }
    stats: Array<{ value: string; label: string }>
  }
}

export default function HeroSectionEditable({ data }: HeroSectionProps) {
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
    <section className="relative z-0 flex min-h-[92vh] items-end overflow-hidden bg-neutral-950 text-white">
      <style>{`@keyframes fadeInUp {from {opacity: 0;transform: translateY(30px);filter: blur(8px);}to {opacity: 1;transform: translateY(0);filter: blur(0px);}}@keyframes slideInBlur {from {opacity: 0;transform: translateX(-30px);filter: blur(8px);}to {opacity: 1;transform: translateX(0);filter: blur(0px);}}`}</style>

      <div
        className="fixed top-0 -z-20 h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${HERO_BG})`,
        }}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-end px-6 pb-12 pt-16 sm:px-8">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="order-1 space-y-3 opacity-0 animate-on-scroll" style={{ animation: "fadeInUp 1.2s ease-out 0.4s both" }}>
            <h1
              className="text-5xl font-bold leading-[1.2] tracking-tight sm:text-6xl lg:text-8xl"
            >
              <span className="block lowercase">{data.title}</span>
              <span className="block mt-1 lowercase text-live-yellow">{data.subtitle}</span>
            </h1>
          </div>

          <div className="order-2 space-y-4 lg:space-y-6">
            <div
              className="animate-on-scroll flex flex-col gap-3 opacity-0"
              style={{ animation: "fadeInUp 0.8s ease-out 0.8s both" }}
            >
              <p
                className="text-base leading-snug text-white/80 sm:text-lg"
              >
                {data.description}
              </p>
            </div>

            <div
              className="animate-on-scroll flex flex-wrap items-center gap-1 opacity-0"
              style={{ animation: "fadeInUp 0.8s ease-out 1s both" }}
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-live-yellow" />
              ))}
            </div>

            <div
              className="animate-on-scroll flex flex-col gap-3 border-t border-white/15 pt-6 opacity-0 sm:flex-row sm:items-center"
              style={{ animation: "fadeInUp 0.8s ease-out 1.2s both" }}
            >
              <Link
                href={data.primaryCta.link}
                className="inline-flex items-center gap-2 rounded-full bg-live-yellow px-7 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:bg-live-yellowLight"
              >
                {data.primaryCta.text}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={data.secondaryCta.link}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/80 transition hover:border-white/40 hover:text-white"
              >
                {data.secondaryCta.text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

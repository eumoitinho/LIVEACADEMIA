"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, MapPin, Navigation } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import Script from "next/script"

// Declaramos o tipo para evitar erros de TS ao acessar window.UnicornStudio
declare global {
  interface Window {
    UnicornStudio?: any
  }
}

// Função para calcular distância entre dois pontos (Haversine)
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371 // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Unidades com coordenadas reais
const unidades = [
  {
    nome: "Live Academia - Centro",
    endereco: "Av. Getúlio Vargas, 773, Centro",
    imagem: "/images/academia-1.webp",
    badge: { text: "Centro", variant: "orange" as const },
    link: "https://maps.google.com/?q=Live+Academia+Centro",
    lat: -3.131633,
    lon: -60.023444,
  },
  {
    nome: "Live Academia - Cachoeirinha",
    endereco: "Av. Ajuricaba, 660, Cachoeirinha",
    imagem: "/images/academia-2.webp",
    badge: { text: "Cachoeirinha", variant: "indigo" as const },
    link: "https://maps.google.com/?q=Live+Academia+Cachoeirinha",
    lat: -3.110000,
    lon: -60.010000,
  },
  {
    nome: "Live Academia - Cidade Nova",
    endereco: "Av. Noel Nutels, 890, Cidade Nova",
    imagem: "/images/academia-3.webp",
    badge: { text: "Cidade Nova", variant: "pink" as const },
    link: "https://maps.google.com/?q=Live+Academia+Cidade+Nova",
    lat: -2.990000,
    lon: -59.980000,
  },
  {
    nome: "Live Academia - Ponta Negra",
    endereco: "Rua Raul Pompéia, 37, Ponta Negra",
    imagem: "/images/academia-4.webp",
    badge: { text: "Ponta Negra", variant: "orange" as const },
    link: "https://maps.google.com/?q=Live+Academia+Ponta+Negra",
    lat: -3.0962455,
    lon: -60.0512277,
  },
  {
    nome: "Live Academia - Adrianópolis",
    endereco: "Rua Salvador, 567, Adrianópolis",
    imagem: "/images/academia-1.webp",
    badge: { text: "Adrianópolis", variant: "indigo" as const },
    link: "https://maps.google.com/?q=Live+Academia+Adrianopolis",
    lat: -3.092000,
    lon: -60.015000,
  },
  {
    nome: "Live Academia - Flores",
    endereco: "Av. Torquato Tapajós, 1234, Flores",
    imagem: "/images/academia-2.webp",
    badge: { text: "Flores", variant: "pink" as const },
    link: "https://maps.google.com/?q=Live+Academia+Flores",
    lat: -3.076000,
    lon: -60.008000,
  },
]

type UnidadeComDistancia = typeof unidades[0] & { distancia?: number }

// Mapeamento de nomes para IDs das unidades
const unidadeNameToId = {
  "Live Academia - Centro": "centro",
  "Live Academia - Cachoeirinha": "cachoeirinha",
  "Live Academia - Cidade Nova": "chapeu-goiano", // Assumindo que é Chapéu Goiano baseado no endereço
  "Live Academia - Ponta Negra": "flores", // Assumindo baseado na localização
  "Live Academia - Adrianópolis": "adrianopolis",
  "Live Academia - Flores": "flores"
}

// Componente de Card melhorado
function UnidadeCard({ unidade }: { unidade: UnidadeComDistancia }) {
  const unidadeId =
    unidadeNameToId[unidade.nome as keyof typeof unidadeNameToId] ||
    unidade.nome
      .toLowerCase()
      .replace('live academia - ', '')
      .replace(/\s+/g, '-')

  // Distância formatada (se existir)
  const distanciaFmt =
    unidade.distancia !== undefined
      ? unidade.distancia < 1
        ? `${Math.round(unidade.distancia * 1000)}m de você`
        : `${unidade.distancia.toFixed(1)}km de você`
      : null

  return (
    <Link href={`/unidades/${unidadeId}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70 rounded-3xl">
      <div
        className={cn(
          "relative rounded-3xl bg-white/5 p-6 lg:p-7 ring-1 ring-white/10 backdrop-blur-sm overflow-hidden",
          "transition-all duration-500",
          "hover:shadow-[0_0_0_1px_rgba(250,204,21,0.25),0_8px_26px_-4px_rgba(0,0,0,0.45),0_4px_12px_-2px_rgba(0,0,0,0.3)]",
          "hover:ring-yellow-300/40 hover:-translate-y-1",
          "min-h-[360px]"
        )}
      >
        {/* Shimmer overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10 -translate-x-full animate-[unidadeShimmer_3s_ease-in-out_infinite]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(250,204,21,0.25) 50%, transparent 100%)'
          }}
        />
        {/* Glow circle */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-yellow-300/20 blur-3xl" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Media */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-5 ring-1 ring-yellow-300/30">
              <Image
                src={unidade.imagem}
                alt={unidade.nome}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                quality={85}
                className="object-cover transition-transform duration-[1600ms] group-hover:scale-110"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              {/* Badge sobre a imagem */}
              <div className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white ring-1 ring-white/20 backdrop-blur-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_0_2px_rgba(0,0,0,0.4)]" />
                {unidade.badge.text}
              </div>
            </div>
          {/* Content */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-white tracking-tight leading-snug">
              {unidade.nome.replace('Live Academia - ', '')}
            </h3>
            <p className="text-sm text-zinc-300/90 line-clamp-2">
              {unidade.endereco}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-zinc-200 ring-1 ring-white/10">
              <MapPin className="h-3.5 w-3.5 text-yellow-300" />
              Ver detalhes
            </span>
            {distanciaFmt && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-zinc-200 ring-1 ring-white/10">
                <Navigation className="h-3.5 w-3.5 text-yellow-300" />
                {distanciaFmt}
              </span>
            )}
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
              Live Academia
            </span>
            <span className="text-[11px] text-zinc-400">
              Clique para conhecer
            </span>
          </div>
        </div>

        {/* Accessible focus ring overlay (optional) */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 group-focus-visible:ring-2 ring-yellow-300/50" />

        {/* Local keyframes */}
        <style jsx>{`
          @keyframes unidadeShimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </Link>
  )
}

export default function UnidadesCarousel() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [sortedUnidades, setSortedUnidades] = useState<UnidadeComDistancia[]>(unidades)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselViewportRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const [lowPerf, setLowPerf] = useState(false)
  const visibleInView = useInView(carouselViewportRef, { amount: 0.25, once: false })

  // Heurística simples para dispositivos de menor performance
  useEffect(() => {
    try {
      const cores = (navigator as any).hardwareConcurrency || 8
      const mem = (navigator as any).deviceMemory || 8
      if (cores <= 4 || mem <= 4) setLowPerf(true)
      if (window.innerWidth < 820 && window.devicePixelRatio > 2) setLowPerf(true)
    } catch (_) {}
  }, [])
  // Segurança: caso o Script carregue mas não inicialize sozinho
  useEffect(() => {
    const t = setTimeout(() => {
      if (window.UnicornStudio && !window.UnicornStudio.isInitialized && typeof window.UnicornStudio.init === 'function') {
        try {
          window.UnicornStudio.init()
          window.UnicornStudio.isInitialized = true
          console.info('[UnicornStudio] Inicializado via fallback useEffect')
        } catch (e) {
          console.warn('[UnicornStudio] Falha na init fallback', e)
        }
      }
    }, 1200)
    return () => clearTimeout(t)
  }, [])

  // Marca como montado para evitar diferenças SSR -> Cliente ao injetar canvas/DOM externo
  useEffect(() => {
    setMounted(true)
  }, [])

  // Calcula distâncias quando a localização é obtida
  useEffect(() => {
    if (userLocation) {
      const unidadesComDistancia = unidades.map((u) => ({
        ...u,
        distancia: getDistanceFromLatLonInKm(userLocation.lat, userLocation.lon, u.lat, u.lon),
      }))
      setSortedUnidades(
        unidadesComDistancia.sort((a, b) => (a.distancia ?? 0) - (b.distancia ?? 0))
      )
    } else {
      setSortedUnidades(unidades)
    }
  }, [userLocation])

  // Solicita localização automaticamente
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Erro ao obter localização:", error)
        }
      )
    }
  }, [])

  // Auto-play do carrossel
  // Auto-play com requestAnimationFrame + visibilidade + reduced motion
  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion || !visibleInView) return
    let frame: number
    let start: number | null = null
    const interval = 5000
    const loop = (ts: number) => {
      if (start === null) start = ts
      const elapsed = ts - start
      if (elapsed >= interval) {
        setCurrentIndex((p) => (p + 1) % sortedUnidades.length)
        start = ts
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [isAutoPlaying, prefersReducedMotion, visibleInView, sortedUnidades.length])

  const nextSlide = useCallback(() => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % sortedUnidades.length)
  }, [sortedUnidades.length])

  const prevSlide = useCallback(() => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + sortedUnidades.length) % sortedUnidades.length)
  }, [sortedUnidades.length])

  const goToSlide = useCallback((index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }, [])

  const slideWidth = 420 // width + gap approximation
  const translateX = -(currentIndex * slideWidth)

  return (
    <section className={cn("section-padding py-24 relative z-10 overflow-hidden", lowPerf && "[&_*]:will-change-auto")}
      data-low-perf={lowPerf || undefined}
    >
      <Script
        src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
        strategy="afterInteractive"
        onLoad={() => {
          try {
            if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
              window.UnicornStudio.init()
              window.UnicornStudio.isInitialized = true
              console.info('[UnicornStudio] Inicializado via <Script> onLoad')
            }
          } catch (e) {
            console.warn('[UnicornStudio] Erro ao inicializar no onLoad', e)
          }
        }}
      />
      {/* Background otimizado (menos camadas em lowPerf ou prefersReducedMotion) */}
      <div className="absolute inset-0 -z-10">
        {mounted && !prefersReducedMotion && (
          <>
            {!lowPerf && (
              <div
                data-us-project="x6cbPWi9roeeiZ8cuBu3"
                id="unicorn-bg"
                suppressHydrationWarning
                className="absolute inset-0 w-full h-full will-change-transform"
                style={{ contain: 'layout paint size', opacity: 0.6, filter: 'brightness(0.55) contrast(1.05) saturate(0.85)' }}
              />
            )}
            <div className="absolute inset-0 bg-black/85 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 45%, rgba(250,204,21,0.16), transparent 65%)' }} />
            {!lowPerf && (
              <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen" style={{ backgroundImage: 'repeating-linear-gradient(115deg, rgba(250,204,21,0.07) 0px, rgba(250,204,21,0.07) 2px, transparent 2px, transparent 16px)' }} />
            )}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7), transparent 18%, transparent 82%, rgba(0,0,0,0.7))' }} />
          </>
        )}
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 mb-6">
            <span className="text-zinc-400 text-sm font-medium">Unidades em Manaus</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Nossas <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Unidades</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Estamos presentes em diversos pontos de Manaus para facilitar seu acesso à atividade física.
          </p>
          <Link
            href="/unidades"
            className="inline-flex items-center mt-4 text-yellow-400 hover:text-yellow-300 transition-colors font-semibold group"
          >
            Ver todas as unidades
            <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Carrossel Container */}
  <div ref={carouselViewportRef} className="relative" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
          {/* Gradiente Esquerdo */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          
          {/* Gradiente Direito */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Carrossel */}
          <div className="overflow-hidden mx-8">
            <div
              className="flex gap-6 will-change-transform select-none"
              style={{ transform: `translate3d(${translateX}px,0,0)`, transition: 'transform 650ms cubic-bezier(.19,1,.22,1)' }}
            >
              {sortedUnidades.map((unidade, index) => (
                <div
                  key={unidade.nome}
                  className="flex-shrink-0 w-[400px]"
                >
                  <UnidadeCard unidade={unidade} />
                </div>
              ))}
            </div>
          </div>

          {/* Botões de navegação */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 hover:bg-zinc-800 transition-all duration-300 group"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 hover:bg-zinc-800 transition-all duration-300 group"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" />
          </button>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-8">
            {sortedUnidades.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  currentIndex === index 
                    ? "w-8 bg-yellow-400" 
                    : "w-2 bg-zinc-700 hover:bg-zinc-600"
                )}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Botão de localização */}
        {!userLocation && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      setUserLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                      })
                    }
                  )
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 hover:bg-yellow-500/30 transition-all duration-300 text-yellow-400 font-medium"
            >
              <Navigation className="w-5 h-5" />
              Ativar localização para ver unidades próximas
            </button>
          </div>
        )}
      </div>
      {/* Toggle de performance (debug) */}
      <div className="pointer-events-none fixed bottom-2 right-2 text-[10px] font-mono text-zinc-600 select-none">
        {lowPerf && <span>perf:LOW</span>}
      </div>
    </section>
  )
}
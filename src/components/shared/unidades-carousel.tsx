"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, MapPin, Navigation } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { cn } from '@/lib/utils/utils'

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

interface UnidadeBase {
  id: string
  slug: string
  nome: string
  endereco: string
  imagem: string
  latitude: number | null
  longitude: number | null
  badge?: { text: string; variant: 'pink' | 'amber' | 'orange' }
  link?: string
}

type UnidadeComDistancia = UnidadeBase & { distancia?: number }

// Mapeamento de nomes para IDs das unidades
const unidadeNameToId: Record<string, string> = {}

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
    <Link href={`/unidades/${unidadeId}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70 rounded-2xl">
      <div
        className={cn(
          "relative rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 p-5 lg:p-6",
          "border border-white/10 backdrop-blur-sm overflow-hidden",
          "transition-all duration-300",
          "hover:border-yellow-400/40",
          "hover:shadow-[0_0_30px_rgba(250,204,21,0.3),0_10px_30px_-5px_rgba(0,0,0,0.5)]",
          "hover:-translate-y-2",
          "min-h-[360px]"
        )}
      >
        {/* Glow amarelo sutil no hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl" />
        </div>

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
                {unidade.badge?.text || unidade.slug || 'Unidade'}
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

        {/* Accessible focus ring overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-focus-visible:ring-2 ring-yellow-400/60" />
      </div>
    </Link>
  )
}

export default function UnidadesCarousel() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [sortedUnidades, setSortedUnidades] = useState<UnidadeComDistancia[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselViewportRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const visibleInView = useInView(carouselViewportRef, { amount: 0.25, once: false })

  // Carrega unidades da API com fallback estático
  useEffect(() => {
    let cancelled = false
    
    // Fallback estático imediato (unidades reais)
    const fallbackUnidades: UnidadeBase[] = [
      {
        id: 'flores-diamante',
        slug: 'flores-diamante',
        nome: 'Live Academia - Flores Diamante',
        endereco: 'R. Visc. de Sepetiba, 220 - Flores',
        imagem: '/images/academia-1.webp',
        latitude: -3.0654,
        longitude: -60.0261,
        badge: { text: 'Flores Diamante', variant: 'orange' },
        link: '/unidades/flores-diamante'
      },
      {
        id: 'vieiralves-diamante',
        slug: 'vieiralves-diamante',
        nome: 'Live Academia - Vieiralves Diamante',
        endereco: 'Av. Djalma Batista, 450 - Nossa Senhora das Graças',
        imagem: '/images/academia-2.webp',
        latitude: -3.0876,
        longitude: -60.0156,
        badge: { text: 'Vieiralves Diamante', variant: 'amber' },
        link: '/unidades/vieiralves-diamante'
      },
      {
        id: 'ct-cidade-nova',
        slug: 'ct-cidade-nova',
        nome: 'Live Academia - CT Cidade Nova',
        endereco: 'Av. Max Teixeira, Nº 4066 - Cidade Nova',
        imagem: '/images/academia-3.webp',
        latitude: -3.0449,
        longitude: -59.9986,
        badge: { text: 'CT Cidade Nova', variant: 'pink' },
        link: '/unidades/ct-cidade-nova'
      },
      {
        id: 'centro',
        slug: 'centro',
        nome: 'Live Academia - Centro',
        endereco: 'Av. Getúlio Vargas, 773, Centro',
        imagem: '/images/academia-4.webp',
        latitude: -3.1319,
        longitude: -60.0217,
        badge: { text: 'Centro', variant: 'orange' },
        link: '/unidades/centro'
      }
    ]
    
    // Setar fallback imediatamente para não ficar em "Carregando..."
    setSortedUnidades(fallbackUnidades)
    
    // Tentar buscar dados dinâmicos da API
    async function load() {
      try {
        const res = await fetch('/api/unidades', { 
          cache: 'no-store',
          signal: AbortSignal.timeout(3000) // Timeout de 3s
        })
        
        if (!res.ok) throw new Error('API retornou erro')
        
        const json = await res.json()
        const units: UnidadeBase[] = (json.units || []).map((u: any) => ({
          id: u.id,
          slug: u.slug,
          nome: u.nome,
          endereco: u.endereco,
          imagem: u.imagem || '/images/academia-1.webp',
          latitude: u.latitude,
          longitude: u.longitude,
          badge: { text: (u.slug || 'Unidade').replace(/-/g,' ').slice(0,20), variant: 'orange' },
          link: `/unidades/${u.slug}`
        }))
        
        if (!cancelled && units.length > 0) {
          setSortedUnidades(units)
        }
      } catch (e) {
        // Se API falhar, mantém o fallback
        console.info('[UnidadesCarousel] Usando dados estáticos (API indisponível)')
      }
    }
    
    load()
    return () => { cancelled = true }
  }, [])

  // Calcula distâncias quando a localização é obtida
  useEffect(() => {
    if (!userLocation || sortedUnidades.length === 0) return
    setSortedUnidades((prev) => {
      return [...prev]
        .map((u) => {
          if (u.latitude != null && u.longitude != null) {
            return {
              ...u,
              distancia: getDistanceFromLatLonInKm(userLocation.lat, userLocation.lon, u.latitude!, u.longitude!)
            }
          }
          return u
        })
        .sort((a, b) => (a.distancia ?? Infinity) - (b.distancia ?? Infinity))
    })
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
  const translateX = sortedUnidades.length > 0 ? -(currentIndex * slideWidth) : 0

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background simples e rápido - Igual ao resto do site */}
      <div className="absolute inset-0 -z-10">
        {/* Gradiente de fundo preto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
        
        {/* Iluminação amarela radial no centro */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(250,204,21,0.15)_0%,_transparent_50%)]" />
        
        {/* Iluminação amarela adicional no topo */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-yellow-500/10 via-yellow-500/5 to-transparent" />
        
        {/* Pattern sutil de grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Título */}
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Encontre a Live mais perto de você
          </h2>

          {/* Descrição */}
          <p className="text-lg lg:text-xl text-zinc-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Estamos presentes em diversos pontos de Manaus para facilitar seu acesso à atividade física.
          </p>

          {/* CTA */}
          <Link
            href="/unidades"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-black font-bold rounded-full hover:bg-amber-300 transition-colors duration-200"
          >
            VER TODAS AS UNIDADES
            <ChevronRight className="h-5 w-5" />
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
              {sortedUnidades.length === 0 && (
                <div className="text-center py-20 text-zinc-500 w-full">Carregando unidades...</div>
              )}
              {sortedUnidades.map((unidade) => (
                <div
                  key={unidade.id || unidade.slug}
                  className="flex-shrink-0 w-[400px]"
                >
                  <UnidadeCard unidade={unidade} />
                </div>
              ))}
            </div>
          </div>

          {/* Botões de navegação - Modernizados */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-black/80 backdrop-blur-md border border-yellow-400/20 hover:border-yellow-400/60 hover:bg-yellow-400/10 transition-all duration-300 group shadow-xl"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-black/80 backdrop-blur-md border border-yellow-400/20 hover:border-yellow-400/60 hover:bg-yellow-400/10 transition-all duration-300 group shadow-xl"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors" />
          </button>

          {/* Indicadores - Melhorados */}
          {sortedUnidades.length > 1 && (
            <div className="flex justify-center gap-3 mt-10">
              {sortedUnidades.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    currentIndex === index 
                      ? "w-12 bg-gradient-to-r from-yellow-400 to-amber-500 shadow-[0_0_10px_rgba(250,204,21,0.5)]" 
                      : "w-1.5 bg-zinc-700 hover:bg-zinc-600 hover:w-6"
                  )}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Botão de localização - Modernizado */}
        {!userLocation && sortedUnidades.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
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
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400/10 to-amber-500/10 backdrop-blur-md border border-yellow-400/30 hover:border-yellow-400/60 hover:bg-yellow-400/20 transition-all duration-300 text-yellow-400 font-semibold group shadow-lg hover:shadow-[0_0_30px_rgba(250,204,21,0.3)]"
            >
              <Navigation className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Encontrar unidade mais próxima de você
            </button>
            <p className="mt-4 text-sm text-zinc-500">
              Ative a localização para ver as academias ordenadas por distância
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
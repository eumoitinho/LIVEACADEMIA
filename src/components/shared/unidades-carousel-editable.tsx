"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight, MapPin, Navigation } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
// import { urlFor } from "../../../lib/sanity"
import type { Unit } from "../../../types/sanity"

interface UnidadeComDistancia extends Unit {
  distancia?: number
}

interface UnidadesCarouselEditableProps {
  data: Unit[]
}

export default function UnidadesCarouselEditable({ data }: UnidadesCarouselEditableProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [sortedUnidades, setSortedUnidades] = useState<UnidadeComDistancia[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselViewportRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const visibleInView = useInView(carouselViewportRef, { amount: 0.25, once: false })

  // Função para calcular distância usando fórmula de Haversine
  const calcularDistancia = useCallback((lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Raio da Terra em quilômetros
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }, [])

  // Carrega localização do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        },
        (error) => {
          console.warn('Erro ao obter localização:', error)
        }
      )
    }
  }, [])

  // Ordena unidades por distância
  useEffect(() => {
    if (!data || data.length === 0) return

    const unidadesComDistancia = data.map(unidade => ({
      ...unidade,
      distancia: userLocation 
        ? calcularDistancia(
            userLocation.lat, 
            userLocation.lon, 
            unidade.latitude, 
            unidade.longitude
          )
        : undefined
    }))

    // Ordena por distância se disponível, senão mantém ordem original
    const sorted = userLocation 
      ? unidadesComDistancia.sort((a, b) => (a.distancia || 0) - (b.distancia || 0))
      : unidadesComDistancia

    setSortedUnidades(sorted)
  }, [data, userLocation, calcularDistancia])

  // Auto-play do carousel
  useEffect(() => {
    if (!isAutoPlaying || sortedUnidades.length <= 1 || !visibleInView || prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % sortedUnidades.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, sortedUnidades.length, visibleInView, prefersReducedMotion])

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % sortedUnidades.length)
    setIsAutoPlaying(false)
  }, [sortedUnidades.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + sortedUnidades.length) % sortedUnidades.length)
    setIsAutoPlaying(false)
  }, [sortedUnidades.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }, [])

  if (!data || data.length === 0) return null

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Simplified Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(250,204,21,0.15)_0%,_transparent_50%)]" />
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-yellow-500/10 via-yellow-500/5 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-yellow-400/70 font-semibold mb-4 block">
            Nossas Unidades
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Encontre a unidade{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              mais próxima
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-zinc-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Estamos presentes em mais de 20 pontos estratégicos de Manaus.<br className="hidden lg:block" />
            Venha conhecer a estrutura que vai transformar seus treinos.
          </p>
          <Link
            href="/unidades"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
          >
            Ver todas as unidades
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Carousel */}
        <div 
          ref={carouselViewportRef} 
          className="relative" 
          onMouseEnter={() => setIsAutoPlaying(false)} 
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Carousel items */}
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {sortedUnidades.map((unidade, index) => (
              <div key={unidade._id} className="w-full flex-shrink-0 px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden group hover:border-yellow-500/30 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-64 lg:h-80">
                    <Image
                      src="/images/academia-1.webp"
                      alt={unidade.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Type badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full border border-yellow-500/30 text-yellow-400 text-xs font-semibold">
                        {unidade.type}
                      </span>
                    </div>

                    {/* Distance badge */}
                    {unidade.distancia && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white text-xs font-semibold">
                          {unidade.distancia.toFixed(1)} km
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {unidade.name}
                    </h3>
                    <p className="text-zinc-400 mb-4 leading-relaxed">
                      {unidade.description}
                    </p>
                    
                    {/* Address */}
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div className="text-zinc-300 text-sm">
                        <p>{unidade.address}</p>
                        <p>{unidade.city} - {unidade.state}</p>
                      </div>
                    </div>

                    {/* Services */}
                    {unidade.services && unidade.services.length > 0 && (
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {unidade.services.slice(0, 3).map((service, serviceIndex) => (
                            <span key={serviceIndex} className="px-2 py-1 bg-white/10 rounded-full text-white text-xs">
                              {service}
                            </span>
                          ))}
                          {unidade.services.length > 3 && (
                            <span className="px-2 py-1 bg-white/10 rounded-full text-white text-xs">
                              +{unidade.services.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <Link
                      href={`/unidades/${unidade.slug}`}
                      className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-500/30 text-yellow-400 font-semibold rounded-xl hover:from-yellow-400/30 hover:to-amber-500/30 hover:border-yellow-500/50 transition-all duration-300"
                    >
                      Conhecer unidade
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          {sortedUnidades.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 z-20"
                aria-label="Unidade anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 z-20"
                aria-label="Próxima unidade"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Indicators */}
          {sortedUnidades.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {sortedUnidades.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-yellow-400 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Ir para unidade ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Location button */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    setUserLocation({
                      lat: position.coords.latitude,
                      lon: position.coords.longitude
                    })
                  },
                  (error) => {
                    console.warn('Erro ao obter localização:', error)
                  }
                )
              }
            }}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
          >
            <Navigation className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Usar minha localização
          </button>
        </div>
      </div>
    </section>
  )
}

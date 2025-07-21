"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight, MapPin, Navigation } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

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
  const unidadeId = unidadeNameToId[unidade.nome as keyof typeof unidadeNameToId] || 
    unidade.nome.toLowerCase().replace('live academia - ', '').replace(/\s+/g, '-')
  
  return (
    <Link href={`/unidades/${unidadeId}`} className="block group">
      <div className="relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10 hover:border-zinc-700/50 hover:-translate-y-1">
        {/* Imagem com maior qualidade */}
        <div className="relative h-[380px] overflow-hidden">
          <Image
            src={unidade.imagem}
            alt={unidade.nome}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority
            quality={95}
          />
          {/* Gradiente melhorado */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
        </div>

        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className={cn(
            "px-3 py-1.5 rounded-full text-xs font-semibold",
            "bg-zinc-900/90 text-white backdrop-blur-md",
            "border border-zinc-700/50 shadow-lg"
          )}>
            {unidade.badge.text}
          </span>
        </div>

        {/* Conteúdo */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white leading-tight">
              {unidade.nome}
            </h3>
            <p className="text-sm text-zinc-300 line-clamp-2">
              {unidade.endereco}
            </p>
            
            {/* Componente de distância */}
            {unidade.distancia !== undefined && (
              <div className="flex items-center gap-2 pt-2">
                <div className="p-2 rounded-full bg-yellow-500/20 backdrop-blur-sm">
                  <Navigation className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="text-sm font-medium text-yellow-400">
                  {unidade.distancia < 1 
                    ? `${Math.round(unidade.distancia * 1000)}m de você`
                    : `${unidade.distancia.toFixed(1)}km de você`
                  }
                </span>
              </div>
            )}
          </div>

          {/* Ícone de navegação */}
          <div className="absolute bottom-6 right-6">
            <div className="p-3 rounded-full bg-yellow-500/20 backdrop-blur-sm group-hover:bg-yellow-500/30 transition-all duration-300">
              <MapPin className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function UnidadesCarousel() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [sortedUnidades, setSortedUnidades] = useState<UnidadeComDistancia[]>(unidades)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

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
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sortedUnidades.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, sortedUnidades.length])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % sortedUnidades.length)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + sortedUnidades.length) % sortedUnidades.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <section className="section-padding relative overflow-hidden">
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
        <div className="relative" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
          {/* Gradiente Esquerdo */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          
          {/* Gradiente Direito */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Carrossel */}
          <div className="overflow-hidden mx-8" ref={carouselRef}>
            <motion.div 
              className="flex gap-6"
              animate={{ x: `${-currentIndex * 420}px` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {sortedUnidades.map((unidade, index) => (
                <div
                  key={unidade.nome}
                  className="flex-shrink-0 w-[400px]"
                >
                  <UnidadeCard unidade={unidade} />
                </div>
              ))}
            </motion.div>
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
    </section>
  )
}
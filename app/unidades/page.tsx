"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Filter, Search, Navigation, X } from "lucide-react"
import Link from "next/link"
import { locations } from '@/src/lib/config/locations'
import { UnidadeCard } from '@/src/components/unidade-card'
import { UnidadeCardModern } from '@/src/components/unidade-card-modern'
import { useUnitsData } from '@/hooks/use-sanity-data'
import type { Unit } from '@/types/sanity'

export default function Unidades() {
  const { data: sanityUnits, loading: loadingSanity } = useUnitsData()
  const [filterType, setFilterType] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [radiusFilter, setRadiusFilter] = useState<number | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loadingLocation, setLoadingLocation] = useState(false)

  // Merge Sanity units with static locations (Sanity takes precedence)
  // IMPORTANTE: Todos os hooks devem ser declarados ANTES de qualquer return condicional
  const allLocations = useMemo(() => {
    if (loadingSanity || sanityUnits.length === 0) {
      return locations
    }

    return locations.map(staticLoc => {
      const sanityUnit = sanityUnits.find((unit: any) =>
        unit.slug === staticLoc.id
      )

      if (sanityUnit) {
        const hasCoordinates = 'coordinates' in staticLoc && staticLoc.coordinates && typeof staticLoc.coordinates === 'object'
        return {
          ...staticLoc,
          name: sanityUnit.name,
          address: sanityUnit.address,
          type: sanityUnit.type || staticLoc.type,
          photo: sanityUnit.photo?.asset?.url || sanityUnit.images?.[0]?.asset?.url || staticLoc.photo || '/images/fachada.jpg',
          features: sanityUnit.services || staticLoc.features,
          hours: sanityUnit.openingHours || staticLoc.hours,
          coordinates: hasCoordinates ? {
            lat: sanityUnit.latitude || (staticLoc.coordinates as any).lat,
            lng: sanityUnit.longitude || (staticLoc.coordinates as any).lng,
          } : undefined
        }
      }
      return {
        ...staticLoc,
        type: staticLoc.type
      }
    })
  }, [sanityUnits, loadingSanity])

  // Função para calcular distância em km usando fórmula de Haversine
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Solicitar localização do usuário
  const requestUserLocation = () => {
    setLoadingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setLoadingLocation(false)
        },
        (error) => {
          console.error("Erro ao obter localização:", error)
          setLoadingLocation(false)
          alert("Não foi possível obter sua localização. Verifique as permissões do navegador.")
        }
      )
    } else {
      setLoadingLocation(false)
      alert("Geolocalização não é suportada pelo seu navegador.")
    }
  }

  const filteredLocations = useMemo(() => {
    return allLocations.filter((loc: any) => {
      // Filter by type
      if (filterType !== "todos" && loc.type !== filterType) return false

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          loc.name.toLowerCase().includes(query) ||
          loc.address.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Filter by radius
      if (radiusFilter && userLocation && loc.coordinates) {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          loc.coordinates.lat,
          loc.coordinates.lng
        )
        if (distance > radiusFilter) return false
      }

      return true
    })
  }, [filterType, searchQuery, radiusFilter, userLocation, allLocations])

  const stats = useMemo(() => ({
    total: allLocations.length,
    diamante: allLocations.filter((l: any) => l.type === 'diamante').length,
    premium: allLocations.filter((l: any) => l.type === 'premium').length,
    tradicional: allLocations.filter((l: any) => l.type === 'tradicional').length,
  }), [allLocations])

  // Mostrar loading state enquanto carrega dados do Sanity
  if (loadingSanity) {
    return (
      <main className="min-h-screen relative bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Carregando unidades...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative bg-black text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-amber-950/20 to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.1),transparent_50%)] pointer-events-none" />

      <div className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="mb-6">
              Encontre a Live mais perto de você
            </h1>

            <p className="section-description max-w-3xl mx-auto">
              Estamos presentes em diversos pontos de Manaus para facilitar seu acesso à atividade física.
            </p>
          </motion.div>

          {/* Advanced Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou endereço..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-colors backdrop-blur-xl"
                />
              </div>

              {/* Type Filters */}
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'todos', label: 'Todas as unidades', icon: '🏢' },
                  { value: 'diamante', label: 'Diamante' },
                  { value: 'premium', label: 'Premium' },
                  { value: 'tradicional', label: 'Tradicional' },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setFilterType(filter.value)}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                      filterType === filter.value
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/50 scale-105'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Radius Filter */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={requestUserLocation}
                    disabled={loadingLocation}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      userLocation
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Navigation className={`w-4 h-4 ${loadingLocation ? 'animate-spin' : ''}`} />
                    {loadingLocation ? 'Localizando...' : userLocation ? 'Localização ativa' : 'Usar minha localização'}
                  </button>
                  {userLocation && radiusFilter && (
                    <button
                      onClick={() => {
                        setRadiusFilter(null)
                        setUserLocation(null)
                      }}
                      className="px-3 py-3 rounded-xl text-sm font-medium bg-white/5 text-white/70 border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 transition-all duration-300"
                      title="Limpar filtro de raio"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {userLocation && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 flex-wrap"
                  >
                    <span className="text-sm text-white/60">Raio:</span>
                    {[2, 5, 10, 15].map((radius) => (
                      <button
                        key={radius}
                        onClick={() => setRadiusFilter(radius)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          radiusFilter === radius
                            ? 'bg-amber-500 text-black shadow-lg'
                            : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {radius} km
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Results count */}
              {(filterType !== 'todos' || searchQuery || radiusFilter) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between pt-4 border-t border-white/10"
                >
                  <p className="text-white/60">
                    <span className="text-white font-bold">{filteredLocations.length}</span> unidade
                    {filteredLocations.length !== 1 ? 's' : ''} encontrada{filteredLocations.length !== 1 ? 's' : ''}
                    {radiusFilter && ` em ${radiusFilter}km`}
                  </p>
                  <button
                    onClick={() => {
                      setFilterType('todos')
                      setSearchQuery('')
                      setRadiusFilter(null)
                      setUserLocation(null)
                    }}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Limpar filtros
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Units Grid - Modern Container */}
          <section className="max-w-7xl">
            <div className="relative overflow-hidden shadow-[0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.3),0px_12px_24px_-12px_rgba(0,0,0,0.5)] bg-black/80 border-white/10 border rounded-[40px] backdrop-blur">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent"></div>
              </div>
              <div className="relative sm:p-8 pt-6 pr-6 pb-6 pl-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl text-neutral-100 font-geist tracking-tighter font-medium">
                    {filterType === 'todos' ? 'Todas as unidades' :
                     filterType === 'diamante' ? 'Unidades Diamante' :
                     filterType === 'premium' ? 'Unidades Premium' :
                     filterType === 'tradicional' ? 'Unidades Tradicionais' :
                     'Inaugurações em breve'}
                  </h2>
                  {filteredLocations.length > 0 && (
                    <div className="text-sm text-neutral-400 font-geist">
                      {filteredLocations.length} unidade{filteredLocations.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>

                {filteredLocations.length === 0 ? (
                  <div className="text-center py-20">
                    <h3 className="text-2xl font-bold text-neutral-100 mb-2 font-geist">
                      Nenhuma unidade encontrada
                    </h3>
                    <p className="text-neutral-400 mb-6 font-geist">
                      Tente ajustar os filtros ou fazer uma nova busca
                    </p>
                    <button
                      onClick={() => {
                        setFilterType('todos')
                        setSearchQuery('')
                        setRadiusFilter(null)
                        setUserLocation(null)
                      }}
                      className="inline-flex items-center gap-2 text-sm text-neutral-200 bg-white/5 hover:bg-white/10 rounded-full px-4 py-2 border border-white/10 font-geist transition-colors"
                    >
                      <span>Ver todas as unidades</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {filteredLocations.map((location: any, index: number) => (
                      <motion.div
                        key={location.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
                      >
                        <UnidadeCardModern location={location} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-12">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Pronto para começar sua transformação?
                </h2>
                <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                  Escolha uma unidade, conheça nossos planos e dê o primeiro passo rumo ao seu melhor.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/planos"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-bold hover:scale-105 transition-all"
                  >
                    Ver planos e preços
                  </Link>
                  <a
                    href="https://wa.me/5592999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all"
                  >
                    Falar com consultor
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export const dynamic = 'force-dynamic'

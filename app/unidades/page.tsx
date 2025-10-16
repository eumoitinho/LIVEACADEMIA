"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { MapPin, Filter, Search } from "lucide-react"
import Link from "next/link"
import { locations } from '@/src/lib/config/locations'
import { UnidadeCard } from '@/src/components/unidade-card'

export default function Unidades() {
  const [filterType, setFilterType] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLocations = useMemo(() => {
    return locations.filter((loc: any) => {
      // Filter by type
      if (filterType !== "todos" && loc.type !== filterType) return false

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          loc.name.toLowerCase().includes(query) ||
          loc.address.toLowerCase().includes(query)
        )
      }

      return true
    })
  }, [filterType, searchQuery])

  const stats = useMemo(() => ({
    total: locations.length,
    diamante: locations.filter((l: any) => l.type === 'diamante').length,
    premium: locations.filter((l: any) => l.type === 'premium').length,
    tradicional: locations.filter((l: any) => l.type === 'tradicional').length,
  }), [])

  return (
    <main className="min-h-screen relative bg-black text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-slate-900 to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.1),transparent_50%)] pointer-events-none" />

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
              <div className="flex flex-wrap gap-3">
                {[
                  { value: 'todos', label: 'Todas as unidades' },
                  { value: 'diamante', label: 'Diamante' },
                  { value: 'premium', label: 'Premium' },
                  { value: 'tradicional', label: 'Tradicional' },
                  { value: 'inauguracao', label: 'Em breve' },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setFilterType(filter.value)}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      filterType === filter.value
                        ? 'bg-white text-black shadow-lg'
                        : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Results count */}
              {(filterType !== 'todos' || searchQuery) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between pt-4 border-t border-white/10"
                >
                  <p className="text-white/60">
                    <span className="text-white font-bold">{filteredLocations.length}</span> unidade
                    {filteredLocations.length !== 1 ? 's' : ''} encontrada{filteredLocations.length !== 1 ? 's' : ''}
                  </p>
                  <button
                    onClick={() => {
                      setFilterType('todos')
                      setSearchQuery('')
                    }}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Limpar filtros
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Units Grid */}
          {filteredLocations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                Nenhuma unidade encontrada
              </h3>
              <p className="text-white/60 mb-6">
                Tente ajustar os filtros ou fazer uma nova busca
              </p>
              <button
                onClick={() => {
                  setFilterType('todos')
                  setSearchQuery('')
                }}
                className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-all"
              >
                Ver todas as unidades
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location: any, index: number) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
                >
                  <UnidadeCard location={location} />
                </motion.div>
              ))}
            </div>
          )}

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

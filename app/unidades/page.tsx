"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { locations } from '@/lib/config/locations'

export default function Unidades() {
  const [filterType, setFilterType] = useState("todos")
  const [filterService, setFilterService] = useState("todos")
  const [filterRegion, setFilterRegion] = useState("todos")

  const filteredLocations = locations.filter((loc: any) => {
    if (filterType !== "todos" && loc.type !== filterType) return false
    if (filterService !== "todos" && !loc.features.includes(filterService)) return false
    if (filterRegion !== "todos" && !loc.address.includes(filterRegion)) return false
    return true
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-live-bg via-live-bg to-live-accent/5 text-live-textPrimary pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6">Encontre a Live mais perto de você</h1>
            <p className="text-xl text-live-textSecondary max-w-3xl mx-auto">
              Estamos presentes em diversos pontos de Manaus para facilitar seu acesso à atividade física.
            </p>
          </motion.div>

          {/* Layout com Filtros Laterais */}
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            {/* Grid de Unidades - Lado Esquerdo */}
            <div className="flex-1 order-2 lg:order-1">
              {filteredLocations.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-live-textSecondary">
                    Nenhuma unidade encontrada com os filtros selecionados.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredLocations.map((location: any, index: number) => (
                    <motion.div
                      key={location.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="w-full"
                    >
                      {location.type !== "inauguracao" ? (
                        <Link href={`/unidades/${location.id}`} className="block h-full group">
                          <div className="overflow-hidden border-white/10 border rounded-3xl hover:border-live-accent/30 transition-all duration-300 h-full flex flex-col">
                            {/* Foto da Academia */}
                            <div className="relative aspect-[4/3] flex-shrink-0">
                              {location.photo && (
                                <img
                                  src={location.photo}
                                  alt={`Interior da academia ${location.name}`}
                                  className="absolute inset-0 w-full h-full object-cover"
                                />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />

                              {/* Badge de Tipo */}
                              <div className="absolute top-4 right-4">
                                <span className={`text-[11px] px-3 py-1.5 rounded-full font-medium backdrop-blur-md ${
                                  location.type === 'diamante' ? 'bg-zinc-900/80 text-amber-400 border border-amber-400/20' :
                                  location.type === 'premium' ? 'bg-amber-500/90 text-black' :
                                  'bg-emerald-500/90 text-white'
                                }`}>
                                  {location.type === 'diamante' ? 'Diamante' : location.type === 'premium' ? 'Premium' : 'Tradicional'}
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="pt-5 pr-5 pb-5 pl-5 flex-1 flex flex-col">
                              {/* Logo e Nome */}
                              <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                                <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 bg-white/5 rounded-lg border border-white/10">
                                  <Image
                                    src="/images/logo-live-premium.svg"
                                    alt="Live Academia"
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-base font-bold tracking-tight text-white truncate">
                                    {location.name}
                                  </h3>
                                  <p className="text-xs text-white/50 mt-0.5">Unidade Live Academia</p>
                                </div>
                              </div>

                              {/* Endereço */}
                              <div className="flex items-start gap-2.5 mb-4 flex-shrink-0">
                                <MapPin className="h-4 w-4 text-white/40 mt-0.5 flex-shrink-0" />
                                <p className="text-sm leading-relaxed text-white/60">
                                  {location.address}
                                </p>
                              </div>

                              {/* Features Grid */}
                              <div className="mt-5 grid grid-cols-2 gap-4 flex-shrink-0">
                                <div>
                                  <div className="text-2xl font-semibold tracking-tight text-white">{location.features.length}+</div>
                                  <p className="text-[11px] text-white/50 mt-1 uppercase tracking-wide">Serviços</p>
                                </div>
                                {location.planos && location.planos.length > 0 && (
                                  <div>
                                    <div className="text-2xl font-semibold tracking-tight text-live-accent">R$ {location.planos[0].price}</div>
                                    <p className="text-[11px] text-white/50 mt-1 uppercase tracking-wide">A partir de</p>
                                  </div>
                                )}
                              </div>

                              {/* Info Box */}
                              {location.hours && (
                                <div className="mt-5 p-4 bg-black/30 rounded-xl border border-white/10 flex-shrink-0">
                                  <h4 className="text-sm font-semibold tracking-tight text-white mb-2">Horário de funcionamento</h4>
                                  <p className="text-sm text-white/60 leading-relaxed">{location.hours}</p>
                                </div>
                              )}

                              {/* Spacer para empurrar o botão para baixo */}
                              <div className="flex-1"></div>

                              {/* CTA Button */}
                              <button className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight text-neutral-900 bg-white hover:bg-white/90 border border-white/10 transition-all group-hover:shadow-lg group-hover:shadow-white/10 flex-shrink-0">
                                <MapPin className="w-4 h-4" />
                                <span>Ver detalhes da unidade</span>
                              </button>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className="overflow-hidden border-white/10 border rounded-3xl opacity-60 h-full flex flex-col">
                          {/* Placeholder */}
                          <div className="relative aspect-[4/3] bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center flex-shrink-0">
                            <div className="text-4xl">🚧</div>
                            <div className="absolute top-4 right-4">
                              <span className="text-[11px] px-3 py-1.5 rounded-full font-medium bg-white/10 text-gray-400">
                                Em breve
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="pt-5 pr-5 pb-5 pl-5 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 bg-white/5 rounded-lg border border-white/10 opacity-50">
                                <Image
                                  src="/images/logo-live-premium.svg"
                                  alt="Live Academia"
                                  width={40}
                                  height={40}
                                  className="object-contain"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base font-bold tracking-tight text-white/40 truncate">
                                  {location.name}
                                </h3>
                                <p className="text-xs text-white/30 mt-0.5">Em breve</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2.5 flex-shrink-0">
                              <MapPin className="h-4 w-4 text-white/30 mt-0.5 flex-shrink-0" />
                              <p className="text-sm leading-relaxed text-white/40">
                                {location.address}
                              </p>
                            </div>

                            {/* Spacer */}
                            <div className="flex-1"></div>

                            <div className="mt-5 p-4 bg-black/20 rounded-xl border border-white/10 flex-shrink-0">
                              <p className="text-sm text-white/40 text-center font-medium">
                                🚧 Inauguração em breve
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Barra de Filtros - Lado Direito */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-80 order-1 lg:order-2"
            >
              <div className="bg-live-border/10 backdrop-blur-sm rounded-2xl border border-live-border/30 p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-live-accent" />
                  <h2 className="text-xl font-bold text-live-textPrimary">Filtros</h2>
                </div>

                {/* Filtro por Tipo */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-live-textPrimary mb-3">
                    Tipo de Unidade
                  </label>
                  <div className="space-y-2">
                    {['todos', 'tradicional', 'premium', 'diamante', 'inauguracao'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={filterType === type}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="w-4 h-4 text-live-accent border-live-border/30 focus:ring-live-accent"
                        />
                        <span className="text-sm text-live-textSecondary group-hover:text-live-textPrimary transition-colors capitalize">
                          {type === 'todos' ? 'Todas' : type === 'inauguracao' ? 'Em Inauguração' : type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtro por Serviço */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-live-textPrimary mb-3">
                    Serviços
                  </label>
                  <select
                    value={filterService}
                    onChange={(e) => setFilterService(e.target.value)}
                    className="w-full bg-live-bg/50 backdrop-blur-sm border border-live-border/30 text-live-textPrimary p-3 rounded-lg hover:border-live-accent/50 transition-colors focus:outline-none focus:border-live-accent"
                  >
                    <option value="todos">Todos os serviços</option>
                    <option value="Climatização">Climatização</option>
                    <option value="Espaço Relax">Espaço Relax</option>
                    <option value="Espaço Yoga">Espaço Yoga</option>
                    <option value="Espaço Pose">Espaço Pose</option>
                    <option value="Studio de Bike">Studio de Bike</option>
                    <option value="Atendimento domingos">Atendimento Domingos</option>
                    <option value="Aulas coletivas">Aulas Coletivas</option>
                    <option value="App acesso">App de Acesso</option>
                  </select>
                </div>

                {/* Filtro por Região */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-live-textPrimary mb-3">
                    Região
                  </label>
                  <select
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                    className="w-full bg-live-bg/50 backdrop-blur-sm border border-live-border/30 text-live-textPrimary p-3 rounded-lg hover:border-live-accent/50 transition-colors focus:outline-none focus:border-live-accent"
                  >
                    <option value="todos">Todas as regiões</option>
                    <option value="Adrianópolis">Adrianópolis</option>
                    <option value="Aleixo">Aleixo</option>
                    <option value="Centro">Centro</option>
                    <option value="Cidade de Deus">Cidade de Deus</option>
                    <option value="Cidade Nova">Cidade Nova</option>
                    <option value="Compensa">Compensa</option>
                    <option value="Coroado">Coroado</option>
                    <option value="Dom Pedro">Dom Pedro</option>
                    <option value="Flores">Flores</option>
                    <option value="Japiim">Japiim</option>
                    <option value="Parque 10">Parque 10</option>
                    <option value="Petrópolis">Petrópolis</option>
                    <option value="Planalto">Planalto</option>
                    <option value="Raiz">Raiz</option>
                    <option value="Tarumã">Tarumã</option>
                    <option value="Tancredo Neves">Tancredo Neves</option>
                  </select>
                </div>

                {/* Botão Limpar Filtros */}
                {(filterType !== 'todos' || filterService !== 'todos' || filterRegion !== 'todos') && (
                  <button
                    onClick={() => {
                      setFilterType('todos')
                      setFilterService('todos')
                      setFilterRegion('todos')
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-live-border/20 text-live-textPrimary hover:bg-live-accent/20 hover:text-live-accent transition-all duration-300 text-sm font-semibold"
                  >
                    Limpar Filtros
                  </button>
                )}

                {/* Contador de Resultados */}
                <div className="mt-6 pt-6 border-t border-live-border/20">
                  <p className="text-sm text-live-textSecondary text-center">
                    <span className="font-bold text-live-accent text-lg">{filteredLocations.length}</span>
                    {' '}unidade{filteredLocations.length !== 1 ? 's' : ''} encontrada{filteredLocations.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="space-y-4">
              <p className="text-lg text-live-textSecondary mb-6">
                Clique em qualquer unidade para ver todos os detalhes, modalidades e benefícios!
              </p>
              <Link
                href="/planos"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-live-accent to-yellow-500 text-black font-bold shadow-lg hover:shadow-xl hover:shadow-live-accent/25 transition-all duration-300 transform hover:scale-105"
              >
                VER PLANOS E PREÇOS
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export const dynamic = 'force-dynamic'

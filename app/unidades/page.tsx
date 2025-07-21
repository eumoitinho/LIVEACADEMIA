"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import Link from "next/link"
import { locations } from "@/lib/locations"

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
          
          {/* Filtros */}
          <div className="flex gap-4 mb-12 justify-center flex-wrap">
            <select 
              onChange={(e) => setFilterType(e.target.value)} 
              className="bg-live-bg/50 backdrop-blur-sm border border-live-border/30 text-live-textPrimary p-3 rounded-lg hover:border-live-accent/50 transition-colors"
            >
              <option value="todos">Tipo: Todos</option>
              <option value="tradicional">Tradicional</option>
              <option value="premium">Premium</option>
              <option value="diamante">Diamante</option>
              <option value="inauguracao">Em Inauguração</option>
            </select>
            <select 
              onChange={(e) => setFilterService(e.target.value)} 
              className="bg-live-bg/50 backdrop-blur-sm border border-live-border/30 text-live-textPrimary p-3 rounded-lg hover:border-live-accent/50 transition-colors"
            >
              <option value="todos">Serviço: Todos</option>
              <option value="Climatização">Climatização</option>
              <option value="Espaço Relax">Espaço Relax</option>
              <option value="Espaço Yoga">Espaço Yoga</option>
              <option value="Espaço Pose">Espaço Pose</option>
              <option value="Studio de Bike">Studio de Bike</option>
              <option value="Atendimento domingos">Atendimento domingos</option>
              <option value="Aulas coletivas">Aulas coletivas</option>
              <option value="App acesso">App acesso</option>
            </select>
            <select 
              onChange={(e) => setFilterRegion(e.target.value)} 
              className="bg-live-bg/50 backdrop-blur-sm border border-live-border/30 text-live-textPrimary p-3 rounded-lg hover:border-live-accent/50 transition-colors"
            >
              <option value="todos">Região: Todos</option>
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

          {/* Grid de Unidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredLocations.map((location: any, index: number) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full"
              >
                {location.type !== "inauguracao" ? (
                  <Link href={`/unidades/${location.id}`} className="block h-full group">
                    <div className="bg-live-border/10 p-6 rounded-2xl border border-live-border/30 hover:border-live-accent/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-live-accent/10 h-full cursor-pointer group-hover:scale-[1.02]">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-live-textPrimary group-hover:text-live-accent transition-colors">{location.name}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          location.type === 'diamante' ? 'bg-live-gray text-live-bg' :
                          location.type === 'premium' ? 'bg-live-accent text-live-bg' :
                          'bg-live-accent text-live-bg'
                        }`}>
                          {location.type.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-3 mb-3">
                        <MapPin className="h-4 w-4 text-live-accent mt-1 flex-shrink-0" />
                        <p className="text-sm text-live-textSecondary">{location.address}</p>
                      </div>
                      
                      <p className="text-live-textSecondary mb-4 text-sm">{location.hours}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {location.features.slice(0, 3).map((feature: string, i: number) => (
                          <span key={i} className="text-xs bg-live-border/20 px-2 py-1 rounded-full text-live-textSecondary">
                            {feature}
                          </span>
                        ))}
                        {location.features.length > 3 && (
                          <span className="text-xs text-live-accent">
                            +{location.features.length - 3} mais
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-4">
                        {location.tourUrl && (
                          <span className="text-live-accent font-semibold text-sm">
                            Tour Virtual
                          </span>
                        )}
                        <span className="text-live-accent font-semibold text-sm ml-auto group-hover:text-live-yellowLight transition-colors">
                          Ver Detalhes →
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="bg-live-border/10 p-6 rounded-2xl border border-live-border/30 transition-all duration-300 shadow-lg h-full opacity-60">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-live-textPrimary">{location.name}</h3>
                      <span className="text-xs px-3 py-1 rounded-full font-medium bg-live-border text-live-textPrimary">
                        EM BREVE
                      </span>
                    </div>
                    
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin className="h-4 w-4 text-live-textSecondary mt-1 flex-shrink-0" />
                      <p className="text-sm text-live-textSecondary">{location.address}</p>
                    </div>
                    
                    <p className="text-live-textSecondary mb-4 text-sm">{location.hours}</p>
                    
                    <div className="flex items-center justify-center mt-auto pt-4">
                      <span className="text-live-textTernary text-sm">
                        Inauguração em breve
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {filteredLocations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-live-textSecondary">
                Nenhuma unidade encontrada com os filtros selecionados.
              </p>
            </div>
          )}

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
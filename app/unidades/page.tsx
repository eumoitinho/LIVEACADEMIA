"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, CheckCircle, Link, MapPin } from "lucide-react"
import { locations } from "@/components/location-carousel"

export default function Unidades() {
  const [filterType, setFilterType] = useState("todos")
  const [filterService, setFilterService] = useState("todos")
  const [filterRegion, setFilterRegion] = useState("todos")
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const filteredLocations = locations.filter((loc: any) => {
    if (filterType !== "todos" && loc.type !== filterType) return false
    if (filterService !== "todos" && !loc.features.includes(filterService)) return false
    if (filterRegion !== "todos" && !loc.address.includes(filterRegion)) return false
    return true
  })

  // Criar array infinito duplicando os cards
  const infiniteLocations = [...filteredLocations, ...filteredLocations, ...filteredLocations]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredLocations.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredLocations.length) % filteredLocations.length)
  }

  // Auto-scroll infinito
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [filteredLocations.length])

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

          {/* Carrossel Infinito */}
          <div className="relative overflow-hidden">
            {/* Botões de navegação */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-live-bg/80 backdrop-blur-sm border border-live-border/30 text-live-textPrimary p-3 rounded-full hover:bg-live-accent/20 hover:border-live-accent/50 transition-all duration-300 shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-live-bg/80 backdrop-blur-sm border border-live-border/30 text-live-textPrimary p-3 rounded-full hover:bg-live-accent/20 hover:border-live-accent/50 transition-all duration-300 shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Container do carrossel */}
            <div 
              ref={carouselRef}
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                width: `${(infiniteLocations.length / 3) * 100}%`
              }}
            >
              {infiniteLocations.map((location: any, index: number) => (
                <motion.div
                  key={`${location.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4"
                >
                  <div className="bg-live-border/10 p-6 rounded-lg border border-live-border/30 hover:border-live-accent/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-live-accent/10 h-full">
                    <h3 className="text-xl font-bold text-live-textPrimary mb-2">{location.name}</h3>
                    <div className="flex items-center text-live-textSecondary mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <p className="text-sm">{location.address}</p>
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
                    <div className="flex justify-between items-center">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        location.type === 'diamante' ? 'bg-live-gray text-live-bg' :
                        location.type === 'premium' ? 'bg-live-accent text-live-bg' :
                        'bg-live-accent text-live-bg'
                      }`}>
                        {location.type.toUpperCase()}
                      </span>
                      {location.tourUrl ? (
                        <Link 
                          href={location.tourUrl} 
                          target="_blank"
                          className="text-live-accent hover:text-live-yellowLight font-semibold text-sm"
                        >
                          Tour Virtual
                        </Link>
                      ) : (
                        <span className="text-live-textTernary text-sm">Tour em breve</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-8 gap-2">
            {filteredLocations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-live-accent scale-125' 
                    : 'bg-live-border/50 hover:bg-live-border'
                }`}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link
              href="/planos"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-live-accent to-yellow-500 text-black font-bold shadow-lg hover:shadow-xl hover:shadow-live-accent/25 transition-all duration-300 transform hover:scale-105"
            >
              VER TODAS AS UNIDADES
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
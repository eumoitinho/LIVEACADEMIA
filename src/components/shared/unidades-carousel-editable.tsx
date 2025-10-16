"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useUnitsData } from '../../../hooks/use-sanity-data'
import { urlFor } from '../../../lib/sanity'
import type { Unit } from '../../../types/sanity'

const easing = [0.16, 1, 0.3, 1] as const

export default function UnidadesCarouselEditable() {
  const { data: unitsData, loading } = useUnitsData()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || unitsData.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % unitsData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, unitsData.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + unitsData.length) % unitsData.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % unitsData.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  if (loading) {
    return (
      <section className="relative py-28 px-6 lg:px-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando unidades...</p>
        </div>
      </section>
    )
  }

  if (!unitsData || unitsData.length === 0) {
    return null
  }

  const currentUnit = unitsData[currentIndex]

  return (
    <section id="unidades" className="relative py-28 px-6 lg:px-12 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-widest text-primary/70">
            Nossas Unidades
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 text-foreground">
            Encontre a unidade mais próxima
          </h2>
          <p className="text-lg text-muted-foreground mt-3 leading-relaxed">
            {unitsData.length} unidades espalhadas por Manaus para sua comodidade
          </p>
        </motion.header>

        <div className="relative">
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-3xl bg-card border border-border">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: easing }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0"
            >
              {/* Imagem */}
              <div className="relative h-96 lg:h-auto">
                {currentUnit.images && currentUnit.images.length > 0 ? (
                  <img
                    src={urlFor(currentUnit.images[0]).width(800).height(600).url()}
                    alt={currentUnit.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <MapPin className="h-16 w-16 text-primary/50" />
                  </div>
                )}
                
                {/* Badge do tipo */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {currentUnit.type}
                  </span>
                </div>

                {/* Badge de destaque */}
                {currentUnit.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      Destaque
                    </span>
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="p-8 lg:p-12">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-4">
                      {currentUnit.name}
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-foreground font-medium">{currentUnit.address}</p>
                          <p className="text-muted-foreground text-sm">
                            {currentUnit.city}, {currentUnit.state}
                            {currentUnit.zipCode && ` • ${currentUnit.zipCode}`}
                          </p>
                        </div>
                      </div>

                      {currentUnit.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                          <a 
                            href={`tel:${currentUnit.phone}`}
                            className="text-foreground hover:text-primary transition-colors"
                          >
                            {currentUnit.phone}
                          </a>
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <p className="text-muted-foreground text-sm">
                          {currentUnit.openingHours}
                        </p>
                      </div>
                    </div>

                    {currentUnit.description && (
                      <p className="text-muted-foreground mb-6">
                        {currentUnit.description}
                      </p>
                    )}

                    {/* Serviços */}
                    {currentUnit.services && currentUnit.services.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-foreground font-semibold mb-3">Serviços Disponíveis:</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentUnit.services.map((service, index) => (
                            <span
                              key={index}
                              className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {currentUnit.whatsapp && (
                      <a
                        href={`https://wa.me/${currentUnit.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors text-center"
                      >
                        WhatsApp
                      </a>
                    )}
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(currentUnit.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-colors text-center"
                    >
                      Como Chegar
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navegação */}
          {unitsData.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all"
                aria-label="Unidade anterior"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all"
                aria-label="Próxima unidade"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>

              {/* Indicadores */}
              <div className="flex justify-center gap-2 mt-8">
                {unitsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-primary scale-125'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Ir para unidade ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Lista de todas as unidades */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Todas as Unidades
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unitsData.map((unit, index) => (
              <motion.div
                key={unit._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easing, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => goToSlide(index)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-foreground font-semibold">{unit.name}</h4>
                  <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
                    {unit.type}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{unit.address}</p>
                <div className="flex gap-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                    {unit.services.length} serviços
                  </span>
                  {unit.featured && (
                    <span className="bg-amber-500/20 text-amber-600 px-2 py-1 rounded-full text-xs">
                      Destaque
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
"use client"

import { motion } from "framer-motion"
import { useModalitiesData } from "../../hooks/use-sanity-data"
import { urlFor } from "../../lib/sanity"

const easing = [0.16, 1, 0.3, 1] as const

export default function AulasColetivasPage() {
  const { data: modalitiesData, loading } = useModalitiesData()

  if (loading) {
    return (
      <main className="min-h-screen relative">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Carregando modalidades...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!modalitiesData || modalitiesData.length === 0) {
    return (
      <main className="min-h-screen relative">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-white text-lg">Nenhuma modalidade encontrada</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative py-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easing }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-widest text-primary/70">
              Aulas Coletivas
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Modalidades para Todos os Gostos
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Descubra nossas aulas coletivas e encontre a modalidade perfeita para seus objetivos
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modalidades Grid */}
      <section className="relative py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modalitiesData.map((modality, index) => (
              <motion.div
                key={modality._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easing, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                {/* Imagem da Modalidade */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/10">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                  </div>
                  {/* Badge de dificuldade */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur ${
                      modality.difficulty === 'iniciante' ? 'bg-green-500/20 text-green-400' :
                      modality.difficulty === 'intermediario' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {modality.difficulty === 'iniciante' ? 'Iniciante' :
                       modality.difficulty === 'intermediario' ? 'Intermediário' :
                       'Avançado'}
                    </span>
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-primary text-lg">🎯</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {modality.name}
                    </h3>
                  </div>

                  {modality.description && (
                    <p className="text-white/80 leading-relaxed mb-4 text-sm">
                      {modality.description}
                    </p>
                  )}

                  {/* Informações da Modalidade */}
                  <div className="space-y-3 mb-6">
                    {modality.duration && (
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        <span>Duração: {modality.duration} minutos</span>
                      </div>
                    )}
                    
                    {modality.instructor && (
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        <span>Instrutor: {modality.instructor}</span>
                      </div>
                    )}
                  </div>

                  {/* Horários */}
                  {modality.schedule && modality.schedule.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-white font-medium mb-2">Horários:</h4>
                      <div className="space-y-1">
                        {modality.schedule.slice(0, 3).map((schedule, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-white/70 text-sm">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                            <span>{schedule.day} - {schedule.time}</span>
                          </div>
                        ))}
                        {modality.schedule.length > 3 && (
                          <div className="text-white/60 text-xs">
                            +{modality.schedule.length - 3} outros horários
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Footer do Card */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-sm text-white/70">
                      Disponível
                    </span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easing }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-card/50 border border-border rounded-2xl p-8 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Escolha sua modalidade favorita e comece sua jornada fitness hoje mesmo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-primary/25">
                Ver Planos
              </button>
              <button className="border border-white/20 hover:border-primary/50 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:bg-white/5">
                Agendar Aula Experimental
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
"use client"

import { motion } from "framer-motion"
import { useStructureFeaturesData } from "../../../hooks/use-sanity-data"
import { urlFor } from "../../../lib/sanity"
import { Dumbbell } from "lucide-react"

const easing = [0.16, 1, 0.3, 1] as const

export default function EstruturaSection() {
  const { data: structureData, loading } = useStructureFeaturesData()

  if (loading) {
    return (
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando estrutura...</p>
        </div>
      </section>
    )
  }

  if (!structureData || structureData.length === 0) {
    return null
  }

  return (
    <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
      {/* Background transparente para usar o background fixo do layout */}
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400/10 px-3 py-1 text-[11px] uppercase tracking-widest text-yellow-400/70">
            Nossa Estrutura
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 text-white">
            Estrutura completa para sua evolução
          </h2>
          <p className="text-lg text-white/75 mt-3 leading-relaxed">
            Equipamentos modernos, espaços exclusivos e tecnologia de ponta em todas as nossas unidades.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {structureData.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easing, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="group bg-white/5 border border-white/20 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
            >
              {/* Imagem do Card */}
              <div className="relative h-48 bg-gradient-to-br from-yellow-400/20 to-amber-500/10">
                {item.image ? (
                  <img
                    src={urlFor(item.image).width(400).height(300).url()}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-yellow-400/30 rounded-full flex items-center justify-center">
                        <Dumbbell className="w-8 h-8 text-yellow-400" />
                      </div>
                    </div>
                  </>
                )}
                {/* Badge de categoria */}
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur">
                    Estrutura
                  </span>
                </div>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                </div>

                {item.description && (
                  <p className="text-white/75 leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}

                {/* Footer do Card */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm text-white/70">
                    Disponível
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Informação adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-white/5 border border-white/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Estrutura Completa
            </h3>
            <p className="text-white/75 leading-relaxed max-w-2xl mx-auto">
              Cada unidade Live Academia é equipada com o que há de mais moderno em equipamentos de musculação, 
              cardio e funcional, além de espaços exclusivos para aulas coletivas e áreas de descanso.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
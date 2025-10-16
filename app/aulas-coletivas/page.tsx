"use client"

import { motion } from "framer-motion"
import Image from "next/image"
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
      <section className="relative pt-32 pb-20 px-4 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Energia e motivação em grupo para você ir além
            </h2>
            <p className="text-zinc-300 text-lg max-w-4xl mx-auto">
              As aulas coletivas da Live Academia são a maneira perfeita de se exercitar, se divertir e fazer novas amizades! Com a energia contagiante do grupo, você se mantém motivado e alcança seus objetivos de forma mais prazerosa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modalidades Grid */}
      <section className="relative py-8 px-4 lg:px-12">
        <div className="max-w-[1200px] gap-4 grid grid-cols-12 mx-auto mb-12">
          {modalitiesData.map((modality, index) => (
            <motion.div
              key={modality._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="col-span-12 sm:col-span-6 lg:col-span-4 h-[430px] group flex flex-col"
            >
              <div className="relative flex-1 overflow-hidden rounded-3xl border border-zinc-800/50 hover:border-amber-400/30 transition-all duration-500 hover:transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-400/10 flex flex-col">
                {/* Header com informações */}
                <div className="absolute z-10 top-4 left-4 right-4">
                  <p className="text-xs text-white/80 uppercase font-bold tracking-wider mb-1">
                    {modality.difficulty || 'Modalidade'}
                  </p>
                  <h4 className="text-white font-bold text-2xl leading-tight drop-shadow-lg">
                    {modality.name}
                  </h4>
                </div>

                {/* Imagem de fundo */}
                {modality.image && (
                  <Image
                    src={urlFor(modality.image).url()}
                    alt={modality.name}
                    fill
                    className="z-0 object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    priority={index < 3}
                  />
                )}

                {/* Gradiente overlay com tom amarelado */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-amber-900/20 to-transparent z-[1]" />
                
                {/* Overlay amarelado adicional */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-amber-600/20 z-[2]" />
              </div>

              {/* Descrição abaixo da foto */}
              <div className="mt-4 px-2">
                <p className="text-white/90 text-sm leading-relaxed text-center">
                  {modality.description || 'Descubra esta modalidade incrível na Live Academia!'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Button */}
      <section className="relative py-8 px-4 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href="/planos"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-400 text-black font-bold hover:bg-amber-300 transition-colors duration-200 group"
            >
              <span>MATRICULE-SE AGORA</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
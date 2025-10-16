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
    <main className="min-h-screen relative bg-black">
      {/* Background com overlay */}
      <div className="fixed inset-0 z-0">
        {/* Background original (gradiente ou padrão) */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
        
        {/* Overlay com bg.jpeg */}
        <Image
          src="/bg.jpeg"
          alt="Background Overlay"
          fill
          className="object-cover opacity-30"
          priority
        />
        
        {/* Overlay escuro para contraste */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 lg:px-12 z-10">
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
      <section className="relative py-8 px-4 lg:px-12 z-10">
        <div className="max-w-[1200px] gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto mb-12">
          {modalitiesData.map((modality, index) => (
            <motion.article
              key={modality._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden sm:rounded-3xl min-h-[380px] sm:min-h-[440px] md:min-h-[500px] p-5 sm:p-6 md:p-7 flex flex-col text-white bg-amber-500 border-zinc-900 border rounded-2xl group hover:bg-amber-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
            >
              {/* Header com ícone e número */}
              <div className="flex items-center justify-between text-white/90 mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
                <span className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Título */}
              <h3 className="text-2xl sm:text-3xl tracking-tight font-semibold mb-2">
                {modality.name}
              </h3>

              {/* Descrição */}
              <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-5">
                {modality.description || 'Descubra esta modalidade incrível na Live Academia e transforme sua rotina de exercícios!'}
              </p>

              {/* Imagem da modalidade */}
              <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-white/10 ring-1 ring-white/20 mb-6 flex-1">
                {modality.image ? (
                  <Image
                    src={urlFor(modality.image).url()}
                    alt={modality.name}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={index < 4}
                  />
                ) : (
                  <div className="w-full h-44 sm:h-56 md:h-64 bg-gradient-to-br from-amber-400/20 to-amber-600/30 flex items-center justify-center">
                    <svg 
                      className="w-16 h-16 text-white/40" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Footer com nível de dificuldade */}
              <div className="mt-auto pt-4 flex items-center gap-2 text-white/90">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4 h-4"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                <span className="text-sm font-medium">
                  {modality.difficulty || 'Intermediário'}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA Button */}
      <section className="relative py-8 px-4 lg:px-12 z-10">
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-400 text-black font-bold hover:bg-amber-300 transition-all duration-200 group hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/30"
            >
              <span>MATRICULE-SE AGORA</span>
              <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
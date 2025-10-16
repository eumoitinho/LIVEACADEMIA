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
      <section className="relative pt-40 pb-20 px-4 lg:px-12 z-10">
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
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70 rounded-2xl"
            >
              <div
                className="relative rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 p-5 lg:p-6 border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-yellow-400/40 hover:shadow-[0_0_30px_rgba(250,204,21,0.3),0_10px_30px_-5px_rgba(0,0,0,0.5)] hover:-translate-y-2 min-h-[360px]"
              >
                {/* Glow amarelo sutil no hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Imagem da modalidade */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-5 ring-1 ring-yellow-300/30">
                    {modality.image ? (
                      <Image
                        src={urlFor(modality.image).url()}
                        alt={modality.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={85}
                        className="object-cover transition-transform duration-[1600ms] group-hover:scale-110"
                        priority={index < 3}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/30 flex items-center justify-center">
                        <svg 
                          className="w-16 h-16 text-yellow-400/60" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    
                    {/* Badge sobre a imagem */}
                    <div className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white ring-1 ring-white/20 backdrop-blur-sm">
                      <span className="inline-block w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_0_2px_rgba(0,0,0,0.4)]" />
                      {modality.difficulty || 'Modalidade'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-white tracking-tight leading-snug">
                      {modality.name}
                    </h3>
                    <p className="text-sm text-zinc-300/90 line-clamp-2">
                      {modality.description || 'Descubra esta modalidade incrível na Live Academia e transforme sua rotina de exercícios!'}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-zinc-200 ring-1 ring-white/10">
                      <svg className="h-3.5 w-3.5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Aula Coletiva
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-zinc-200 ring-1 ring-white/10">
                      <svg className="h-3.5 w-3.5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Em grupo
                    </span>
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                      Live Academia
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      Modalidade disponível
                    </span>
                  </div>
                </div>

                {/* Accessible focus ring overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-focus-visible:ring-2 ring-yellow-400/60" />
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
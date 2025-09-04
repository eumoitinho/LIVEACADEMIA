"use client"

import { motion } from "framer-motion"
import { ArrowRight, Music, Bike, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const modalidadesHome = [
  {
    subtitle: "Ritmo e movimento",
    title: "Fitdance",
    description: "Ritmo e movimento para queimar calorias e liberar o estresse.",
    image: "/images/academia-1.webp",
    style: "col-span-12 sm:col-span-4"
  },
  {
    subtitle: "Simule rotas e percursos",
    title: "Top Ride",
    description: "Simule rotas, percursos e pistas de treino com técnicas de ciclismo.",
    image: "/images/academia-2.webp",
    style: "col-span-12 sm:col-span-4"
  },
  {
    subtitle: "Fortaleça seu corpo",
    title: "Pilates Solo",
    description: "Fortaleça seu corpo, melhore a postura e aumente a flexibilidade.",
    image: "/images/academia-3.webp",
    style: "col-span-12 sm:col-span-4"
  }
]

export default function ModalidadesSection() {
  return (
    <section id="servicos" className="py-20 relative overflow-hidden bg-black">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 mb-6">
            <span className="text-zinc-400 text-sm font-medium">Aulas coletivas</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Energia e motivação em grupo para você ir além
          </h2>
          <p className="text-zinc-300 text-lg max-w-4xl mx-auto">
            As aulas coletivas da Live Academia são a maneira perfeita de se exercitar, se divertir e fazer novas amizades! Com a energia contagiante do grupo, você se mantém motivado e alcança seus objetivos de forma mais prazerosa.
          </p>
        </motion.div>

        {/* Grid estilo NextUI/HeroUI */}
        <div className="max-w-[1200px] gap-4 grid grid-cols-12 mx-auto mb-12">
          {modalidadesHome.map((modalidade, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${modalidade.style} h-[350px] group`}
            >
              <div className="relative h-full overflow-hidden rounded-3xl border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:-translate-y-1">
                {/* Header com informações */}
                <div className="absolute z-10 top-4 left-4 right-4">
                  <p className="text-xs text-white/80 uppercase font-bold tracking-wider mb-1">
                    {modalidade.subtitle}
                  </p>
                  <h4 className="text-white font-bold text-2xl leading-tight drop-shadow-lg">
                    {modalidade.title}
                  </h4>
                </div>

                {/* Imagem de fundo */}
                <Image
                  src={modalidade.image}
                  alt={modalidade.title}
                  fill
                  className="z-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  quality={90}
                />
                
                {/* Gradiente overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-[1]" />

                {/* Descrição no rodapé */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <p className="text-white/90 text-sm leading-relaxed">
                    {modalidade.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/aulas-coletivas"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 group"
          >
            <span>VEJA TODAS AS MODALIDADES</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
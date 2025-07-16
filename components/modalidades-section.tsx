"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const modalidadesHome = [
  {
    subtitle: "Força e resistência",
    title: "Musculação completa",
    description: "Equipamentos modernos para todos os grupos musculares",
    image: "/images/academia-1.webp",
    style: "col-span-12 sm:col-span-4"
  },
  {
    subtitle: "Cardio intenso",
    title: "Zona aeróbica",
    description: "Esteiras, bikes e elípticos de última geração",
    image: "/images/academia-2.webp",
    style: "col-span-12 sm:col-span-4"
  },
  {
    subtitle: "Energia em grupo",
    title: "Aulas coletivas",
    description: "Zumba, Spinning, Pilates, Yoga e muito mais",
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
            <span className="text-zinc-400 text-sm font-medium">Modalidades exclusivas</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nossas <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Modalidades</span>
          </h2>
          <p className="text-zinc-300 text-lg max-w-3xl mx-auto">
            Oferecemos uma ampla variedade de atividades físicas para atender todos os seus objetivos e preferências.
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

        {/* Segunda linha com cards maiores */}
        <div className="max-w-[1200px] gap-4 grid grid-cols-12 mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="col-span-12 sm:col-span-5 h-[300px] group"
          >
            <div className="relative h-full overflow-hidden rounded-3xl border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:-translate-y-1">
              <div className="absolute z-10 top-4 left-4 right-4">
                <p className="text-xs text-yellow-400 uppercase font-bold tracking-wider mb-1">
                  Alta intensidade
                </p>
                <h4 className="text-white font-bold text-2xl leading-tight drop-shadow-lg">
                  Treino Funcional
                </h4>
              </div>
              <Image
                src="/images/academia-4.webp"
                alt="Treino Funcional"
                fill
                className="z-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-[1]" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="text-white/90 text-sm">
                  Exercícios dinâmicos que trabalham o corpo todo
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="col-span-12 sm:col-span-7 h-[300px] group"
          >
            <div className="relative h-full overflow-hidden rounded-3xl border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:-translate-y-1">
              <div className="absolute z-10 top-4 left-4 right-4">
                <p className="text-xs text-yellow-400 uppercase font-bold tracking-wider mb-1">
                  Acompanhamento exclusivo
                </p>
                <h4 className="text-white font-bold text-2xl leading-tight drop-shadow-lg">
                  Personal Trainer
                </h4>
              </div>
              <Image
                src="/images/academia-1.webp"
                alt="Personal Trainer"
                fill
                className="z-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-[1]" />
              <div className="absolute bg-white/10 backdrop-blur-md bottom-0 left-0 right-0 border-t border-zinc-100/20 z-10 p-4 flex justify-between items-center">
                <div>
                  <p className="text-white text-sm font-medium">Resultados garantidos</p>
                  <p className="text-white/80 text-xs">Treinos personalizados para seus objetivos</p>
                </div>
                <Link
                  href="/modalidades"
                  className="text-xs bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Saiba mais
                </Link>
              </div>
            </div>
          </motion.div>
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
            href="/modalidades"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 group"
          >
            <span>Ver todas as modalidades</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
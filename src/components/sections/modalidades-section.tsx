"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useModalidadesSection } from "../../hooks/use-homepage-sections"

export default function ModalidadesSection() {
  const { data: sectionData, loading } = useModalidadesSection()

  if (loading) {
    return (
      <section id="servicos" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-zinc-800 rounded w-96 mx-auto mb-4"></div>
            <div className="h-4 bg-zinc-800 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  const { header, featuredModalities, cta, displaySettings } = sectionData

  if (!displaySettings?.showOnHomepage) {
    return null
  }

  return (
    <section
      id="servicos"
      className={`py-20 relative overflow-hidden ${displaySettings?.backgroundColor || ''}`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {header.title}
          </h2>
          <p className="text-zinc-300 text-lg max-w-4xl mx-auto">
            {header.description}
          </p>
        </motion.div>

        {/* Grid estilo NextUI/HeroUI */}
        <div className="max-w-[1200px] gap-4 grid grid-cols-12 mx-auto mb-12">
          {featuredModalities.map((modalidade: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="col-span-12 sm:col-span-4 h-[350px] group"
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
                {modalidade.image?.asset?.url ? (
                  <Image
                    src={modalidade.image.asset.url}
                    alt={modalidade.image.alt || modalidade.title}
                    fill
                    className="z-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    quality={90}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900 z-0" />
                )}

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
            href={cta.url}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-400 text-black font-bold hover:bg-amber-300 transition-colors duration-200 group"
          >
            <span>{cta.text}</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
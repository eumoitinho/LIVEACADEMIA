"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useModalidadesLandingData } from "@/hooks/use-modalidades-landing-data"
import { urlFor } from "@/lib/sanity"
import { useMemo } from "react"

const defaultModalidadesHome = [
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

// Mapeamento de dificuldade para subtítulo
const difficultyLabels: Record<string, string> = {
  'iniciante': 'Perfeito para começar',
  'intermediario': 'Desafie seus limites',
  'avancado': 'Para atletas experientes'
}

export default function ModalidadesSection() {
  const { data, loading } = useModalidadesLandingData()

  // Transformar dados do Sanity para o formato do componente
  // SÓ usar fallback DEPOIS que loading terminar
  const modalidadesHome = useMemo(() => {
    // Aguardar carregamento para evitar flash de fallback
    if (loading) {
      return []
    }
    
    if (!data || !data.featuredModalidades || data.featuredModalidades.length === 0) {
      return defaultModalidadesHome
    }

    try {
      return data.featuredModalidades
        .filter((item: any) => item != null && item.active !== false)
        .slice(0, 3) // Limitar a 3 modalidades
        .map((item: any) => ({
          subtitle: item.difficulty ? difficultyLabels[item.difficulty] || item.difficulty : 'Modalidade em destaque',
          title: item.name || '',
          description: item.description || '',
          image: item.image?.asset ? urlFor(item.image).width(800).height(600).url() : '/images/academia-1.webp',
          style: "col-span-12 sm:col-span-4"
        }))
    } catch (error) {
      console.error('Error transforming modalidades data:', error)
      return defaultModalidadesHome
    }
  }, [data, loading])

  const sectionTitle = data?.title || (loading ? "" : "Energia e motivação em grupo para você ir além")
  const sectionDescription = data?.description || (loading ? "" : "As aulas coletivas da Live Academia são a maneira perfeita de se exercitar, se divertir e fazer novas amizades! Com a energia contagiante do grupo, você se mantém motivado e alcança seus objetivos de forma mais prazerosa.")
  const ctaText = data?.ctaText || "VEJA TODAS AS MODALIDADES"
  const ctaHref = data?.ctaHref || "/aulas-coletivas"

  // Não renderizar enquanto carrega para evitar flash de fallback
  if (loading) {
    return (
      <section id="servicos" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 min-h-[400px] flex items-center justify-center">
          <div className="animate-pulse text-white/30">Carregando...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="servicos" className="py-20 relative overflow-hidden">
      {/* Background transparente para usar o background fixo do layout */}
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {sectionTitle}
          </h2>
          <p className="text-zinc-300 text-lg max-w-4xl mx-auto">
            {sectionDescription}
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
                  <p className="text-xs text-white uppercase font-bold tracking-wider mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {modalidade.subtitle}
                  </p>
                  <h4 className="text-white font-bold text-2xl leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
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

                {/* Gradiente overlay - black to transparent bottom to top, with darker top for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-[1]" />

                {/* Descrição no rodapé */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
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
            href={ctaHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-400 text-black font-bold hover:bg-amber-300 transition-colors duration-200 group"
          >
            <span>{ctaText}</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Users, CheckCircle, Star, Zap, Snowflake } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

interface BeneficiosSectionProps {
  data: {
    badge: string
    title: string
    description: string
    items: Array<{
      icon: string
      title: string
      description: string
      color: string
      image: string
    }>
  }
}

export default function BeneficiosSectionEditable({ data }: BeneficiosSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHoveredIndex(0)
            setHasAnimated(true)
            // Remove auto-hover after 3 seconds
            setTimeout(() => {
              setHoveredIndex(null)
            }, 3000)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [hasAnimated])

  if (!data) return null

  // Provide defaults if data is incomplete
  const items = data.items || []

  // Mapear ícones string para componentes
  const iconMap = {
    '🛡️': ShieldCheck,
    '⭐': Star,
    '👥': Users,
    '❄️': Snowflake,
    '⚡': Zap,
    '✅': CheckCircle
  }

  const beneficios = items.map(item => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap] || ShieldCheck
  }))

  return (
    <section ref={sectionRef} id="beneficios" className="relative py-24 px-4 lg:px-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-live-accent/10 px-4 py-2 text-sm font-semibold text-live-accent border border-live-accent/20 mb-6">
            <Star className="h-4 w-4" />
            <span>{data.badge}</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            {data.title}
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </motion.div>

        {/* Expanding Cards Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex gap-1.5 bg-black w-full h-[600px] max-w-none rounded-3xl p-6 shadow-2xl"
        >
          {beneficios.map((beneficio, idx) => {
            const isHovered = hoveredIndex === idx
            const IconComponent = beneficio.icon

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  flex-1 overflow-hidden cursor-pointer transition-all duration-500
                  group bg-gray-800 h-full rounded-3xl relative flex items-center justify-center
                  ${isHovered ? 'flex-[4]' : 'flex-1'}
                `}
                style={{
                  transitionProperty: 'flex',
                  transitionTimingFunction: 'ease'
                }}
              >
                {/* Background Image */}
                <Image
                  src={beneficio.image}
                  alt={beneficio.title}
                  fill
                  quality={90}
                  className="w-full h-full object-cover rounded-3xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={idx === 0}
                />

                {/* Overlay with Content */}
                <div
                  className={`
                    card-overlay transition-opacity duration-300 flex flex-col
                    bg-gradient-to-t from-black/70 via-transparent to-transparent
                    rounded-3xl p-6 absolute inset-0 justify-end
                    ${isHovered ? 'opacity-100' : 'opacity-0'}
                  `}
                >
                  {/* Icon Badge */}
                  <div className="mb-auto pt-0">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${beneficio.color} shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-black" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-white text-xl font-medium mb-1 tracking-tight">
                      {beneficio.title}
                    </h3>
                    <p className="text-gray-200 text-sm mb-2">
                      {beneficio.description}
                    </p>
                    <p className="text-gray-400 text-xs flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Disponível em todas as unidades
                    </p>
                  </div>
                </div>

                {/* Vertical Title (when not hovered) */}
                {!isHovered && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="text-white font-bold text-xl tracking-tight whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)',
                        textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)'
                      }}
                    >
                      {beneficio.title}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-400 mb-4">
            Descubra todos os benefícios exclusivos para você
          </p>
          <a
            href="#planos"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-live-accent to-yellow-500 text-black font-bold hover:shadow-lg hover:shadow-live-accent/25 transition-all hover:scale-105"
          >
            Ver planos
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        .card-overlay {
          transition: opacity 0.3s ease;
        }
      `}</style>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Users, CheckCircle, Star, Zap, Snowflake } from "lucide-react"
import Image from "next/image"
import { useState, useCallback } from "react"

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
  const easing = [0.16, 1, 0.3, 1] as const
  const [active, setActive] = useState(0)
  const handleActivate = useCallback((idx: number) => {
    setActive(idx)
  }, [])

  if (!data) return null

  // Mapear ícones string para componentes
  const iconMap = {
    '🛡️': ShieldCheck,
    '⭐': Star,
    '👥': Users,
    '❄️': Snowflake,
    '⚡': Zap,
    '✅': CheckCircle
  }

  const beneficios = data.items.map(item => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap] || ShieldCheck
  }))

  return (
    <section id="beneficios" className="relative py-24 px-4 lg:px-10 overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Ambient background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/3 w-[540px] h-[540px] bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-amber-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            {data.title} <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">exclusivos</span>
          </h2>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* Expanding horizontal cards */}
        <div
          className="relative flex gap-1.5 w-full h-[460px] rounded-lg"
          role="tablist"
          aria-label="Benefícios da Live Academia"
        >
          {beneficios.map((beneficio, idx) => {
            const isActive = active === idx
            return (
              <div
                key={beneficio.title}
                role="tab"
                aria-selected={isActive}
                tabIndex={0}
                onMouseEnter={() => handleActivate(idx)}
                onFocus={() => handleActivate(idx)}
                onClick={() => handleActivate(idx)}
                className={[
                  'group relative overflow-hidden cursor-pointer flex flex-col justify-end rounded-md bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md',
                  'transition-[flex,background,filter] duration-500 ease-[cubic-bezier(.25,.4,.25,1)]',
                  isActive ? 'flex-[4] shadow-[0_0_0_1px_rgba(250,204,21,0.25),0_8px_28px_-6px_rgba(0,0,0,.6)]' : 'flex-[1] hover:flex-[1.5]',
                ].join(' ')}
                style={{ minWidth: 0 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={beneficio.image}
                    alt={beneficio.title}
                    fill
                    quality={85}
                    className={[
                      'object-cover transition-all duration-[900ms]',
                      isActive ? 'scale-105 opacity-80' : 'scale-100 opacity-25 group-hover:opacity-40'
                    ].join(' ')}
                    sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 600px"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/15 via-amber-500/10 to-transparent mix-blend-overlay" />
                  )}
                </div>

                {/* Icon (floating) */}
                <div className="absolute top-4 left-4 z-10">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${beneficio.color} shadow-lg shadow-yellow-500/20`}> 
                    <beneficio.icon className="w-6 h-6 text-black" />
                  </div>
                </div>

                {/* Content overlay */}
                <div className="relative z-10 p-6 flex flex-col">
                  <h3 className="text-white font-semibold tracking-tight text-lg md:text-xl mb-1">
                    {beneficio.title}
                  </h3>
                  <p
                    className={[
                      'text-sm text-zinc-300 transition-opacity duration-300 max-w-md',
                      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    ].join(' ')}
                  >
                    {beneficio.description}
                  </p>
                  <div
                    className={[
                      'mt-3 flex items-center gap-2 text-yellow-400 text-xs font-medium tracking-wide uppercase',
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
                    ].join(' ')}
                  >
                    <CheckCircle className="w-4 h-4" /> Disponível agora
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

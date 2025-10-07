

"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Users, CheckCircle, Star, Zap, Snowflake } from "lucide-react"
import Image from "next/image"
import { useState, useCallback } from "react"

const beneficios = [
  {
    icon: ShieldCheck,
    title: "Planos flexíveis",
    description: "Em qualquer plano, você treina sem fidelidade, taxas de cancelamento, manutenção ou anuidade.",
    color: "from-yellow-400 to-amber-500",
    image: "/images/academia-1.webp",
  },
  {
    icon: Star,
    title: "Espaços exclusivos",
    description: "Desfrute de áreas como Espaço Relax, Espaço Yoga e o maior Studio de Bike Indoor da região Norte com o plano Diamante.",
    color: "from-amber-500 to-yellow-600",
    image: "/images/academia-2.webp",
  },
  {
    icon: Users,
    title: "Aulas coletivas",
    description: "Diversifique seu treino com uma grade variada de aulas e aproveite o ambiente coletivo para socializar e manter a disciplina.",
    color: "from-yellow-500 to-amber-600",
    image: "/images/academia-3.webp",
  },
  {
    icon: Snowflake,
    title: "Climatização",
    description: "Treine com mais conforto nos ambientes climatizados disponíveis nas unidades Diamante, Premium e Tradicional Climatizada.",
    color: "from-yellow-400 to-amber-500",
    image: "/images/academia-4.webp",
  },
]

export default function BeneficiosSection() {
  const easing = [0.16, 1, 0.3, 1] as const
  const [active, setActive] = useState(0)
  const handleActivate = useCallback((idx: number) => {
    setActive(idx)
  }, [])

  return (
    <section className="relative py-24 px-4 lg:px-10 overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/15 to-amber-500/15 border border-yellow-500/25 backdrop-blur-lg mb-5">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium">Por que escolher a Live Academia?</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            Benefícios <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">exclusivos</span>
          </h2>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
            Tudo o que você precisa para transformar seu corpo e sua vida, com liberdade e tecnologia.
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

                {/* Subtle border highlight when active */}
                <div
                  className={[
                    'absolute inset-0 rounded-md ring-1 transition-opacity duration-500 pointer-events-none',
                    isActive ? 'ring-yellow-400/40' : 'ring-transparent group-hover:ring-zinc-700/40'
                  ].join(' ')}
                />
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 backdrop-blur-xl">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium">Experimente sem compromisso</span>
          </div>
        </div>
      </div>
    </section>
  )
}


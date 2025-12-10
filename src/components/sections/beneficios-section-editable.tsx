"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Users, CheckCircle, Star, Zap, Snowflake } from "lucide-react"
import Image from "next/image"
import { useState, useCallback, useMemo } from "react"
import { useBeneficiosSectionData } from "@/hooks/use-sanity-data"

const defaultBeneficios = [
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

export default function BeneficiosSectionEditable() {
  const { data, loading } = useBeneficiosSectionData()
  const [active, setActive] = useState(0)
  const [mobileActive, setMobileActive] = useState<number | null>(null)

  // Mapear ícones string para componentes Lucide
  const iconMap: Record<string, any> = {
    'ShieldCheck': ShieldCheck,
    'Star': Star,
    'Users': Users,
    'Snowflake': Snowflake,
    'Zap': Zap,
    'CheckCircle': CheckCircle,
  }

  const handleActivate = useCallback((idx: number) => {
    setActive(idx)
  }, [])

  // Usar dados do Sanity ou fallback - SÓ usa fallback se não estiver carregando E não houver dados
  const beneficios = useMemo(() => {
    // Se ainda está carregando, não usar fallback ainda - aguardar dados do Sanity
    if (loading) {
      return []
    }
    
    // Garantir que data.items é um array válido - só usar fallback após loading terminar
    if (!data || !data.items || !Array.isArray(data.items) || data.items.length === 0) {
      return defaultBeneficios
    }

    try {
      return data.items
        .filter((item: any) => item != null) // Filtrar valores nulos/undefined
        .map((item: any) => ({
          icon: iconMap[item.icon as keyof typeof iconMap] || ShieldCheck,
          title: item.title || '',
          description: item.description || '',
          color: item.color || 'blue',
          image: item.image?.asset?.url || '/images/academia-1.webp'
        }))
    } catch (error) {
      console.error('Error transforming beneficios data:', error)
      return defaultBeneficios
    }
  }, [data, loading])

  const sectionTitle = data?.title || (loading ? "" : "Mais do que treino, uma experiência completa")

  const easing = [0.16, 1, 0.3, 1] as const

  // Não renderizar nada enquanto está carregando (evita flash de fallback)
  if (loading) {
    return (
      <section id="beneficios" className="relative py-24 px-4 lg:px-10 overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto relative z-10 min-h-[400px] flex items-center justify-center">
          <div className="animate-pulse text-white/30">Carregando...</div>
        </div>
      </section>
    )
  }

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
            {sectionTitle}
          </h2>
        </motion.div>

        {/* Mobile: Vertical accordion cards */}
        <div className="md:hidden flex flex-col gap-3">
          {beneficios.map((beneficio, idx) => {
            const isExpanded = mobileActive === idx
            const IconComponent = beneficio.icon
            return (
              <motion.div
                key={beneficio.title}
                onClick={() => setMobileActive(isExpanded ? null : idx)}
                className="relative overflow-hidden rounded-xl bg-zinc-900/60 border border-zinc-800/50 backdrop-blur-md cursor-pointer"
                animate={{ height: isExpanded ? 'auto' : 80 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={beneficio.image}
                    alt={beneficio.title}
                    fill
                    quality={75}
                    className={[
                      'object-cover transition-all duration-500',
                      isExpanded ? 'opacity-40 scale-105' : 'opacity-20'
                    ].join(' ')}
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                </div>

                {/* Header - always visible */}
                <div className="relative z-10 flex items-center gap-4 p-4">
                  <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br ${beneficio.color} shadow-lg shadow-yellow-500/20`}>
                    <IconComponent className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-white font-semibold text-base flex-1">{beneficio.title}</h3>
                  <div className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative z-10 px-4 pb-4"
                  >
                    <p className="text-sm text-zinc-300 leading-relaxed mb-3">{beneficio.description}</p>
                    <div className="flex items-center gap-2 text-yellow-400 text-xs font-medium tracking-wide uppercase">
                      <CheckCircle className="w-4 h-4" /> Disponível agora
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Desktop: Expanding horizontal cards */}
        <div
          className="hidden md:flex relative gap-1.5 w-full h-[460px] rounded-lg"
          role="tablist"
          aria-label="Benefícios da Live Academia"
        >
          {beneficios.map((beneficio, idx) => {
            const isActive = active === idx
            const IconComponent = beneficio.icon
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

                {/* Content overlay - Vertical layout with icon on top */}
                <div className="relative z-10 p-6 flex flex-col h-full">
                  {/* Icon on top */}
                  <div className="mb-auto">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${beneficio.color} shadow-lg shadow-yellow-500/20 mb-4`}>
                      <IconComponent className="w-6 h-6 text-black" />
                    </div>
                  </div>

                  {/* Text content at bottom */}
                  <div className="flex flex-col gap-2">
                    <h3 className={[
                      'text-white font-semibold tracking-tight leading-tight mb-1 transition-all duration-300',
                      isActive
                        ? 'text-lg md:text-xl'
                        : 'text-sm md:text-base line-clamp-2'
                    ].join(' ')}>
                      {beneficio.title}
                    </h3>
                    <p
                      className={[
                        'text-sm text-zinc-300 transition-opacity duration-300 max-w-md leading-relaxed',
                        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      ].join(' ')}
                    >
                      {beneficio.description}
                    </p>
                    <div
                      className={[
                        'mt-1 flex items-center gap-2 text-yellow-400 text-xs font-medium tracking-wide uppercase transition-all duration-300',
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
                      ].join(' ')}
                    >
                      <CheckCircle className="w-4 h-4" /> Disponível agora
                    </div>
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
      </div>
    </section>
  )
}

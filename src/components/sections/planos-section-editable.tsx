"use client"

import { Check, Star, Crown, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useMemo } from "react"
import { usePlansData } from "@/src/hooks/use-sanity-data"

interface PlanosSectionProps {
  data: {
    badge: string
    title: string
    description: string
    plans: Array<{
      name: string
      price: number
      priceLabel?: string
      description?: string
      features?: string[]
      cta?: string
      ctaUrl?: string
      highlight?: boolean
      badge?: string
    }>
  }
}

const planosDefault = [
  {
    nome: "TRADICIONAL",
    preco: "119,90",
    periodo: "mês",
    descricao: "Treine em todas as unidades Tradicionais, incluindo as Tradicionais Climatizadas.",
    beneficios: [
      "Sem fidelidade",
      "Sem taxa de cancelamento",
      "Sem taxa de manutenção",
      "Sem taxa de anuidade",
      "Acesso ao app Live Academia",
      "Aulas coletivas",
      "Climatização (apenas unidades Torquato Bemol e Tiradentes)",
      "Atendimento aos domingos (consultar unidade)"
    ],
    gradient: "from-zinc-700 to-zinc-900",
    icone: Check,
    popular: false,
    destaque: false,
    cta: "MATRICULE-SE AGORA!",
    ctaUrl: "/planos"
  },
  {
    nome: "DIAMANTE",
    preco: "159,90",
    periodo: "mês",
    descricao: "Treine em todas as unidades da rede em Manaus, exceto Morada do Sol e Alphaville.",
    beneficios: [
      "Sem fidelidade",
      "Sem taxa de cancelamento",
      "Sem taxa de manutenção",
      "Sem taxa de anuidade",
      "Acesso ao app Live Academia",
      "Espaço Relax",
      "Espaço Yoga",
      "Espaço Pose",
      "Acesso ao Studio de Bike",
      "Aulas coletivas",
      "Climatização",
      "Atendimento aos domingos"
    ],
    gradient: "from-amber-500 to-yellow-600",
    icone: Crown,
    popular: true,
    destaque: true,
    badge: "O mais vendido",
    cta: "MATRICULE-SE AGORA!",
    ctaUrl: "/planos"
  }
]

export default function PlanosSectionEditable({ data }: PlanosSectionProps) {
  if (!data) return null

  const easing = [0.16, 1, 0.3, 1] as const

  // Fetch plans directly from Sanity collection (same as /planos page)
  const { data: sanityPlans, loading: plansLoading } = usePlansData()

  // Transform Sanity data to match original structure, or use defaults
  // SÓ usar fallback DEPOIS que loading terminar
  const planos = useMemo(() => {
    // Se ainda está carregando, retornar array vazio para evitar flash de fallback
    if (plansLoading) {
      return []
    }
    
    // Use Sanity plans collection first, fallback to data.plans, then to planosDefault
    const sourcePlans = (Array.isArray(sanityPlans) && sanityPlans.length > 0)
      ? sanityPlans
      : (data?.plans && Array.isArray(data.plans) && data.plans.length > 0)
        ? data.plans
        : null

    if (!sourcePlans) {
      return planosDefault
    }

    try {
      return sourcePlans
        .filter((plan: any) => plan != null) // Filtrar valores nulos/undefined
        .map((plan: any, idx: number) => ({
          nome: plan.name || `Plano ${idx + 1}`,
          preco: typeof plan.price === 'number'
            ? (plan.price / 100).toFixed(2).replace('.', ',')
            : String(plan.price || '0,00'),
          periodo: "mês",
          descricao: plan.description || '',
          beneficios: Array.isArray(plan.features) ? plan.features : [],
          gradient: plan.highlight ? "from-amber-500 to-yellow-600" : "from-zinc-700 to-zinc-900",
          icone: plan.highlight ? Crown : Check,
          popular: plan.highlight || false,
          destaque: plan.highlight || false,
          badge: plan.badge === 'mais_vendido' ? 'O mais vendido' :
                 plan.badge === 'recomendado' ? 'Recomendado' :
                 plan.badge === 'novidade' ? 'Novidade' :
                 plan.badge === 'oferta' ? 'Oferta' : plan.badge || ''
        }))
    } catch (error) {
      console.error('Error transforming plans data:', error)
      return planosDefault
    }
  }, [sanityPlans, data, plansLoading])

  // Mostrar loading state enquanto carrega
  if (plansLoading) {
    return (
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden bg-black text-white" id="planos">
        <div className="max-w-7xl mx-auto min-h-[400px] flex items-center justify-center">
          <div className="animate-pulse text-white/30">Carregando planos...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-24 px-6 lg:px-12 overflow-hidden bg-black text-white" id="planos">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black opacity-95" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(253,224,71,0.2), transparent 45%), radial-gradient(circle at 80% 0%, rgba(249,115,22,0.15), transparent 40%)'
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            {data.title ? (
              data.title
            ) : (
              <>Conheça nossos <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">planos</span></>
            )}
          </h2>
          <p className="text-lg text-white/90 font-semibold max-w-3xl mx-auto">
            {data.description || "Escolha o plano que cresce com você e se adapta às suas necessidades de treino."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {Array.isArray(planos) && planos.length > 0 ? planos.map((plano, idx) => (
            <motion.div
              key={plano.nome}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative group ${plano.destaque ? 'md:-mt-4' : ''}`}
            >
              {/* Card Container */}
              <div className={`relative h-full rounded-3xl overflow-hidden border transition-all duration-500 ${
                plano.destaque 
                  ? 'border-yellow-500/50 shadow-2xl shadow-yellow-500/10 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm' 
                  : 'border-zinc-800/50 hover:border-zinc-700/50 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm'
              }`}>
                
                {/* Popular Badge */}
                {plano.popular && (
                  <div className="absolute top-6 right-6 z-20">
                    <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {plano.badge}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Header */}
                  <div className="mb-8">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plano.gradient} flex items-center justify-center mb-4`}>
                      <plano.icone className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plano.nome}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{plano.descricao}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-zinc-400 text-lg">R$</span>
                      <span className={`text-5xl font-bold ${
                        plano.destaque 
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent' 
                          : 'text-white'
                      }`}>
                        {plano.preco}
                      </span>
                      <span className="text-zinc-400 text-lg">/{plano.periodo}</span>
                    </div>
                    <p className="text-yellow-400 text-sm font-medium mt-2">Oferta por tempo limitado</p>
                  </div>

                  {/* Benefits */}
                  <ul className="space-y-4 mb-8">
                    {Array.isArray(plano.beneficios) && plano.beneficios.length > 0 ? plano.beneficios.map((beneficio: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plano.destaque 
                            ? 'bg-yellow-500/20' 
                            : 'bg-zinc-800'
                        }`}>
                          <Check className={`w-3 h-3 ${
                            plano.destaque ? 'text-yellow-500' : 'text-zinc-400'
                          }`} />
                        </div>
                        <span className="text-zinc-300 text-sm leading-relaxed">{beneficio}</span>
                      </li>
                    )) : (
                      <li className="text-zinc-400 text-sm">Benefícios não disponíveis</li>
                    )}
                  </ul>

                  {/* CTA Button */}
                  {(plano as any).ctaUrl ? (
                    <Link
                      href={(plano as any).ctaUrl}
                      className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 inline-block text-center ${
                        plano.destaque
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-[1.02]'
                          : 'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {(plano as any).cta || 'MATRICULE-SE AGORA!'}
                    </Link>
                  ) : (
                    <button className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      plano.destaque
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-[1.02]'
                        : 'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                    }`}>
                      {(plano as any).cta || 'MATRICULE-SE AGORA!'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-2 text-center py-12 text-zinc-400">
              <p>Carregando planos...</p>
            </div>
          )}
        </div>

        {/* Footnote */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: easing }}
          viewport={{ once: true }}
          className="flex flex-col text-center mt-12 items-center"
        >
          <p className="text-xs text-zinc-500">
            Os preços, serviços e condições promocionais podem variar de acordo com a unidade escolhida.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

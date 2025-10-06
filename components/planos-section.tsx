"use client"

import { Check, Star, Crown, Clock, ArrowUpRight, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { PlanosSectionData, PlanCardData } from "@/types/cms-sections"

interface Props { data?: PlanosSectionData }

// Provide a rich fallback mirroring previous static content if CMS empty
const fallbackPlans: PlanCardData[] = [
  {
    name: "TRADICIONAL",
    price: "119,90",
    features: [
      "Sem fidelidade",
      "Sem taxa de cancelamento",
      "Sem taxa de manutenção",
      "Sem taxa de anuidade",
      "Acesso ao app Live Academia",
      "Aulas coletivas"
    ],
    ctaLabel: "Matricule-se",
    ctaHref: "/planos",
    highlight: false
  },
  {
    name: "DIAMANTE",
    price: "159,90",
    features: [
      "Sem fidelidade",
      "Sem taxa de cancelamento",
      "Sem taxa de manutenção",
      "Sem taxa de anuidade",
      "Acesso ao app Live Academia",
      "Espaço Relax",
      "Aulas coletivas"
    ],
    ctaLabel: "Matricule-se",
    ctaHref: "/planos",
    highlight: true
  }
]

export default function PlanosSection({ data }: Props) {
  const easing = [0.16, 1, 0.3, 1] as const
  const heading = data?.heading || "Conheça nossos planos"
  const planos = (data?.planos?.length ? data.planos : fallbackPlans).map((p, idx) => ({
    ...p,
    numero: (idx + 1).toString().padStart(2, '0'),
    dots: [true, true, p.highlight],
    setup: p.highlight ? 'Setup em 12 horas' : 'Setup em 24 horas',
    badge: p.highlight ? 'O mais vendido' : undefined,
    destaque: p.highlight,
    beneficios: p.features || []
  }))

  return (
    <section className="relative py-24 px-6 lg:px-12 overflow-hidden bg-black" id="planos">
      {/* Background Effects */}
      <div className="absolute inset-0">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/70 border border-zinc-800 text-zinc-300 backdrop-blur-xl mb-6">
            <Crown className="h-4 w-4" />
            <span className="text-xs font-normal">Planos sem pegadinha</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            {heading.split(/planos/i).length > 1 ? (
              <>
                {heading.replace(/planos.*/i, '').trim()} {" "}
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">planos</span>
              </>
            ) : (
              heading
            )}
          </h2>
          <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
            Escolha o plano que cresce com você e se adapta às suas necessidades de treino.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {planos.map((plano: any, idx: number) => (
            <motion.article
              key={plano.name || plano.nome}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: easing }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-2xl pt-5 pr-5 pb-5 pl-5 backdrop-blur-xl ${plano.destaque
                  ? 'bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 border-white/20 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]'
                  : 'bg-gradient-to-b from-zinc-900/70 to-zinc-950/80 border-white/10'
                }`}
            >
              {/* Popular Badge */}
              {plano.destaque && (
                <div className="absolute right-4 top-4">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold">
                    <Star className="h-3 w-3" />
                    {plano.badge || 'Destaque'}
                  </div>
                </div>
              )}

              {/* Top meta */}
              <div className="flex items-center justify-between text-xs mb-5">
                <div className="inline-flex items-center gap-2 text-zinc-400">
                  <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full backdrop-blur ${plano.destaque ? 'bg-zinc-950/80 ring-1 ring-yellow-500/20 text-zinc-300' : 'bg-zinc-950/80 ring-1 ring-white/10 text-zinc-300'
                    }`}>
                    {plano.numero}
                  </span>
                  <div className="flex items-center gap-1">
                    {plano.dots.map((dot: boolean, i: number) => (
                      <span
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full ${plano.destaque
                            ? dot ? 'bg-yellow-500/80' : 'bg-yellow-500/40'
                            : dot ? 'bg-yellow-500/80' : 'bg-yellow-500/20'
                          }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 text-zinc-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{plano.setup}</span>
                </div>
              </div>

              {/* Core */}
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl text-white font-medium tracking-tight">{plano.name || plano.nome}</h3>
                  {plano.descricao && <p className="mt-1 text-sm text-zinc-400">{plano.descricao}</p>}
                </div>
                <div className="text-right">
                  {plano.price && <p className="text-2xl sm:text-3xl text-white font-medium tracking-tight">R$ {plano.price}</p>}
                </div>
              </div>

              <Link
                href={plano.ctaHref || '/planos'}
                className={`inline-flex items-center justify-center gap-2 h-11 w-full rounded-full text-sm font-normal transition backdrop-blur mb-6 ${plano.destaque
                  ? 'bg-white/90 text-zinc-900 hover:bg-white'
                  : 'bg-white/90 text-zinc-900 hover:bg-white'
                }`}
              >
                {plano.ctaLabel || 'Matricule-se'}
                {plano.destaque ? <Zap className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
              </Link>

              {/* Features */}
              <div>
                <p className="text-xs text-zinc-400 mb-3">Tudo que você precisa:</p>
                <ul className="space-y-3">
                  {(plano.beneficios as string[]).slice(0, 3).map((beneficio: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center backdrop-blur ${plano.destaque ? 'bg-zinc-900/70 border border-yellow-500/20' : 'bg-zinc-900/70 border border-white/10'
                        }`}>
                        <Check className="h-3.5 w-3.5 text-green-400" />
                      </span>
                      <span className="text-sm text-zinc-300">{beneficio}</span>
                    </li>
                  ))}
                  {(plano.beneficios as string[]).length > 3 && (
                    <li className="flex items-start gap-3">
                      <span className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center backdrop-blur ${plano.destaque ? 'bg-zinc-900/70 border border-yellow-500/20' : 'bg-zinc-900/70 border border-white/10'
                        }`}>
                        <span className="text-xs text-zinc-400">+{(plano.beneficios as string[]).length - 3}</span>
                      </span>
                      <span className="text-sm text-zinc-300">mais benefícios inclusos</span>
                    </li>
                  )}
                </ul>
              </div>
            </motion.article>
          ))}
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
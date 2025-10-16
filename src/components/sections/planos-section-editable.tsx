"use client"

import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"

const easing = [0.16, 1, 0.3, 1] as const

const plans = [
  {
    id: 'tradicional',
    name: 'TRADICIONAL',
    description: 'Treine em todas as unidades Tradicionais, incluindo as Tradicionais Climatizadas.',
    price: '119,90',
    priceLabel: 'Oferta por tempo limitado',
    features: [
      'Sem fidelidade',
      'Sem taxa de cancelamento',
      'Sem taxa de manutenção',
      'Sem taxa de anuidade',
      'Acesso ao app Live Academia',
      'Aulas coletivas',
      'Climatização (apenas unidades Torquato Bemol e Tiradentes)',
      'Atendimento aos domingos (consultar unidade)'
    ],
    cta: 'MATRICULE-SE AGORA',
    highlight: false
  },
  {
    id: 'diamante',
    name: 'DIAMANTE',
    badge: 'O mais vendido',
    description: 'Treine em todas as unidades da rede em Manaus, exceto Morada do Sol e Alphaville.',
    price: '159,90',
    priceLabel: 'Oferta por tempo limitado',
    features: [
      'Sem fidelidade',
      'Sem taxa de cancelamento',
      'Sem taxa de manutenção',
      'Sem taxa de anuidade',
      'Acesso ao app Live Academia',
      'Espaço Relax',
      'Espaço Yoga',
      'Espaço Pose',
      'Acesso ao Studio de Bike',
      'Aulas coletivas',
      'Climatização',
      'Atendimento aos domingos'
    ],
    cta: 'MATRICULE-SE AGORA',
    highlight: true
  }
]

export default function PlanosSectionEditable() {
  return (
    <section id="planos" className="isolate overflow-hidden pt-24 pb-24 relative">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)]" />

      <div className="z-10 max-w-7xl mx-auto px-6 md:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-bold text-white tracking-tight"
          >
            Conheça nossos planos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-white/70 mt-4"
          >
            Escolha o plano que melhor se adapta às suas necessidades e comece sua jornada fitness hoje mesmo.
          </motion.p>
        </div>

        {/* Plans Grid */}
        <div className="grid gap-6 lg:grid-cols-2 mt-10">
          {plans.map((plano, index) => (
            <motion.div
              key={plano.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.3 + (index * 0.1) }}
              viewport={{ once: true }}
              className={plano.highlight
                ? "border-white/10 border ring-amber-300/10 ring-1 rounded-3xl p-2 relative backdrop-blur-xl shadow-[0_20px_60px_rgba(251,191,36,0.15)]"
                : "border-white/10 border rounded-3xl p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
              }
            >
              {plano.highlight ? (
                // DIAMANTE - Featured card
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src="/GewRZyFPrEAvawLIj3Eynw==.jpg"
                      alt="Premium background"
                      className="h-48 w-full rounded-t-2xl object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_0%,rgba(251,191,36,0.25),transparent_60%)]" />
                  </div>

                  <div className="relative p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-bold uppercase tracking-[0.18em] text-white/80 drop-shadow-sm">
                          {plano.name}
                        </div>
                        <div className="mt-2 flex items-end gap-2">
                          <div className="text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                            R$ {plano.price}
                          </div>
                          <div className="text-sm font-semibold text-white/70 mb-1">/mês</div>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1.5 text-[11px] font-bold text-amber-300 ring-1 ring-amber-300/30 shadow-lg">
                        <Star className="h-3.5 w-3.5 fill-amber-300" />
                        {plano.badge}
                      </span>
                    </div>

                    <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-amber-300 to-amber-400 px-4 py-3.5 text-sm font-bold tracking-tight text-black shadow-[0_10px_30px_rgba(251,191,36,0.35)] hover:from-amber-200 hover:to-amber-300 hover:shadow-[0_15px_40px_rgba(251,191,36,0.45)] hover:scale-[1.02] transition-all">
                      {plano.cta}
                    </button>

                    <p className="mt-5 text-sm font-medium text-white/80 leading-relaxed">
                      {plano.description}
                    </p>

                    <ul className="mt-6 space-y-3 text-sm text-white/90">
                      {plano.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5 drop-shadow-sm" />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-xs font-semibold text-white/60 mt-5">
                      {plano.priceLabel}
                    </p>
                  </div>
                </div>
              ) : (
                // TRADICIONAL - Standard card
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold uppercase tracking-[0.18em] text-white/70 drop-shadow-sm">
                        {plano.name}
                      </div>
                      <div className="mt-2 flex items-end gap-2">
                        <div className="text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                          R$ {plano.price}
                        </div>
                        <div className="text-sm font-semibold text-white/60 mb-1">/mês</div>
                      </div>
                    </div>
                  </div>

                  <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 text-sm font-bold tracking-tight text-black shadow-[0_8px_20px_rgba(255,255,255,0.15)] hover:bg-white/95 hover:shadow-[0_12px_30px_rgba(255,255,255,0.25)] hover:scale-[1.02] transition-all">
                    {plano.cta}
                  </button>

                  <p className="mt-5 text-sm font-medium text-white/75 leading-relaxed">
                    {plano.description}
                  </p>

                  <ul className="mt-6 space-y-3 text-sm text-white/85">
                    {plano.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5 drop-shadow-sm" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs font-semibold text-white/55 mt-5">
                    {plano.priceLabel}
                  </p>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true }}
          className="text-xs text-white/50 text-center mt-6"
        >
          Os preços, serviços e condições promocionais podem variar de acordo com a academia escolhida.
        </motion.p>
      </div>
    </section>
  )
}

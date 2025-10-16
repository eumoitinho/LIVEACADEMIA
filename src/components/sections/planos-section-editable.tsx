"use client"

import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import { usePlansData } from '../../../hooks/use-sanity-data'
import type { PlanosSection } from '../../../types/sanity'

const easing = [0.16, 1, 0.3, 1] as const

interface PlanosSectionEditableProps {
  data: PlanosSection
}

export default function PlanosSectionEditable({ data }: PlanosSectionEditableProps) {
  const { data: plansData, loading } = usePlansData()

  if (!data || loading) return null

  const plans = plansData.length > 0 ? plansData : data.plans

  return (
    <section id="planos" className="relative py-28 px-6 lg:px-12 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-widest text-primary/70">
            {data.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 text-foreground">
            {data.title}
          </h2>
          <p className="text-lg text-muted-foreground mt-3 leading-relaxed">
            {data.description}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easing, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className={`relative rounded-3xl p-8 ${
                plan.highlight
                  ? 'bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 shadow-2xl shadow-primary/10'
                  : 'bg-card border border-border'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-6 py-2 rounded-full text-sm font-bold">
                    {plan.badge === 'mais_vendido' ? 'O mais vendido' : 
                     plan.badge === 'recomendado' ? 'Recomendado' :
                     plan.badge === 'novidade' ? 'Novidade' :
                     plan.badge === 'oferta' ? 'Oferta' : plan.badge}
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {plan.description}
                </p>
                
                <div className="mb-4">
                  <div className="text-4xl font-bold text-foreground">
                    R$ {(plan.price / 100).toFixed(2).replace('.', ',')}
                  </div>
                  {plan.priceLabel && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {plan.priceLabel}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  plan.highlight
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Informações adicionais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-primary" />
            <span>Sem taxa de cancelamento</span>
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground ml-6">
            <Check className="h-4 w-4 text-primary" />
            <span>Sem fidelidade</span>
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground ml-6">
            <Check className="h-4 w-4 text-primary" />
            <span>Sem taxa de anuidade</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
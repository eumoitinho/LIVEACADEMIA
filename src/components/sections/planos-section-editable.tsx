"use client"

import { motion } from "framer-motion"
import { Check, Star, Crown, Sparkles, Clock, ArrowUpRight, Zap, MessagesSquare } from "lucide-react"
import Image from "next/image"
import { urlFor } from "../../../lib/sanity"
import type { PlanosSection as PlanosSectionType } from "../../../types/sanity"

interface PlanosSectionProps {
  data: PlanosSectionType
}

const iconMap = {
  Check,
  Star,
  Crown,
  Sparkles,
  Clock,
  ArrowUpRight,
  Zap,
  MessagesSquare
}

export default function PlanosSectionEditable({ data }: PlanosSectionProps) {
  const easing = [0.16, 1, 0.3, 1] as const

  if (!data) return null

  return (
    <section id="planos" className="relative py-24 px-6 lg:px-12 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,203,0,0.08),transparent_70%)]" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-yellow-400/70 font-semibold mb-4 block">
            {data.badge}
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {data.title}
          </h2>
          <p className="text-lg lg:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {data.plans.map((plano, index) => {
            const IconComponent = iconMap[plano.badge as keyof typeof iconMap] || Check
            
            return (
              <motion.div
                key={plano.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easing, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative group ${
                  plano.highlight ? 'lg:scale-105' : ''
                }`}
              >
                {/* Card */}
                <div className={`relative p-8 rounded-3xl border-2 transition-all duration-300 ${
                  plano.highlight
                    ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-500/5 to-amber-500/5'
                    : 'border-white/10 bg-gradient-to-br from-white/5 to-white/10'
                } backdrop-blur-sm hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10`}>
                  
                  {/* Popular Badge */}
                  {plano.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold text-sm rounded-full flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        {plano.badge}
                      </div>
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {plano.name}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {plano.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl lg:text-5xl font-black text-white">
                        R$ {plano.price}
                      </span>
                      <span className="text-lg text-zinc-400">
                        /{plano.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plano.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Check className="w-3 h-3 text-yellow-400" />
                        </div>
                        <span className="text-zinc-300 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    plano.highlight
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600 hover:shadow-lg hover:shadow-yellow-500/25'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30'
                  } group`}>
                    <span className="flex items-center justify-center gap-2">
                      {plano.cta}
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-yellow-500/10 rounded-full blur-xl" />
                <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-amber-500/10 rounded-full blur-xl" />
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-zinc-400 mb-6">
            Sem fidelidade • Sem taxa de cancelamento • Sem pegadinha
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-2xl hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 transform hover:scale-105">
              Quero me matricular
            </button>
            <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-2xl hover:border-white/50 hover:bg-white/10 transition-all duration-300">
              Falar com consultor
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

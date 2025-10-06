"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, CreditCard, ShieldCheck, Globe } from "lucide-react"

interface PlanoItem {
  name: string
  price: string
  codigo?: string
}

interface PlanosCardsProps {
  planos: Array<PlanoItem>
  unidadeName: string
  onMatricular: (plano: PlanoItem) => void
}

export default function PlanosCards({ planos, unidadeName, onMatricular }: PlanosCardsProps) {
  if (!planos || planos.length === 0) {
    return null
  }

  const isPremiumPlan = (name: string) => name.toLowerCase().includes('premium') || name.toLowerCase().includes('diamante')

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {planos.map((plano, index) => {
        const premium = isPremiumPlan(plano.name)

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className={`relative rounded-3xl overflow-hidden ${
              premium
                ? 'bg-live-yellow border-2 border-live-yellowLight'
                : 'bg-white/5 border border-white/10'
            } hover:scale-105 transition-all duration-300 shadow-2xl`}
          >
            {/* Popular Badge */}
            {premium && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-black text-live-yellow px-4 py-1 rounded-full text-xs font-bold uppercase">
                  Mais Popular
                </span>
              </div>
            )}

            {/* Card Header */}
            <div className={`p-8 text-center ${premium ? 'bg-black/5' : 'bg-white/5'}`}>
              <h3 className={`text-2xl font-bold mb-2 ${premium ? 'text-black' : 'text-white'}`}>
                {plano.name}
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`text-5xl font-bold ${premium ? 'text-black' : 'text-live-yellow'}`}>
                  R$ {plano.price}
                </span>
                <span className={`text-lg ${premium ? 'text-black/60' : 'text-gray-400'}`}>/mês</span>
              </div>
            </div>

            {/* Features */}
            <div className="p-8 space-y-4">
              <div className="flex items-start gap-3">
                <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${premium ? 'text-black' : 'text-live-yellow'}`} />
                <span className={`text-sm ${premium ? 'text-black' : 'text-gray-300'}`}>
                  Sem taxa de matrícula
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${premium ? 'text-black' : 'text-live-yellow'}`} />
                <span className={`text-sm ${premium ? 'text-black' : 'text-gray-300'}`}>
                  Sem fidelidade
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${premium ? 'text-black' : 'text-live-yellow'}`} />
                <span className={`text-sm ${premium ? 'text-black' : 'text-gray-300'}`}>
                  Acesso via app Live
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${premium ? 'text-black' : 'text-live-yellow'}`} />
                <span className={`text-sm ${premium ? 'text-black' : 'text-gray-300'}`}>
                  Todas as modalidades
                </span>
              </div>
              {premium && (
                <>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-black" />
                    <span className="text-sm text-black">
                      Ambiente climatizado
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-black" />
                    <span className="text-sm text-black">
                      Espaços exclusivos
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* CTA Button */}
            <div className="p-8 pt-0">
              <button
                onClick={() => onMatricular(plano)}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                  premium
                    ? 'bg-black text-live-yellow hover:bg-black/90 shadow-[0_8px_30px_rgb(0,0,0,0.4)]'
                    : 'bg-live-yellow text-black hover:bg-live-yellowLight shadow-[0_8px_30px_rgba(255,203,0,0.3)]'
                } hover:scale-105 flex items-center justify-center gap-2`}
              >
                <CreditCard className="h-5 w-5" />
                COMEÇAR AGORA
              </button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
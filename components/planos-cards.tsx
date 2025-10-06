"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, CreditCard, X, ChevronDown } from "lucide-react"

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

  // Separar planos
  const premiumPlano = planos.find(p => isPremiumPlan(p.name))
  const normalPlano = planos.find(p => !isPremiumPlan(p.name))

  if (!premiumPlano || !normalPlano) {
    return null
  }

  const features = [
    {
      section: 'Benefícios Principais',
      items: [
        { label: 'Sem taxa de matrícula', normal: true, premium: true },
        { label: 'Sem fidelidade', normal: true, premium: true },
        { label: 'Acesso via app Live', normal: true, premium: true },
        { label: 'Todas as modalidades', normal: true, premium: true },
      ]
    },
    {
      section: 'Estrutura Premium',
      items: [
        { label: 'Ambiente climatizado', normal: false, premium: true },
        { label: 'Espaços exclusivos', normal: false, premium: true },
        { label: 'Equipamentos premium', normal: false, premium: true },
        { label: 'Vestiários VIP', normal: false, premium: true },
      ]
    },
    {
      section: 'Serviços',
      items: [
        { label: 'Avaliação física', normal: true, premium: true },
        { label: 'App de treinos', normal: true, premium: true },
        { label: 'Suporte prioritário', normal: false, premium: true },
        { label: 'Personal trainer', normal: false, premium: true },
      ]
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Comparison Table */}
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-live-bg/50 backdrop-blur-sm">
        {/* Header */}
        <div className="grid grid-cols-3 border-b border-white/10">
          <div className="p-6 bg-black/20"></div>

          {/* Normal Plan Header */}
          <div className="p-6 border-l border-white/10 text-center bg-black/20 hover:bg-black/30 transition-all">
            <div className="text-lg font-medium text-white">{normalPlano.name}</div>
            <div className="mt-2 text-4xl font-bold text-live-yellow">R$ {normalPlano.price}</div>
            <div className="mt-1 text-gray-400 text-sm">/mês</div>
          </div>

          {/* Premium Plan Header */}
          <div className="p-6 border-l border-white/10 text-center bg-live-yellow/10 relative hover:bg-live-yellow/15 transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-live-yellow to-live-yellowLight"></div>
            <div className="text-lg font-medium text-white">{premiumPlano.name}</div>
            <div className="mt-2 text-4xl font-bold text-live-yellow">R$ {premiumPlano.price}</div>
            <div className="mt-1 text-gray-400 text-sm">/mês</div>
            <div className="mt-2 inline-block rounded-full bg-live-yellow/20 px-3 py-1 text-xs text-live-yellow ring-1 ring-live-yellow/30 font-bold">
              MAIS POPULAR
            </div>
          </div>
        </div>

        {/* Features Sections */}
        {features.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {/* Section Header */}
            <div className="grid grid-cols-3 border-b border-white/10">
              <div className="p-6 bg-black/30" colSpan={3}>
                <span className="text-xs font-semibold uppercase tracking-wider text-live-yellow">{section.section}</span>
              </div>
              <div className="p-6 border-l border-white/10 bg-black/30"></div>
              <div className="p-6 border-l border-white/10 bg-black/30"></div>
            </div>

            {/* Feature Rows */}
            {section.items.map((feature, featureIndex) => (
              <div key={featureIndex} className="grid grid-cols-3 border-b border-white/10 hover:bg-white/5 transition-colors">
                <div className="p-5 flex items-center">
                  <span className="text-sm text-white">{feature.label}</span>
                </div>

                <div className="p-5 border-l border-white/10 flex justify-center items-center">
                  {feature.normal ? (
                    <Check className="h-5 w-5 text-live-yellow" />
                  ) : (
                    <X className="h-5 w-5 text-gray-600" />
                  )}
                </div>

                <div className="p-5 border-l border-white/10 flex justify-center items-center bg-live-yellow/5">
                  {feature.premium ? (
                    <Check className="h-5 w-5 text-live-yellow" />
                  ) : (
                    <X className="h-5 w-5 text-gray-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Footer - CTA Buttons */}
        <div className="grid grid-cols-3">
          <div className="p-6"></div>
          <div className="p-6 border-l border-white/10 flex justify-center">
            <button
              onClick={() => onMatricular(normalPlano)}
              className="w-full py-3 px-4 border border-live-yellow/30 rounded-xl text-sm font-bold text-live-yellow hover:bg-live-yellow/10 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              MATRICULAR
            </button>
          </div>
          <div className="p-6 border-l border-white/10 flex justify-center bg-live-yellow/5">
            <button
              onClick={() => onMatricular(premiumPlano)}
              className="w-full py-3 px-4 bg-live-yellow rounded-xl text-sm font-bold text-black hover:bg-live-yellowLight transition-all duration-200 shadow-[0_8px_30px_rgba(255,203,0,0.3)] hover:scale-105 flex items-center justify-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              COMEÇAR AGORA
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center text-gray-400 text-sm">
        Todos os planos incluem acesso ilimitado e suporte via WhatsApp.
        <span className="text-live-yellow ml-1 cursor-pointer hover:text-live-yellowLight transition-colors">Saiba mais</span>
      </div>
    </div>
  )
}
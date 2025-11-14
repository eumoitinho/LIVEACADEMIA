"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Sparkles, Crown, CreditCard, X, ChevronDown } from "lucide-react"

interface PlanoItem {
  name: string
  price: string
  codigo?: string
  adesao?: number
  fidelidade?: number
  regimeRecorrencia?: boolean
  modalidades?: string[]
}

interface PlanosCardsProps {
  planos: Array<PlanoItem>
  unidadeName: string
  onMatricular: (plano: PlanoItem) => void
}

export default function PlanosCards({ planos, unidadeName, onMatricular }: PlanosCardsProps) {
  const [showComparison, setShowComparison] = useState(false)

  if (!planos || planos.length === 0) {
    return null
  }

  const easing = [0.16, 1, 0.3, 1] as const

  const isPremiumPlan = (name: string) => {
    const nameLower = name.toLowerCase()
    return nameLower.includes('premium') || nameLower.includes('diamante') || nameLower.includes('diamond')
  }

  // Separar e preparar planos
  const preparedPlanos = planos.map((plano) => {
    const isPremium = isPremiumPlan(plano.name)
    return {
      ...plano,
      nome: plano.name,
      preco: plano.price.replace('.', ',').replace(/(\d)(\d{2})$/, '$1,$2'), // Garantir formato brasileiro
      periodo: 'mês',
      descricao: isPremium 
        ? `Treine em todas as unidades Premium e Diamante da rede Live Academia.`
        : `Treine em todas as unidades Tradicionais e Premium da rede Live Academia.`,
      beneficios: [
        'Sem taxa de matrícula',
        'Sem fidelidade',
        'Sem taxa de cancelamento',
        'Acesso ao app Live Academia',
        'Todas as modalidades',
        isPremium ? 'Ambiente climatizado' : null,
        isPremium ? 'Espaços exclusivos' : null,
        isPremium ? 'Equipamentos premium' : null,
      ].filter(Boolean) as string[],
      gradient: isPremium ? "from-amber-500 to-yellow-600" : "from-zinc-700 to-zinc-900",
      icone: isPremium ? Crown : Check,
      popular: isPremium,
      destaque: isPremium,
      badge: isPremium ? 'O mais vendido' : undefined
    }
  })

  // Ordenar: premium primeiro
  preparedPlanos.sort((a, b) => {
    if (a.destaque && !b.destaque) return -1
    if (!a.destaque && b.destaque) return 1
    return 0
  })

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Cards de Preço - Design da Home */}
      <div className="grid md:grid-cols-2 gap-8">
        {preparedPlanos.slice(0, 2).map((plano, idx) => (
          <motion.div
            key={plano.codigo || plano.nome}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`relative group ${plano.destaque ? 'md:-mt-4' : ''}`}
          >
            {/* Card Container */}
            <div className={`relative h-full rounded-3xl overflow-hidden border transition-all duration-500 ${
              plano.destaque 
                ? 'border-yellow-500/50 shadow-2xl shadow-yellow-500/10 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm' 
                : 'border-zinc-800/50 hover:border-zinc-700/50 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm'
            }`}>
              
              {/* Popular Badge */}
              {plano.popular && plano.badge && (
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
                  {plano.adesao && plano.adesao > 0 && (
                    <div className="mt-2 text-sm text-zinc-400">
                      + Taxa de adesão: R$ {plano.adesao.toFixed(2).replace('.', ',')}
                    </div>
                  )}
                  {plano.fidelidade && plano.fidelidade > 0 && (
                    <div className="mt-1 text-sm text-zinc-400">
                      Fidelidade: {plano.fidelidade} meses
                    </div>
                  )}
                  {(!plano.adesao || plano.adesao === 0) && (!plano.fidelidade || plano.fidelidade === 0) && (
                    <p className="text-yellow-400 text-sm font-medium mt-2">Sem taxas adicionais</p>
                  )}
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
                <button 
                  onClick={() => onMatricular(plano)}
                  className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    plano.destaque
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-[1.02]'
                      : 'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  MATRICULE-SE AGORA!
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Botão Comparar - Só aparece se houver 2 planos */}
      {preparedPlanos.length >= 2 && (
        <div className="text-center">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            {showComparison ? 'Ocultar comparação' : 'Comparar planos'}
            <ChevronDown className={`h-4 w-4 transition-transform ${showComparison ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}

      {/* Tabela de Comparação */}
      {showComparison && preparedPlanos.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ComparisonTable
            normalPlano={preparedPlanos.find(p => !p.destaque) || preparedPlanos[1]}
            premiumPlano={preparedPlanos.find(p => p.destaque) || preparedPlanos[0]}
            onMatricular={onMatricular}
          />
        </motion.div>
      )}

      {/* Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-xs text-zinc-500">
          Os preços, serviços e condições promocionais podem variar de acordo com a unidade escolhida.
        </p>
      </div>
    </div>
  )
}

// Componente da Tabela de Comparação
function ComparisonTable({ normalPlano, premiumPlano, onMatricular }: {
  normalPlano: any
  premiumPlano: any
  onMatricular: (plano: PlanoItem) => void
}) {
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
        { label: 'Ambiente climatizado', normal: false, premium: premiumPlano.destaque },
        { label: 'Espaços exclusivos', normal: false, premium: premiumPlano.destaque },
        { label: 'Equipamentos premium', normal: false, premium: premiumPlano.destaque },
        { label: 'Vestiários VIP', normal: false, premium: premiumPlano.destaque },
      ]
    },
    {
      section: 'Serviços',
      items: [
        { label: 'Avaliação física', normal: true, premium: true },
        { label: 'App de treinos', normal: true, premium: true },
        { label: 'Suporte prioritário', normal: false, premium: premiumPlano.destaque },
        { label: 'Personal trainer', normal: false, premium: premiumPlano.destaque },
      ]
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Comparison Table */}
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 backdrop-blur-sm">
        {/* Header */}
        <div className="grid grid-cols-3 border-b border-white/10">
          <div className="p-6 bg-black/20"></div>

          {/* Normal Plan Header */}
          <div className="p-6 border-l border-white/10 text-center bg-black/20 hover:bg-black/30 transition-all">
            <div className="text-lg font-medium text-white">{normalPlano.nome}</div>
            <div className="mt-2 text-4xl font-bold text-yellow-400">R$ {normalPlano.preco}</div>
            <div className="mt-1 text-gray-400 text-sm">/mês</div>
            {normalPlano.adesao && normalPlano.adesao > 0 && (
              <div className="mt-1 text-xs text-gray-400">
                + Adesão: R$ {normalPlano.adesao.toFixed(2).replace('.', ',')}
              </div>
            )}
            {normalPlano.fidelidade && normalPlano.fidelidade > 0 && (
              <div className="mt-1 text-xs text-gray-400">
                Fidelidade: {normalPlano.fidelidade}m
              </div>
            )}
          </div>

          {/* Premium Plan Header */}
          <div className="p-6 border-l border-white/10 text-center bg-yellow-500/10 relative hover:bg-yellow-500/15 transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
            <div className="text-lg font-medium text-white">{premiumPlano.nome}</div>
            <div className="mt-2 text-4xl font-bold text-yellow-400">R$ {premiumPlano.preco}</div>
            <div className="mt-1 text-gray-400 text-sm">/mês</div>
            {premiumPlano.adesao && premiumPlano.adesao > 0 && (
              <div className="mt-1 text-xs text-gray-400">
                + Adesão: R$ {premiumPlano.adesao.toFixed(2).replace('.', ',')}
              </div>
            )}
            {premiumPlano.fidelidade && premiumPlano.fidelidade > 0 && (
              <div className="mt-1 text-xs text-gray-400">
                Fidelidade: {premiumPlano.fidelidade}m
              </div>
            )}
            {premiumPlano.badge && (
              <div className="mt-2 inline-block rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400 ring-1 ring-yellow-400/30 font-bold">
                MAIS POPULAR
              </div>
            )}
          </div>
        </div>

        {/* Features Sections */}
        {features.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {/* Section Header */}
            <div className="grid grid-cols-3 border-b border-white/10">
              <div className="p-6 bg-black/30 col-span-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-yellow-400">{section.section}</span>
              </div>
            </div>

            {/* Feature Rows */}
            {section.items.map((feature, featureIndex) => (
              <div key={featureIndex} className="grid grid-cols-3 border-b border-white/10 hover:bg-white/5 transition-colors">
                <div className="p-5 flex items-center">
                  <span className="text-sm text-white">{feature.label}</span>
                </div>

                <div className="p-5 border-l border-white/10 flex justify-center items-center">
                  {feature.normal ? (
                    <Check className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <X className="h-5 w-5 text-gray-600" />
                  )}
                </div>

                <div className="p-5 border-l border-white/10 flex justify-center items-center bg-yellow-500/5">
                  {feature.premium ? (
                    <Check className="h-5 w-5 text-yellow-400" />
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
              className="w-full py-3 px-4 border border-yellow-400/30 rounded-xl text-sm font-bold text-yellow-400 hover:bg-yellow-400/10 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              MATRICULAR
            </button>
          </div>
          <div className="p-6 border-l border-white/10 flex justify-center bg-yellow-500/5">
            <button
              onClick={() => onMatricular(premiumPlano)}
              className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl text-sm font-bold text-black hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
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
      </div>
    </div>
  )
}

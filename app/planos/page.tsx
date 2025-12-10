"use client"

import { motion } from "framer-motion"
import { Check, Crown, Sparkles, ChevronDown, MapPin } from "lucide-react"
import React, { useState, useMemo } from "react"
import Link from "next/link"
import { usePlanosPageData } from "@/hooks/use-sanity-data"

// Fallback planos (caso Sanity não tenha dados)
const fallbackPlanos = [
  {
    nome: "BASIC",
    preco: "119,90",
    periodo: "mês",
    descricao: "Treine em todas as unidades Tradicionais, incluindo as Tradicionais Climatizadas.",
    beneficios: [
      "Sem fidelidade",
      "Sem taxa de cancelamento",
      "Sem taxa de manutenção",
      "Sem taxa de anuidade",
      "Acesso ao app Live Academia",
      "Aulas coletivas"
    ],
    gradient: "from-zinc-700 to-zinc-900",
    icone: Check,
    popular: false,
    destaque: false
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
      "Aulas coletivas",
      "Climatização"
    ],
    gradient: "from-amber-500 to-yellow-600",
    icone: Crown,
    popular: false,
    destaque: true,
    badge: ""
  }
]

// Fallback comparison features
const fallbackComparison = [
  {
    section: 'Benefícios Principais',
    items: [
      { label: 'Sem taxa de matrícula', tradicional: 'true', diamante: 'true' },
      { label: 'Sem fidelidade', tradicional: 'true', diamante: 'true' },
      { label: 'Acesso via app Live', tradicional: 'true', diamante: 'true' },
      { label: 'Aulas coletivas', tradicional: 'true', diamante: 'true' },
    ]
  },
  {
    section: 'Estrutura Premium',
    items: [
      { label: 'Ambiente climatizado', tradicional: 'partial', diamante: 'true' },
      { label: 'Espaços exclusivos', tradicional: 'false', diamante: 'true' },
      { label: 'Espaço Relax', tradicional: 'false', diamante: 'true' },
      { label: 'Espaço Yoga', tradicional: 'false', diamante: 'true' },
      { label: 'Studio de Bike', tradicional: 'false', diamante: 'true' },
    ]
  },
  {
    section: 'Serviços',
    items: [
      { label: 'Avaliação física', tradicional: 'true', diamante: 'true' },
      { label: 'App de treinos', tradicional: 'true', diamante: 'true' },
      { label: 'Atendimento domingos', tradicional: 'partial', diamante: 'true' },
      { label: 'Suporte prioritário', tradicional: 'false', diamante: 'true' },
    ]
  }
]

export default function Planos() {
  const [showComparison, setShowComparison] = useState(false)
  const { data: pageData, loading } = usePlanosPageData()

  // Normalizar planos do Sanity
  const displayPlans = useMemo(() => {
    if (pageData?.plansOrder && Array.isArray(pageData.plansOrder) && pageData.plansOrder.length > 0) {
      return pageData.plansOrder
        .filter((plano: any) => plano != null && plano.active !== false)
        .map((plano: any) => {
          // Formatar preço (vem em centavos)
          let precoFormatado = '0,00'
          if (typeof plano.price === 'number') {
            precoFormatado = (plano.price / 100).toFixed(2).replace('.', ',')
          } else if (typeof plano.price === 'string') {
            precoFormatado = plano.price
          }

          return {
            nome: plano.name || '',
            preco: precoFormatado,
            periodo: 'mês',
            descricao: plano.description || '',
            beneficios: Array.isArray(plano.features) ? plano.features : [],
            gradient: plano.highlight ? 'from-amber-500 to-yellow-600' : 'from-zinc-700 to-zinc-900',
            icone: plano.highlight ? Crown : Check,
            popular: false,
            destaque: plano.highlight || false,
            badge: plano.badge || ''
          }
        })
    }
    return fallbackPlanos
  }, [pageData])

  // Normalizar dados de comparação do Sanity
  const comparisonFeatures = useMemo(() => {
    if (pageData?.comparison?.sections && Array.isArray(pageData.comparison.sections)) {
      return pageData.comparison.sections.map((section: any) => ({
        section: section.sectionTitle || '',
        items: Array.isArray(section.items) ? section.items.map((item: any) => ({
          label: item.label || '',
          tradicional: item.tradicional || 'false',
          diamante: item.diamante || 'false'
        })) : []
      }))
    }
    return fallbackComparison
  }, [pageData])

  // Header data
  const headerTitle = pageData?.header?.title || 'Conheça nossos planos'
  const headerDescription = pageData?.header?.description || 'Escolha o plano que melhor se adapta às suas necessidades e comece sua jornada fitness hoje mesmo.'

  // Footer/disclaimer
  const disclaimer = pageData?.footer?.disclaimer || 'Os preços, serviços e condições promocionais podem variar de acordo com a academia escolhida.'

  // Helper para renderizar valor na tabela de comparação
  const renderComparisonValue = (value: string) => {
    if (value === 'true') {
      return <Check className="w-5 h-5 text-green-400" />
    } else if (value === 'partial') {
      return <span className="text-yellow-400 text-xs font-medium">PARCIAL</span>
    } else {
      return <span className="text-gray-500">—</span>
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen relative bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Carregando planos...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6">{headerTitle}</h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              {headerDescription}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {displayPlans.map((plano, idx) => (
              <motion.div
                key={plano.nome}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative group ${plano.destaque ? 'md:-mt-4' : ''}`}
              >
                {/* Card Container */}
                <div className={`relative h-full rounded-3xl overflow-hidden border transition-all duration-500 ${
                  plano.destaque
                    ? 'border-yellow-500/50 shadow-2xl shadow-yellow-500/10'
                    : 'border-zinc-800/50 hover:border-zinc-700/50'
                }`}>

                  {/* Popular Badge */}
                  {plano.badge && (
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
                        {React.createElement(plano.icone, { className: "w-6 h-6 text-white" })}
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
                      {plano.beneficios.length > 0 ? plano.beneficios.map((beneficio: string, i: number) => (
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

                    {/* CTA Button - Link to /unidades */}
                    <Link
                      href="/unidades"
                      className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        plano.destaque
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-[1.02]'
                          : 'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <MapPin className="w-5 h-5" />
                      MATRICULAR
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 mx-auto bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 backdrop-blur-sm"
            >
              {showComparison ? 'Ocultar comparação' : 'Comparar planos'}
              <ChevronDown className={`h-5 w-5 transition-transform ${showComparison ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>

          {/* Comparison Table */}
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-12"
            >
              <div className="max-w-6xl mx-auto">
                {/* Desktop Version - Table */}
                <div className="hidden md:block rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900/50 backdrop-blur-sm">
                  {/* Header - Usar displayPlans */}
                  <div className={`grid border-b border-white/10`} style={{ gridTemplateColumns: `1fr repeat(${displayPlans.length}, 1fr)` }}>
                    <div className="p-6 bg-black/20"></div>

                    {displayPlans.map((plan, idx) => (
                      <div
                        key={plan.nome}
                        className={`p-6 border-l border-white/10 text-center ${plan.destaque ? 'bg-yellow-500/10 hover:bg-yellow-500/15' : 'bg-black/20 hover:bg-black/30'} transition-all`}
                      >
                        <div className="text-lg font-medium text-white">{plan.nome}</div>
                        <div className={`mt-2 text-4xl font-bold ${plan.destaque ? 'text-yellow-400' : 'text-white'}`}>R$ {plan.preco}</div>
                        <div className="mt-1 text-gray-400 text-sm">/{plan.periodo}</div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  {comparisonFeatures.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      {/* Section Header */}
                      <div className={`grid border-b border-white/10 bg-zinc-800/30`} style={{ gridTemplateColumns: `1fr repeat(${displayPlans.length}, 1fr)` }}>
                        <div className="p-4 bg-zinc-700/30">
                          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">{section.section}</h3>
                        </div>
                        {displayPlans.map((_, idx) => (
                          <div key={idx} className="p-4 border-l border-white/10"></div>
                        ))}
                      </div>

                      {/* Features */}
                      {section.items.map((item: any, itemIndex: number) => (
                        <div key={itemIndex} className={`grid border-b border-white/5 hover:bg-white/5 transition-colors`} style={{ gridTemplateColumns: `1fr repeat(${displayPlans.length}, 1fr)` }}>
                          <div className="p-4 flex items-center">
                            <span className="text-white text-sm">{item.label}</span>
                          </div>
                          <div className="p-4 border-l border-white/10 flex items-center justify-center">
                            {renderComparisonValue(item.tradicional)}
                          </div>
                          {displayPlans.length > 1 && (
                            <div className="p-4 border-l border-white/10 flex items-center justify-center">
                              {renderComparisonValue(item.diamante)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* CTA Buttons */}
                  <div className={`grid p-6 bg-black/20`} style={{ gridTemplateColumns: `1fr repeat(${displayPlans.length}, 1fr)` }}>
                    <div></div>
                    {displayPlans.map((plan, idx) => (
                      <div key={plan.nome} className="border-l border-white/10 flex justify-center px-2">
                        <Link
                          href="/unidades"
                          className={`px-6 py-3 font-medium rounded-xl transition-all w-full flex items-center justify-center gap-2 ${
                            plan.destaque
                              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold hover:scale-105'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                          }`}
                        >
                          <MapPin className="w-4 h-4" />
                          Matricular
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Version - Cards */}
                <div className="md:hidden space-y-6">
                  {displayPlans.map((plan) => (
                    <div key={plan.nome} className={`rounded-2xl overflow-hidden shadow-xl bg-zinc-900/50 backdrop-blur-sm ${plan.destaque ? 'border border-yellow-500/30' : 'border border-white/10'}`}>
                      <div className={`p-6 text-center border-b border-white/10 ${plan.destaque ? 'bg-yellow-500/10' : 'bg-black/20'}`}>
                        <div className="text-xl font-bold text-white">{plan.nome}</div>
                        <div className={`mt-3 text-4xl font-bold ${plan.destaque ? 'text-yellow-400' : 'text-white'}`}>R$ {plan.preco}</div>
                        <div className="mt-1 text-gray-400 text-sm">/{plan.periodo}</div>
                      </div>

                      {comparisonFeatures.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                          <div className="px-6 py-3 bg-zinc-800/30 border-b border-white/5">
                            <h3 className="text-xs font-semibold text-white uppercase tracking-wide">{section.section}</h3>
                          </div>
                          {section.items.map((item: any, itemIndex: number) => (
                            <div key={itemIndex} className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                              <span className="text-white text-sm">{item.label}</span>
                              <div>
                                {renderComparisonValue(plan.destaque ? item.diamante : item.tradicional)}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}

                      <div className="p-6 bg-black/20">
                        <Link
                          href="/unidades"
                          className={`w-full px-6 py-4 font-medium rounded-xl transition-all flex items-center justify-center gap-2 ${
                            plan.destaque
                              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                          }`}
                        >
                          <MapPin className="w-5 h-5" />
                          Matricular
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-zinc-400 text-sm">
              {disclaimer}
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export const dynamic = 'force-dynamic'

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, CreditCard, X, ChevronDown, Star, Sparkles } from "lucide-react"
import React from "react"

interface PlanoItem {
  name: string
  price: string
  codigo?: string
  adesao?: number
  fidelidade?: number
  regimeRecorrencia?: boolean
  modalidades?: string[]
  destaque?: boolean
  badge?: string
  // Campos customizados do Sanity
  tituloCustomizado?: string
  descricaoCustomizada?: string
  textoMatricular?: string
  beneficiosCustomizados?: string[]
}

interface PlanosCardsProps {
  planos: Array<PlanoItem>
  unidadeName: string
  onMatricular: (plano: PlanoItem) => void
}

export default function PlanosCards({ planos, unidadeName, onMatricular }: PlanosCardsProps) {
  const [showComparison, setShowComparison] = useState(false)
  const [expandedPlanos, setExpandedPlanos] = useState(false)

  if (!planos || planos.length === 0) {
    return null
  }

  // Separar planos destacados e não destacados
  let planosDestacados = planos.filter(p => p.destaque === true).slice(0, 2)
  let outrosPlanos = planos.filter(p => !p.destaque)

  // Se não há planos destacados suficientes, pegar os primeiros planos
  if (planosDestacados.length === 0 && planos.length > 0) {
    planosDestacados = planos.slice(0, Math.min(2, planos.length))
    outrosPlanos = planos.slice(2)
  } else if (planosDestacados.length === 1 && outrosPlanos.length > 0) {
    planosDestacados.push(outrosPlanos[0])
    outrosPlanos = outrosPlanos.slice(1)
  }

  const isPremiumPlan = (name: string) =>
    name.toLowerCase().includes('premium') ||
    name.toLowerCase().includes('diamante') ||
    name.toLowerCase().includes('black') ||
    name.toLowerCase().includes('gold')

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Seção de Planos Destacados */}
      {planosDestacados.length > 0 && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Planos em Destaque</h2>
            <p className="text-white/70">Escolha o plano perfeito para sua jornada fitness</p>
          </div>

          <div className={`grid ${planosDestacados.length === 1 ? 'md:grid-cols-1 max-w-2xl mx-auto' : 'md:grid-cols-2'} gap-8 max-w-5xl mx-auto`}>
            {planosDestacados.map((plano, index) => {
              const isPremium = isPremiumPlan(plano.name)
              const displayTitle = plano.tituloCustomizado || plano.name
              const displayDescription = plano.descricaoCustomizada || (isPremium
                ? 'Experiência completa com máximo conforto e benefícios exclusivos'
                : 'Tudo que você precisa para começar sua transformação')
              const buttonText = plano.textoMatricular || 'Matricular'

              // Determine gradient and icon
              const gradient = isPremium ? "from-amber-500 to-yellow-600" : "from-zinc-700 to-zinc-900"
              const IconComponent = isPremium ? Star : Check

              return (
                <motion.div
                  key={plano.codigo || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative group ${isPremium ? 'md:-mt-4' : ''}`}
                >
                  {/* Card Container */}
                  <div className={`relative h-full rounded-3xl overflow-hidden border transition-all duration-500 ${
                    isPremium
                      ? 'border-yellow-500/50 shadow-2xl shadow-yellow-500/10 bg-zinc-900'
                      : 'border-zinc-800/50 hover:border-zinc-700/50 bg-zinc-900'
                  }`}>

                    {/* Content */}
                    <div className="relative z-10 p-8">
                      {/* Header */}
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">{displayTitle}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">{displayDescription}</p>
                      </div>

                      {/* Price */}
                      <div className="mb-8">
                        <div className="flex items-baseline gap-1">
                          <span className="text-zinc-400 text-lg">R$</span>
                          <span className={`text-5xl font-bold ${
                            isPremium
                              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent'
                              : 'text-white'
                          }`}>
                            {plano.price}
                          </span>
                          <span className="text-zinc-400 text-lg">/mês</span>
                        </div>

                        {plano.adesao !== undefined && plano.adesao > 0 && (
                          <p className="text-yellow-400 text-sm font-medium mt-2">
                            + Taxa de adesão: R$ {plano.adesao.toFixed(2)}
                          </p>
                        )}

                        {!plano.adesao && (
                          <p className="text-yellow-400 text-sm font-medium mt-2">Oferta por tempo limitado</p>
                        )}
                      </div>

                      {/* Benefits */}
                      <ul className="space-y-4 mb-8">
                        {(plano.beneficiosCustomizados && plano.beneficiosCustomizados.length > 0
                          ? plano.beneficiosCustomizados
                          : [
                            'Sem taxa de matrícula',
                            'Sem fidelidade obrigatória',
                            'Acesso completo ao app',
                            ...(isPremium ? ['Ambiente climatizado', 'Espaços exclusivos'] : [])
                          ]
                        ).map((beneficio: string, i: number) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-zinc-300 text-sm leading-relaxed">• {beneficio}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <button
                        onClick={() => onMatricular(plano)}
                        className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                          isPremium
                            ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-[1.02]'
                            : 'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {buttonText.toUpperCase()}!
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Outros Planos Disponíveis */}
      {outrosPlanos.length > 0 && (
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Outros Planos Disponíveis</h3>
            <p className="text-white/70">Mais opções para atender suas necessidades</p>
          </div>

          {/* Botão para expandir/recolher */}
          {!expandedPlanos ? (
            <div className="text-center">
              <button
                onClick={() => setExpandedPlanos(true)}
                className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                Ver {outrosPlanos.length} {outrosPlanos.length === 1 ? 'plano adicional' : 'planos adicionais'}
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {outrosPlanos.map((plano, index) => (
                  <motion.div
                    key={plano.codigo || `other-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-xl bg-zinc-900/50 border border-white/10 p-6 hover:border-white/20 transition-all"
                  >
                    {plano.badge && (
                      <div className="mb-3">
                        <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">
                          {plano.badge}
                        </span>
                      </div>
                    )}

                    <h4 className="text-lg font-semibold text-white mb-3">{plano.name}</h4>

                    <div className="mb-4">
                      <span className="text-2xl font-bold text-live-yellow">R$ {plano.price}</span>
                      <span className="text-white/50 text-sm">/mês</span>

                      {plano.adesao !== undefined && plano.adesao > 0 && (
                        <div className="mt-1 text-xs text-white/50">
                          Adesão: R$ {plano.adesao.toFixed(2)}
                        </div>
                      )}

                      {plano.fidelidade !== undefined && plano.fidelidade > 0 && (
                        <div className="text-xs text-white/50">
                          Fidelidade: {plano.fidelidade}m
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onMatricular(plano)}
                      className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition text-sm"
                    >
                      Selecionar
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Botão para recolher */}
              <div className="text-center">
                <button
                  onClick={() => setExpandedPlanos(false)}
                  className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                >
                  Recolher planos
                  <ChevronDown className="h-4 w-4 rotate-180" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
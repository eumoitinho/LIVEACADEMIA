"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, CreditCard, X, ChevronDown, Star, Crown } from "lucide-react"

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

          <div className={`grid ${planosDestacados.length === 1 ? 'md:grid-cols-1 max-w-2xl mx-auto' : 'md:grid-cols-2'} gap-6`}>
            {planosDestacados.map((plano, index) => {
              const isPremium = isPremiumPlan(plano.name)

              return (
                <motion.div
                  key={plano.codigo || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl overflow-hidden shadow-xl ${
                    isPremium
                      ? 'bg-gradient-to-br from-live-yellow to-live-yellowLight transform md:scale-105'
                      : 'bg-white border border-slate-200'
                  }`}
                >
                  <div className="p-6">
                    {/* Badge personalizada */}
                    {plano.badge && (
                      <div className="flex justify-end mb-2">
                        <span className={`${
                          isPremium ? 'bg-black/20 text-black' : 'bg-live-yellow text-black'
                        } text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1`}>
                          {plano.badge === 'MAIS VENDIDO' && <Star className="w-3 h-3" />}
                          {plano.badge === 'RECOMENDADO' && <Crown className="w-3 h-3" />}
                          {plano.badge}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`font-semibold text-xl ${isPremium ? 'text-black' : 'text-slate-800'}`}>
                        {plano.name}
                      </h3>
                    </div>

                    <div className="mb-6">
                      <span className={`text-4xl font-bold ${isPremium ? 'text-black' : 'text-slate-800'}`}>
                        R$ {plano.price}
                      </span>
                      <span className={isPremium ? 'text-black/70' : 'text-slate-500'}>/mês</span>

                      {plano.adesao !== undefined && plano.adesao > 0 && (
                        <div className={`mt-2 text-sm ${isPremium ? 'text-black/70' : 'text-slate-600'}`}>
                          + Taxa de adesão: R$ {plano.adesao.toFixed(2)}
                        </div>
                      )}

                      {plano.fidelidade !== undefined && plano.fidelidade > 0 && (
                        <div className={`mt-1 text-sm ${isPremium ? 'text-black/70' : 'text-slate-600'}`}>
                          Fidelidade: {plano.fidelidade} meses
                        </div>
                      )}
                    </div>

                    <p className={`text-sm mb-6 ${isPremium ? 'text-black/70' : 'text-slate-500'}`}>
                      {isPremium
                        ? 'Experiência completa com máximo conforto e benefícios exclusivos'
                        : 'Tudo que você precisa para começar sua transformação'}
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className={`flex items-center text-sm ${isPremium ? 'text-black' : 'text-slate-700'}`}>
                        <Check className={`w-5 h-5 mr-2 ${isPremium ? 'text-black' : 'text-live-yellow'}`} />
                        Sem taxa de matrícula
                      </li>
                      <li className={`flex items-center text-sm ${isPremium ? 'text-black' : 'text-slate-700'}`}>
                        <Check className={`w-5 h-5 mr-2 ${isPremium ? 'text-black' : 'text-live-yellow'}`} />
                        Sem fidelidade obrigatória
                      </li>
                      <li className={`flex items-center text-sm ${isPremium ? 'text-black' : 'text-slate-700'}`}>
                        <Check className={`w-5 h-5 mr-2 ${isPremium ? 'text-black' : 'text-live-yellow'}`} />
                        Acesso completo ao app
                      </li>
                      {isPremium && (
                        <>
                          <li className="flex items-center text-sm text-black">
                            <Check className="w-5 h-5 mr-2 text-black" />
                            Ambiente climatizado
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <Check className="w-5 h-5 mr-2 text-black" />
                            Espaços exclusivos
                          </li>
                        </>
                      )}
                    </ul>

                    <button
                      onClick={() => onMatricular(plano)}
                      className={`w-full py-3 px-4 font-medium rounded-xl transition ${
                        isPremium
                          ? 'bg-white hover:bg-white/90 text-black'
                          : 'bg-live-yellow hover:bg-live-yellowLight text-black'
                      }`}
                    >
                      Matricular-se
                    </button>
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
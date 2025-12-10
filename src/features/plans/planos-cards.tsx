"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Sparkles, Crown, ChevronDown, ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface PlanoItem {
  name: string
  price: string
  codigo?: string
  adesao?: number
  fidelidade?: number
  mostrarAdesao?: boolean
  mostrarFidelidade?: boolean
  regimeRecorrencia?: boolean
  modalidades?: string[]
  // Props que podem vir do planosConfig
  destaque?: boolean
  badge?: string
  ordem?: number
  originalName?: string
  originalPrice?: string
}

interface PlanosCardsProps {
  planos: Array<PlanoItem>
  unidadeName: string
  onMatricular: (plano: PlanoItem) => void
}

export default function PlanosCards({ planos, unidadeName, onMatricular }: PlanosCardsProps) {
  const [showMorePlanos, setShowMorePlanos] = useState(false)
  const [selectedPlano, setSelectedPlano] = useState<PlanoItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (!planos || planos.length === 0) {
    return null
  }

  const isPremiumPlan = (name: string) => {
    const nameLower = name.toLowerCase()
    return nameLower.includes('premium') || nameLower.includes('diamante') || nameLower.includes('diamond')
  }

  // Separar e preparar planos
  const preparedPlanos = planos.map((plano) => {
    // Se já veio com destaque definido (do planosConfig), usar esse valor
    // Caso contrário, usar a lógica de isPremiumPlan
    const hasExplicitDestaque = typeof plano.destaque === 'boolean'
    const isPremium = hasExplicitDestaque ? plano.destaque : isPremiumPlan(plano.name)

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
      badge: plano.badge || (isPremium ? 'O mais vendido' : undefined),
      // Preservar flags de visibilidade
      mostrarAdesao: plano.mostrarAdesao,
      mostrarFidelidade: plano.mostrarFidelidade,
    }
  })

  // Ordenar: Se tem ordem definida do planosConfig, usar ela; senão, premium primeiro
  preparedPlanos.sort((a, b) => {
    // Se ambos têm ordem definida, usar a ordem
    if (a.ordem !== undefined && b.ordem !== undefined) {
      return a.ordem - b.ordem
    }
    // Se apenas um tem ordem, ele vem primeiro
    if (a.ordem !== undefined) return -1
    if (b.ordem !== undefined) return 1
    // Fallback: destaque primeiro
    if (a.destaque && !b.destaque) return -1
    if (!a.destaque && b.destaque) return 1
    return 0
  })

  // Primeiros 2 planos (sempre visíveis)
  const mainPlanos = preparedPlanos.slice(0, 2)
  // Planos adicionais (no "ver mais")
  const additionalPlanos = preparedPlanos.slice(2)
  const hasMorePlanos = preparedPlanos.length > 2

  const handleVerMais = (plano: PlanoItem) => {
    setSelectedPlano(plano)
    setIsDialogOpen(true)
  }

  const handleMatricularFromDialog = () => {
    if (selectedPlano) {
      onMatricular(selectedPlano)
      setIsDialogOpen(false)
      setSelectedPlano(null)
    }
  }

  const selectedPlanoData = selectedPlano ? preparedPlanos.find(p => p.codigo === selectedPlano.codigo || p.nome === selectedPlano.name) : null

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Cards Principais - Tamanho Reduzido */}
      <div className={`grid gap-6 ${
        mainPlanos.length === 1 
          ? 'md:grid-cols-1 max-w-xl mx-auto' 
          : 'md:grid-cols-2'
      }`}>
        {mainPlanos.map((plano, idx) => (
          <motion.div
            key={plano.codigo || plano.nome}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`relative group ${plano.destaque ? 'md:-mt-2' : ''}`}
          >
            {/* Card Container - Menor */}
            <div className={`relative h-full rounded-2xl overflow-hidden border transition-all duration-500 ${
              plano.destaque 
                ? 'border-yellow-500/50 shadow-xl shadow-yellow-500/10 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm' 
                : 'border-zinc-800/50 hover:border-zinc-700/50 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm'
            }`}>
              
              {/* Popular Badge */}
              {plano.popular && plano.badge && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {plano.badge}
                  </div>
                </div>
              )}

              {/* Content - Compacto */}
              <div className="relative z-10 p-6">
                {/* Header */}
                <div className="mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plano.gradient} flex items-center justify-center mb-3`}>
                    <plano.icone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{plano.nome}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">{plano.descricao}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-zinc-400 text-base">R$</span>
                    <span className={`text-4xl font-bold ${
                      plano.destaque 
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent' 
                        : 'text-white'
                    }`}>
                      {plano.preco}
                    </span>
                    <span className="text-zinc-400 text-base">/{plano.periodo}</span>
                  </div>
                  {plano.mostrarAdesao !== false && plano.adesao && plano.adesao > 0 && (
                    <div className="mt-1 text-xs text-zinc-400">
                      + Adesão: R$ {plano.adesao.toFixed(2).replace('.', ',')}
                    </div>
                  )}
                  {plano.mostrarFidelidade !== false && plano.fidelidade && plano.fidelidade > 0 && (
                    <div className="mt-0.5 text-xs text-zinc-400">
                      Fidelidade: {plano.fidelidade} {plano.fidelidade === 1 ? 'mês' : 'meses'}
                    </div>
                  )}
                  {(plano.mostrarAdesao === false || !plano.adesao || plano.adesao === 0) &&
                   (plano.mostrarFidelidade === false || !plano.fidelidade || plano.fidelidade === 0) && (
                    <p className="text-yellow-400 text-xs font-medium mt-1">Sem taxas adicionais</p>
                  )}
                </div>

                {/* Benefits - Limitado */}
                <ul className="space-y-2 mb-6">
                  {Array.isArray(plano.beneficios) && plano.beneficios.length > 0 ? plano.beneficios.slice(0, 4).map((beneficio: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plano.destaque 
                          ? 'bg-yellow-500/20' 
                          : 'bg-zinc-800'
                      }`}>
                        <Check className={`w-2.5 h-2.5 ${
                          plano.destaque ? 'text-yellow-500' : 'text-zinc-400'
                        }`} />
                      </div>
                      <span className="text-zinc-300 text-xs leading-relaxed line-clamp-1">{beneficio}</span>
                    </li>
                  )) : (
                    <li className="text-zinc-400 text-xs">Benefícios não disponíveis</li>
                  )}
                  {plano.beneficios && plano.beneficios.length > 4 && (
                    <li className="text-zinc-400 text-xs pl-6">
                      +{plano.beneficios.length - 4} mais benefícios
                    </li>
                  )}
                </ul>

                {/* CTA Button */}
                <button 
                  onClick={() => onMatricular(plano)}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
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

      {/* Cards Compactos no "Ver Mais" */}
      <AnimatePresence>
        {showMorePlanos && hasMorePlanos && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {additionalPlanos.map((plano, idx) => {
                const planoItem: PlanoItem = {
                  name: plano.nome,
                  price: plano.preco,
                  codigo: plano.codigo,
                  adesao: plano.adesao,
                  fidelidade: plano.fidelidade,
                  mostrarAdesao: plano.mostrarAdesao,
                  mostrarFidelidade: plano.mostrarFidelidade,
                  regimeRecorrencia: plano.regimeRecorrencia,
                  modalidades: plano.modalidades
                }
                return (
                  <motion.div
                    key={plano.codigo || plano.nome}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="group relative rounded-xl overflow-hidden border border-zinc-800/50 hover:border-yellow-500/30 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm transition-all duration-300 p-4"
                  >
                    {/* Header Compacto */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${plano.gradient} flex items-center justify-center mb-2`}>
                          <plano.icone className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-base font-bold text-white mb-1">{plano.nome}</h3>
                      </div>
                      {plano.popular && plano.badge && (
                        <div className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {plano.badge}
                        </div>
                      )}
                    </div>

                    {/* Preço Compacto */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-zinc-400 text-sm">R$</span>
                        <span className={`text-2xl font-bold ${
                          plano.destaque 
                            ? 'bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent' 
                            : 'text-white'
                        }`}>
                          {plano.preco}
                        </span>
                        <span className="text-zinc-400 text-sm">/{plano.periodo}</span>
                      </div>
                      {(plano.mostrarAdesao === false || !plano.adesao || plano.adesao === 0) &&
                       (plano.mostrarFidelidade === false || !plano.fidelidade || plano.fidelidade === 0) && (
                        <p className="text-yellow-400 text-xs font-medium mt-1">Sem taxas adicionais</p>
                      )}
                    </div>

                    {/* Botão Ver Mais */}
                    <button
                      onClick={() => handleVerMais(planoItem)}
                      className="w-full py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 text-white text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 border border-zinc-700/50 hover:border-yellow-500/30"
                    >
                      Ver mais
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão Ver Mais Planos */}
      {hasMorePlanos && (
        <div className="text-center pt-2">
          <motion.button
            onClick={() => setShowMorePlanos(!showMorePlanos)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-300 flex items-center justify-center gap-2 mx-auto text-sm font-medium"
          >
            {showMorePlanos ? 'Ver menos planos' : `Ver mais planos (${additionalPlanos.length} restantes)`}
            <ChevronDown className={`h-4 w-4 transition-transform ${showMorePlanos ? 'rotate-180' : ''}`} />
          </motion.button>
        </div>
      )}

      {/* Dialog com Detalhes do Plano */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-zinc-900 border-zinc-800 text-white max-h-[90vh] overflow-y-auto">
          {selectedPlanoData && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedPlanoData.gradient} flex items-center justify-center`}>
                      <selectedPlanoData.icone className="w-6 h-6 text-white" />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-white">
                      {selectedPlanoData.nome}
                    </DialogTitle>
                  </div>
                  {selectedPlanoData.popular && selectedPlanoData.badge && (
                    <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {selectedPlanoData.badge}
                    </div>
                  )}
                </div>
                <DialogDescription className="text-zinc-400">
                  {selectedPlanoData.descricao}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-zinc-400 text-lg">R$</span>
                    <span className={`text-5xl font-bold ${
                      selectedPlanoData.destaque 
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent' 
                        : 'text-white'
                    }`}>
                      {selectedPlanoData.preco}
                    </span>
                    <span className="text-zinc-400 text-lg">/{selectedPlanoData.periodo}</span>
                  </div>
                  {selectedPlanoData.mostrarAdesao !== false && selectedPlanoData.adesao && selectedPlanoData.adesao > 0 && (
                    <div className="text-sm text-zinc-400">
                      + Taxa de adesão: R$ {selectedPlanoData.adesao.toFixed(2).replace('.', ',')}
                    </div>
                  )}
                  {selectedPlanoData.mostrarFidelidade !== false && selectedPlanoData.fidelidade && selectedPlanoData.fidelidade > 0 && (
                    <div className="text-sm text-zinc-400">
                      Fidelidade: {selectedPlanoData.fidelidade} {selectedPlanoData.fidelidade === 1 ? 'mês' : 'meses'}
                    </div>
                  )}
                  {(selectedPlanoData.mostrarAdesao === false || !selectedPlanoData.adesao || selectedPlanoData.adesao === 0) &&
                   (selectedPlanoData.mostrarFidelidade === false || !selectedPlanoData.fidelidade || selectedPlanoData.fidelidade === 0) && (
                    <p className="text-yellow-400 text-sm font-medium mt-2">Sem taxas adicionais</p>
                  )}
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Benefícios</h4>
                  <ul className="space-y-3">
                    {Array.isArray(selectedPlanoData.beneficios) && selectedPlanoData.beneficios.length > 0 ? selectedPlanoData.beneficios.map((beneficio: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedPlanoData.destaque 
                            ? 'bg-yellow-500/20' 
                            : 'bg-zinc-800'
                        }`}>
                          <Check className={`w-3 h-3 ${
                            selectedPlanoData.destaque ? 'text-yellow-500' : 'text-zinc-400'
                          }`} />
                        </div>
                        <span className="text-zinc-300 text-sm leading-relaxed">{beneficio}</span>
                      </li>
                    )) : (
                      <li className="text-zinc-400 text-sm">Benefícios não disponíveis</li>
                    )}
                  </ul>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={handleMatricularFromDialog}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                    selectedPlanoData.destaque
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-[1.02]'
                      : 'bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700'
                  }`}
                >
                  MATRICULE-SE AGORA!
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer Note */}
      <div className="mt-6 text-center bg-zinc-900/80 rounded-xl py-4 px-6 border border-zinc-800">
        <p className="text-sm text-zinc-300">
          Os preços, serviços e condições promocionais podem variar de acordo com a unidade escolhida.
        </p>
      </div>
    </div>
  )
}

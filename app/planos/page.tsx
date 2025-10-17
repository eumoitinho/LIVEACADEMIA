"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, Crown, Sparkles, ChevronDown, MapPin, ChevronRight } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"

const planos = [
  {
    nome: "TRADICIONAL",
    preco: "119,90",
    periodo: "mês",
    descricao: "Treine em todas as unidades Tradicionais, incluindo as Tradicionais Climatizadas.",
    beneficios: [
      "Sem fidelidade",
      "Sem taxa de cancelamento",
      "Sem taxa de manutenção",
      "Sem taxa de anuidade",
      "Acesso ao app Live Academia",
      "Aulas coletivas",
      "Climatização (apenas unidades Torquato Bemol e Tiradentes)",
      "Atendimento aos domingos (consultar unidade)"
    ],
    gradient: "from-zinc-700 to-zinc-900",
    icone: Check,
    popular: false
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
      "Espaço Pose",
      "Acesso ao Studio de Bike",
      "Aulas coletivas",
      "Climatização",
      "Atendimento aos domingos"
    ],
    gradient: "from-amber-500 to-yellow-600",
    icone: Crown,
    popular: true,
    destaque: true,
    badge: "O mais vendido"
  }
]

interface LocationUnit {
  id: string
  name: string
  address: string
  type: string
  photo?: string | null
  hours?: string
  features: string[]
  [key: string]: any
}

const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(39, 39, 42, 0.5);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(250, 204, 21, 0.3);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(250, 204, 21, 0.5);
  }
`

export default function Planos() {
  const [showComparison, setShowComparison] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [sanityUnits, setSanityUnits] = useState<any[]>([])
  const [loadingSanity, setLoadingSanity] = useState(true)
  const [allLocations, setAllLocations] = useState<LocationUnit[]>([])

  // Fetch units from Sanity
  useEffect(() => {
    const fetchSanityUnits = async () => {
      try {
        setLoadingSanity(true)
        const response = await fetch('/api/sanity/units')
        const data = await response.json()
        if (data.units) {
          setSanityUnits(data.units)
        }
      } catch (error) {
        console.error('Error fetching Sanity units:', error)
      } finally {
        setLoadingSanity(false)
      }
    }
    fetchSanityUnits()
  }, [])

  // Import static locations and merge with Sanity data
  useEffect(() => {
    const loadLocations = async () => {
      const { locations } = await import('@/src/lib/config/locations')

      if (loadingSanity || sanityUnits.length === 0) {
        setAllLocations(locations)
        return
      }

      const merged = locations.map(staticLoc => {
        const sanityUnit = sanityUnits.find((unit: any) =>
          unit.slug?.current === staticLoc.id
        )

        if (sanityUnit) {
          const hasCoordinates = 'coordinates' in staticLoc && staticLoc.coordinates && typeof staticLoc.coordinates === 'object'
          return {
            ...staticLoc,
            name: sanityUnit.name,
            address: sanityUnit.address,
            type: sanityUnit.type,
            photo: sanityUnit.images?.[0]?.asset?.url || staticLoc.photo,
            features: sanityUnit.services || staticLoc.features,
            hours: sanityUnit.openingHours || staticLoc.hours,
            coordinates: hasCoordinates ? {
              lat: sanityUnit.latitude || (staticLoc.coordinates as any).lat,
              lng: sanityUnit.longitude || (staticLoc.coordinates as any).lng,
            } : undefined
          }
        }
        return staticLoc
      })

      setAllLocations(merged)
    }

    loadLocations()
  }, [sanityUnits, loadingSanity])

  const handlePlanClick = (planName: string) => {
    setSelectedPlan(selectedPlan === planName ? null : planName)
  }

  // Filter units based on plan
  const filteredUnits = useMemo(() => {
    if (!selectedPlan) return []

    // Both plans exclude Morada do Sol and Alphaville
    return allLocations.filter(unit =>
      unit.type !== 'inauguracao' &&
      !unit.id.includes('morada') &&
      !unit.id.includes('alphaville')
    )
  }, [selectedPlan, allLocations])

  const comparisonFeatures = [
    {
      section: 'Benefícios Principais',
      items: [
        { label: 'Sem taxa de matrícula', tradicional: true, diamante: true },
        { label: 'Sem fidelidade', tradicional: true, diamante: true },
        { label: 'Acesso via app Live', tradicional: true, diamante: true },
        { label: 'Aulas coletivas', tradicional: true, diamante: true },
      ]
    },
    {
      section: 'Estrutura Premium',
      items: [
        { label: 'Ambiente climatizado', tradicional: 'Parcial', diamante: true },
        { label: 'Espaços exclusivos', tradicional: false, diamante: true },
        { label: 'Espaço Relax', tradicional: false, diamante: true },
        { label: 'Espaço Yoga', tradicional: false, diamante: true },
        { label: 'Studio de Bike', tradicional: false, diamante: true },
      ]
    },
    {
      section: 'Serviços',
      items: [
        { label: 'Avaliação física', tradicional: true, diamante: true },
        { label: 'App de treinos', tradicional: true, diamante: true },
        { label: 'Atendimento domingos', tradicional: 'Parcial', diamante: true },
        { label: 'Suporte prioritário', tradicional: false, diamante: true },
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <style jsx global>{customScrollbarStyles}</style>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6">Conheça nossos planos</h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Escolha o plano que melhor se adapta às suas necessidades e comece sua jornada fitness hoje mesmo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {planos.map((plano, idx) => (
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
                  {plano.popular && (
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
                      <p className="text-yellow-400 text-sm font-medium mt-2">Oferta por tempo limitado</p>
                    </div>

                    {/* Benefits */}
                    <ul className="space-y-4 mb-8">
                      {plano.beneficios.map((beneficio, i) => (
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
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={() => handlePlanClick(plano.nome)}
                      className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        plano.destaque
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-[1.02]'
                          : 'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      MATRICULE-SE AGORA!
                      <ChevronDown className={`w-5 h-5 transition-transform ${selectedPlan === plano.nome ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ÚNICA Seção de Unidades - Aparece abaixo dos cards quando clicar em qualquer plano */}
          <AnimatePresence>
            {selectedPlan && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden mt-8"
              >
                <div className="max-w-5xl mx-auto rounded-3xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-2xl font-bold text-white flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-yellow-500" />
                      Unidades disponíveis para o plano {selectedPlan}
                    </h4>
                    <span className="text-zinc-400 text-sm">
                      {filteredUnits.length} unidades
                    </span>
                  </div>

                  {loadingSanity ? (
                    <div className="text-center py-12 text-zinc-400">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                      Carregando unidades...
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                      {filteredUnits.map((unit) => (
                        <Link
                          key={unit.id}
                          href={`/unidades/${unit.id}`}
                          className="group relative overflow-hidden rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-yellow-500/50 transition-all duration-300"
                        >
                          {/* Unit Image */}
                          {unit.photo && (
                            <div className="relative h-40 overflow-hidden">
                              <Image
                                src={unit.photo}
                                alt={unit.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
                            </div>
                          )}

                          {/* Unit Info */}
                          <div className={`${unit.photo ? 'absolute bottom-0 inset-x-0' : ''} p-4`}>
                            <h5 className="text-white font-semibold text-base group-hover:text-yellow-400 transition-colors mb-1">
                              {unit.name}
                            </h5>
                            <p className="text-zinc-400 text-sm mb-2">
                              {unit.address}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                unit.type === 'diamante' ? 'bg-yellow-500/20 text-yellow-400' :
                                unit.type === 'premium' ? 'bg-purple-500/20 text-purple-400' :
                                'bg-zinc-700/50 text-zinc-300'
                              }`}>
                                {unit.type?.toUpperCase()}
                              </span>
                              <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {!loadingSanity && filteredUnits.length === 0 && (
                    <div className="text-center py-12 text-zinc-400">
                      Nenhuma unidade disponível para este plano.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                  {/* Header */}
                  <div className="grid grid-cols-3 border-b border-white/10">
                    <div className="p-6 bg-black/20"></div>

                    {/* Tradicional Plan Header */}
                    <div className="p-6 border-l border-white/10 text-center bg-black/20 hover:bg-black/30 transition-all">
                      <div className="text-lg font-medium text-white">TRADICIONAL</div>
                      <div className="mt-2 text-4xl font-bold text-white">R$ 119,90</div>
                      <div className="mt-1 text-gray-400 text-sm">/mês</div>
                    </div>

                    {/* Diamante Plan Header */}
                    <div className="p-6 border-l border-white/10 text-center bg-yellow-500/10 relative hover:bg-yellow-500/15 transition-all">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                          MAIS POPULAR
                        </div>
                      </div>
                      <div className="text-lg font-medium text-white">DIAMANTE</div>
                      <div className="mt-2 text-4xl font-bold text-yellow-400">R$ 159,90</div>
                      <div className="mt-1 text-gray-400 text-sm">/mês</div>
                    </div>
                  </div>

                  {/* Features */}
                  {comparisonFeatures.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      {/* Section Header */}
                      <div className="grid grid-cols-3 border-b border-white/10 bg-zinc-800/30">
                        <div className="p-4 bg-zinc-700/30">
                          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">{section.section}</h3>
                        </div>
                        <div className="p-4 border-l border-white/10"></div>
                        <div className="p-4 border-l border-white/10"></div>
                      </div>

                      {/* Features */}
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                          <div className="p-4 flex items-center">
                            <span className="text-white text-sm">{item.label}</span>
                          </div>
                          <div className="p-4 border-l border-white/10 flex items-center justify-center">
                            {item.tradicional === true ? (
                              <Check className="w-5 h-5 text-green-400" />
                            ) : item.tradicional === 'Parcial' ? (
                              <span className="text-yellow-400 text-xs font-medium">PARCIAL</span>
                            ) : (
                              <span className="text-gray-500">—</span>
                            )}
                          </div>
                          <div className="p-4 border-l border-white/10 flex items-center justify-center">
                            {item.diamante === true ? (
                              <Check className="w-5 h-5 text-green-400" />
                            ) : (
                              <span className="text-gray-500">—</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-3 p-6 bg-black/20">
                    <div></div>
                    <div className="border-l border-white/10 flex justify-center px-2">
                      <button
                        onClick={() => handlePlanClick('TRADICIONAL')}
                        className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-all w-full"
                      >
                        Escolher
                      </button>
                    </div>
                    <div className="border-l border-white/10 flex justify-center px-2">
                      <button
                        onClick={() => handlePlanClick('DIAMANTE')}
                        className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold rounded-xl transition-all hover:scale-105 w-full"
                      >
                        Escolher
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Version - Cards */}
                <div className="md:hidden space-y-6">
                  {/* Tradicional Card */}
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-zinc-900/50 backdrop-blur-sm">
                    <div className="p-6 bg-black/20 text-center border-b border-white/10">
                      <div className="text-xl font-bold text-white">TRADICIONAL</div>
                      <div className="mt-3 text-4xl font-bold text-white">R$ 119,90</div>
                      <div className="mt-1 text-gray-400 text-sm">/mês</div>
                    </div>

                    {comparisonFeatures.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <div className="px-6 py-3 bg-zinc-800/30 border-b border-white/5">
                          <h3 className="text-xs font-semibold text-white uppercase tracking-wide">{section.section}</h3>
                        </div>
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                            <span className="text-white text-sm">{item.label}</span>
                            <div>
                              {item.tradicional === true ? (
                                <Check className="w-5 h-5 text-green-400" />
                              ) : item.tradicional === 'Parcial' ? (
                                <span className="text-yellow-400 text-xs font-medium">PARCIAL</span>
                              ) : (
                                <span className="text-gray-500">—</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    <div className="p-6 bg-black/20">
                      <button
                        onClick={() => handlePlanClick('TRADICIONAL')}
                        className="w-full px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-all"
                      >
                        Escolher Tradicional
                      </button>
                    </div>
                  </div>

                  {/* Diamante Card */}
                  <div className="rounded-2xl overflow-hidden border border-yellow-500/30 shadow-xl bg-zinc-900/50 backdrop-blur-sm">
                    <div className="p-6 bg-yellow-500/10 text-center border-b border-white/10 relative">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                          MAIS POPULAR
                        </div>
                      </div>
                      <div className="text-xl font-bold text-white mt-2">DIAMANTE</div>
                      <div className="mt-3 text-4xl font-bold text-yellow-400">R$ 159,90</div>
                      <div className="mt-1 text-gray-400 text-sm">/mês</div>
                    </div>

                    {comparisonFeatures.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <div className="px-6 py-3 bg-zinc-800/30 border-b border-white/5">
                          <h3 className="text-xs font-semibold text-white uppercase tracking-wide">{section.section}</h3>
                        </div>
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                            <span className="text-white text-sm">{item.label}</span>
                            <div>
                              {item.diamante === true ? (
                                <Check className="w-5 h-5 text-green-400" />
                              ) : (
                                <span className="text-gray-500">—</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    <div className="p-6 bg-black/20">
                      <button
                        onClick={() => handlePlanClick('DIAMANTE')}
                        className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold rounded-xl transition-all"
                      >
                        Escolher Diamante
                      </button>
                    </div>
                  </div>
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
              Os preços, serviços e condições promocionais podem variar de acordo com a academia escolhida.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export const dynamic = 'force-dynamic'

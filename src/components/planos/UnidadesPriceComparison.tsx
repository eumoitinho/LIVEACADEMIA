'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, X, Loader2, ChevronRight, DollarSign, Building2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface UnitPlan {
  codigo: number
  nome: string
  valor: number | string
  mensalidade?: number
}

interface UnitWithPlans {
  slug: string
  name: string
  address: string
  type: string
  photo?: string
  city?: string
  planos: UnitPlan[]
}

interface PriceGroup {
  price: number
  priceFormatted: string
  units: UnitWithPlans[]
  planNames: string[]
}

interface UnidadesPriceComparisonProps {
  isOpen: boolean
  onClose: () => void
  selectedPlanType: 'TRADICIONAL' | 'DIAMANTE' | string
  selectedPlanPrice: number // preço em reais (ex: 119.90)
}

export function UnidadesPriceComparison({
  isOpen,
  onClose,
  selectedPlanType,
  selectedPlanPrice
}: UnidadesPriceComparisonProps) {
  const [loading, setLoading] = useState(true)
  const [unitsWithPlans, setUnitsWithPlans] = useState<UnitWithPlans[]>([])
  const [error, setError] = useState<string | null>(null)

  // Fetch plans from all units
  useEffect(() => {
    if (!isOpen) return

    const fetchAllUnitsPlans = async () => {
      setLoading(true)
      setError(null)

      try {
        // First, get all units
        const unitsResponse = await fetch('/api/unidades')
        const unitsData = await unitsResponse.json()

        if (!unitsData.units || unitsData.units.length === 0) {
          setError('Nenhuma unidade encontrada')
          setLoading(false)
          return
        }

        // Fetch plans for each unit in parallel (with limit)
        const unitPromises = unitsData.units
          .filter((u: any) => u.inaugurada !== false)
          .slice(0, 20) // Limit to avoid too many requests
          .map(async (unit: any) => {
            try {
              const plansResponse = await fetch(`/api/pacto-v3/planos/${unit.slug}`, {
                cache: 'force-cache'
              })

              if (!plansResponse.ok) {
                return null
              }

              const plansData = await plansResponse.json()

              return {
                slug: unit.slug,
                name: unit.nome || unit.name,
                address: unit.endereco || unit.address,
                type: unit.type,
                photo: unit.imagem || unit.photo,
                city: unit.cidade || 'Manaus',
                planos: plansData.planos || []
              } as UnitWithPlans
            } catch (err) {
              console.warn(`Failed to fetch plans for ${unit.slug}:`, err)
              return null
            }
          })

        const results = await Promise.all(unitPromises)
        const validUnits = results.filter((u): u is UnitWithPlans => u !== null && u.planos.length > 0)

        setUnitsWithPlans(validUnits)
      } catch (err) {
        console.error('Error fetching units plans:', err)
        setError('Erro ao carregar planos das unidades')
      } finally {
        setLoading(false)
      }
    }

    fetchAllUnitsPlans()
  }, [isOpen])

  // Group units by price
  const priceGroups = useMemo(() => {
    if (unitsWithPlans.length === 0) return []

    const groups: Map<number, PriceGroup> = new Map()

    // Determine price range to filter (±30% of selected price or exact match for similar plans)
    const minPrice = selectedPlanPrice * 0.7
    const maxPrice = selectedPlanPrice * 1.5

    unitsWithPlans.forEach(unit => {
      // Find plans that match the selected type (by name similarity) and are within price range
      const matchingPlans = unit.planos.filter(plan => {
        const planPrice = typeof plan.mensalidade === 'number'
          ? plan.mensalidade
          : typeof plan.valor === 'number'
            ? plan.valor
            : parseFloat(String(plan.valor).replace(',', '.')) || 0

        // Check if plan name contains the selected type (case insensitive)
        const planNameUpper = (plan.nome || '').toUpperCase()
        const typeMatches = selectedPlanType === 'TRADICIONAL'
          ? planNameUpper.includes('TRADICIONAL') || planNameUpper.includes('BASICO') || planNameUpper.includes('BÁSICO')
          : planNameUpper.includes('DIAMANTE') || planNameUpper.includes('PREMIUM') || planNameUpper.includes('VIP')

        // Check price range
        const priceInRange = planPrice >= minPrice && planPrice <= maxPrice

        return typeMatches || priceInRange
      })

      matchingPlans.forEach(plan => {
        const planPrice = typeof plan.mensalidade === 'number'
          ? plan.mensalidade
          : typeof plan.valor === 'number'
            ? plan.valor
            : parseFloat(String(plan.valor).replace(',', '.')) || 0

        // Round to nearest 10 for grouping
        const roundedPrice = Math.round(planPrice / 10) * 10

        if (!groups.has(roundedPrice)) {
          groups.set(roundedPrice, {
            price: roundedPrice,
            priceFormatted: roundedPrice.toFixed(2).replace('.', ','),
            units: [],
            planNames: []
          })
        }

        const group = groups.get(roundedPrice)!

        // Add unit if not already in this price group
        if (!group.units.find(u => u.slug === unit.slug)) {
          group.units.push(unit)
        }

        // Add plan name if not already in list
        if (!group.planNames.includes(plan.nome)) {
          group.planNames.push(plan.nome)
        }
      })
    })

    // Sort by price
    return Array.from(groups.values()).sort((a, b) => a.price - b.price)
  }, [unitsWithPlans, selectedPlanType, selectedPlanPrice])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[85vh] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <DollarSign className="w-7 h-7 text-yellow-500" />
                  Comparativo de Preços
                </h2>
                <p className="text-zinc-400 mt-1">
                  Veja as unidades com planos similares ao <span className="text-yellow-400 font-semibold">{selectedPlanType}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(85vh-100px)]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mb-4" />
                <p className="text-zinc-400">Buscando planos em todas as unidades...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-red-400">{error}</p>
              </div>
            ) : priceGroups.length === 0 ? (
              <div className="text-center py-16">
                <Building2 className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400">Nenhum plano similar encontrado nas unidades.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {priceGroups.map((group, index) => (
                  <motion.div
                    key={group.price}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl border border-zinc-800 overflow-hidden"
                  >
                    {/* Price Header */}
                    <div className={`p-4 ${
                      Math.abs(group.price - selectedPlanPrice) < 20
                        ? 'bg-yellow-500/20 border-b border-yellow-500/30'
                        : 'bg-zinc-800/50 border-b border-zinc-700'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`text-3xl font-bold ${
                            Math.abs(group.price - selectedPlanPrice) < 20
                              ? 'text-yellow-400'
                              : 'text-white'
                          }`}>
                            R$ {group.priceFormatted}
                            <span className="text-base font-normal text-zinc-400">/mês</span>
                          </div>
                          {Math.abs(group.price - selectedPlanPrice) < 20 && (
                            <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                              PREÇO SELECIONADO
                            </span>
                          )}
                        </div>
                        <span className="text-zinc-400 text-sm">
                          {group.units.length} unidade{group.units.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      {group.planNames.length > 0 && (
                        <p className="text-zinc-400 text-sm mt-2">
                          Planos: {group.planNames.slice(0, 3).join(', ')}
                          {group.planNames.length > 3 && ` +${group.planNames.length - 3} mais`}
                        </p>
                      )}
                    </div>

                    {/* Units Grid */}
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {group.units.map(unit => (
                        <Link
                          key={unit.slug}
                          href={`/unidades/${unit.slug}?plano=${selectedPlanType.toLowerCase()}`}
                          className="group flex items-center gap-3 p-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-yellow-500/50 transition-all"
                        >
                          {/* Unit Photo */}
                          {unit.photo && (
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={unit.photo}
                                alt={unit.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}

                          {/* Unit Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium text-sm group-hover:text-yellow-400 transition-colors truncate">
                              {unit.name}
                            </h4>
                            <div className="flex items-center gap-1 text-zinc-500 text-xs">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate">{unit.city}</span>
                            </div>
                            <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full ${
                              unit.type?.toLowerCase() === 'diamante'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : unit.type?.toLowerCase() === 'premium'
                                  ? 'bg-purple-500/20 text-purple-400'
                                  : 'bg-zinc-700/50 text-zinc-400'
                            }`}>
                              {unit.type?.toUpperCase() || 'TRADICIONAL'}
                            </span>
                          </div>

                          <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-800 p-4">
            <p className="text-center text-zinc-500 text-xs">
              Os preços podem variar. Consulte a unidade para confirmar valores e condições.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

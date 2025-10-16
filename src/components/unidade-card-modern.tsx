"use client"

import Link from "next/link"
import { MapPin, Eye, Heart, Dumbbell } from "lucide-react"

interface UnidadeCardModernProps {
  location: {
    id: string
    name: string
    address: string
    type: 'tradicional' | 'premium' | 'diamante' | 'inauguracao'
    photo?: string | null
    features: string[]
    planos?: Array<{ price: string; name: string }>
    hours?: string
    logo?: string | null
  }
}

export function UnidadeCardModern({ location }: UnidadeCardModernProps) {
  const isInauguracao = location.type === 'inauguracao'

  const typeConfig = {
    diamante: {
      label: 'Diamante',
      badgeClass: 'text-white bg-cyan-600/90 backdrop-blur-sm border-white/20',
    },
    premium: {
      label: 'Premium',
      badgeClass: 'text-white bg-indigo-900/90 backdrop-blur-sm border-white/20',
    },
    tradicional: {
      label: 'Tradicional',
      badgeClass: 'text-indigo-900 bg-white/90 backdrop-blur-sm border-white/20',
    },
    inauguracao: {
      label: 'Em breve',
      badgeClass: 'text-white bg-zinc-700/90 backdrop-blur-sm border-white/20',
    }
  }

  const config = typeConfig[location.type]
  const hasPlanos = location.planos && location.planos.length > 0
  const priceValue = hasPlanos && location.planos ? location.planos[0].price : null
  const featuresCount = location.features.length

  // Get image from location.photo (which may already be from Sanity)
  const imageUrl = location.photo

  if (isInauguracao) {
    return (
      <article className="group overflow-hidden bg-neutral-900/90 border border-white/10 rounded-xl opacity-60">
        <div className="relative aspect-[16/10]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/20 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
              <p className="text-sm font-medium text-white/60">Em breve</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          <div className={`absolute top-3 left-3 text-[11px] font-medium rounded-full px-2.5 py-1 border font-geist ${config.badgeClass}`}>
            {config.label}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold tracking-tight text-neutral-300 font-geist">{location.name}</h3>
              <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1 font-geist">
                <MapPin className="w-3.5 h-3.5 stroke-[1.5]" />
                {location.address}
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-neutral-500 font-geist">Inauguração em breve</p>
          </div>
        </div>
      </article>
    )
  }

  return (
    <Link href={`/unidades/${location.id}`}>
      <article className="group overflow-hidden bg-neutral-900/90 border border-white/10 rounded-xl hover:border-amber-500/30 transition-all duration-300">
        <div className="relative aspect-[16/10]">
          {location.photo ? (
            <img
              src={location.photo}
              alt={location.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-black/40 flex items-center justify-center">
              <Dumbbell className="w-16 h-16 text-amber-500/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className={`absolute top-3 left-3 text-[11px] font-medium rounded-full px-2.5 py-1 border font-geist ${config.badgeClass}`}>
            {config.label}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold tracking-tight text-neutral-100 font-geist">{location.name}</h3>
              <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1 font-geist">
                <MapPin className="w-3.5 h-3.5 stroke-[1.5]" />
                {location.address.split(',')[0]}
              </p>
            </div>
            <div className="text-right">
              {hasPlanos && priceValue ? (
                <>
                  <div className="text-lg font-semibold text-amber-400 font-geist">R$ {priceValue}</div>
                  <div className="text-[11px] text-neutral-400 font-geist">por mês</div>
                </>
              ) : (
                <div className="text-sm text-neutral-400 font-geist">Consulte</div>
              )}
            </div>
          </div>

          {/* Features count */}
          {featuresCount > 0 && (
            <div className="mt-3 text-[11px] text-neutral-400 font-geist">
              {featuresCount} serviço{featuresCount !== 1 ? 's' : ''} • {hasPlanos && location.planos ? location.planos.length : 0} plano{location.planos && location.planos.length !== 1 ? 's' : ''}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <button className="inline-flex items-center gap-2 text-xs font-medium tracking-tight text-neutral-200 bg-white/5 hover:bg-white/10 rounded-full px-3 py-1.5 border border-white/10 font-geist transition-colors">
              <Eye className="w-3.5 h-3.5 stroke-[1.5]" />
              Ver unidade
            </button>
            <button className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-neutral-200 hover:bg-white/10 transition-colors">
              <Heart className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}

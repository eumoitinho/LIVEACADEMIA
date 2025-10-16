"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Clock, Star, ArrowRight } from "lucide-react"

interface UnidadeCardProps {
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

export function UnidadeCard({ location }: UnidadeCardProps) {
  const isInauguracao = location.type === 'inauguracao'

  const typeConfig = {
    diamante: {
      label: 'Diamante'
    },
    premium: {
      label: 'Premium'
    },
    tradicional: {
      label: 'Tradicional'
    },
    inauguracao: {
      label: 'Em breve'
    }
  }

  const config = typeConfig[location.type]
  const hasPlanos = location.planos && location.planos.length > 0
  const priceValue = hasPlanos && location.planos ? location.planos[0].price : null

  if (isInauguracao) {
    return (
      <div className="group relative">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/20">
          {/* Image placeholder */}
          <div className="relative h-56 overflow-hidden bg-gradient-to-br from-white/5 to-black/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
                <p className="text-sm font-medium text-white/60">Em breve</p>
              </div>
            </div>

            {/* Badge */}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold bg-white/10 text-white/70 border border-white/20">
                {config.label}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white/60 mb-2">{location.name}</h3>
              <div className="flex items-start gap-2 text-white/40">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{location.address}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-center text-sm text-white/40 font-medium">
                Inauguração em breve
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/unidades/${location.id}`} className="group block">
      <div className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 via-white/5 to-transparent backdrop-blur-xl transition-all duration-500 hover:border-amber-400/40 hover:shadow-[0_8px_30px_rgba(251,191,36,0.15)]">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          {location.photo ? (
            <img
              src={location.photo}
              alt={`${location.name} - Live Academia`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-white/5 to-black/20" />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold bg-gradient-to-b from-amber-300 to-amber-400 text-black shadow-lg">
              {config.label}
            </span>
          </div>

          {/* Location badge */}
          <div className="absolute bottom-4 left-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 border border-white/10">
              <MapPin className="h-3 w-3 text-white" />
              <span className="text-xs font-medium text-white">Manaus, AM</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white mb-2">
                {location.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-2.5 py-1 border border-amber-400/40">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                  <span className="text-xs font-bold text-amber-300">Aberta</span>
                </span>
              </div>
            </div>

            {hasPlanos && priceValue && (
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-bold text-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)]">
                  R$ {priceValue}
                </div>
                <p className="text-xs text-amber-400/80 font-semibold">por mês</p>
              </div>
            )}
          </div>

          {/* Address */}
          <div className="flex items-start gap-2.5 text-white/70">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-white/50" />
            <p className="text-sm leading-relaxed">{location.address}</p>
          </div>

          {/* Hours */}
          {location.hours && (
            <div className="flex items-start gap-2.5 text-white/70">
              <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-white/50" />
              <p className="text-sm leading-relaxed">{location.hours}</p>
            </div>
          )}

          {/* Features */}
          {location.features.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-white">Destaques</h4>
                <span className="text-xs text-white/60">{location.features.length} serviços</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {location.features.slice(0, 4).map((feature, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-white/70 border border-white/10"
                  >
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </span>
                ))}
                {location.features.length > 4 && (
                  <span className="inline-flex items-center rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-white/60 border border-white/10">
                    +{location.features.length - 4} mais
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Plans info */}
          {hasPlanos && location.planos && location.planos.length > 1 && (
            <div className="pt-4 border-t border-amber-400/20">
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-400/10 border border-amber-400/30">
                <div>
                  <p className="text-xs text-amber-400/80 mb-0.5 font-semibold">Planos disponíveis</p>
                  <p className="text-sm font-bold text-amber-300">{location.planos.length} opções</p>
                </div>
                <div className="flex items-center gap-1.5 text-amber-300">
                  <span className="text-xs font-bold">Ver planos</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div className="pt-2">
            <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-amber-300 to-amber-400 px-4 py-3.5 text-sm font-bold text-black shadow-[0_4px_12px_rgba(251,191,36,0.3)] transition-all duration-300 hover:from-amber-200 hover:to-amber-300 hover:shadow-[0_8px_20px_rgba(251,191,36,0.4)] hover:scale-[1.02]">
              <span>Ver unidade completa</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

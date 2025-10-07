"use client"

import { motion } from "framer-motion"
import { Dumbbell, Users, Heart, Camera, Target, Bike, CheckCircle, Sparkles, Crown, Zap } from "lucide-react"

import { EstruturaSectionData } from '@/types/cms-sections'

function mapIcon(key?: string) {
  switch (key) {
    case 'dumbbell': return Dumbbell
    case 'users': return Users
    case 'heart': return Heart
    case 'camera': return Camera
    case 'target': return Target
    case 'bike': return Bike
    case 'sparkles': return Sparkles
    case 'zap': return Zap
    default: return Dumbbell
  }
}

const fallbackEstruturas = [
  {
    titulo: "Áreas para musculação e cardio",
    descricao: "Equipamentos modernos para todos os tipos de treino",
    icon: Dumbbell,
    disponibilidade: "Todas as unidades",
    categoria: "básico",
    color: "from-zinc-700 to-zinc-800",
    glowColor: "group-hover:shadow-zinc-500/20"
  },
  {
    titulo: "Espaços exclusivos para aulas coletivas",
    descricao: "Salas equipadas para as melhores aulas da cidade",
    icon: Users,
    disponibilidade: "Todas as unidades",
    categoria: "básico",
    color: "from-zinc-700 to-zinc-800",
    glowColor: "group-hover:shadow-zinc-500/20"
  },
  {
    titulo: "Espaço Relax",
    descricao: "Área de descompressão com cadeira de massagem",
    icon: Heart,
    disponibilidade: "Unidades Diamante",
    categoria: "exclusivo",
    color: "from-yellow-400 to-amber-500",
    glowColor: "group-hover:shadow-yellow-500/30"
  },
  {
    titulo: "Espaço Pose",
    descricao: "Sala para tirar fotos e treinar performance nos palcos",
    icon: Camera,
    disponibilidade: "Unidades Diamante",
    categoria: "exclusivo",
    color: "from-amber-500 to-yellow-600",
    glowColor: "group-hover:shadow-amber-500/30"
  },
  {
    titulo: "Espaço Yoga",
    descricao: "Área exclusiva para a prática de Yoga",
    icon: Sparkles,
    disponibilidade: "Unidades Diamante",
    categoria: "exclusivo",
    color: "from-yellow-500 to-amber-600",
    glowColor: "group-hover:shadow-yellow-500/30"
  },
  {
    titulo: "Espaço Bodybuilding",
    descricao: "Área com máquinas de musculação para alta performance",
    icon: Target,
    disponibilidade: "Unidades Diamante",
    categoria: "exclusivo",
    color: "from-amber-400 to-yellow-500",
    glowColor: "group-hover:shadow-amber-500/30"
  },
  {
    titulo: "Studio Indoor de Bike",
    descricao: "Maior sala de ciclismo indoor da região Norte",
    icon: Bike,
    disponibilidade: "Unidades Diamante",
    categoria: "exclusivo",
    color: "from-yellow-500 to-amber-600",
    glowColor: "group-hover:shadow-yellow-500/30"
  }
]

export default function EstruturaSection({ data }: { data?: EstruturaSectionData }) {
  const estruturas = data?.items?.length
    ? data.items.map(i => ({
        titulo: i.titulo || 'Item',
        descricao: i.descricao || '',
        icon: mapIcon(i.iconKey),
        disponibilidade: i.disponibilidade || '',
        categoria: i.categoria === 'exclusivo' ? 'exclusivo' : 'básico',
        color: i.categoria === 'exclusivo' ? 'from-amber-500 to-yellow-600' : 'from-zinc-700 to-zinc-800',
        glowColor: i.categoria === 'exclusivo' ? 'group-hover:shadow-amber-500/30' : 'group-hover:shadow-zinc-500/20',
      }))
    : fallbackEstruturas
  const easing = [0.16, 1, 0.3, 1] as const

  return (
    <section className="relative py-24 px-6 lg:px-12 overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-black" id="estrutura">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-yellow-400/15 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '5s' }} />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-16 right-16 w-20 h-20 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, delay: 2 }}
        className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-r from-amber-500/15 to-yellow-600/15 rounded-full blur-sm"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easing }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 backdrop-blur-xl mb-6"
          >
            <Crown className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium">Nossa estrutura</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easing }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight"
          >
            {(data?.heading || 'Estrutura completa')}{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent animate-pulse">Live</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: easing }}
            viewport={{ once: true }}
            className="text-lg text-zinc-300 max-w-3xl mx-auto"
          >
            {data?.gallery?.length ? 'Confira os destaques da nossa infraestrutura.' : 'Tudo o que você precisa para alcançar seus objetivos fitness com conforto e qualidade.'}
          </motion.p>
        </motion.div>

        {/* Marquees em duas filas */}
        <div className="relative mt-6 space-y-8">
          <style jsx>{`
            @keyframes marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
          `}</style>
          {([0,1] as const).map(row => {
            // Alternar direção
            const animation = row === 0 ? 'marquee-left 55s linear infinite' : 'marquee-right 55s linear infinite'
            // Dividir itens em duas listas (intercalar para variedade)
            const items = estruturas.filter((_, i) => (i + row) % 2 === 0)
            return (
              <div
                key={row}
                className="mx-auto max-w-7xl overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)'
                }}
              >
                <div className="flex w-max" style={{ animation, willChange: 'transform' }}>
                  {[0,1].map(dup => (
                    <div key={dup} className="flex flex-shrink-0 gap-4 pr-4">
                      {items.map((estrutura, index) => {
                        const exclusivo = estrutura.categoria === 'exclusivo'
                        return (
                          <div
                            key={estrutura.titulo + '-' + row + '-' + dup + '-' + index}
                            className={`group relative overflow-hidden rounded-2xl border ${exclusivo
                              ? 'border-yellow-400/40 bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-black'
                              : 'border-zinc-800/60 bg-gradient-to-br from-zinc-900/70 to-zinc-950/80'} shadow-[0_4px_14px_-3px_rgba(0,0,0,0.55)] hover:shadow-[0_6px_26px_-6px_rgba(0,0,0,0.65)] transition-all duration-500 w-[240px] sm:w-[280px] lg:w-[320px] h-[150px] sm:h-[170px] lg:h-[190px] p-5 flex flex-col justify-between`}
                          >
                            {/* Glow ring for exclusivos */}
                            {exclusivo && (
                              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-yellow-500/30 group-hover:ring-yellow-400/60 transition duration-500" />
                            )}
                            {/* Animated subtle gradient accent */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-yellow-500/10 via-transparent to-amber-500/10" />
                            <div className="flex items-start gap-3 relative z-10">
                              <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${exclusivo ? 'from-yellow-400 to-amber-500 shadow-yellow-500/30' : 'from-zinc-700 to-zinc-800 shadow-black/40'} shadow-inner ring-1 ring-zinc-700/60 group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300`}>
                                <estrutura.icon className={`w-7 h-7 ${exclusivo ? 'text-black' : 'text-yellow-300'} drop-shadow`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white leading-snug line-clamp-2 group-hover:text-yellow-300 transition-colors">
                                  {estrutura.titulo}
                                </h3>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-[11px] sm:text-xs mt-2 relative z-10">
                              <div className="flex items-center gap-1.5 font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                {exclusivo && <CheckCircle className="w-4 h-4 text-yellow-400" />}
                                <span className="truncate max-w-[140px] lg:max-w-[180px]">{estrutura.disponibilidade}</span>
                              </div>
                              {exclusivo && (
                                <span className="text-[10px] sm:text-[11px] font-semibold px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 ring-1 ring-yellow-400/30 backdrop-blur-sm">
                                  Exclusivo
                                </span>
                              )}
                            </div>
                            {/* Hover sheen */}
                            <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(120deg, rgba(250,204,21,0.15), transparent 35%, transparent 65%, rgba(245,158,11,0.15))' }} />
                            {/* Bottom bar accent */}
                            <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: easing }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-5 h-5" /> Agendar visita
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 
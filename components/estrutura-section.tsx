"use client"

import { motion } from "framer-motion"
import { Dumbbell, Users, Heart, Camera, Target, Bike, CheckCircle, Sparkles, Crown, Zap } from "lucide-react"

const estruturas = [
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

export default function EstruturaSection() {
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
            Estrutura completa <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent animate-pulse">Live</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: easing }}
            viewport={{ once: true }}
            className="text-lg text-zinc-300 max-w-3xl mx-auto"
          >
            Tudo o que você precisa para alcançar seus objetivos fitness com conforto e qualidade.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {estruturas.map((estrutura, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: easing }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800/50 hover:border-yellow-500/30 transition-all duration-500 ${estrutura.glowColor} shadow-lg hover:shadow-2xl`}
            >
              {/* Animated Background Glow */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${estrutura.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                whileHover={{ opacity: 0.15 }}
              />

              {/* Badge de disponibilidade */}
              <motion.div
                className="absolute top-4 right-4"
                whileHover={{ scale: 1.05 }}
              >
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  estrutura.categoria === 'exclusivo'
                    ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30'
                    : 'bg-zinc-800/70 text-zinc-300 border border-zinc-700/50'
                }`}>
                  {estrutura.disponibilidade}
                </span>
              </motion.div>

              {/* Ícone com animação */}
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800/70 to-zinc-900/70 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <estrutura.icon className={`w-8 h-8 ${
                  estrutura.categoria === 'exclusivo' ? 'text-yellow-400' : 'text-zinc-400'
                } group-hover:text-yellow-300 transition-colors duration-300`} />
              </motion.div>

              {/* Conteúdo */}
              <motion.h3
                className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {estrutura.titulo}
              </motion.h3>
              <motion.p
                className="text-zinc-400 text-sm leading-relaxed mb-4 group-hover:text-zinc-300 transition-colors duration-300"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                {estrutura.descricao}
              </motion.p>

              {/* Indicador de categoria com animação */}
              {estrutura.categoria === 'exclusivo' && (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckCircle className="w-4 h-4 text-yellow-500" />
                  </motion.div>
                  <span className="text-xs text-yellow-500 font-medium">Exclusivo Diamante</span>
                </motion.div>
              )}

              {/* Sparkle effect for exclusive items */}
              {estrutura.categoria === 'exclusivo' && (
                <motion.div
                  className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: easing }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.div
            className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/50 hover:border-yellow-500/30 max-w-3xl mx-auto shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1, ease: easing }}
              viewport={{ once: true }}
              className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Zap className="w-8 h-8 text-black" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Conheça nossa estrutura completa
            </h3>
            <p className="text-zinc-400 mb-6">
              Visite uma de nossas unidades e descubra todos os espaços exclusivos disponíveis para você.
            </p>
            <motion.button
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agendar visita
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 
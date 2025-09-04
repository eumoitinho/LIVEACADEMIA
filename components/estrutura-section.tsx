"use client"

import { motion } from "framer-motion"
import { Dumbbell, Users, Heart, Camera, Target, Bike, CheckCircle, Sparkles } from "lucide-react"

const estruturas = [
  {
    titulo: "Áreas para musculação e cardio",
    descricao: "Equipamentos modernos para todos os tipos de treino",
    icon: Dumbbell,
    disponibilidade: "Todas as unidades",
    categoria: "básico"
  },
  {
    titulo: "Espaços exclusivos para aulas coletivas",
    descricao: "Salas equipadas para as melhores aulas da cidade",
    icon: Users,
    disponibilidade: "Todas as unidades",
    categoria: "básico"
  },
  {
    titulo: "Espaço Relax",
    descricao: "Área de descompressão com cadeira de massagem",
    icon: Heart,
    disponibilidade: "Unidades Diamante",
    categoria: "exclusivo"
  },
  {
    titulo: "Espaço Pose",
    descricao: "Sala para tirar fotos e treinar performance nos palcos",
    icon: Camera,
    disponibilidade: "Unidades Diamante",
    categoria: "exclusivo"
  },
  {
    titulo: "Espaço Bodybuilding",
    descricao: "Área com máquinas de musculação para alta performance",
    icon: Target,
    disponibilidade: "Unidades Diamante",
    categoria: "exclusivo"
  },
  {
    titulo: "Studio Indoor de Bike",
    descricao: "Maior sala de ciclismo indoor da região Norte",
    icon: Bike,
    disponibilidade: "Unidades Diamante",
    categoria: "exclusivo"
  }
]

export default function EstruturaSection() {
  return (
    <section className="relative py-20 px-6 lg:px-12 overflow-hidden bg-black" id="estrutura">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 mb-6">
            <span className="text-zinc-400 text-sm font-medium">Nossa estrutura</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Estrutura completa <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Live</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Tudo o que você precisa para alcançar seus objetivos fitness com conforto e qualidade.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {estruturas.map((estrutura, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl border border-zinc-800/50 hover:border-zinc-700/50 hover:bg-zinc-900/70 transition-all duration-300"
            >
              {/* Badge de disponibilidade */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800/50 text-zinc-400">
                  {estrutura.disponibilidade}
                </span>
              </div>

              {/* Ícone */}
              <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6">
                <estrutura.icon className="w-8 h-8 text-zinc-400" />
              </div>

              {/* Conteúdo */}
              <h3 className="text-xl font-bold text-white mb-3">
                {estrutura.titulo}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {estrutura.descricao}
              </p>

              {/* Indicador de categoria */}
              {estrutura.categoria === 'exclusivo' && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs text-yellow-500 font-medium">Exclusivo Diamante</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/50 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Conheça nossa estrutura completa
            </h3>
            <p className="text-zinc-400 mb-6">
              Visite uma de nossas unidades e descubra todos os espaços exclusivos disponíveis para você.
            </p>
            <button className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105">
              Agendar visita
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
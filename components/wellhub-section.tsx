"use client"

import { motion } from "framer-motion"
import { Award, Gift, Users, Star, ArrowRight } from "lucide-react"

const beneficiosWellhub = [
  {
    icon: Award,
    titulo: "Benefícios Exclusivos",
    descricao: "Após 15 acessos mensais, assinantes Silver e Silver+ ganham benefícios especiais"
  },
  {
    icon: Gift,
    titulo: "Bioimpedância Grátis",
    descricao: "Ganhe uma bioimpedância ou uma análise corporal 3D"
  },
  {
    icon: Users,
    titulo: "Acessos Diamante",
    descricao: "Mais dois acessos Diamante para seus convidados"
  },
  {
    icon: Star,
    titulo: "Sorteios Mensais",
    descricao: "Concorra a sorteios de brindes mensalmente"
  }
]

export default function WellhubSection() {
  return (
    <section className="relative py-20 px-6 lg:px-12 overflow-hidden bg-zinc-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
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
            <span className="text-zinc-400 text-sm font-medium">Parceria oficial</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Somos parceiros <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Wellhub</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Na Live é assim. Estrutura e benefícios em um só lugar.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Benefícios */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-6">
              {beneficiosWellhub.map((beneficio, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl border border-zinc-700 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
                    <beneficio.icon className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{beneficio.titulo}</h4>
                  <p className="text-zinc-400 text-sm">{beneficio.descricao}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Wellhub Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-zinc-800/50 rounded-3xl p-8 lg:p-10 backdrop-blur-xl border border-zinc-700"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center">
                <Award className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Benefícios Exclusivos</h3>
              <p className="text-zinc-300 leading-relaxed">
                Após 15 acessos mensais, assinantes Silver e Silver+ ganham uma bioimpedância ou uma análise corporal 3D 
                e mais dois acessos Diamante para seus convidados. Além disso, você ainda concorre a sorteios de brindes mensalmente.
              </p>
            </div>
            
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
              >
                SAIBA MAIS
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Banner Wellhub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-3xl p-8 lg:p-12 backdrop-blur-xl text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Acesse a Live Academia através do <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Wellhub</span>
            </h3>
            <p className="text-zinc-400 text-lg mb-8">
              Funcionários de empresas parceiras têm acesso facilitado às nossas unidades com benefícios exclusivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
              >
                ACESSAR WELLHUB
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-zinc-700 text-zinc-300 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-zinc-800/50 backdrop-blur-sm"
              >
                CONSULTE SUA EMPRESA
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
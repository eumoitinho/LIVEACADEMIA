"use client"

import { motion } from "framer-motion"
import { Award, Gift, Users, Star, ArrowRight, CheckCircle } from "lucide-react"

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

const beneficiosDetalhados = [
  "Após 15 acessos mensais, assinantes Silver e Silver+ ganham uma bioimpedância ou uma análise corporal 3D",
  "Mais dois acessos Diamante para seus convidados",
  "Concorra a sorteios de brindes mensalmente"
]

export default function WellhubSection() {
  return (
    <section className="relative py-20 px-6 lg:px-12 overflow-hidden">
      {/* Background transparente para usar o background fixo do layout */}

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
              <div className="space-y-3 text-left">
                {beneficiosDetalhados.map((beneficio, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-yellow-500" />
                    </div>
                    <span className="text-zinc-300 text-sm leading-relaxed">{beneficio}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <button className="bg-amber-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-300 transition-colors duration-200 inline-flex items-center gap-3">
                SAIBA MAIS
                <ArrowRight className="w-5 h-5" />
              </button>
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
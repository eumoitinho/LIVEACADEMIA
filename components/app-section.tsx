"use client"

import { motion } from "framer-motion"
import { Smartphone, Play, Download, Check } from "lucide-react"
import Link from "next/link"

const funcionalidades = [
  {
    icon: Check,
    text: "Visualize seus treinos, com vídeos explicativos sobre a execução correta dos exercícios"
  },
  {
    icon: Check,
    text: "Consulte o vencimento do seu plano"
  },
  {
    icon: Check,
    text: "Renove seu plano diretamente pelo app"
  },
  {
    icon: Check,
    text: "Confira a grade de aulas coletivas, por unidade"
  },
  {
    icon: Check,
    text: "Receba notificações e comunicados importantes sobre a sua unidade (função disponível somente no App Treino)"
  }
]

const apps = [
  {
    nome: "App Live",
    descricao: "Aplicativo principal da Live Academia",
    playStore: "https://play.google.com/store/apps/details?id=br.com.w12.liveacademia&hl=pt_BR",
    appStore: "https://apps.apple.com/br/app/live-academia/id6745790187"
  },
  {
    nome: "App Treino",
    descricao: "Aplicativo para acompanhar seus treinos",
    playStore: "https://play.google.com/store/apps/details?id=com.pacto",
    appStore: "https://apps.apple.com/br/app/treino/id862662527"
  }
]

export default function AppSection() {
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
            <span className="text-zinc-400 text-sm font-medium">Aplicativos móveis</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Seu treino na <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">palma da mão</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-4xl mx-auto">
            A Live Academia conta com dois aplicativos exclusivos (App Live e App Treino) para facilitar sua jornada fitness 
            e melhorar sua experiência de treino -- dentro e fora da academia!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Funcionalidades */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {funcionalidades.map((funcionalidade, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <funcionalidade.icon className="w-4 h-4 text-black" />
                  </div>
                  <p className="text-zinc-300 leading-relaxed">{funcionalidade.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* App Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl flex items-center justify-center mb-8">
                <Smartphone className="w-32 h-32 text-black" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-3xl blur-xl"></div>
            </div>
            <p className="text-zinc-400 text-lg">
              Interface intuitiva e moderna para facilitar sua jornada fitness
            </p>
          </motion.div>
        </div>

        {/* Apps Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-zinc-800/50 rounded-3xl p-8 lg:p-12 backdrop-blur-xl border border-zinc-700"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Disponíveis para <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Google Play e App Store</span>
            </h3>
            <p className="text-zinc-400 text-lg">
              Baixe agora e tenha acesso completo aos seus treinos e funcionalidades exclusivas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {apps.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 rounded-2xl p-6 backdrop-blur-xl border border-zinc-700"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-black" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{app.nome}</h4>
                  <p className="text-zinc-400 text-sm">{app.descricao}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <Link href={app.playStore} target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Play className="w-5 h-5" />
                      Google Play
                    </motion.button>
                  </Link>
                  
                  <Link href={app.appStore} target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      App Store
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
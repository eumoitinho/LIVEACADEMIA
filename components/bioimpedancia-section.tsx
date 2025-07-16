"use client"

import { motion } from "framer-motion"
import { Activity, BarChart3, Eye, Zap, ArrowRight, CheckCircle } from "lucide-react"

const dadosBioimpedancia = [
  {
    icon: Activity,
    titulo: "Peso e IMC",
    descricao: "Dados completos sobre seu peso corporal e índice de massa corporal"
  },
  {
    icon: BarChart3,
    titulo: "Gordura Corporal",
    descricao: "Percentual de gordura corporal e taxa de gordura visceral"
  },
  {
    icon: Zap,
    titulo: "Massa Magra",
    descricao: "Quantidade de massa magra, proteínas e minerais"
  },
  {
    icon: Activity,
    titulo: "Água Corporal",
    descricao: "Quantidade de água no organismo para hidratação ideal"
  }
]

const beneficiosBioimpedancia = [
  "É um exame fundamental para traçar metas realistas e acompanhar sua evolução de forma objetiva",
  "Disponível em diversas unidades Diamante",
  "Acompanhe sua evolução de forma objetiva e personalizada"
]

export default function BioimpedanciaSection() {
  return (
    <section className="relative py-20 px-6 lg:px-12 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
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
            <span className="text-zinc-400 text-sm font-medium">Monitoramento avançado</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Bioimpedância e análise 3D: <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">monitore o progresso</span> do seu corpo
          </h2>
          <p className="text-xl text-zinc-400 max-w-4xl mx-auto">
            Com o exame de bioimpedância, disponível em diversas unidades Diamante, você tem acesso a dados completos sobre sua composição corporal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Dados da Bioimpedância */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Dados Completos da Bioimpedância</h3>
              <div className="space-y-3 mb-6">
                {beneficiosBioimpedancia.map((beneficio, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-yellow-500" />
                    </div>
                    <span className="text-zinc-300 text-sm leading-relaxed">{beneficio}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {dadosBioimpedancia.map((dado, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-zinc-900/50 rounded-2xl p-4 backdrop-blur-xl border border-zinc-700"
                >
                  <div className="w-10 h-10 mb-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
                    <dado.icon className="w-5 h-5 text-black" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1">{dado.titulo}</h4>
                  <p className="text-zinc-400 text-xs">{dado.descricao}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Análise 3D */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 rounded-3xl p-8 lg:p-10 backdrop-blur-xl border border-zinc-700"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center">
                <Eye className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Análise Corporal 3D</h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Para uma experiência ainda mais inovadora, a unidade Flores Diamante conta com a exclusiva 
                Análise Corporal 3D da Bodygee. Esta tecnologia representa uma evolução da bioimpedância tradicional, 
                criando um modelo de avatar 3D fotorrealista do seu corpo.
              </p>
              <p className="text-zinc-400 mb-8">
                Com ela, você pode visualizar seu progresso de forma detalhada e tridimensional por apenas 
                <span className="text-yellow-400 font-bold"> R$ 100</span>.
              </p>
            </div>
            
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
              >
                AGENDAR ANÁLISE 3D
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* CTA Geral */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-3xl p-8 lg:p-12 backdrop-blur-xl text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Monitore seu progresso com <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">precisão científica</span>
          </h3>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Disponível em diversas unidades Diamante para você acompanhar sua evolução de forma objetiva e personalizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
            >
              SAIBA MAIS!
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-zinc-700 text-zinc-300 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-zinc-800/50 backdrop-blur-sm"
            >
              VER UNIDADES DIAMANTE
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
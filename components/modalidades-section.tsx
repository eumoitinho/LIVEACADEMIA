"use client"

import { motion } from "framer-motion"
import { Dumbbell, Heart, Users, Target, Zap, Shield, ArrowRight } from "lucide-react"

const modalidades = [
  {
    icon: Dumbbell,
    title: "Musculação",
    description: "Treinos personalizados para hipertrofia, força e resistência muscular.",
    features: ["Equipamentos modernos", "Acompanhamento profissional", "Treinos personalizados"],
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    icon: Heart,
    title: "Aeróbico",
    description: "Atividades cardiovasculares para melhorar sua condição física.",
    features: ["Esteiras elétricas", "Bicicletas ergométricas", "Elípticos"],
    gradient: "from-yellow-500 to-amber-600"
  },
  {
    icon: Users,
    title: "Aulas Coletivas",
    description: "Aulas em grupo com energia e motivação para todos os níveis.",
    features: ["Zumba", "Spinning", "Pilates", "Yoga"],
    gradient: "from-amber-500 to-yellow-600"
  },
  {
    icon: Target,
    title: "Funcional",
    description: "Treinos dinâmicos que trabalham todo o corpo de forma integrada.",
    features: ["Treinos variados", "Alto gasto calórico", "Melhora da coordenação"],
    gradient: "from-yellow-400 to-amber-500"
  },
  {
    icon: Zap,
    title: "CrossFit",
    description: "Treinos de alta intensidade para atletas que buscam superar limites.",
    features: ["WODs diários", "Comunidade ativa", "Resultados rápidos"],
    gradient: "from-amber-500 to-yellow-600"
  },
  {
    icon: Shield,
    title: "Personal Trainer",
    description: "Acompanhamento individualizado para atingir seus objetivos específicos.",
    features: ["Avaliação física", "Treinos exclusivos", "Acompanhamento nutricional"],
    gradient: "from-yellow-500 to-amber-600"
  }
]

export default function ModalidadesSection() {
  return (
    <section id="servicos" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 mb-6">
            <span className="text-zinc-400 text-sm font-medium">Modalidades exclusivas</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nossas <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Modalidades</span>
          </h2>
          <p className="text-zinc-300 text-lg max-w-3xl mx-auto">
            Oferecemos uma ampla variedade de atividades físicas para atender todos os seus objetivos e preferências.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modalidades.map((modalidade, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${modalidade.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className={`bg-gradient-to-br ${modalidade.gradient} p-3 rounded-2xl mr-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <modalidade.icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{modalidade.title}</h3>
                </div>
                
                <p className="text-zinc-300 mb-6 leading-relaxed">
                  {modalidade.description}
                </p>
                
                <ul className="space-y-3">
                  {modalidade.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-zinc-300">
                      <div className={`w-2 h-2 bg-gradient-to-r ${modalidade.gradient} rounded-full mr-3`}></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-8 rounded-3xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300">
            <h3 className="text-2xl font-bold text-black mb-4">
              Comece Sua Transformação Hoje
            </h3>
            <p className="text-black/90 mb-6">
              Escolha a modalidade que mais combina com você e comece sua jornada fitness!
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-2xl font-semibold hover:bg-zinc-900 transition-all duration-300 flex items-center gap-2 mx-auto group">
              <span>Agendar Aula Experimental</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
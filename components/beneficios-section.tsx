

"use client"

import { motion } from "framer-motion"
import { Dumbbell, ShieldCheck, Smartphone, Users, CheckCircle, Star, Zap, Snowflake } from "lucide-react"
import Image from "next/image"

const beneficios = [
  {
    icon: ShieldCheck,
    title: "Planos flexíveis",
    description: "Em qualquer plano, você treina sem fidelidade, taxas de cancelamento, manutenção ou anuidade.",
    color: "from-yellow-400 to-amber-500",
    image: "/images/academia-1.webp",
  },
  {
    icon: Star,
    title: "Espaços exclusivos",
    description: "Desfrute de áreas como Espaço Relax, Espaço Yoga e o maior Studio de Bike Indoor da região Norte com o plano Diamante.",
    color: "from-amber-500 to-yellow-600",
    image: "/images/academia-2.webp",
  },
  {
    icon: Users,
    title: "Aulas coletivas",
    description: "Diversifique seu treino com uma grade variada de aulas e aproveite o ambiente coletivo para socializar e manter a disciplina.",
    color: "from-yellow-500 to-amber-600",
    image: "/images/academia-3.webp",
  },
  {
    icon: Snowflake,
    title: "Climatização",
    description: "Treine com mais conforto nos ambientes climatizados disponíveis nas unidades Diamante, Premium e Tradicional Climatizada.",
    color: "from-yellow-400 to-amber-500",
    image: "/images/academia-4.webp",
  },
]

export default function BeneficiosSection() {
  const easing = [0.16, 1, 0.3, 1] as const

  return (
    <section className="relative py-24 px-6 lg:px-12 overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-black">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '4s' }} />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full opacity-20 blur-sm"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        className="absolute bottom-32 left-16 w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full opacity-15 blur-sm"
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
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium">Por que escolher a Live Academia?</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easing }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight"
          >
            Benefícios <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent animate-pulse">exclusivos</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: easing }}
            viewport={{ once: true }}
            className="text-lg text-zinc-300 max-w-3xl mx-auto"
          >
            Tudo o que você precisa para transformar seu corpo e sua vida, com liberdade e tecnologia.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {beneficios.map((beneficio, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: easing }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl rounded-3xl border border-zinc-800/50 hover:border-yellow-500/30 transition-all duration-500 overflow-hidden h-[380px] shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10"
            >
              {/* Animated Background Image */}
              <motion.div
                className="absolute inset-0 z-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
              >
                <div className="absolute inset-4">
                  <Image
                    src={beneficio.image}
                    alt={beneficio.title}
                    fill
                    className="object-cover rounded-2xl opacity-15 group-hover:opacity-25 transition-opacity duration-700"
                    quality={85}
                  />
                </div>
              </motion.div>

              {/* Enhanced Glow effect on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${beneficio.color} opacity-0 group-hover:opacity-15 rounded-3xl transition-opacity duration-500`}
                whileHover={{ opacity: 0.2 }}
              />

              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(45deg, transparent, ${idx % 2 === 0 ? 'rgba(251, 191, 36, 0.1)' : 'rgba(245, 158, 11, 0.1)'}, transparent)`,
                  padding: '1px'
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 rounded-3xl" />
              </motion.div>

              <div className="relative z-10 p-8 h-full flex flex-col">
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${beneficio.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:shadow-yellow-500/30 transition-all duration-300`}>
                    <beneficio.icon className="h-8 w-8 text-black" />
                  </div>
                </motion.div>
                <motion.h3
                  className="font-bold text-white text-xl mb-3 group-hover:text-yellow-400 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {beneficio.title}
                </motion.h3>
                <motion.p
                  className="text-zinc-400 leading-relaxed flex-grow group-hover:text-zinc-300 transition-colors duration-300"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  {beneficio.description}
                </motion.p>

                {/* Animated checkmark */}
                <motion.div
                  className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                >
                  <div className="flex items-center gap-2 text-yellow-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Disponível agora</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: easing }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 backdrop-blur-xl">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium">Experimente sem compromisso</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


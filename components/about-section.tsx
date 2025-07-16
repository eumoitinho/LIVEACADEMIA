"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Users, MapPin, Star, Award } from "lucide-react"

export default function AboutSection() {
  const stats = [
    {
      number: "10K+",
      label: "Alunos ativos",
      icon: Users
    },
    {
      number: "35+",
      label: "Unidades",
      icon: MapPin
    },
    {
      number: "4.9",
      label: "Avaliação média",
      icon: Star
    },
    {
      number: "10+",
      label: "Anos de experiência",
      icon: Award
    }
  ]

  return (
    <section className="relative py-20 px-6 lg:px-12 overflow-hidden bg-live-bg" id="sobre">
      {/* Fundo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-live-bg via-live-bg to-live-bg"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-live-accent/10 via-transparent to-live-accent/5 opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Conteúdo esquerdo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-0.5 bg-live-accent"></div>
              <span className="text-live-accent text-sm font-medium">Sobre a Live Academia</span>
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-live-textPrimary mb-6 leading-tight">
                Seu treino, suas
                <span className="bg-gradient-to-r from-live-accent to-live-yellowLight bg-clip-text text-transparent"> regras</span>
              </h2>
              <div className="space-y-6 text-live-textSecondary text-lg leading-relaxed">
                <p>
                  A Live Academia está presente em Manaus há mais de 10 anos, oferecendo estrutura moderna, equipamentos de última geração e profissionais altamente qualificados para te ajudar a alcançar seus objetivos.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Imagem à direita */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-live-border/20 backdrop-blur-sm rounded-3xl p-3 border border-live-border/30 shadow-2xl">
              <Image
                src="/images/academia-1.webp"
                alt="Estrutura Live Academia"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-2xl shadow-xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-live-accent/20 to-live-accent/40 rounded-2xl flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-live-accent" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-live-textPrimary mb-2">
                {stat.number}
              </div>
              <div className="text-live-textSecondary text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 
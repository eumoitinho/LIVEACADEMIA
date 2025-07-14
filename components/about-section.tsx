"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="relative py-20 px-6 lg:px-12 overflow-hidden bg-live-bg" id="sobre">
      {/* Fundo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-live-bg via-live-bg to-live-bg"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-live-accent/10 via-transparent to-live-accent/5 opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
                Transformando vidas com
                <span className="bg-gradient-to-r from-live-accent to-live-yellowLight bg-clip-text text-transparent"> saúde e bem-estar</span>
              </h2>
              <div className="space-y-6 text-live-textSecondary text-lg leading-relaxed">
                <p>
                  A Live Academia está presente em Manaus há mais de 10 anos, oferecendo estrutura moderna, equipamentos de última geração e profissionais altamente qualificados para te ajudar a alcançar seus objetivos.
                </p>
                <p>
                  Aqui você encontra planos flexíveis, ambiente acolhedor e acompanhamento personalizado para transformar seu corpo e sua vida.
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
      </div>
    </section>
  )
} 
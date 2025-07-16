"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Smartphone, Activity, Calendar, BarChart3, Bell, Users, CheckCircle } from "lucide-react"

const features = [
  { icon: Activity, title: "Treinos Personalizados", description: "Exercícios adaptados ao seu objetivo" },
  { icon: Calendar, title: "Agende Aulas", description: "Reserve seu lugar nas aulas coletivas" },
  { icon: BarChart3, title: "Acompanhe Evolução", description: "Gráficos detalhados do seu progresso" },
  { icon: Bell, title: "Notificações", description: "Lembretes de treino e aulas" },
  { icon: Users, title: "Comunidade", description: "Conecte-se com outros alunos" },
  { icon: Smartphone, title: "Check-in Digital", description: "Entre na academia com o celular" },
]

const beneficios = [
  "Acompanhe seus treinos e monitore sua evolução",
  "Agende aulas coletivas e receba lembretes",
  "Acesse sua ficha de treino personalizada",
  "Conecte-se com outros alunos da comunidade",
  "Receba notificações sobre novidades e eventos",
  "Faça check-in digital nas unidades"
]

export default function AppSection() {
  return (
    <section className="relative py-20 px-6 lg:px-12 overflow-hidden bg-black" id="app">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 mb-6">
              <span className="text-zinc-400 text-sm font-medium">Tecnologia e fitness</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Seu treino na
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"> palma da mão</span>
            </h2>

            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Dois apps exclusivos para transformar sua experiência. Tecnologia que simplifica 
              sua jornada fitness e maximiza seus resultados.
            </p>

            {/* Benefícios */}
            <div className="space-y-4 mb-10">
              {beneficios.map((beneficio, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-yellow-500" />
                  </div>
                  <span className="text-zinc-300 text-sm">{beneficio}</span>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="#" 
                className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-3 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 flex items-center gap-3"
              >
                <div className="w-8 h-8">
                  <svg viewBox="0 0 24 24" className="w-full h-full fill-zinc-400 group-hover:fill-white transition-colors">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-zinc-500">Baixar na</div>
                  <div className="text-sm font-semibold text-white">App Store</div>
                </div>
              </a>

              <a 
                href="#" 
                className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-3 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 flex items-center gap-3"
              >
                <div className="w-8 h-8">
                  <svg viewBox="0 0 24 24" className="w-full h-full fill-zinc-400 group-hover:fill-white transition-colors">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-zinc-500">Disponível no</div>
                  <div className="text-sm font-semibold text-white">Google Play</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative mx-auto max-w-sm">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 blur-3xl" />
              
              {/* Phone frame */}
              <div className="relative bg-zinc-900 rounded-[3rem] p-3 border border-zinc-800">
                <div className="bg-black rounded-[2.5rem] p-2">
                  <Image
                    src="/images/academia-1.webp"
                    alt="App Live Academia"
                    width={300}
                    height={600}
                    className="w-full h-auto rounded-[2.5rem]"
                    quality={90}
                  />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-8 -right-8 bg-gradient-to-r from-yellow-400 to-amber-500 p-4 rounded-2xl shadow-lg"
              >
                <Activity className="w-6 h-6 text-black" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-8 -left-8 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-lg"
              >
                <BarChart3 className="w-6 h-6 text-yellow-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { useAppSectionData } from "@/hooks/use-sanity-data"
import { urlFor } from "@/lib/sanity"
import type { AppSectionData } from "@/types/sanity"

export default function AppSectionEditable() {
  const { data, loading } = useAppSectionData()

  // Dados de fallback
  const fallbackData: Partial<AppSectionData> = {
    badge: undefined,
    title: "Seu treino na",
    highlightedText: "palma da mão",
    description: "A Live Academia conta com dois aplicativos exclusivos (App Live e App Treino) para facilitar sua jornada fitness e melhorar sua experiência de treino – dentro e fora da academia!",
    subtitle: "Disponíveis para Google Play e App Store.",
    benefits: [
      "Visualize seus treinos, com vídeos explicativos sobre a execução correta dos exercícios",
      "Consulte o vencimento do seu plano",
      "Renove seu plano diretamente pelo app",
      "Confira a grade de aulas coletivas, por unidade",
      "Receba notificações e comunicados importantes sobre a sua unidade (função disponível somente no App Treino)"
    ],
    appLiveUrl: "https://apps.apple.com/br/app/live-academia/id6745790187",
    appTreinoUrl: "https://apps.apple.com/br/app/treino/id862662527",
    appLivePlayStoreUrl: "https://play.google.com/store/apps/details?id=br.com.w12.liveacademia&hl=pt_BR",
    appTreinoPlayStoreUrl: "https://play.google.com/store/apps/details?id=com.pacto"
  }

  const sectionData = { ...fallbackData, ...data }

  const getImageUrl = () => {
    if (data?.appImage) {
      return urlFor(data.appImage).url()
    }
    return "/images/app.jpeg"
  }

  return (
    <section className="relative py-20 px-6 lg:px-12 overflow-hidden" id="app">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
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
            {sectionData.badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 mb-6 bg-gradient-to-r from-yellow-500/10 to-amber-500/10"
              >
                <span className="text-yellow-300 text-sm font-medium">{sectionData.badge}</span>
              </motion.div>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              {sectionData.title}{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                {sectionData.highlightedText}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-zinc-400 text-lg mb-8 leading-relaxed"
            >
              {sectionData.description}
            </motion.p>

            {sectionData.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-zinc-500 text-sm mb-8 italic"
              >
                {sectionData.subtitle}
              </motion.p>
            )}

            {/* Benefits */}
            {Array.isArray(sectionData.benefits) && sectionData.benefits.length > 0 && (
              <div className="space-y-4 mb-10">
                {sectionData.benefits.map((beneficio, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 group"
                  >
                    <motion.div
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckCircle className="w-4 h-4 text-black" />
                    </motion.div>
                    <span className="text-zinc-300 text-sm group-hover:text-white transition-colors duration-300">
                      {beneficio}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4"
            >
              {/* App Live - App Store */}
              {sectionData.appLiveUrl && (
                <motion.a
                  href={sectionData.appLiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-4 hover:bg-zinc-800 hover:border-yellow-500/30 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-10 h-10">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-zinc-400 group-hover:fill-white transition-colors">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white">App Live</div>
                    <div className="text-xs text-zinc-400">Baixar na App Store</div>
                  </div>
                </motion.a>
              )}

              {/* App Live - Google Play */}
              {sectionData.appLivePlayStoreUrl && (
                <motion.a
                  href={sectionData.appLivePlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-4 hover:bg-zinc-800 hover:border-yellow-500/30 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-10 h-10">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-zinc-400 group-hover:fill-white transition-colors">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white">App Live</div>
                    <div className="text-xs text-zinc-400">Disponível no Google Play</div>
                  </div>
                </motion.a>
              )}

              {/* App Treino - App Store */}
              {sectionData.appTreinoUrl && (
                <motion.a
                  href={sectionData.appTreinoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-4 hover:bg-zinc-800 hover:border-yellow-500/30 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-10 h-10">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-zinc-400 group-hover:fill-white transition-colors">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white">App Treino</div>
                    <div className="text-xs text-zinc-400">Baixar na App Store</div>
                  </div>
                </motion.a>
              )}

              {/* App Treino - Google Play */}
              {sectionData.appTreinoPlayStoreUrl && (
                <motion.a
                  href={sectionData.appTreinoPlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-4 hover:bg-zinc-800 hover:border-yellow-500/30 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-10 h-10">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-zinc-400 group-hover:fill-white transition-colors">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white">App Treino</div>
                    <div className="text-xs text-zinc-400">Disponível no Google Play</div>
                  </div>
                </motion.a>
              )}
            </motion.div>
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
              {/* Glow effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-600/20 blur-2xl animate-pulse" />

              {/* Phone frame */}
              <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-[3rem] p-3 border border-zinc-700 shadow-2xl shadow-yellow-500/20">
                <div className="bg-black rounded-[2.5rem] p-2 overflow-hidden">
                  <div className="relative w-full aspect-[9/19] rounded-[2.5rem] overflow-hidden">
                    <Image
                      src={getImageUrl()}
                      alt="App Live Academia"
                      fill
                      className="object-cover"
                      quality={90}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-10" />
              </div>

              {/* Floating decoration circles */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 opacity-20 blur-2xl"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 opacity-20 blur-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

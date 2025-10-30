"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Smartphone, Activity, Calendar, BarChart3, Bell, Users, CheckCircle, Star, Zap } from "lucide-react"
import { useAppSectionData } from "../../../hooks/use-sanity-data"
import { urlFor } from "../../../lib/sanity"

export default function AppSection() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const { data: appData, loading } = useAppSectionData()

  if (loading) {
    return (
      <section className="relative py-20 px-6 lg:px-12 overflow-hidden" id="app">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando aplicativo...</p>
        </div>
      </section>
    )
  }

  if (!appData) {
    return null
  }

  // Create screen data from Sanity
  const appScreens = [
    {
      id: 1,
      image: appData.appImage ? urlFor(appData.appImage).width(300).height(600).url() : "/images/app.jpeg",
      title: appData.title || "",
      description: appData.description || ""
    }
  ]

  return (
    <section className="relative py-20 px-6 lg:px-12 overflow-hidden" id="app">
      {/* Background transparente para usar o background fixo do layout */}

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
            {appData.badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 mb-6 bg-gradient-to-r from-yellow-500/10 to-amber-500/10"
              >
                <Zap className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-yellow-300 text-sm font-medium">{appData.badge}</span>
              </motion.div>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              {appData.title.split(appData.highlightedText)[0]}
              <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent animate-pulse">
                {appData.highlightedText}
              </span>
              {appData.title.split(appData.highlightedText)[1]}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-zinc-400 text-lg mb-8 leading-relaxed"
            >
              {appData.description}
            </motion.p>

            {appData.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-zinc-500 text-sm mb-8 italic"
              >
                {appData.subtitle}
              </motion.p>
            )}

            {/* Benefícios */}
            {appData.benefits && appData.benefits.length > 0 && (
              <div className="space-y-4 mb-10">
                {appData.benefits.map((beneficio: string, index: number) => (
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
                  <span className="text-zinc-300 text-sm group-hover:text-white transition-colors duration-300">{beneficio}</span>
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
              {appData.appLiveUrl && (
                <motion.a
                  href={appData.appLiveUrl}
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

              {appData.appTreinoUrl && (
                <motion.a
                  href={appData.appTreinoUrl}
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
            </motion.div>
          </motion.div>

          {/* Enhanced Phone Mockup with Screen Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative mx-auto max-w-sm">
              {/* Enhanced Glow effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-amber-600/10 blur-2xl animate-pulse" />

              {/* Phone frame */}
              <div className="relative bg-zinc-900 rounded-[3rem] p-3 border border-zinc-800 shadow-2xl shadow-yellow-500/10">
                <div className="bg-black rounded-[2.5rem] p-2 overflow-hidden">
                  {/* Screen Carousel */}
                  <div className="relative w-full aspect-[9/19] rounded-[2.5rem] overflow-hidden">
                    {appScreens.map((screen, index) => (
                      <motion.div
                        key={screen.id}
                        className="absolute inset-0"
                        initial={{ opacity: index === 0 ? 1 : 0, scale: index === 0 ? 1 : 0.95 }}
                        animate={{
                          opacity: currentScreen === index ? 1 : 0,
                          scale: currentScreen === index ? 1 : 0.95
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={screen.image}
                          alt={`App Live Academia - ${screen.title}`}
                          fill
                          className="object-cover"
                          quality={90}
                        />
                        {/* Screen overlay with info */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h4 className="text-white font-semibold text-sm">{screen.title}</h4>
                          <p className="text-white/80 text-xs">{screen.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Screen indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {appScreens.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentScreen(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentScreen === index
                          ? 'bg-yellow-400 w-6'
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Enhanced Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-8 -right-8 bg-gradient-to-r from-yellow-400 to-amber-500 p-4 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Activity className="w-6 h-6 text-black" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-8 -left-8 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <BarChart3 className="w-6 h-6 text-yellow-500" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0], x: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute top-1/2 -right-12 bg-gradient-to-r from-amber-500 to-yellow-600 p-3 rounded-xl shadow-lg"
              >
                <Bell className="w-5 h-5 text-black" />
              </motion.div>
            </div>

            {/* Screen navigation hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="text-center text-zinc-500 text-sm mt-4"
            >
              Toque nos indicadores para ver diferentes telas do app
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
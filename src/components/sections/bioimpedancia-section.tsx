"use client"

import { motion } from "framer-motion"
import { useBioimpedanciaFeaturesData } from "@/hooks/use-sanity-data"
import { urlFor } from "@/lib/sanity"

const easing = [0.16, 1, 0.3, 1] as const

export default function BioimpedanciaSection() {
  const { data: bioimpedanciaData, loading } = useBioimpedanciaFeaturesData()

  if (loading) {
    return (
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </section>
    )
  }

  if (!bioimpedanciaData || bioimpedanciaData.length === 0) {
    return null
  }

  const mainFeature = bioimpedanciaData[0] // Usa o primeiro item como principal
  const secondFeature = bioimpedanciaData[1] // Usa o segundo item

  return (
    <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
      {/* Background transparente para usar o background fixo do layout */}
      
      <div className="relative z-10 mx-auto max-w-6xl space-y-16">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-widest text-primary/70">
            Bioimpedância
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 text-white">
            {mainFeature.title || "Avaliação Corporal Completa"}
          </h2>
          <p className="text-lg text-white/75 mt-3 leading-relaxed">
            {mainFeature.description || "Descubra todos os detalhes da sua composição corporal com nossa avaliação de bioimpedância de alta precisão."}
          </p>
        </motion.header>

        {/* Duas imagens lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Primeira imagem */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easing }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {mainFeature.image ? (
              <img
                src={urlFor(mainFeature.image).width(600).height(400).url()}
                alt={mainFeature.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <p className="text-white/70">Imagem da Bioimpedância</p>
                </div>
              </div>
            )}
            <h3 className="text-2xl font-bold text-white text-center">
              {mainFeature.title || "Avaliação Corporal"}
            </h3>
            <p className="text-white/75 text-center">
              {mainFeature.description || "Descubra sua composição corporal completa"}
            </p>
          </motion.div>

          {/* Segunda imagem */}
          {secondFeature && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easing }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {secondFeature.image ? (
                <img
                  src={urlFor(secondFeature.image).width(600).height(400).url()}
                  alt={secondFeature.title}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <p className="text-white/70">Imagem Adicional</p>
                  </div>
                </div>
              )}
              <h3 className="text-2xl font-bold text-white text-center">
                {secondFeature.title || "Acompanhamento"}
              </h3>
              <p className="text-white/75 text-center">
                {secondFeature.description || "Acompanhe sua evolução"}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
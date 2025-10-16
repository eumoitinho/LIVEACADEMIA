"use client"

import { motion } from "framer-motion"
import { useBioimpedanciaFeaturesData } from "../../../hooks/use-sanity-data"
import { urlFor } from "../../../lib/sanity"

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

  return (
    <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
      {/* Background transparente para usar o background fixo do layout */}
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-widest text-primary/70">
            Bioimpedância
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 text-foreground">
            {mainFeature.title}
          </h2>
          <p className="text-lg text-muted-foreground mt-3 leading-relaxed">
            {mainFeature.description}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagem Principal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easing }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            {mainFeature.image ? (
              <img
                src={urlFor(mainFeature.image).width(800).height(600).url()}
                alt={mainFeature.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <p className="text-muted-foreground">Imagem da Bioimpedância</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easing, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            {/* Benefícios */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                O que você vai descobrir:
              </h3>
              
              <div className="space-y-4">
                {mainFeature.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: easing, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easing, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              className="pt-6"
            >
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-primary/25">
                Agendar Avaliação
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Imagem Secundária */}
        {bioimpedanciaData.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easing, delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-16 text-center"
          >
            {bioimpedanciaData[1].image ? (
              <img
                src={urlFor(bioimpedanciaData[1].image).width(800).height(400).url()}
                alt={bioimpedanciaData[1].title}
                className="w-full max-w-4xl mx-auto h-auto rounded-2xl shadow-2xl"
              />
            ) : (
              <div className="w-full max-w-4xl mx-auto h-64 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <p className="text-muted-foreground">Imagem Adicional</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, CreditCard } from "lucide-react"

interface PlanoItem {
  name: string
  price: string
  codigo?: string
}

interface PlanosCardsProps {
  planos: Array<PlanoItem>
  unidadeName: string
  onMatricular: (plano: PlanoItem) => void
}

export default function PlanosCards({ planos, unidadeName, onMatricular }: PlanosCardsProps) {
  if (!planos || planos.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-live-border/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-live-accent">Planos</span> Disponíveis
            </h2>
            <p className="text-xl text-live-textSecondary">
              Escolha o plano ideal para você na unidade {unidadeName}
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {planos.map((plano, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-live-border/10 rounded-2xl border border-live-border/30 hover:border-live-accent/50 hover:bg-live-accent/5 transition-all duration-300 overflow-hidden group"
              >
                {/* Header do Card */}
                <div className="bg-gradient-to-r from-live-accent/10 to-live-accent/5 p-6 text-center">
                  <h3 className="text-lg font-bold text-live-textPrimary mb-2">
                    {plano.name}
                  </h3>
                  <div className="text-4xl font-bold text-live-accent mb-2">
                    R$ {plano.price}
                    <span className="text-sm font-normal text-live-textSecondary">/mês</span>
                  </div>
                </div>
                
                {/* Features */}
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-live-accent flex-shrink-0" />
                      <span className="text-live-textPrimary">Sem taxa de matrícula</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-live-accent flex-shrink-0" />
                      <span className="text-live-textPrimary">Sem fidelidade</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-live-accent flex-shrink-0" />
                      <span className="text-live-textPrimary">Acesso via app</span>
                    </div>
                    {plano.name.toLowerCase().includes('diamante') && (
                      <>
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-live-accent flex-shrink-0" />
                          <span className="text-live-textPrimary">Ambiente climatizado</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-live-accent flex-shrink-0" />
                          <span className="text-live-textPrimary">Espaços exclusivos</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Botão de Matrícula */}
                  <button
                    onClick={() => onMatricular(plano)}
                    className="w-full bg-gradient-to-r from-live-accent to-yellow-500 text-black font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-live-accent/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    MATRICULAR-SE
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
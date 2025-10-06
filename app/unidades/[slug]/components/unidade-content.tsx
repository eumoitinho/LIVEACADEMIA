"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, CheckCircle, Star, Phone, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
// PlanosCards agora consumido por wrapper de carregamento dinâmico
import UnitPlanos from "@/components/unit-planos"
import CheckoutModal from "@/components/checkout-modal"
import { useUnit } from "@/contexts/unit-context"

interface UnidadeContentProps {
  unidade: {
    id: string
    name: string
    address: string
    hours: string
    features: string[]
    type: string
    tourUrl?: string | null
    logo?: string | null
    photo?: string | null
    planos?: Array<{
      name: string
      price: string
    }>
    hotsite?: string
  }
  data: {
    modalidades: string[]
    beneficios: string[]
    fotos: string[]
  }
}

export default function UnidadeContent({ unidade, data }: UnidadeContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlano, setSelectedPlano] = useState<{name: string; price: string; codigo?: string} | null>(null)
  const { setCurrentUnit } = useUnit()

  useEffect(() => {
    if (unidade.logo) {
      setCurrentUnit({
        name: unidade.name,
        logo: unidade.logo
      })
    }

    return () => {
      setCurrentUnit(null)
    }
  }, [unidade, setCurrentUnit])

  const handleMatricular = (plano: {name: string; price: string; codigo?: string}) => {
    setSelectedPlano(plano)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPlano(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-live-bg via-live-bg to-live-accent/5 text-live-textPrimary pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-6xl mx-auto">
              {/* Logo da Unidade */}
              {unidade.logo && (
                <div className="flex justify-center mb-8">
                  <div className="w-32 h-32 bg-live-border/10 rounded-2xl p-4 border border-live-border/30">
                    <img 
                      src={unidade.logo} 
                      alt={`Logo ${unidade.name}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  unidade.type === 'diamante' ? 'bg-live-gray text-live-bg' :
                  unidade.type === 'premium' ? 'bg-live-accent text-live-bg' :
                  'bg-green-500 text-white'
                }`}>
                  LIVE {unidade.type.toUpperCase()}
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-center">
                Live Academia <span className="text-live-accent">{unidade.name}</span>
              </h1>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-live-accent mt-1 flex-shrink-0" />
                    <p className="text-lg text-live-textSecondary">{unidade.address}</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-live-accent mt-1 flex-shrink-0" />
                    <p className="text-lg text-live-textSecondary">{unidade.hours}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  {unidade.tourUrl && (
                    <Link
                      href={unidade.tourUrl}
                      target="_blank"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-live-border/20 hover:bg-live-border/30 border border-live-border/30 hover:border-live-accent/50 text-live-textPrimary hover:text-live-accent transition-all duration-300"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Tour Virtual 360°
                    </Link>
                  )}
                  
                  <Link
                    href="https://wa.me/5592999999999"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white transition-all duration-300"
                  >
                    <Phone className="h-5 w-5" />
                    Fale Conosco
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Planos Dinâmicos da API Pacto (com fallback estático existente em locations) */}
      <UnitPlanos
        slug={unidade.id}
        unidadeName={unidade.name}
        fallbackPlanos={unidade.planos}
        onMatricular={handleMatricular}
      />

      {/* Galeria de Fotos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-center mb-6">
              Conheça Nossa <span className="text-live-accent">Estrutura</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {data.fotos.map((foto, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-2xl overflow-hidden group"
              >
                <Image
                  src={foto}
                  alt={`Estrutura da unidade ${unidade.name}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modalidades */}
      <section className="py-16 bg-live-border/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-live-accent">Modalidades</span> Disponíveis
              </h2>
              <p className="text-xl text-live-textSecondary">
                Diversas opções para você alcançar seus objetivos
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {data.modalidades.map((modalidade, index) => (
                <motion.div
                  key={modalidade}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-live-border/10 p-4 rounded-2xl text-center border border-live-border/30 hover:border-live-accent/50 hover:bg-live-accent/5 transition-all duration-300"
                >
                  <p className="font-semibold text-live-textPrimary">{modalidade}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-live-accent">Benefícios</span> Exclusivos
              </h2>
              <p className="text-xl text-live-textSecondary">
                Vantagens que só a Live Academia oferece
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {data.beneficios.map((beneficio, index) => (
                <motion.div
                  key={beneficio}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 bg-live-border/10 rounded-2xl border border-live-border/30 hover:border-live-accent/50 hover:bg-live-accent/5 transition-all duration-300"
                >
                  <CheckCircle className="h-6 w-6 text-live-accent flex-shrink-0" />
                  <p className="text-live-textPrimary font-medium">{beneficio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-live-accent/10 to-live-yellow/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 fill-live-accent text-live-accent" />
              ))}
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Pronto para começar sua <span className="text-live-accent">transformação</span>?
            </h2>
            
            <p className="text-xl text-live-textSecondary mb-8">
              Venha conhecer a unidade {unidade.name} e descubra por que somos a academia mais amada de Manaus!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/planos"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-live-accent to-yellow-500 text-black font-bold shadow-lg hover:shadow-xl hover:shadow-live-accent/25 transition-all duration-300 transform hover:scale-105"
              >
                VER PLANOS E PREÇOS
              </Link>
              
              <Link
                href="https://wa.me/5592999999999"
                target="_blank"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Phone className="h-5 w-5" />
                FALE CONOSCO
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal de Checkout */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        plano={selectedPlano}
        unidadeName={unidade.name}
        unidadeId={unidade.id}
      />
    </main>
  )
}
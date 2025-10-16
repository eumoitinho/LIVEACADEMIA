"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, Check, Phone, Users, Dumbbell, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import UnitPlanos from '@/features/units/unit-planos'
import CheckoutModal from '@/components/checkout/checkout-modal'
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
  const [selectedPlano, setSelectedPlano] = useState<{name: string; price: string; codigo?: string; adesao?: number; fidelidade?: number; regimeRecorrencia?: boolean; modalidades?: string[]} | null>(null)
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

  const handleMatricular = (plano: {name: string; price: string; codigo?: string; adesao?: number; fidelidade?: number; regimeRecorrencia?: boolean; modalidades?: string[]}) => {
    setSelectedPlano(plano)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPlano(null)
  }

  return (
    <main className="min-h-screen relative">
      {/* Hero Section - Design System da Home */}
      <section className="relative z-10 flex min-h-[100vh] items-end">
        {/* Background específico da unidade */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: unidade.photo ? `url('${unidade.photo}')` : "url('/images/fachada.jpg')",
            backgroundPosition: "center center"
          }}
        />
        
        {/* Overlay para melhorar a legibilidade */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-amber-500/30 via-black/60 to-black/80" />
        
        <div className="lg:px-8 max-w-7xl mx-auto px-6 pt-32 pb-32 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
            {/* Left Column - Informações da Unidade */}
            <div className="order-1 lg:col-span-1 opacity-0 animate-[slideInBlur_1.2s_ease-out_0.4s_forwards]" style={{transform: "translateY(30px)", filter: "blur(10px)"}}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white mb-8">
                {unidade.name}
              </h1>
              
              <div className="flex gap-3 animate-[fadeInSlide_0.8s_ease-out_0.6s_forwards] text-xs text-white/70 opacity-0 mb-6 gap-x-3 gap-y-3 items-center" style={{transform: "translateX(20px)"}}>
                <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 backdrop-blur border border-primary/20">
                  <MapPin className="w-[14px] h-[14px] text-primary" />
                  <span className="font-normal">{unidade.address}</span>
                </div>
                <div className="hidden md:block w-px h-4 bg-white/20"></div>
                <span className="hidden md:inline font-normal">{unidade.hours}</span>
              </div>

              <p className="text-lg leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] text-white/80 opacity-0 mb-10" style={{transform: "translateY(20px)", filter: "blur(5px)"}}>
                Sua jornada de transformação começa aqui. Equipamentos de ponta, ambiente motivador e resultados reais.
              </p>

              <div className="border-t border-white/10 pt-6 mb-6 opacity-0 animate-[fadeInScale_0.8s_ease-out_1s_forwards]" style={{transform: "scale(0.95)", filter: "blur(3px)"}}>
                <div className="flex flex-wrap gap-4 gap-x-4 gap-y-4 items-center">
                  <Link
                    href="#modalidades"
                    className="animate-[slideInBlur_0.8s_ease-out_1.2s_forwards] z-10 transition-colors duration-200 text-black bg-amber-400 hover:bg-amber-300 opacity-0 rounded-full pt-3 pr-6 pb-3 pl-6 cursor-pointer"
                    style={{transform: "translateX(-30px)", filter: "blur(8px)"}}
                  >
                    <span className="inline-flex items-center gap-2 font-bold">
                      Ver Modalidades
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Link>

                  <div className="w-px h-6 bg-white/20"></div>

                  <Link
                    href="#beneficios"
                    className="inline-flex gap-2 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 animate-[fadeInSlide_0.8s_ease-out_1.4s_forwards] text-base font-normal text-white/90 opacity-0 border-white/10 border rounded-full pt-2.5 pr-5 pb-2.5 pl-5 backdrop-blur gap-x-2 gap-y-2 items-center cursor-pointer"
                    style={{transform: "translateX(20px)", filter: "blur(4px)"}}
                  >
                    Ver Benefícios
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Planos Cards */}
            <div className="order-2 lg:order-2 lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="opacity-0 animate-[fadeInUp_0.8s_ease-out_1.6s_forwards]"
                style={{transform: "translateY(15px)", filter: "blur(2px)"}}
              >
                <UnitPlanos
                  slug={unidade.id}
                  unidadeName={unidade.name}
                  fallbackPlanos={unidade.planos}
                  onMatricular={handleMatricular}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Modalidades Section */}
      <section id="modalidades" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="bg-white/5 border border-amber-400/20 rounded-3xl p-8 sm:p-12">
          <div className="mb-12">
            <span className="text-sm text-amber-300 font-bold uppercase tracking-wider">Modalidades</span>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.9] mt-2">
              Treinos que<br />se adaptam a <span className="text-amber-300">você</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.modalidades.map((modalidade, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/50 rounded-2xl transition-all duration-200 h-48"
              >
                {/* Background Image - Placeholder */}
                <div className="absolute inset-0 bg-black/80 group-hover:bg-black/60 transition-colors">
                  {unidade.photo && (
                    <img
                      src={unidade.photo}
                      alt={modalidade}
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-amber-400/20 group-hover:bg-amber-400 flex items-center justify-center transition-colors">
                      <Check className="h-4 w-4 text-amber-400 group-hover:text-black transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {modalidade}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section id="beneficios" className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-amber-400/15 border border-amber-400/40 rounded-3xl p-8 sm:p-12">
          <div className="mb-12">
            <div className="flex items-center gap-2 text-sm text-amber-300 mb-3">
              <Check className="h-4 w-4" />
              <span className="font-bold uppercase tracking-wider">Vantagens</span>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.9]">
              Benefícios <span className="text-amber-300">exclusivos</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.beneficios.map((beneficio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-5 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/15 hover:border-amber-400/50 transition-colors duration-200"
              >
                <Check className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white leading-relaxed font-medium">{beneficio}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        plano={selectedPlano}
        unidadeId={unidade.id}
        unidadeName={unidade.name}
      />
    </main>
  )
}

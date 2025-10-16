"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, Check, Phone, Users, Dumbbell } from "lucide-react"
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
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-[60vh] md:h-[70vh] bg-live-bg border-b border-live-border">
        {unidade.photo && (
          <img
            src={unidade.photo}
            alt={`Live Academia ${unidade.name}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-[1]"></div>

        <div className="relative z-10 h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-7xl sm:text-8xl font-semibold text-white tracking-tight leading-none mb-4">
                {unidade.name}
              </h1>
              <p className="text-2xl font-normal text-white/90 tracking-tight bg-black/40 backdrop-blur-sm px-6 py-4 rounded-2xl inline-block">
                Sua jornada de transformação começa aqui. Equipamentos de ponta, ambiente motivador e resultados reais.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-white/90 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-full inline-flex">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{unidade.address}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Card 1 - Horário */}
          <article className="relative overflow-hidden p-5 h-52 bg-live-yellow border border-live-yellow rounded-2xl shadow-lg">
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-black"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40"></span>
                </div>
                <span className="text-[11px] text-black/60 font-medium">01</span>
              </div>
              <div className="flex items-center gap-3 mb-auto">
                <div className="p-3 bg-black/10 rounded-xl">
                  <Clock className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-black/70 uppercase tracking-wide">Funcionamento</h3>
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-sm text-black leading-relaxed font-semibold">{unidade.hours}</p>
              </div>
            </div>
          </article>

          {/* Card 2 - Modalidades */}
          <article className="relative overflow-hidden p-5 h-52 bg-live-bg border border-live-border rounded-2xl shadow-lg">
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-live-yellow"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-live-yellow"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-live-yellow/40"></span>
                </div>
                <span className="text-[11px] text-live-yellow/70 font-medium">02</span>
              </div>
              <div className="flex items-center gap-3 mb-auto">
                <div className="p-3 bg-live-yellow/10 rounded-xl">
                  <Users className="h-6 w-6 text-live-yellow" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-live-yellow/70 uppercase tracking-wide">Modalidades</h3>
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-4xl font-semibold text-live-yellow tracking-tight">{data.modalidades.length}+</p>
                <p className="text-sm text-white/70 mt-1">Opções de treino disponíveis</p>
              </div>
            </div>
          </article>

          {/* Card 3 - Benefícios */}
          <article className="relative overflow-hidden p-5 h-52 bg-white border border-white/20 rounded-2xl shadow-lg">
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-black"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-black"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-black"></span>
                </div>
                <span className="text-[11px] text-black/60 font-medium">03</span>
              </div>
              <div className="flex items-center gap-3 mb-auto">
                <div className="p-3 bg-live-yellow/20 rounded-xl">
                  <Check className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-black/70 uppercase tracking-wide">Benefícios</h3>
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-4xl font-semibold text-black tracking-tight">{data.beneficios.length}</p>
                <p className="text-sm text-black/70 mt-1">Vantagens exclusivas</p>
              </div>
            </div>
          </article>

          {/* Card 4 - Contato */}
          <article className="relative overflow-hidden p-5 h-52 bg-live-yellow border border-live-yellowLight rounded-2xl shadow-lg">
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-black"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-black"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-black"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-black"></span>
                </div>
                <span className="text-[11px] text-black/70 font-medium">04</span>
              </div>
              <div className="mt-auto">
                <h3 className="text-base font-semibold text-black leading-snug tracking-tight mb-3">
                  Entre em contato agora
                </h3>
                <Link
                  href="https://wa.me/5592999999999"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-live-yellow rounded-full text-sm font-semibold hover:bg-black/90 transition"
                >
                  <Phone className="h-4 w-4" />
                  WhatsApp
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Planos Section - Logo após os cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-live-yellow/10 border border-live-yellow/30 text-live-yellow text-sm font-bold mb-4">
              <Dumbbell className="h-4 w-4" />
              PLANOS EXCLUSIVOS
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Comece sua <span className="text-live-yellow">transformação</span> hoje
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Sem taxa de matrícula • Sem fidelidade • Cancele quando quiser
            </p>
          </motion.div>
        </div>

        <UnitPlanos
          slug={unidade.id}
          unidadeName={unidade.name}
          fallbackPlanos={unidade.planos}
          onMatricular={handleMatricular}
        />
      </section>

      {/* Modalidades Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="bg-live-bg border border-live-border rounded-3xl p-8 sm:p-12">
          <div className="mb-12">
            <span className="text-sm text-live-yellow font-medium uppercase tracking-wider">Modalidades</span>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-[0.9] mt-2">
              Treinos que<br />se adaptam a você
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
                className="group relative overflow-hidden bg-white/5 hover:bg-live-yellow border border-live-border hover:border-live-yellow rounded-2xl transition-all duration-300 h-48"
              >
                {/* Background Image - Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-live-yellow/20 to-black/80 group-hover:from-live-yellow/40 transition-all">
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
                    <div className="h-8 w-8 rounded-full bg-live-yellow/20 group-hover:bg-black flex items-center justify-center transition-colors">
                      <Check className="h-4 w-4 text-live-yellow group-hover:text-live-yellow transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-black transition-colors">
                    {modalidade}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-live-yellow border border-live-yellowLight rounded-3xl p-8 sm:p-12">
          <div className="mb-12">
            <div className="flex items-center gap-2 text-sm text-black/70 mb-3">
              <Check className="h-4 w-4" />
              <span className="font-medium uppercase tracking-wider">Vantagens</span>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-black tracking-tight leading-[0.9]">
              Benefícios exclusivos
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
                className="flex items-start gap-3 p-5 bg-black/10 border border-black/20 rounded-2xl hover:bg-black/5 transition-colors"
              >
                <Check className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                <span className="text-sm text-black leading-relaxed font-medium">{beneficio}</span>
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

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, Check, Phone, Users, Dumbbell, ArrowRight, Star, Crown, Sparkles } from "lucide-react"
import Link from "next/link"
import { useUnit } from "@/contexts/unit-context"
import { useUnitsData } from '@/hooks/use-sanity-data'
import UnitPlanos from '@/features/units/unit-planos'  

interface PlanoConfig {
  codigoApi: string
  nomeOriginal?: string
  valorOriginal?: string
  nomeExibicao?: string
  precoExibicao?: string
  descricaoExibicao?: string
  beneficiosExibicao?: string[]
  visivel: boolean
  destaque: boolean
  ordem: number
  badge?: string
}

interface UnidadeContentProps {
  unidade: {
    id: string
    name: string
    address: string
    hours: string
    features: string[]
    type: string
    latitude: number
    longitude: number
    tourUrl?: string | null
    logo?: string | null
    photo?: string | null
    planos?: Array<{
      name: string
      price: string
      codigo?: string
    }>
    planosConfig?: PlanoConfig[]
    filtroPlanos?: {
      precoMinimo?: number
      codigosPermitidos?: string[]
      usarPlanosSanity?: boolean
      usarConfigAvancada?: boolean
    }
    hotsite?: string
  }
  data: {
    modalidades: string[]
    beneficios: string[]
    fotos: string[]
  }
}

export default function UnidadeContent({ unidade, data }: UnidadeContentProps) {
  const { setCurrentUnit } = useUnit()
  const { data: sanityUnits, loading: loadingUnits } = useUnitsData()
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [selectedPlano, setSelectedPlano] = useState<{ name: string; price: string; codigo?: string } | null>(null)

  const handleMatricular = (plano: { name: string; price: string; codigo?: string }) => {
    setSelectedPlano(plano)
    // Redirecionar para página de checkout ou abrir modal
    // Por enquanto, redireciona para o hotsite se existir
    if (unidade.hotsite) {
      window.open(unidade.hotsite, '_blank')
    } else {
      // Fallback: abrir WhatsApp com mensagem do plano
      const mensagem = `Olá! Tenho interesse no plano ${plano.name} (R$ ${plano.price}) na unidade ${unidade.name}.`
      window.open(`https://wa.me/5592999999999?text=${encodeURIComponent(mensagem)}`, '_blank')
    }
  }

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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white mb-12">
                {unidade.name}
              </h1>
              
              {/* Informações da Unidade - Melhoradas */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 animate-[fadeInSlide_0.8s_ease-out_0.6s_forwards] opacity-0" style={{transform: "translateX(20px)"}}>
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur border border-white/20">
                    <MapPin className="w-5 h-5 text-yellow-400" />
                    <span className="text-white text-sm font-medium">{unidade.address}</span>
                  </div>
                </div>
                
                <div className="animate-[fadeInSlide_0.8s_ease-out_0.7s_forwards] opacity-0" style={{transform: "translateX(20px)"}}>
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-white/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-yellow-600" />
                      <span className="text-black font-semibold text-sm">Horário de Funcionamento</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Segunda - Sexta</span>
                        <span className="text-gray-900 font-semibold">5h30 - 22h</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Sábado</span>
                        <span className="text-gray-900 font-semibold">8h - 17h</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Domingo</span>
                        <span className="text-gray-900 font-semibold">8h - 14h</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Feriados</span>
                        <span className="text-gray-900 font-semibold">7h - 12h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-lg leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] text-white/80 opacity-0 mb-12" style={{transform: "translateY(20px)", filter: "blur(5px)"}}>
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
                    className="inline-flex gap-2 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 animate-[fadeInSlide_0.8s_ease-out_1.4s_forwards] text-base font-medium text-white opacity-0 border-white/30 border rounded-full pt-2.5 pr-5 pb-2.5 pl-5 backdrop-blur gap-x-2 gap-y-2 items-center cursor-pointer bg-white/10"
                    style={{transform: "translateX(20px)", filter: "blur(4px)"}}
                  >
                    Ver Benefícios
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Planos */}
            <div className="order-2 lg:order-2 lg:col-span-2" id="planos">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="opacity-0 animate-[fadeInUp_0.8s_ease-out_1.6s_forwards]"
                style={{transform: "translateY(15px)", filter: "blur(2px)"}}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                      Planos disponíveis
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Escolha seu plano</h3>
                </div>
                <UnitPlanos
                  slug={unidade.id}
                  unidadeName={unidade.name}
                  onMatricular={handleMatricular}
                  fallbackPlanos={unidade.planos}
                  filters={unidade.filtroPlanos}
                  planosConfig={unidade.planosConfig}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Modalidades Section */}
      <section id="modalidades" className="py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                Modalidades
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Treinos que se adaptam a <span className="text-yellow-400">você</span>
            </h2>
            <p className="text-white/70 text-lg">
              Descubra todas as modalidades disponíveis nesta unidade e encontre o treino perfeito para sua rotina.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(data?.modalidades || []).map((modalidade, index) => {
              // Usar foto específica do array fotos, ou foto da unidade, ou fallback
              const fotoModalidade = data?.fotos?.[index] || data?.fotos?.[index % (data?.fotos?.length || 1)] || unidade.photo || '/images/fachada.jpg'
              
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm border border-white/10 hover:border-yellow-400/30 transition-all duration-300"
              >
                <div className="relative h-48">
                  {/* Background Image - Foto específica de cada modalidade */}
                  <img
                    src={fotoModalidade}
                    alt={modalidade}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-yellow-400/30 transition-colors">
                        <Dumbbell className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors">
                        {modalidade}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Check className="w-4 h-4 text-yellow-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section id="beneficios" className="py-16 px-4 lg:px-8 bg-gradient-to-br from-zinc-900/50 to-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
              <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
                Benefícios
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Vantagens <span className="text-amber-400">exclusivas</span>
            </h2>
            <p className="text-white/70 text-lg">
              Descubra todos os benefícios que fazem da Live Academia a melhor escolha para sua jornada fitness.
            </p>
          </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data?.beneficios || []).map((beneficio, index) => {
                // Usar foto específica do array fotos, ou foto da unidade, ou fallback
                // Para benefícios, vamos usar as fotos após as modalidades
                const fotoIndex = (data?.modalidades?.length || 0) + index
                const fotoBeneficio = data?.fotos?.[fotoIndex] || data?.fotos?.[fotoIndex % (data?.fotos?.length || 1)] || unidade.photo || '/images/fachada.jpg'
                
                return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm border border-white/10 hover:border-amber-400/30 transition-all duration-300"
              >
                <div className="relative h-48">
                  {/* Background Image - Foto específica de cada benefício */}
                  <img
                    src={fotoBeneficio}
                    alt={beneficio}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* Content - Nome do benefício em destaque, "Benefício" embaixo */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center group-hover:bg-amber-400/30 transition-colors flex-shrink-0">
                        <Check className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                          {beneficio}
                        </h3>
                        <p className="text-amber-400/80 text-xs font-medium uppercase tracking-wider">
                          Benefício
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <div className="w-8 h-8 bg-amber-400/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Star className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mapa Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                Localização
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Como chegar na <span className="text-yellow-400">Live Academia</span>
            </h2>
            <p className="text-white/70 text-lg">
              Encontre a unidade {unidade.name} e comece sua jornada fitness hoje mesmo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm border border-white/10"
          >
            <div className="relative h-96 lg:h-[500px]">
              {/* Google Maps Embed - Sem API Key */}
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.0!2d${unidade.longitude}!3d${unidade.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${Math.floor(unidade.latitude * 1000000)}%2C${Math.floor(unidade.longitude * 1000000)}!5e0!3m2!1spt-BR!2sbr!4v1234567890`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-3xl"
                title={`Localização da ${unidade.name}`}
              />
              
              {/* Overlay com botão para abrir no Google Maps */}
              <div className="absolute top-4 right-4">
                <a
                  href={`https://www.google.com/maps?q=${unidade.latitude},${unidade.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-black font-semibold px-4 py-2 rounded-full transition-colors shadow-lg"
                >
                  <MapPin className="w-4 h-4" />
                  Abrir no Maps
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Informações adicionais */}
            <div className="p-6 bg-black/20 backdrop-blur-sm">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Endereço</h4>
                    <p className="text-white/70 text-sm">{unidade.address}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-yellow-600" />
                    </div>
                    <h4 className="text-black font-semibold text-sm">Horários</h4>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seg-Sex:</span>
                      <span className="text-black font-medium">5h30-22h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sáb:</span>
                      <span className="text-black font-medium">8h-17h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dom:</span>
                      <span className="text-black font-medium">8h-14h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Feriado:</span>
                      <span className="text-black font-medium">7h-12h</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Contato</h4>
                    <p className="text-white/70 text-sm">(92) 3345-6789</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Unidades Próximas Section */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-br from-zinc-900/50 to-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                Outras Unidades
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Outras unidades da <span className="text-yellow-400">Live Academia</span>
            </h2>
            <p className="text-white/70 text-lg">
              Conheça outras unidades próximas e escolha a que melhor se adapta à sua rotina.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Usar unidades reais do Sanity, excluindo a atual */}
              {loadingUnits ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="animate-pulse bg-zinc-800 rounded-3xl h-64"></div>
                ))
              ) : (
                (sanityUnits || [])
                  .filter(unit => unit.slug !== unidade.id)
                  .slice(0, 3)
                  .map((unit, index) => (
                <motion.div
                  key={unit.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm border border-white/10 hover:border-yellow-400/30 transition-all duration-300"
                >
                  <div className="relative h-48">
                    {unit.photo?.asset?.url ? (
                      <img
                        src={unit.photo.asset.url}
                        alt={unit.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-500/10"></div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Badge do tipo */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        unit.type === 'diamante' ? 'bg-yellow-500 text-black' :
                        unit.type === 'premium' ? 'bg-amber-500 text-black' :
                        'bg-zinc-600 text-white'
                      }`}>
                        {unit.type === 'diamante' ? 'Diamante' :
                         unit.type === 'premium' ? 'Premium' : 'Tradicional'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                      {unit.name}
                    </h3>
                    
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white/70 text-sm leading-relaxed">
                        {unit.address}
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3 mb-6">
                      <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white/70 text-sm leading-relaxed">
                        {unit.openingHours || 'Horários disponíveis'}
                      </p>
                    </div>
                    
                    <Link
                      href={`/unidades/${unit.slug}`}
                      className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-4 py-2 rounded-full transition-colors text-sm"
                    >
                      Ver Unidade
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )))}
            </div>
            
            {/* Botão para ver todas as unidades */}
            <div className="text-center mt-12">
              <Link
                href="/unidades"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-colors border border-white/20"
              >
                Ver todas as unidades
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}

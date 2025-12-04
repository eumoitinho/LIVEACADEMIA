"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import { useContatoData } from "@/hooks/use-contato-data"

export default function ContatoPage() {
  const { data: contatoData, loading } = useContatoData()

  // Mostrar loading state enquanto carrega
  if (loading) {
    return (
      <main className="min-h-screen relative bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Carregando...</p>
        </div>
      </main>
    )
  }

  const iconMap = {
    phone: Phone,
    map: MapPin,
    mappin: MapPin,
    location: MapPin,
    clock: Clock,
    horario: Clock,
    email: Mail,
    mail: Mail
  }

  const fallbackCards = [
    {
      title: "Email",
      description: "atendimento@liveacademia.com.br",
      actionLabel: "Enviar email",
      actionUrl: "mailto:atendimento@liveacademia.com.br",
      icon: "mail",
      highlight: true
    },
    {
      title: "Unidades",
      description: "5+ locais em Manaus",
      actionLabel: "Ver no mapa",
      actionUrl: "/unidades",
      icon: "mapPin"
    },
    {
      title: "Horário",
      description: "Seg-Dom: 6h às 23h",
      actionLabel: "Ver horários",
      actionUrl: "#",
      icon: "clock"
    }
  ]

  const cards = contatoData?.cards?.length ? contatoData.cards : fallbackCards

  return (
    <main className="min-h-screen relative bg-black">
      {/* Background com overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
        <Image
          src={contatoData?.heroImage?.asset?.url || "/bg.jpeg"}
          alt="Background Overlay"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 lg:px-12 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {contatoData?.title || 'Entre em'} <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">contato</span>
            </h1>
            <p className="text-zinc-300 text-lg max-w-4xl mx-auto">
              {contatoData?.description || 'Estamos aqui para ajudar você a começar sua jornada fitness. Entre em contato conosco através dos canais abaixo.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="relative py-8 px-4 lg:px-12 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {cards.map((item, index) => {
              const IconComponent =
                iconMap[item.icon?.toLowerCase() as keyof typeof iconMap] || Phone
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative rounded-3xl border transition-all duration-300 ${
                  item.highlight 
                    ? 'bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/20 hover:border-yellow-500/40' 
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                    item.highlight 
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500' 
                      : 'bg-zinc-800 group-hover:bg-zinc-700'
                  } transition-colors`}>
                    <IconComponent className={`w-6 h-6 ${item.highlight ? 'text-black' : 'text-zinc-400'}`} />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className={`text-sm mb-3 ${item.highlight ? 'text-yellow-400' : 'text-zinc-400'}`}>
                    {item.description}
                  </p>
                    {item.actionLabel && item.actionUrl && (
                      <a 
                        href={item.actionUrl}
                        className={`text-sm font-medium ${
                          item.highlight 
                            ? 'text-yellow-400 hover:text-yellow-300' 
                            : 'text-zinc-500 hover:text-white'
                        } transition-colors`}
                      >
                        {item.actionLabel} →
                      </a>
                    )}
                </div>
              </motion.div>
              )
            })}
          </div>
        </div>
      </section>

    </main>
  )
}

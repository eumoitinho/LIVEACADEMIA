"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Instagram, Facebook, Youtube, BadgeCheck } from "lucide-react"
import React, { useState } from "react"
import Image from "next/image"
import { useContatoData } from "@/hooks/use-contato-data"

export default function ContatoPage() {
  const { data: contatoData, loading, error } = useContatoData()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const iconMap = {
    phone: Phone,
    whatsapp: MessageCircle,
    map: MapPin,
    mappin: MapPin,
    location: MapPin,
    clock: Clock,
    horario: Clock,
    email: Mail,
    mail: Mail,
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube
  }

  const fallbackCards = [
    {
      title: "WhatsApp",
      description: "(92) 3345-6789",
      actionLabel: "Chamar agora",
      actionUrl: "https://wa.me/559233456789",
      icon: "whatsapp",
      highlight: true
    },
    {
      title: "Email",
      description: "contato@liveacademia.com.br",
      actionLabel: "Enviar email",
      actionUrl: "mailto:contato@liveacademia.com.br",
      icon: "mail"
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

  const fallbackSocial = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/liveacademiamanaus/",
      icon: "instagram",
      color: "from-amber-500 to-yellow-600"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@liveacademiaoficial",
      icon: "youtube",
      color: "from-red-500 to-red-600"
    },
    {
      name: "Facebook",
      url: "https://web.facebook.com/liveacademiamanaus",
      icon: "facebook",
      color: "from-blue-500 to-blue-600"
    }
  ]

  const socialLinks = contatoData?.socialNetworks?.length
    ? contatoData.socialNetworks
    : fallbackSocial

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica de envio do formulário
    console.log('Formulário enviado:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

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
              {contatoData?.description || 'Estamos aqui para ajudar você a começar sua jornada fitness. Entre em contato conosco através dos canais abaixo ou preencha o formulário.'}
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

      {/* Contact Form */}
      <section className="relative py-8 px-4 lg:px-12 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-neutral-900 rounded-3xl p-8 md:p-12 border border-white/10"
          >
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Side - Info */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <BadgeCheck className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-3xl font-semibold text-white">Live Academia</h2>
                </div>
                <p className="text-white/70 mb-8 text-lg">
                  Transforme seu corpo e sua vida na maior rede de academias de Manaus. Conte conosco para sua jornada fitness.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <a href={`mailto:${contatoData?.contactInfo?.email || 'contato@liveacademia.com.br'}`} className="text-zinc-400 hover:text-yellow-400 transition-colors">
                        {contatoData?.contactInfo?.email || 'contato@liveacademia.com.br'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Telefone</p>
                      <a href={`tel:${contatoData?.contactInfo?.phone || '+559233456789'}`} className="text-zinc-400 hover:text-yellow-400 transition-colors">
                        {contatoData?.contactInfo?.phone || '(92) 3345-6789'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Localização</p>
                      <p className="text-zinc-400">{contatoData?.contactInfo?.address || 'Manaus - AM'}</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8">
                  <p className="text-white font-medium mb-4">Siga-nos nas redes sociais</p>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => {
                      const IconComponent =
                        iconMap[social.icon?.toLowerCase() as keyof typeof iconMap] || Instagram
                      return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${(social as any).color || 'from-zinc-600 to-zinc-700'} flex items-center justify-center hover:scale-110 transition-transform`}
                      >
                          <IconComponent className="w-6 h-6 text-white" />
                      </a>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">{contatoData?.formTitle || 'Envie sua mensagem'}</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
                        placeholder="(92) 99999-9999"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                        Assunto
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="matricula">Matrícula</option>
                        <option value="planos">Planos</option>
                        <option value="unidades">Unidades</option>
                        <option value="duvidas">Dúvidas gerais</option>
                        <option value="sugestoes">Sugestões</option>
                        <option value="reclamacoes">Reclamações</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all resize-none"
                      placeholder="Descreva sua mensagem aqui..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25"
                  >
                    <Send className="w-5 h-5" />
                    {contatoData?.ctaButton?.text || 'Enviar Mensagem'}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

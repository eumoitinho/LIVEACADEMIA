"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Instagram, Facebook, Youtube } from "lucide-react"
import { useState } from "react"

const contactInfo = [
  {
    icon: Phone,
    title: "WhatsApp",
    info: "(92) 99999-9999",
    action: "Chamar agora",
    highlight: true
  },
  {
    icon: Mail,
    title: "Email",
    info: "contato@liveacademia.com.br",
    action: "Enviar email",
    highlight: false
  },
  {
    icon: MapPin,
    title: "Unidades",
    info: "35+ locais em Manaus",
    action: "Ver no mapa",
    highlight: false
  },
  {
    icon: Clock,
    title: "Horário",
    info: "Seg-Dom: 6h às 23h",
    action: "Ver horários",
    highlight: false
  }
]

const socialMedia = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/liveacademiamanaus/",
    icon: Instagram,
    color: "from-pink-500 to-purple-500"
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@liveacademiaoficial",
    icon: Youtube,
    color: "from-red-500 to-red-600"
  },
  {
    name: "Facebook",
    url: "https://web.facebook.com/liveacademiamanaus",
    icon: Facebook,
    color: "from-blue-500 to-blue-600"
  }
]

export default function ContatoSection() {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    mensagem: ""
  })

  return (
    <section id="contato" className="py-20 relative overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 mb-6">
            <span className="text-zinc-400 text-sm font-medium">Fale conosco</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">começar</span>?
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
            Escolha a melhor forma de entrar em contato. Estamos aqui para ajudar.
          </p>
        </motion.div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
          {contactInfo.map((item, index) => (
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
                  <item.icon className={`w-6 h-6 ${item.highlight ? 'text-black' : 'text-zinc-400'}`} />
                </div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className={`text-sm mb-3 ${item.highlight ? 'text-yellow-400' : 'text-zinc-400'}`}>
                  {item.info}
                </p>
                <button className={`text-sm font-medium ${
                  item.highlight 
                    ? 'text-yellow-400 hover:text-yellow-300' 
                    : 'text-zinc-500 hover:text-white'
                } transition-colors`}>
                  {item.action} →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Siga-nos nas redes sociais</h3>
          <div className="flex justify-center gap-6">
            {socialMedia.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${social.color} flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <social.icon className="w-8 h-8 text-white" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Simple Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-zinc-800 p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Envie uma mensagem rápida
            </h3>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:border-yellow-500/50 focus:outline-none transition-colors"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="WhatsApp"
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:border-yellow-500/50 focus:outline-none transition-colors"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <textarea
                  placeholder="Como podemos ajudar?"
                  rows={3}
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:border-yellow-500/50 focus:outline-none transition-colors resize-none"
                  value={formData.mensagem}
                  onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                />
              </div>
              
              <button
                onClick={() => console.log('Enviar mensagem:', formData)}
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar mensagem
              </button>
            </div>
          </div>
        </motion.div>

        {/* WhatsApp Floating CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-zinc-500 text-sm">Prefere falar direto?</p>
          <a 
            href="https://wa.me/5592999999999" 
            target="_blank"
            className="inline-flex items-center gap-2 mt-3 text-green-500 hover:text-green-400 transition-colors font-medium group"
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Chamar no WhatsApp agora
          </a>
        </motion.div>
      </div>
    </section>
  )
}
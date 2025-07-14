"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    title: "Telefone",
    info: "(92) 99999-9999",
    description: "Atendimento de segunda a sexta"
  },
  {
    icon: Mail,
    title: "Email",
    info: "contato@liveacademia.com.br",
    description: "Respondemos em até 24h"
  },
  {
    icon: MapPin,
    title: "Endereço",
    info: "Manaus, Amazonas",
    description: "Múltiplas unidades na cidade"
  },
  {
    icon: Clock,
    title: "Horário",
    info: "Segunda a Domingo",
    description: "Das 6h às 23h"
  }
]

export default function ContatoSection() {
  return (
    <section id="contato" className="py-20 relative overflow-hidden">
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
            Entre em <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Contato</span>
          </h2>
          <p className="text-zinc-300 text-lg max-w-3xl mx-auto">
            Estamos aqui para ajudar você a começar sua jornada fitness. Entre em contato conosco!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Informações de Contato
            </h3>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-3 rounded-2xl shadow-lg">
                    <item.icon className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                    <p className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">{item.info}</p>
                    <p className="text-zinc-400 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 bg-zinc-900/50 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/50"
            >
              <h4 className="text-xl font-bold text-white mb-4">
                Horários de Funcionamento
              </h4>
              <div className="space-y-2 text-zinc-300">
                <div className="flex justify-between">
                  <span>Segunda a Sexta:</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">6h às 23h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">7h às 22h</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">8h às 20h</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Formulário de Contato */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/50"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Envie sua Mensagem
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-white font-medium mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white placeholder-zinc-400 focus:border-yellow-500 focus:outline-none transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white placeholder-zinc-400 focus:border-yellow-500 focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="telefone" className="block text-white font-medium mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white placeholder-zinc-400 focus:border-yellow-500 focus:outline-none transition-colors"
                  placeholder="(92) 99999-9999"
                />
              </div>
              
              <div>
                <label htmlFor="assunto" className="block text-white font-medium mb-2">
                  Assunto
                </label>
                <select
                  id="assunto"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white focus:border-yellow-500 focus:outline-none transition-colors"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="matricula">Matrícula</option>
                  <option value="planos">Planos e Preços</option>
                  <option value="horarios">Horários de Aulas</option>
                  <option value="unidades">Unidades</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="mensagem" className="block text-white font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white placeholder-zinc-400 focus:border-yellow-500 focus:outline-none transition-colors resize-none"
                  placeholder="Digite sua mensagem aqui..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
              >
                <Send className="h-5 w-5" />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          </motion.div>
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 rounded-3xl inline-block shadow-2xl hover:shadow-green-500/25 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <MessageCircle className="h-8 w-8 text-white" />
              <div className="text-left">
                <h3 className="text-xl font-bold text-white">
                  Atendimento via WhatsApp
                </h3>
                <p className="text-white/90">
                  Resposta mais rápida e direta
                </p>
              </div>
            </div>
            <button className="mt-4 bg-white text-green-600 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300">
              Falar no WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
"use client"

import { motion } from "framer-motion"
import { Instagram, Facebook, Youtube, MessageCircle, Phone, MapPin } from "lucide-react"
import Link from "next/link"

const redesSociais = [
  {
    nome: "Instagram",
    url: "https://www.instagram.com/liveacademiamanaus/",
    icon: Instagram,
    descricao: "Siga-nos no Instagram para dicas de treino, motivação e novidades da Live Academia",
    gradient: "from-pink-500 to-purple-600"
  },
  {
    nome: "YouTube",
    url: "https://www.youtube.com/@liveacademiaoficial",
    icon: Youtube,
    descricao: "Acompanhe nossos vídeos de treino, aulas e conteúdo exclusivo",
    gradient: "from-red-500 to-red-600"
  },
  {
    nome: "Facebook",
    url: "https://web.facebook.com/liveacademiamanaus",
    icon: Facebook,
    descricao: "Conecte-se conosco no Facebook para ficar por dentro de todas as novidades",
    gradient: "from-blue-500 to-blue-600"
  }
]

const contatos = [
  {
    icon: Phone,
    titulo: "Central de Atendimento",
    info: "(92) 3000-0000",
    descricao: "Horário: Segunda a sexta, 6h às 22h"
  },
  {
    icon: MessageCircle,
    titulo: "WhatsApp",
    info: "(92) 9 9999-9999",
    descricao: "Atendimento rápido e direto"
  },
  {
    icon: MapPin,
    titulo: "Endereços",
    info: "35+ unidades em Manaus",
    descricao: "Encontre a unidade mais próxima"
  }
]

export default function ContatoSection() {
  return (
    <section className="relative py-20 px-6 lg:px-12 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 mb-6">
            <span className="text-zinc-400 text-sm font-medium">Entre em contato</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Fale <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">conosco</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Estamos prontos para ajudar você a dar o primeiro passo em direção a uma vida mais saudável e ativa.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Redes Sociais */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center lg:text-left">
              Siga-nos nas redes sociais
            </h3>
            <div className="space-y-6">
              {redesSociais.map((rede, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={rede.url} target="_blank" rel="noopener noreferrer">
                    <div className="bg-zinc-900/50 rounded-2xl p-6 backdrop-blur-xl border border-zinc-700 hover:border-yellow-500/50 transition-all duration-300 group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <rede.icon className="w-6 h-6 text-black" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white mb-1">{rede.nome}</h4>
                          <p className="text-zinc-400 text-sm">{rede.descricao}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contatos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center lg:text-left">
              Outras formas de contato
            </h3>
            <div className="space-y-6">
              {contatos.map((contato, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-zinc-900/50 rounded-2xl p-6 backdrop-blur-xl border border-zinc-700"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
                      <contato.icon className="w-6 h-6 text-black" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1">{contato.titulo}</h4>
                      <p className="text-yellow-400 font-semibold mb-1">{contato.info}</p>
                      <p className="text-zinc-400 text-sm">{contato.descricao}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-3xl p-8 lg:p-12 backdrop-blur-xl text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Pronto para começar sua <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">transformação?</span>
          </h3>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Venha fazer parte da maior rede de academias de Manaus e descubra o poder de uma vida mais ativa, saudável e feliz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/planos">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
              >
                MATRICULE-SE AGORA
              </motion.button>
            </Link>
            <Link href="/unidades">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-zinc-700 text-zinc-300 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-zinc-800/50 backdrop-blur-sm"
              >
                VER UNIDADES
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
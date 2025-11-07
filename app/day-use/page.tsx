"use client"

import { motion } from "framer-motion"
import { Check, Clock, MapPin, Zap, Star, ArrowRight, Users, Dumbbell } from "lucide-react"
import Link from "next/link"
import { useDayUseData } from "@/hooks/use-day-use-data"
import { urlFor } from "@/lib/sanity"

const beneficios = [
  {
    titulo: "Acesso Diamante",
    descricao: "Acesse todas as unidades da rede Live em Manaus.",
    icon: MapPin
  },
  {
    titulo: "Serviços completos",
    descricao: "Aproveite toda a estrutura e grade de aulas da Live.",
    icon: Check
  },
  {
    titulo: "Flexibilidade de horário",
    descricao: "Utilize seu acesso em dias de semana, domingos e feriados.",
    icon: Clock
  },
  {
    titulo: "Bike Indoor",
    descricao: "Acesse o maior Studio de Ciclismo Indoor da Região Norte.",
    icon: Zap
  }
]

const faqs = [
  {
    pergunta: "Esse serviço é uma assinatura?",
    resposta: "Não! O Day Use da Live Academia é a compra de um acesso individual e intransferível. Você compra a quantidade de acessos que deseja e utiliza quando for mais conveniente para você. Consulte o regulamento completo para mais detalhes."
  },
  {
    pergunta: "Os acessos expiram se não forem usados?",
    resposta: "Sim, os acessos possuem um prazo de validade. É importante verificar essa informação no momento da contratação para garantir que você utilize seus acessos dentro do período."
  },
  {
    pergunta: "Posso usar em qualquer unidade da rede Live?",
    resposta: "Sim, com o Day Use você tem a liberdade de usar seu acesso em qualquer unidade da Live Academia em Manaus, sem restrição de dia e horário."
  },
  {
    pergunta: "Posso usar o Day Use qualquer dia?",
    resposta: "Com certeza! Seu acesso será validado apenas no dia em que você decidir utilizá-lo, dentro do período de validade."
  },
  {
    pergunta: "Onde posso comprar o Day Use?",
    resposta: "Online. Consulte a tabela de preços abaixo e garanta já o seu acesso."
  },
  {
    pergunta: "Quais serviços o Day Use contempla?",
    resposta: "Com o Day Use você terá acesso à área de musculação e cardio, aulas coletivas (consultar grade de aulas), Espaço Relax, Espaço Pose e a maior sala de Ciclismo Indoor da Região."
  }
]

const pacotes = [
  {
    titulo: "1 acesso",
    preco: "R$ 50,00",
    descricao: "Ideal para quem quer experimentar pela primeira vez ou precisa de um treino avulso.",
    popular: false,
    beneficios: ["Acesso a todas as unidades", "Musculação e cardio", "Aulas coletivas"]
  },
  {
    titulo: "4 acessos",
    preco: "R$ 200,00",
    descricao: "Perfeito para quem busca mais flexibilidade e quer ter opções para treinar ao longo do mês.",
    popular: true,
    beneficios: ["Acesso a todas as unidades", "Musculação e cardio", "Aulas coletivas", "Bike Indoor", "Espaço Relax"]
  }
]

// Mapeamento de ícones
const iconMap = {
  MapPin,
  Check,
  Clock,
  Zap,
  Users,
  Dumbbell,
  Star,
}

export default function DayUse() {
  const { data, loading, error } = useDayUseData()

  // Fallback data
  const fallbackData = {
    title: "DAY USE",
    subtitle: "Acesso exclusivo para você experimentar a Live Academia",
    description: "Tenha acesso a todas as nossas instalações e aulas coletivas por um dia, sem a necessidade de um plano de longo prazo. Perfeito para quem está de passagem, quer experimentar antes de se matricular ou simplesmente busca um treino avulso com a qualidade Live Academia.",
    heroImage: null,
    beneficios,
    pacotes,
    faqs,
    ctaTitle: "Pronto para experimentar a Live Academia?",
    ctaDescription: "Adquira seu Day Use agora e descubra por que somos a melhor academia de Manaus."
  }

  const pageData = data || fallbackData

  if (loading) {
    return (
      <main className="min-h-screen relative bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Carregando...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative bg-black text-white">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-amber-950/20 to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.1),transparent_50%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-[100vh] items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: pageData.heroImage?.asset 
              ? `url('${urlFor(pageData.heroImage).width(1920).height(1080).quality(85).url()}')` 
              : "url('/images/fachada.jpg')",
            backgroundPosition: "center center"
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-amber-500/30 via-black/60 to-black/80" />
        
        <div className="lg:px-8 max-w-7xl mx-auto px-6 pt-32 pb-32 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur border border-white/20 mb-8"
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                Day Use
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight text-white mb-8"
            >
              {pageData.title.split(' ').map((word, index) => (
                <span key={index}>
                  {word === 'USE' ? <span className="text-yellow-400">{word}</span> : word}
                  {index < pageData.title.split(' ').length - 1 && ' '}
                </span>
              ))}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl sm:text-3xl font-semibold mb-8 text-white/90"
            >
              {pageData.subtitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl leading-relaxed text-white/80 mb-12 max-w-3xl mx-auto"
            >
              {pageData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="z-10 transition-colors duration-200 text-black bg-amber-400 hover:bg-amber-300 rounded-full pt-3 pr-6 pb-3 pl-6 cursor-pointer">
                <span className="inline-flex items-center gap-2 font-bold">
                  ADQUIRA SEU ACESSO!
                  <ArrowRight className="h-5 w-5" />
                </span>
              </button>

              <Link
                href="#pacotes"
                className="inline-flex gap-2 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 text-base font-normal text-white/90 border-white/10 border rounded-full pt-2.5 pr-5 pb-2.5 pl-5 backdrop-blur gap-x-2 gap-y-2 items-center cursor-pointer bg-white/10"
              >
                Ver Pacotes
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                Benefícios
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              USE QUANDO E ONDE <span className="text-yellow-400">QUISER</span>
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Flexibilidade total para treinar quando e onde for mais conveniente para você.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pageData.beneficios.map((beneficio, index) => {
              const IconComponent = iconMap[beneficio.icon as keyof typeof iconMap] || Check
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm border border-white/10 hover:border-yellow-400/30 transition-all duration-300 p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-2xl flex items-center justify-center group-hover:from-yellow-400/30 group-hover:to-amber-500/30 transition-all">
                    <IconComponent className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors">
                    {beneficio.titulo}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {beneficio.descricao}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pacotes Section */}
      <section id="pacotes" className="py-16 px-4 lg:px-8 bg-gradient-to-br from-zinc-900/50 to-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                Pacotes
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Conquiste seu acesso na melhor <span className="text-yellow-400">academia de Manaus</span>
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Escolha o pacote que melhor se adapta à sua necessidade e comece a viver a experiência Live Academia.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pageData.pacotes.map((pacote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                  pacote.popular 
                    ? 'border-yellow-400/50 shadow-lg shadow-yellow-400/20' 
                    : 'border-white/10 hover:border-yellow-400/30'
                }`}
              >
                {pacote.popular && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Mais Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {pacote.titulo}
                  </h3>
                  
                  <div className="text-4xl font-bold text-yellow-400 mb-6">
                    {pacote.preco}
                  </div>
                  
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {pacote.descricao}
                  </p>

                  <div className="space-y-3 mb-8">
                    {pacote.beneficios.map((beneficio, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{beneficio}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25">
                    COMPRE AGORA
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                Dúvidas
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Perguntas <span className="text-yellow-400">Frequentes</span>
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Tire suas dúvidas sobre o Day Use da Live Academia.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {pageData.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm border border-white/10 hover:border-yellow-400/30 transition-all duration-300 p-6"
              >
                <h3 className="text-lg font-bold mb-3 text-white group-hover:text-yellow-300 transition-colors">
                  {faq.pergunta}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {faq.resposta}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-br from-zinc-900/50 to-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-12">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {pageData.ctaTitle}
                </h2>
                <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                  {pageData.ctaDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold hover:scale-105 transition-all">
                    Comprar Day Use
                  </button>
                  <Link
                    href="/unidades"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all"
                  >
                    Ver Unidades
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export const dynamic = 'force-dynamic'
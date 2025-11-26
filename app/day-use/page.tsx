"use client"

import { motion } from "framer-motion"
import { Check, Clock, MapPin, Zap, Star, ArrowRight, Users, Dumbbell, Calendar } from "lucide-react"
import Link from "next/link"
import { useDayUseData } from "@/hooks/use-day-use-data"

const beneficios = [
  {
    titulo: "ACESSO DIAMANTE",
    descricao: "Acesse todas as unidades da Rede Live em Manaus",
    icon: MapPin
  },
  {
    titulo: "MALHAR ATÉ ÀS 23H",
    descricao: "Na Live você conta com uma unidade (Torquato Santos Dumont Diamante, Ponta Negra, Planalto, Laranjeiras e Morada do Sol) que funciona até às 23h de seg à sex",
    icon: Clock
  },
  {
    titulo: "USE TODOS OS DIAS SEM RESTRIÇÃO",
    descricao: "Domingos e feriados você também pode usar",
    icon: Calendar
  },
  {
    titulo: "BIKE INDOOR",
    descricao: "Acesse o maior Studio de Ciclismo Indoor da Região Norte. Área exclusiva para clientes Diamante.",
    icon: Zap
  }
]

const faqs = [
  {
    pergunta: "ESSE SERVIÇO É UMA ASSINATURA?",
    resposta: "Não, ao contratar um pacote DAY USE você compra acesso individual e intransferível. Consulte o regulamento."
  },
  {
    pergunta: "POSSO USAR QUALQUER DIA?",
    resposta: "Sim. Seu acesso só será validado quando você usar (ver o período de uso)."
  },
  {
    pergunta: "OS ACESSOS EXPIRAM SE NÃO FOREM USADOS?",
    resposta: "Sim, consulte no ato da contratação o prazo de validade."
  },
  {
    pergunta: "NÃO SOU CLIENTE DA LIVE, POSSO COMPRAR?",
    resposta: "Sim."
  },
  {
    pergunta: "POSSO USAR EM QUALQUER UNIDADE DA REDE LIVE?",
    resposta: "Sim. Sem restrição de dia e horário. Válido somente para as unidades em Manaus."
  },
  {
    pergunta: "QUAIS SERVIÇOS O DAY USE CONTEMPLA?",
    resposta: "Com o Day Use você terá acesso a área de musculação, aulas coletivas (consultar grade de aulas), Espaço Relax, Espaço Bodybuilder, Espaço Aerobic Zone, Force Zone e a maior sala de Ciclismo Indoor da Região."
  },
  {
    pergunta: "ONDE POSSO COMPRAR O DAY USE?",
    resposta: "Online. Consulte a tabela de preço abaixo."
  }
]

const pacotes = [
  {
    titulo: "DAY USE",
    preco: "60",
    descricao: "Acesso individual e intransferível para treinar em qualquer unidade da Rede Live em Manaus.",
    popular: true,
    beneficios: ["Acesso a todas as unidades", "Musculação e cardio", "Aulas coletivas", "Bike Indoor", "Espaço Relax"],
    disponibilidade: "*DISPONÍVEL SOMENTE NO SITE"
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
  Calendar,
}

export default function DayUse() {
  const { data, loading, error } = useDayUseData()

  // Fallback data
  const fallbackData = {
    title: "DAY USE",
    subtitle: "",
    description: "MESMO NÃO SENDO CLIENTE VOCÊ PODERÁ USAR TODA REDE LIVE",
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
            backgroundImage: pageData.heroImage?.asset?.url
              ? `url('${pageData.heroImage.asset.url}')`
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
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              
              <p className="text-xl sm:text-2xl text-white/80 mb-2">Agora você pode comprar</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">ACESSOS</h2>
              <p className="text-xl sm:text-2xl text-white/80 mb-2">Pelo sistema de</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-yellow-400">DAY USE</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="#pacotes"
                className="z-10 transition-colors duration-200 text-black bg-amber-400 hover:bg-amber-300 rounded-full pt-3 pr-6 pb-3 pl-6 cursor-pointer"
              >
                <span className="inline-flex items-center gap-2 font-bold">
                  ADQUIRA SEU ACESSO!
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>

              <Link
                href="#beneficios"
                className="inline-flex gap-2 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 text-base font-normal text-white/90 border-white/10 border rounded-full pt-2.5 pr-5 pb-2.5 pl-5 backdrop-blur gap-x-2 gap-y-2 items-center cursor-pointer bg-white/10"
              >
                Ver Benefícios
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Destaque Section */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-br from-yellow-400/10 to-amber-500/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              MESMO NÃO SENDO CLIENTE
            </h2>
            <p className="text-2xl lg:text-3xl font-bold text-yellow-400">
              VOCÊ PODERÁ USAR TODA REDE LIVE
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section id="beneficios" className="py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
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
                  <p className="text-white/70 leading-relaxed text-sm">
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
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                Preços e Condições
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="text-yellow-400">DAY USE</span>
            </h2>
          </motion.div>

          <div className="max-w-lg mx-auto">
            {pageData.pacotes.map((pacote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm border border-yellow-400/50 shadow-lg shadow-yellow-400/20"
              >
                <div className="p-8 text-center">
                  <p className="text-white/60 text-sm mb-4">{pacote.disponibilidade}</p>

                  <h3 className="text-2xl font-bold mb-6 text-white">
                    ACESSO
                  </h3>

                  <div className="flex items-start justify-center gap-1 mb-6">
                    <span className="text-white/70 text-xl mt-2">R$</span>
                    <span className="text-7xl font-bold text-yellow-400">{pacote.preco}</span>
                  </div>

                  <p className="text-white/70 mb-8 leading-relaxed">
                    {pacote.descricao}
                  </p>

                  <div className="space-y-3 mb-8 text-left">
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
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                FAQ
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              PERGUNTAS <span className="text-yellow-400">FREQUENTES</span>
            </h2>
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

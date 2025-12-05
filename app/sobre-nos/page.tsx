"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Target, Users, Dumbbell, Heart, TrendingUp, Award, MapPin, Calendar } from "lucide-react"
import { useSobreNosData } from "@/hooks/use-sobre-nos-data"

const stats = [
  { number: "2012", label: "Ano de fundação", icon: Calendar },
  { number: "+37", label: "Unidades em Manaus", icon: MapPin },
  { number: "80+", label: "Meta de unidades", icon: TrendingUp },
  { number: "5.0", label: "Avaliação média", icon: Award },
]

const valores = [
  {
    icon: Target,
    title: "Missão",
    description: "Transformar vidas promovendo bem-estar e democratizando o acesso à atividade física em Manaus."
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Você não é apenas um aluno, é parte de uma comunidade vibrante que se apoia e celebra cada conquista."
  },
  {
    icon: Dumbbell,
    title: "Estrutura",
    description: "Equipamentos modernos, tecnologia de ponta e profissionais altamente qualificados."
  },
  {
    icon: Heart,
    title: "Acolhimento",
    description: "Ambiente familiar onde cada pessoa é respeitada em sua individualidade e treinada com segurança."
  },
]

const diferenciais = [
  "Avaliação física avançada (Análise Corporal 3D, Bioimpedância ou Dobras Cutâneas)",
  "Prescrição informatizada de treino na musculação",
  "Aulas coletivas diversificadas",
  "Aplicativo exclusivo para acesso a treinos e programação",
  "Planos acessíveis sem fidelidade",
  "Unidades em todas as regiões de Manaus"
]

export default function SobreNos() {
  const { data, loading } = useSobreNosData()

  const fallbackData = {
    title: "SOBRE A LIVE",
    subtitle: "Mais do que uma academia, um estilo de vida",
    description: "A Live Academia nasceu em outubro de 2012 com o propósito de transformar vidas, promovendo bem-estar e democratizando o acesso à atividade física em Manaus.",
    backgroundImage: "/images/sobre-bg.jpg"
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
      <section className="relative z-10 flex min-h-[80vh] items-center">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${pageData.backgroundImage}')`,
            backgroundPosition: "center center"
          }}
        />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black via-black/85 to-black/90" />

        <div className="lg:px-8 max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur border border-white/20 mb-8"
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                Sobre Nós
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight text-white mb-6"
            >
              {pageData.title}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl sm:text-2xl font-medium mb-6 text-yellow-400"
            >
              {pageData.subtitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg leading-relaxed text-white/80 max-w-2xl mx-auto"
            >
              {pageData.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 px-4 lg:px-8 border-y border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="relative z-10 py-20 px-4 lg:px-8">
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
                Nossos Valores
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              O que nos <span className="text-yellow-400">move</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm border border-white/10 hover:border-yellow-400/30 transition-all duration-300 p-8"
              >
                <div className="w-14 h-14 mb-6 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-2xl flex items-center justify-center group-hover:from-yellow-400/30 group-hover:to-amber-500/30 transition-all">
                  <valor.icon className="w-7 h-7 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-300 transition-colors">
                  {valor.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  {valor.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* História Section */}
      <section className="relative z-10 py-20 px-4 lg:px-8 bg-gradient-to-br from-zinc-900/50 to-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                  Nossa História
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Um ecossistema de <span className="text-yellow-400">qualidade de vida</span>
              </h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  Desde nossa fundação em 2012, seguimos comprometidos em oferecer planos acessíveis, gerar empregos e contribuir para o desenvolvimento da comunidade local.
                </p>
                <p>
                  Nossas unidades, estrategicamente distribuídas por todas as regiões de Manaus, garantem praticidade, acolhimento e facilidade de acesso para todos os públicos.
                </p>
                <p>
                  Mais do que uma rede de academias, a Live já se consolida como um <strong className="text-yellow-400">ecossistema de qualidade de vida e bem-estar</strong>, integrando serviços, tecnologias e experiências que promovem saúde de forma completa.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900/90 to-black/90 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Nossos Diferenciais</h3>
                <ul className="space-y-4">
                  {diferenciais.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-white/80">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visão de Futuro */}
      <section className="relative z-10 py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                Visão de Futuro
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Construindo o <span className="text-yellow-400">amanhã</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Nos próximos anos, estamos projetando ultrapassar <strong className="text-yellow-400">80 unidades em Manaus</strong> e lançar clubes wellness pioneiros na região Norte, ampliando ainda mais nosso impacto na vida das pessoas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 px-4 lg:px-8">
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
                  Pronto para fazer parte da nossa história?
                </h2>
                <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                  Venha conhecer de perto o que faz da Live Academia a melhor escolha para sua jornada fitness.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/unidades"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold hover:scale-105 transition-all"
                  >
                    Encontrar Unidade
                  </Link>
                  <Link
                    href="/planos"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all"
                  >
                    Ver Planos
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

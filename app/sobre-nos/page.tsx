"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useSobreNosData } from "@/hooks/use-sobre-nos-data"

export default function SobreNos() {
  const { data, loading, error } = useSobreNosData()

  // Dados de fallback
  const fallbackData = {
    title: "SOBRE A LIVE ACADEMIA",
    subtitle: "Mais do que uma academia, um estilo de vida",
    description: "A Live Academia nasceu em outubro de 2012 com o propósito de transformar vidas, promovendo bem-estar e democratizando o acesso à atividade física em Manaus.",
    content: [
      "Desde sua fundação, seguimos comprometidos em oferecer planos acessíveis, gerar empregos e contribuir para o desenvolvimento da comunidade local. Nossas unidades, estrategicamente distribuídas por todas as regiões da cidade, garantem praticidade, acolhimento e facilidade de acesso para todos os públicos.",
      "Nossa estrutura foi projetada para proporcionar uma experiência completa e desempenho, unindo equipamentos modernos, tecnologia de ponta e profissionais altamente qualificados. Oferecemos um ambiente acolhedor e familiar, onde cada pessoa é respeitada em sua individualidade e treinada com segurança.",
      "Disponibilizamos avaliação física avançada (Análise Corporal 3D, Bioimpedância ou Dobras Cutâneas), prescrição informatizada de treino na musculação, aulas coletivas diversificadas e um aplicativo exclusivo, que facilita o acesso a treinos, planos e programação diária.",
      "Mais do que uma rede de academias, a Live já se consolida como um ECOSSISTEMA DE QUALIDADE DE VIDA E BEM-ESTAR, integrando serviços, tecnologias e experiências que promovem qualidade de vida de forma completa.",
      "Nos próximos anos, estamos projetando ultrapassar 80 unidades em Manaus e lançar clubes wellness pioneiros na região Norte, ampliando ainda mais nosso impacto. Na Live Academia, você não é apenas um aluno, é parte de uma comunidade vibrante que se apoia, evolui e celebra cada conquista, construindo diariamente uma vida mais ativa, equilibrada e saudável."
    ],
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
      <section className="relative z-10 flex min-h-[100vh] items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${pageData.backgroundImage}')`,
            backgroundPosition: "center center"
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/70 via-black/80 to-black/90" />
        
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
                Sobre Nós
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white mb-8"
            >
              {pageData.title}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl sm:text-3xl font-semibold mb-8 text-yellow-400"
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
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-8 text-white/80 text-lg leading-relaxed">
              {pageData.content.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-lg leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-8">
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
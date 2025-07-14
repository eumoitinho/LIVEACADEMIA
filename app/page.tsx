"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Shield, DollarSign, CheckCircle, Star, Users, Award } from "lucide-react"
import HeroSection from "@/components/hero-section"
import LocationCarousel from "@/components/location-carousel"
import TestimonialSection from "@/components/testimonial-section"
import FloatingButton from "@/components/floating-button"
import PlanosSection from "@/components/planos-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Promotional Banner */}
      {/* <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black border-y border-[#ffcb00]/20 py-4"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <img
              src="/images/banner-promocional.gif"
              alt="Promoção Live Academia - Sem fidelidade, sem anuidade, sem pegadinha"
              className="h-16 object-contain"
            />
            <Link href="/planos">
              <button className="btn-primary font-bold px-6 py-2 text-sm">APROVEITAR AGORA</button>
            </Link>
          </div>
        </div>
      </motion.div> */}

      {/* About Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              Transforme seu <span className="text-gradient">corpo e sua vida</span>
            </h2>
            <p className="section-subtitle">
              A Live Academia está presente em Manaus há mais de 10 anos, oferecendo estrutura moderna, equipamentos de
              última geração e profissionais altamente qualificados para te ajudar a alcançar seus objetivos.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { icon: Users, number: "10K+", label: "Alunos ativos" },
              { icon: Award, number: "6", label: "Unidades" },
              { icon: Star, number: "4.8", label: "Avaliação média" },
              { icon: CheckCircle, number: "10+", label: "Anos de experiência" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="app-card p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-[#ffcb00] mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Sem Fidelidade",
                description: "Treine sem contratos longos. Cancele quando quiser sem multas ou burocracia.",
                icon: Shield,
                color: "bg-blue-500/20 text-blue-400",
              },
              {
                title: "Sem Anuidade",
                description: "Não cobramos taxas anuais escondidas. Preço justo o ano todo.",
                icon: DollarSign,
                color: "bg-green-500/20 text-green-400",
              },
              {
                title: "Sem Pegadinha",
                description: "Transparência total. O que você vê é o que você paga, sem surpresas.",
                icon: CheckCircle,
                color: "bg-yellow-500/20 text-yellow-400",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="app-card p-8 text-center group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Units Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">
              Nossas <span className="text-gradient">Unidades</span>
            </h2>
            <p className="section-subtitle">
              Estamos presentes em diversos pontos de Manaus para facilitar seu acesso à atividade física.
            </p>
            <Link
              href="/unidades"
              className="inline-flex items-center mt-4 text-[#ffcb00] hover:text-[#ffd740] transition-colors font-semibold group"
            >
              Ver todas as unidades
              <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <LocationCarousel />
        </div>
      </section>

      {/* Plans Section */}
      <PlanosSection />

      {/* App Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                App <span className="text-gradient">Live Academia</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Tenha a academia na palma da sua mão. Acompanhe seus treinos, agende aulas, monitore sua evolução e
                muito mais com nossa tecnologia de ponta.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Check-in facial",
                  "Treinos personalizados",
                  "Agendamento de aulas",
                  "Histórico de treinos",
                  "Avaliações físicas",
                  "Comunicação com personal",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#ffcb00] flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={16} className="text-black" />
                    </div>
                    <span className="text-gray-300 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {/* Google Play Store SVG */}
                <a href="#" className="hover:scale-105 transition-transform">
                  <svg width="150" height="50" viewBox="0 0 150 50" className="rounded-lg">
                    <rect width="150" height="50" rx="6" fill="#000000" />
                    <rect width="150" height="50" rx="6" fill="none" stroke="#ffcb00" strokeWidth="1" />
                    <g transform="translate(8, 8)">
                      <path d="M2 2v24l6-6L2 2z" fill="#ffcb00" />
                      <path d="M8 20L16 12L8 4v16z" fill="#ffcb00" />
                      <path d="M16 12l6-3.5L16 5v7z" fill="#ffcb00" />
                      <path d="M16 12v7l6-3.5L16 12z" fill="#ffcb00" />
                    </g>
                    <text x="40" y="16" fill="white" fontSize="8" fontWeight="300">
                      Disponível no
                    </text>
                    <text x="40" y="28" fill="white" fontSize="12" fontWeight="600">
                      Google Play
                    </text>
                  </svg>
                </a>

                {/* Apple App Store SVG */}
                <a href="#" className="hover:scale-105 transition-transform">
                  <svg width="150" height="50" viewBox="0 0 150 50" className="rounded-lg">
                    <rect width="150" height="50" rx="6" fill="#000000" />
                    <rect width="150" height="50" rx="6" fill="none" stroke="#ffcb00" strokeWidth="1" />
                    <g transform="translate(8, 8)">
                      <path
                        d="M16 8c-1.2 0-2.8-1.2-2.8-2.8s1.6-2.8 2.8-2.8 2.8 1.2 2.8 2.8-1.6 2.8-2.8 2.8zm-2.4 16.8c-1.6 0-3.2-1.6-3.2-3.2s1.6-3.2 3.2-3.2h4.8c1.6 0 3.2 1.6 3.2 3.2s-1.6 3.2-3.2 3.2h-4.8z"
                        fill="#ffcb00"
                      />
                      <circle cx="16" cy="5.6" r="1.6" fill="#ffcb00" />
                    </g>
                    <text x="40" y="16" fill="white" fontSize="8" fontWeight="300">
                      Baixar na
                    </text>
                    <text x="40" y="28" fill="white" fontSize="12" fontWeight="600">
                      App Store
                    </text>
                  </svg>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <div className="relative floating-element">
                <div className="absolute -inset-8 bg-[#ffcb00]/10 rounded-3xl blur-2xl"></div>
                <div className="relative app-card p-8">
                  <img
                    src="/placeholder.svg?height=500&width=250"
                    alt="App Live Academia"
                    className="max-w-full rounded-2xl shadow-xl max-h-[500px] mx-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      <FloatingButton />
    </main>
  )
}

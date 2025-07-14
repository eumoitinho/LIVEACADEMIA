"use client"

import { motion } from "framer-motion"
import { Download, Zap, Users, BarChart3, Calendar, MessageCircle } from "lucide-react"

export default function AppPage() {
  const features = [
    {
      title: "Check-in Facial",
      description: "Entre na academia sem carteirinha, apenas com reconhecimento facial.",
      icon: Zap,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Treinos Personalizados",
      description: "Receba treinos personalizados diretamente no seu celular.",
      icon: BarChart3,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Agendamento de Aulas",
      description: "Reserve sua vaga nas aulas coletivas com antecedência.",
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Histórico de Treinos",
      description: "Acompanhe sua evolução e histórico completo de treinos.",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Avaliações Físicas",
      description: "Visualize os resultados das suas avaliações físicas.",
      icon: Users,
      color: "from-red-500 to-red-600",
    },
    {
      title: "Comunicação com Personal",
      description: "Chat direto com seu personal trainer para tirar dúvidas.",
      icon: MessageCircle,
      color: "from-pink-500 to-pink-600",
    },
  ]

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">
            App <span className="text-gradient">Live Academia</span>
          </h1>
          <p className="section-subtitle">
            Tenha a academia na palma da sua mão. Acompanhe seus treinos, agende aulas, monitore sua evolução e muito
            mais.
          </p>
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="app-card p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Transforme sua experiência fitness</h2>
              <p className="text-white text-lg mb-8 leading-relaxed">
                O App Live Academia foi desenvolvido para tornar sua jornada fitness mais simples, eficiente e
                motivadora. Com uma interface intuitiva e recursos exclusivos, você terá tudo o que precisa para
                alcançar seus objetivos.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                {/* Google Play Store SVG */}
                <a href="#" className="hover:scale-105 transition-transform">
                  <svg width="180" height="60" viewBox="0 0 180 60" className="rounded-lg">
                    <rect width="180" height="60" rx="8" fill="#000000" />
                    <rect width="180" height="60" rx="8" fill="none" stroke="#ffcb00" strokeWidth="1" />
                    <g transform="translate(12, 12)">
                      <path d="M3 3v30l7.5-7.5L3 3z" fill="#ffcb00" />
                      <path d="M10.5 25.5L21 15l-10.5-10.5v21z" fill="#ffcb00" />
                      <path d="M21 15l7.5-4.5L21 6v9z" fill="#ffcb00" />
                      <path d="M21 15v9l7.5-4.5L21 15z" fill="#ffcb00" />
                    </g>
                    <text x="50" y="20" fill="white" fontSize="10" fontWeight="300">
                      Disponível no
                    </text>
                    <text x="50" y="35" fill="white" fontSize="16" fontWeight="600">
                      Google Play
                    </text>
                  </svg>
                </a>

                {/* Apple App Store SVG */}
                <a href="#" className="hover:scale-105 transition-transform">
                  <svg width="180" height="60" viewBox="0 0 180 60" className="rounded-lg">
                    <rect width="180" height="60" rx="8" fill="#000000" />
                    <rect width="180" height="60" rx="8" fill="none" stroke="#ffcb00" strokeWidth="1" />
                    <g transform="translate(12, 12)">
                      <path
                        d="M20.5 10.5c-1.5 0-3.5-1.5-3.5-3.5s2-3.5 3.5-3.5 3.5 1.5 3.5 3.5-2 3.5-3.5 3.5zm-3 21c-2 0-4-2-4-4s2-4 4-4h6c2 0 4 2 4 4s-2 4-4 4h-6z"
                        fill="#ffcb00"
                      />
                      <circle cx="20.5" cy="7" r="2" fill="#ffcb00" />
                    </g>
                    <text x="50" y="20" fill="white" fontSize="10" fontWeight="300">
                      Baixar na
                    </text>
                    <text x="50" y="35" fill="white" fontSize="16" fontWeight="600">
                      App Store
                    </text>
                  </svg>
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="app-card p-4 w-24 h-24">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#ffcb00] mb-1">QR</div>
                    <div className="text-xs text-gray-400">Escaneie</div>
                  </div>
                </div>
                <div className="text-white">
                  <p className="font-medium">Escaneie o QR Code para</p>
                  <p className="text-sm text-gray-400">baixar o aplicativo</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative floating-element">
              <div className="absolute -inset-8 bg-[#ffcb00]/10 rounded-3xl blur-2xl"></div>
              <div className="relative app-card p-8">
                <img
                  src="/placeholder.svg?height=600&width=300"
                  alt="App Live Academia"
                  className="max-w-full rounded-2xl shadow-2xl mx-auto"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Video Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Veja como funciona</h2>
            <p className="text-white text-lg max-w-3xl mx-auto">
              Assista ao vídeo demonstrativo e conheça todas as funcionalidades do App Live Academia.
            </p>
          </div>

          <div className="app-card p-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <img
                src="/placeholder.svg?height=720&width=1280"
                alt="Vídeo demonstrativo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border-2 border-[#ffcb00]"
                >
                  <div className="w-16 h-16 rounded-full bg-[#ffcb00] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Funcionalidades</h2>
            <p className="text-white text-lg max-w-3xl mx-auto">
              Conheça os recursos exclusivos que tornam o App Live Academia essencial para sua rotina fitness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="app-card p-6 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* App Screenshots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Conheça a interface</h2>
            <p className="text-white text-lg max-w-3xl mx-auto">
              Uma experiência de usuário intuitiva e moderna para facilitar sua jornada fitness.
            </p>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="min-w-[250px] snap-center">
                <div className="app-card p-4">
                  <img
                    src={`/placeholder.svg?height=500&width=250&text=Screenshot ${item}`}
                    alt={`Screenshot ${item}`}
                    className="rounded-2xl w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="app-card p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffcb00]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ffcb00]/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Baixe agora e transforme sua experiência fitness</h2>
                <p className="text-white text-lg max-w-3xl mx-auto">
                  Disponível para iOS e Android. Baixe gratuitamente e comece a aproveitar todos os benefícios.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary">
                  <Download size={20} />
                  <span>Google Play</span>
                </motion.a>

                <motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary">
                  <Download size={20} />
                  <span>App Store</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Check, Loader2, Users, Award, Heart, TrendingUp } from "lucide-react"

export default function TrabalheConoscoPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    message: "",
    resume: null as File | null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormState((prev) => ({ ...prev, resume: file }))
      setFileName(file.name)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({
          name: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          message: "",
          resume: null,
        })
        setFileName("")
      }, 3000)
    }, 2000)
  }

  const positions = [
    "Personal Trainer",
    "Recepcionista",
    "Nutricionista",
    "Gerente de Unidade",
    "Professor de Aulas Coletivas",
    "Auxiliar de Limpeza",
    "Estagiário",
    "Outro",
  ]

  const benefits = [
    {
      title: "Ambiente inspirador",
      description:
        "Trabalhe em um ambiente moderno, dinâmico e inspirador, com pessoas apaixonadas por fitness e bem-estar.",
      icon: Heart,
      color: "from-red-500 to-red-600",
    },
    {
      title: "Desenvolvimento profissional",
      description: "Oferecemos treinamentos contínuos e oportunidades de crescimento para todos os colaboradores.",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Benefícios exclusivos",
      description: "Acesso gratuito às academias, descontos em produtos parceiros, plano de saúde e muito mais.",
      icon: Award,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Cultura de inovação",
      description:
        "Valorizamos novas ideias e incentivamos nossos colaboradores a contribuírem para a evolução da empresa.",
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <main className="min-h-screen pt-24 pb-12 bg-live-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-live-textPrimary mb-6">
            Trabalhe <span className="text-live-accent">Conosco</span>
          </h1>
          <p className="text-xl text-live-textSecondary max-w-3xl mx-auto">
            Faça parte do time Live Academia e ajude a transformar vidas através do fitness. 
            Somos a maior rede de academias de Manaus e estamos sempre em busca de profissionais 
            apaixonados por saúde e bem-estar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-live-border/10 p-8 rounded-2xl border border-live-border/30">
              <h2 className="text-2xl font-bold text-live-textPrimary mb-6">Envie seu currículo</h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-live-textPrimary mb-2">Currículo enviado com sucesso!</h3>
                  <p className="text-live-textSecondary">
                    Agradecemos seu interesse em fazer parte do nosso time. Analisaremos seu currículo e entraremos em
                    contato em breve.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-live-textSecondary mb-2 font-medium">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-live-bg border border-live-border text-live-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-live-accent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-live-textSecondary mb-2 font-medium">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-live-bg border border-live-border text-live-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-live-accent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-live-textSecondary mb-2 font-medium">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-live-bg border border-live-border text-live-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-live-accent"
                      />
                    </div>
                    <div>
                      <label htmlFor="position" className="block text-live-textSecondary mb-2 font-medium">
                        Cargo desejado
                      </label>
                      <select
                        id="position"
                        name="position"
                        value={formState.position}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-live-bg border border-live-border text-live-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-live-accent"
                      >
                        <option value="">Selecione um cargo</option>
                        {positions.map((position) => (
                          <option key={position} value={position}>
                            {position}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="experience" className="block text-live-textSecondary mb-2 font-medium">
                      Experiência profissional
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formState.experience}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Descreva sua experiência profissional..."
                      className="w-full px-4 py-3 bg-live-bg border border-live-border text-live-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-live-accent resize-none"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-live-textSecondary mb-2 font-medium">
                      Mensagem (opcional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Conte-nos por que você gostaria de trabalhar conosco..."
                      className="w-full px-4 py-3 bg-live-bg border border-live-border text-live-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-live-accent resize-none"
                    />
                  </div>

                  <div className="mb-8">
                    <label htmlFor="resume" className="block text-live-textSecondary mb-2 font-medium">
                      Currículo (PDF)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="resume"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="resume"
                        className="flex items-center gap-3 px-4 py-3 bg-live-bg border border-live-border text-live-textPrimary rounded-lg cursor-pointer hover:bg-live-border/20 transition-colors"
                      >
                        <Upload className="h-5 w-5" />
                        <span>{fileName || "Escolher arquivo"}</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-live-accent to-yellow-500 text-black font-bold py-4 rounded-lg hover:from-yellow-400 hover:to-live-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar currículo"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-live-textPrimary mb-6">Por que trabalhar conosco?</h2>
              <p className="text-live-textSecondary text-lg mb-8">
                Junte-se a uma empresa que valoriza seus colaboradores e oferece oportunidades únicas de crescimento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-live-border/10 p-6 rounded-xl border border-live-border/30"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-4`}>
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-live-textPrimary mb-2">{benefit.title}</h3>
                  <p className="text-live-textSecondary text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-live-accent/10 to-yellow-500/10 p-6 rounded-xl border border-live-accent/20">
              <h3 className="text-xl font-bold text-live-textPrimary mb-3">Vagas disponíveis</h3>
              <p className="text-live-textSecondary mb-4">
                Temos oportunidades em diversas áreas e unidades. Envie seu currículo e faça parte do nosso time!
              </p>
              <ul className="text-live-textSecondary space-y-2">
                <li>• Personal Trainers</li>
                <li>• Professores de Aulas Coletivas</li>
                <li>• Recepcionistas</li>
                <li>• Nutricionistas</li>
                <li>• Gerentes de Unidade</li>
                <li>• Estagiários</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export const dynamic = 'force-dynamic'

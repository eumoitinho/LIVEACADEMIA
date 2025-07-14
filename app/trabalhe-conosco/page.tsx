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
    resume: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormState((prev) => ({ ...prev, resume: file }))
      setFileName(file.name)
    }
  }

  const handleSubmit = (e) => {
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
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">
            Trabalhe <span className="text-gradient">Conosco</span>
          </h1>
          <p className="section-subtitle">
            Faça parte do time Live Academia e ajude a transformar vidas através do fitness.
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
            <div className="app-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Envie seu currículo</h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Currículo enviado com sucesso!</h3>
                  <p className="text-gray-300">
                    Agradecemos seu interesse em fazer parte do nosso time. Analisaremos seu currículo e entraremos em
                    contato em breve.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                        className="modern-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                        className="modern-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-gray-300 mb-2 font-medium">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        required
                        className="modern-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="position" className="block text-gray-300 mb-2 font-medium">
                        Cargo desejado
                      </label>
                      <select
                        id="position"
                        name="position"
                        value={formState.position}
                        onChange={handleInputChange}
                        required
                        className="modern-input"
                      >
                        <option value="">Selecione uma opção</option>
                        {positions.map((position) => (
                          <option key={position} value={position}>
                            {position}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="experience" className="block text-gray-300 mb-2 font-medium">
                      Experiência
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formState.experience}
                      onChange={handleInputChange}
                      required
                      className="modern-input"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="Sem experiência">Sem experiência</option>
                      <option value="Menos de 1 ano">Menos de 1 ano</option>
                      <option value="1-3 anos">1-3 anos</option>
                      <option value="3-5 anos">3-5 anos</option>
                      <option value="Mais de 5 anos">Mais de 5 anos</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                      Mensagem (opcional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="modern-input"
                    ></textarea>
                  </div>

                  <div className="mb-8">
                    <label className="block text-gray-300 mb-2 font-medium">Currículo (PDF, DOC ou DOCX)</label>
                    <div className="relative">
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        required
                        className="sr-only"
                      />
                      <label
                        htmlFor="resume"
                        className="flex items-center justify-center gap-2 modern-input cursor-pointer hover:border-[#ffcb00]/50 transition-colors"
                      >
                        <Upload className="h-5 w-5 text-[#ffcb00]" />
                        <span>{fileName || "Selecionar arquivo"}</span>
                      </label>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="btn-primary w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar currículo"
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-bold text-white mb-8">Por que trabalhar na Live Academia?</h2>

            <div className="space-y-6 mb-8">
              {benefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="app-card p-6 group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="app-card p-6">
              <h3 className="text-xl font-bold text-white mb-4">Processo seletivo</h3>
              <ol className="space-y-4">
                {[
                  "Análise de currículo",
                  "Entrevista inicial (online ou presencial)",
                  "Teste prático (para cargos específicos)",
                  "Entrevista final",
                  "Contratação",
                ].map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-[#ffcb00] flex items-center justify-center text-black text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-300 font-medium">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

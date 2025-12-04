"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Upload, Check, Loader2, Users, Award, Heart, TrendingUp, Briefcase } from "lucide-react"
import { useTrabalheConoscoData } from "@/hooks/use-trabalhe-conosco-data"

const benefitIconMap = {
  heart: Heart,
  trendingup: TrendingUp,
  award: Award,
  users: Users,
  team: Users
}

const fallbackData = {
  title: "Trabalhe Conosco",
  description:
    "Faça parte do time Live Academia e ajude a transformar vidas através do fitness. Somos a maior rede de academias de Manaus e estamos sempre em busca de profissionais apaixonados por saúde e bem-estar.",
  benefits: [
    { title: "Ambiente inspirador", description: "Estrutura moderna e equipe apaixonada por fitness.", icon: "heart", color: "from-red-500 to-red-600" },
    { title: "Desenvolvimento profissional", description: "Treinamentos contínuos e oportunidades reais de crescimento.", icon: "trendingup", color: "from-green-500 to-green-600" },
    { title: "Benefícios exclusivos", description: "Acesso às unidades, descontos em parceiros e plano de saúde.", icon: "award", color: "from-blue-500 to-blue-600" },
    { title: "Cultura de inovação", description: "Valorizamos novas ideias e autonomia para criar.", icon: "users", color: "from-amber-500 to-yellow-600" }
  ],
  openPositions: [
    {
      title: "Personal Trainer",
      department: "Treinamento",
      location: "Manaus - AM",
      type: "CLT",
      description: "Atendimento em sala de musculação, montagem de treinos e acompanhamento de alunos.",
      requirements: ["CREF ativo", "Experiência com atendimento ao público"],
      benefits: ["Treinamentos internos", "Acesso às unidades"],
      isActive: true
    }
  ],
  formFields: [
    { name: "name", label: "Nome completo", type: "text", required: true, placeholder: "Digite seu nome" },
    { name: "email", label: "E-mail", type: "email", required: true, placeholder: "voce@email.com" },
    { name: "phone", label: "Telefone", type: "tel", required: true, placeholder: "(92) 99999-9999" },
    { name: "position", label: "Cargo desejado", type: "text", required: true, placeholder: "Personal Trainer, Recepcionista..." },
    { name: "experience", label: "Experiência profissional", type: "textarea", required: false, placeholder: "Descreva sua experiência profissional" },
    { name: "message", label: "Mensagem (opcional)", type: "textarea", required: false, placeholder: "Conte-nos por que você gostaria de trabalhar conosco..." },
    { name: "resume", label: "Currículo (PDF)", type: "file", required: true }
  ],
  ctaButton: {
    text: "Enviar currículo"
  }
}

export default function TrabalheConoscoPage() {
  const { data, loading } = useTrabalheConoscoData()
  
  // SÓ usar fallback DEPOIS que loading terminar
  const pageData = data || fallbackData

  const benefits = (pageData.benefits?.length ? pageData.benefits : fallbackData.benefits).map((benefit, index) => ({
    ...benefit,
    color:
      (benefit as any).color ||
      ["from-red-500 to-red-600", "from-green-500 to-green-600", "from-blue-500 to-blue-600", "from-amber-500 to-yellow-600"][index % 4]
  }))

  const openPositions =
    (pageData.openPositions && pageData.openPositions.length > 0
      ? pageData.openPositions
      : fallbackData.openPositions
    ).filter((position) => position && position.isActive !== false)

  const formFields =
    pageData.formFields && pageData.formFields.length > 0 ? pageData.formFields : fallbackData.formFields

  const heroImage = (pageData as any).heroImage?.asset?.url ?? "/bg.jpeg"
  const ctaText = (pageData as any).ctaButton?.text ?? fallbackData.ctaButton.text
  const heroTitle = pageData.title || fallbackData.title
  const titleParts = heroTitle.split(" ")
  const accentWord = titleParts.length > 1 ? titleParts.pop() : heroTitle
  const baseTitle = titleParts.length > 0 ? titleParts.join(" ") : heroTitle

  const initialFormState = useMemo(() => {
    const base: Record<string, string | File | null> = {}
    formFields.forEach((field) => {
      base[field.name] = field.type === 'file' ? null : ''
    })
    return base
  }, [formFields])

  const [formState, setFormState] = useState<Record<string, string | File | null>>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileName, setFileName] = useState("")

  useEffect(() => {
    setFormState(initialFormState)
    setFileName("")
  }, [initialFormState])

  // Mostrar loading state enquanto carrega
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

  const handleFieldChange = (name: string, value: string | File | null) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
    if (value instanceof File) {
      setFileName(value.name)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState(initialFormState)
        setFileName("")
      }, 2500)
    }, 1500)
  }

  const renderField = (field: (typeof formFields)[number]) => {
    const isFullWidth = field.type === 'textarea' || field.type === 'file'
    const commonProps = {
      id: field.name,
      name: field.name,
      required: field.required,
      value: typeof formState[field.name] === 'string' ? (formState[field.name] as string) : '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        handleFieldChange(field.name, e.target.value),
      className:
        "w-full px-4 py-3 bg-live-bg border border-live-border text-live-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-live-accent placeholder:text-live-textSecondary/50"
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.name} className={`w-full ${isFullWidth ? 'md:col-span-2' : ''}`}>
          <label htmlFor={field.name} className="block text-live-textSecondary mb-2 font-medium">
            {field.label}
          </label>
          <textarea
            {...(commonProps as any)}
            rows={field.name === 'message' ? 3 : 4}
            placeholder={field.placeholder}
          />
        </div>
      )
    }

    if (field.type === 'select' && (field as any).options?.length) {
      return (
        <div key={field.name} className="w-full">
          <label htmlFor={field.name} className="block text-live-textSecondary mb-2 font-medium">
            {field.label}
          </label>
          <select
            {...(commonProps as any)}
            className="w-full px-4 py-3 bg-live-bg border border-live-border text-live-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-live-accent"
          >
            <option value="">Selecione</option>
            {(field as any).options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )
    }

    if (field.type === 'file') {
      return (
        <div key={field.name} className="w-full md:col-span-2">
          <label htmlFor={field.name} className="block text-live-textSecondary mb-2 font-medium">
            {field.label}
          </label>
          <div className="relative">
            <input
              type="file"
              id={field.name}
              accept=".pdf"
              onChange={(event) => {
                const file = event.target.files?.[0]
                handleFieldChange(field.name, file ?? null)
              }}
              className="hidden"
            />
            <label
              htmlFor={field.name}
              className="flex items-center gap-3 px-4 py-3 bg-live-bg border border-live-border text-live-textPrimary rounded-lg cursor-pointer hover:bg-live-border/20 transition-colors"
            >
              <Upload className="h-5 w-5" />
              <span>{fileName || field.placeholder || "Escolher arquivo"}</span>
            </label>
          </div>
        </div>
      )
    }

    return (
      <div key={field.name} className="w-full">
        <label htmlFor={field.name} className="block text-live-textSecondary mb-2 font-medium">
          {field.label}
        </label>
        <input
          {...(commonProps as any)}
          type={field.type || 'text'}
          placeholder={field.placeholder}
        />
      </div>
    )
  }

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
            {baseTitle ? (
              <>
                {baseTitle} <span className="text-live-accent">{accentWord}</span>
              </>
            ) : (
              <span className="text-live-accent">{accentWord}</span>
            )}
          </h1>
          <p className="text-xl text-live-textSecondary max-w-3xl mx-auto">
            {pageData.description || fallbackData.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-live-border/10 p-8 rounded-2xl border border-live-border/30">
              <h2 className="text-2xl font-bold text-live-textPrimary mb-6">Envie seu currículo</h2>
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-live-textPrimary mb-2">Currículo enviado com sucesso!</h3>
                  <p className="text-live-textSecondary">
                    Agradecemos seu interesse em fazer parte do nosso time. Entraremos em contato em breve.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields.map((field) => renderField(field))}
                  <div className="md:col-span-2">
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
                        ctaText
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-live-textPrimary mb-6">Por que trabalhar conosco?</h2>
              <p className="text-live-textSecondary text-lg mb-8">
                Cresça com a maior rede de academias de Manaus e construa carreira com propósito.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent =
                  benefitIconMap[benefit.icon?.toLowerCase() as keyof typeof benefitIconMap] || Users
                return (
                  <motion.div
                    key={`${benefit.title}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-live-border/10 p-6 rounded-xl border border-live-border/30"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-live-textPrimary mb-2">{benefit.title}</h3>
                    <p className="text-live-textSecondary text-sm">{benefit.description}</p>
                  </motion.div>
                )
              })}
            </div>

            <div className="bg-gradient-to-r from-live-accent/10 to-yellow-500/10 p-6 rounded-xl border border-live-accent/20">
              <h3 className="text-xl font-bold text-live-textPrimary mb-3">Vagas disponíveis</h3>
              {openPositions.length === 0 ? (
                <p className="text-live-textSecondary text-sm">
                  No momento estamos coletando currículos para futuras oportunidades.
                </p>
              ) : (
                <ul className="space-y-3">
                  {openPositions.map((position, index) => (
                    <li key={`${position.title}-${index}`} className="flex items-start gap-3 text-live-textSecondary">
                      <Briefcase className="h-5 w-5 text-live-accent mt-1" />
                      <div>
                        <p className="text-live-textPrimary font-semibold">{position.title}</p>
                        <p className="text-sm">{position.department} • {position.location} • {position.type}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export const dynamic = 'force-dynamic'

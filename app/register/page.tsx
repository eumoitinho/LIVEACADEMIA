"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const fallbackRegister = {
  title: "Entre para a comunidade",
  highlight: "Live Academia",
  description: "Cadastre-se e desbloqueie treinos, avaliações e experiências premium.",
  badge: "Sign up",
  cta: { text: "Criar conta agora" },
  terms: "Ao criar sua conta você concorda com os nossos Termos de Serviço e Política de Privacidade.",
  footer: {
    text: "Já treina com a gente?",
    linkText: "Entrar na minha conta",
    href: "/login"
  },
  fields: [
    { name: "name", label: "Nome completo", type: "text", placeholder: "Digite seu nome", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "voce@email.com", required: true },
    { name: "password", label: "Crie uma senha", type: "password", placeholder: "Crie uma senha segura", required: true }
  ],
  sidebar: {
    title: "Tecnologia para potencializar seus resultados",
    description: "Cadastre-se e acompanhe seus treinos, agende avaliações e desbloqueie experiências exclusivas nas nossas unidades premium.",
    highlights: ["Avaliações ilimitadas", "Aulas premium", "Planos sem fidelidade"]
  }
}

export default function RegisterPage() {
  const section = fallbackRegister
  const sidebar = fallbackRegister.sidebar
  const formFields = section.fields
  const baseTitle = section.title
    ? section.title.replace(section.highlight || "", "").trim()
    : fallbackRegister.title
  const highlight = section.highlight || fallbackRegister.highlight

  const initialState = useMemo(() => {
    const state: Record<string, string> = {}
    formFields.forEach((field) => {
      state[field.name] = ""
    })
    return state
  }, [formFields])

  const [formData, setFormData] = useState(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setFormData(initialState)
    setSubmitted(false)
  }, [initialState])

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f10] via-black to-[#0a0a0a] text-white flex items-center justify-center px-6">
      <div className="max-w-5xl w-full mx-auto bg-white rounded-3xl overflow-hidden shadow-[0_30px_100px_-40px_rgba(255,74,23,0.35)] grid grid-cols-1 lg:grid-cols-2">
        <div className="px-10 py-12 lg:px-16">
          <div className="mb-12 flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-[#ff4a17]" />
            <span className="font-semibold text-lg text-neutral-900">LIVEACADEMIA</span>
          </div>

          <div>
            <p className="text-sm text-neutral-400 mb-2 uppercase tracking-[0.35em]">{section.badge || fallbackRegister.badge}</p>
            <h1 className="text-2xl lg:text-3xl font-semibold mb-4 tracking-tight text-neutral-900">
              {baseTitle} <span className="text-[#ff4a17]">{highlight}</span>
            </h1>
            <p className="text-neutral-500 text-sm mb-8">{section.description}</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {formFields.map((field) => (
              <label key={field.name} className="block">
                <span className="text-sm font-medium text-neutral-600">{field.label}</span>
                <input
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  className="w-full text-sm bg-white border border-neutral-200 rounded-lg mt-1 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#ff4a17] focus:border-[#ff4a17]"
                />
              </label>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#ff4a17] hover:bg-[#ff6a3c] text-white font-medium py-3 rounded-lg transition-colors duration-200 disabled:opacity-70"
            >
              {isSubmitting ? "Enviando..." : section.cta?.text || fallbackRegister.cta.text}
            </button>

            {submitted && (
              <p className="text-center text-sm text-[#ff4a17]">Cadastro enviado! Em breve nossa equipe entra em contato.</p>
            )}

            <p className="text-center text-[11px] leading-snug text-neutral-400">
              {section.terms || fallbackRegister.terms}
            </p>
          </form>

          <hr className="my-8 border-neutral-200" />

          <div>
            <p className="text-center text-sm text-neutral-600">{section.footer?.text || fallbackRegister.footer.text}</p>
            <Link
              href={section.footer?.href || fallbackRegister.footer.href}
              className="block w-full text-center py-3 border border-neutral-200 rounded-lg text-sm font-medium hover:bg-neutral-50 mt-4 text-neutral-900"
            >
              {section.footer?.linkText || fallbackRegister.footer.linkText}
            </Link>
          </div>
        </div>

        <div className="lg:px-16 flex flex-col justify-center bg-neutral-950 pt-12 pr-10 pb-12 pl-10 relative overflow-hidden">
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex gap-2 mb-10">
              <span className="h-2 w-10 rounded-full bg-[#ff4a17]" />
              <span className="h-2 w-10 rounded-full bg-neutral-800" />
              <span className="h-2 w-10 rounded-full bg-neutral-800" />
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-white">{sidebar?.title || fallbackRegister.sidebar.title}</h2>
            <p className="text-sm text-neutral-400 max-w-xs mb-8">
              {sidebar?.description || fallbackRegister.sidebar.description}
            </p>

            <ul className="space-y-3 text-sm text-neutral-300 mb-10">
              {(sidebar?.highlights || fallbackRegister.sidebar.highlights).map((highlight) => (
                <li key={highlight} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff4a17]" />
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="relative max-w-xs mx-auto">
            <div className="h-40 w-64 absolute top-12 left-4 rounded-2xl bg-[#ff4a17] shadow-[0_25px_80px_-40px_rgba(255,74,23,0.5)]" />
            <div className="h-44 w-72 relative z-10 flex items-end font-medium text-white bg-gradient-to-br from-neutral-800 to-black border border-neutral-800 rounded-2xl py-6 px-6 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.6)]">
              <div>
                <p className="text-xs text-neutral-400">Plano sem fidelidade</p>
                <p className="text-lg font-semibold">Flex Premium</p>
              </div>
            </div>

            <div className="absolute -bottom-24 -right-4 flex flex-col bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 shadow-lg backdrop-blur">
              <span className="text-xs text-neutral-400">Benefícios exclusivos</span>
              <span className="font-semibold text-white">Avaliação + Aulas ilimitadas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

const fallbackLogin = {
  title: "Bem-vindo de volta à",
  highlight: "Live Academia",
  description: "Entre com seu e-mail e senha para acessar sua conta.",
  cta: { text: "Entrar na conta" },
  footer: {
    text: "Ainda não treina com a gente?",
    linkText: "Conheça nossos planos",
    href: "/planos"
  },
  fields: [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "voce@email.com",
      required: true
    },
    {
      name: "password",
      label: "Senha",
      type: "password",
      placeholder: "Digite sua senha",
      required: true
    }
  ]
}

export default function LoginPage() {
  const section = fallbackLogin
  const formFields = section.fields
  const baseTitle = section.title
    ? section.title.replace(section.highlight || "", "").trim()
    : fallbackLogin.title
  const highlight = section.highlight || fallbackLogin.highlight

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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/5 rounded-2xl shadow-2xl border border-white/10">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Login</p>
          <h1 className="text-2xl font-semibold text-white leading-snug">
            {baseTitle} <span className="text-emerald-400">{highlight}</span>
          </h1>
          <p className="text-white/70 text-sm">{section.description}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm text-white/70 mb-1">
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.name] || ""}
                onChange={(event) => handleChange(field.name, event.target.value)}
                className="w-full px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 text-sm font-semibold text-black bg-emerald-400 rounded-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-70"
          >
            {isSubmitting ? "Enviando..." : section.cta?.text || fallbackLogin.cta.text}
          </button>
          {submitted && (
            <p className="text-center text-sm text-emerald-300">Dados recebidos! Em breve nossa equipe entra em contato.</p>
          )}
        </form>

        <p className="text-sm text-center text-white/70">
          {section.footer?.text || fallbackLogin.footer.text}{" "}
          <Link
            href={section.footer?.href || fallbackLogin.footer.href}
            className="text-emerald-400 hover:underline"
          >
            {section.footer?.linkText || fallbackLogin.footer.linkText}
          </Link>
        </p>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'

"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import HighlightImage from "@/components/shared/highlight-image"

const easing = [0.16, 1, 0.3, 1] as const

interface AboutSectionProps {
  data: {
    badge: string
    title: string
    description: string
    stats: Array<{ value: string; label: string }>
    highlights: string[]
  }
}

export default function AboutSectionEditable({ data }: AboutSectionProps) {
  if (!data) return null

  // Provide defaults if data is incomplete
  const highlights = data.highlights || []
  const stats = data.stats || [
    { value: "10K+", label: "Alunos ativos" },
    { value: "35+", label: "Unidades" },
    { value: "4.9", label: "Avaliação média" },
    { value: "10+", label: "Anos de experiência" }
  ]

  return (
    <section id="sobre" className="relative py-28 px-6 lg:px-12 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-[0.12] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.15)_0_2px,transparent_2px_10px)" }}
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_20%,rgba(255,203,0,0.18),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.85))]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.9),rgba(0,0,0,0.65),rgba(0,0,0,0.9))]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-20">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          viewport={{ once: true }}
          className="space-y-6 border-b border-white/10 pb-12 pt-4"
        >
          <span className="block text-sm uppercase tracking-[0.35em] text-white/40">
            {data.badge || "Live Academia"}
          </span>
          <h1 className="text-[48px] md:text-[80px] lg:text-[96px] leading-[0.95] font-semibold tracking-tight text-white">
            {data.title || "Sobre"}
          </h1>
          <p className="text-base text-white/75 leading-relaxed">
            {data.description || "Transformamos treino em rotina sustentável e resultado real: liberdade multiunidade, atendimento humano que acompanha cada fase e estrutura premium para garantir evolução de verdade."}
          </p>
          {highlights.length > 0 && (
            <p className="text-base text-white/65 leading-relaxed">
              {highlights[0] || "Somos uma rede criada em Manaus focada em experiência premium acessível: liberdade para treinar em qualquer unidade, avaliação constante e suporte humano de verdade — sem enrolação e sem barreiras."}
            </p>
          )}
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-5 md:grid-cols-4"
        >
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-black/85 px-6 py-7"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(255,203,0,0.22),transparent_65%)] opacity-0 transition duration-500 group-hover:opacity-100" />
              <span className="relative mb-2 flex text-3xl font-semibold tracking-tight text-white leading-none">{value}</span>
              <p className="relative text-xs uppercase tracking-[0.22em] text-white/55 transition leading-snug group-hover:text-white/80">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

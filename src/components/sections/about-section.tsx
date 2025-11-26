"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import HighlightImage from "@/components/shared/highlight-image"


const easing = [0.16, 1, 0.3, 1] as const

const stats = [
  { number: "+60K", label: "Alunos ativos" },
  { number: "35+", label: "Unidades" },
  { number: "5.0", label: "Avaliação média" },
  { number: "10+", label: "Anos de experiência" }
]

const highlights = [
  "Planos flexíveis sem fidelidade e acesso multiunidade",
  "Profissionais presentes e acompanhamento periódico",
  "Estrutura moderna, tecnologia e modalidades variadas",
  "Foco em consistência: não é só começar, é manter"
]

export default function AboutSection() {
  return (
    <section id="sobre" className="relative py-28 px-6 lg:px-12 overflow-hidden bg-black">
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
          <span className="block text-sm uppercase tracking-[0.35em] text-white/40">Live Academia</span>
          <h1 className="text-[48px] md:text-[80px] lg:text-[96px] leading-[0.95] font-semibold tracking-tight text-white">
            Sobre
          </h1>
          <p className="text-base text-white/75 leading-relaxed">
            Transformamos treino em rotina sustentável e resultado real: liberdade multiunidade, atendimento humano que acompanha cada
            fase e estrutura premium para garantir evolução de verdade.
          </p>
          <p className="text-base text-white/65 leading-relaxed">
            Somos uma rede criada em Manaus focada em experiência premium acessível: liberdade para treinar em qualquer unidade,
            avaliação constante e suporte humano de verdade — sem enrolação e sem barreiras.
          </p>
        </motion.header>

        

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-5 md:grid-cols-4"
        >
          {stats.map(({ number, label }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-black/85 px-6 py-7"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(255,203,0,0.22),transparent_65%)] opacity-0 transition duration-500 group-hover:opacity-100" />
              <span className="relative mb-2 flex text-3xl font-semibold tracking-tight text-white leading-none">{number}</span>
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
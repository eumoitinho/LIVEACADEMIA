"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import HighlightImage from "./highlight-image"


const easing = [0.16, 1, 0.3, 1] as const

const stats = [
  { number: "10K+", label: "Alunos ativos" },
  { number: "35+", label: "Unidades" },
  { number: "4.9", label: "Avaliação média" },
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

        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <div className="sr-only">Sobre a Live Academia</div>
              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.05]">
                Transformamos treino em rotina sustentável e resultado real
              </h3>
              <p className="text-base leading-relaxed text-white/75">
                Somos uma rede criada em Manaus focada em experiência premium acessível: liberdade para treinar em qualquer unidade,
                avaliação constante e suporte humano de verdade — sem enrolação e sem barreiras.
              </p>
            </div>

            <motion.ul
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: easing }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {highlights.map(item => (
                <li key={item} className="group flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-sm bg-yellow-400 shadow-[0_0_0_3px_rgba(255,204,0,0.25)] transition group-hover:scale-110" />
                  <p className="text-sm leading-relaxed text-white/75 transition group-hover:text-white/90 sm:text-base">{item}</p>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: easing }}
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl ring-1 ring-white/10 sm:row-span-2"
            >
              <HighlightImage />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.04, ease: easing }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60"
            >
              <Image
                src="/GewRZyFPrEAvawLIj3Eynw==.jpg"
                alt="Fachada da Live Premium"
                fill
                className="object-cover object-center"
                sizes="(min-width:1024px) 25vw, 90vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),rgba(0,0,0,0.15))]" />
              <div className="absolute bottom-5 left-5 right-5 text-xs uppercase tracking-[0.25em] text-white/85">
                Live Premium
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: easing }}
              viewport={{ once: true }}
              className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center"
            >
              <p className="text-sm leading-relaxed text-white/70">
                Estrutura moderna, tecnologia e modalidades variadas.
              </p>
            </motion.div>
          </motion.div>
        </div>

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
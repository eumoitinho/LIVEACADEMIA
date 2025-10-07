"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function AboutSection() {
  const easing = [0.16, 1, 0.3, 1] as const

  // Blur state control (0 - no blur, 1 - full blur)
  const [blurProgress, setBlurProgress] = useState(0)
  const heroRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    // Use scroll listener for smoother interpolation than discrete IO thresholds
    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // When top of hero approaches top of viewport -> increase blur; clamp between 0 and 1
      const visible = Math.min(Math.max(1 - rect.top / vh, 0), 1)
      // Strengthen curve so blur only becomes strong after some scroll
      const eased = Math.min(1, Math.max(0, Math.pow(visible, 1.4)))
      setBlurProgress(eased)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  const bullets = [
    'Planos flexíveis sem fidelidade e acesso multiunidade',
    'Profissionais presentes e acompanhamento periódico',
    'Estrutura moderna, tecnologia e modalidades variadas',
    'Foco em consistência: não é só começar, é manter',
  ]

  const stats = [
    { number: '10K+', label: 'Alunos ativos' },
    { number: '35+', label: 'Unidades' },
    { number: '4.9', label: 'Avaliação média' },
    { number: '10+', label: 'Anos de experiência' },
  ]

  return (
    <section id="sobre" className="relative w-full">
      {/* HERO FULL HEIGHT */}
      <div ref={heroRef} className="relative h-[68vh] sm:h-[78vh] lg:h-[86vh] pb-28 sm:pb-32 lg:pb-40">
        {/* Background image */}
        <Image
          src="/images/fachada.jpg"
          alt="Estrutura Live Academia"
          fill
          priority={false}
          className="absolute inset-0 h-full w-full object-cover object-center"
          sizes="100vw"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,204,0,0.30),transparent_60%)] mix-blend-soft-light opacity-40 pointer-events-none" />
        <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg,rgba(255,255,255,0.18)_0_2px,transparent_2px_10px)' }} />

        {/* Dynamic blur veil for readability when user já rolou */}
        <div
          className="absolute inset-0 pointer-events-none transition-[backdrop-filter,background-color] duration-500 ease-out"
          style={{
            backdropFilter: `blur(${Math.round(blurProgress * 10)}px)`,
            backgroundColor: `rgba(0,0,0,${0.15 + blurProgress * 0.35})`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full items-end justify-center px-4 sm:px-6 lg:px-8 pb-20 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: easing }}
            className="max-w-3xl mx-auto text-center pt-10 sm:pt-14"
          >
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-wide text-white/70 bg-white/5 border border-white/15 rounded-full px-3 py-1 backdrop-blur-sm">
              Experiência premium acessível
            </span>
            <h2 className="mt-5 text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-white">
              Transformamos treino em rotina sustentável e resultado <span className="text-white/60">real</span>.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed">
              Somos uma rede criada em Manaus focada em liberdade para treinar em qualquer unidade, avaliação constante e suporte humano de verdade — sem enrolação e sem barreiras.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="#planos"
                className="inline-flex items-center justify-center rounded-md bg-white text-neutral-900 text-sm font-medium px-5 py-2.5 hover:bg-neutral-100 transition shadow-[0_4px_18px_-6px_rgba(255,255,255,0.25)]"
              >
                Conheça os planos
              </a>
              <a
                href="#modalidades"
                className="inline-flex items-center justify-center rounded-md border border-white/25 text-white text-sm font-medium px-5 py-2.5 hover:bg-white/10 transition"
              >
                Ver modalidades
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating stats band straddling boundary */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: easing }}
          className="absolute -bottom-20 sm:-bottom-24 lg:-bottom-28 left-0 w-full flex justify-center z-30 pointer-events-none"
        >
          <div className="pointer-events-auto w-full px-6 sm:px-10 lg:px-16 max-w-7xl">
            <div className="rounded-3xl bg-neutral-950/80 backdrop-blur-md ring-1 ring-white/10 border border-white/5 px-4 sm:px-8 lg:px-10 py-6 sm:py-8 shadow-[0_40px_120px_-60px_rgba(255,204,0,0.25)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {stats.map(({ number, label }) => (
                  <div key={label} className="group relative rounded-2xl px-4 sm:px-5 py-5 sm:py-6 bg-gradient-to-b from-zinc-900/70 to-black/70 ring-1 ring-white/10 border border-white/5 overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_70%_30%,rgba(255,204,0,0.28),transparent_65%)]" />
                    <span className="relative text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight leading-none mb-1 flex">{number}</span>
                    <p className="relative text-[10px] sm:text-[11px] md:text-xs text-white/55 group-hover:text-white/75 transition leading-snug">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Spacer to allow next section to start below overlapping stats */}
      <div className="h-36 sm:h-40 lg:h-44" />
    </section>
  )
}
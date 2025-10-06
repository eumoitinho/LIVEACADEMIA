"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Users, MapPin, Star, Award } from "lucide-react"

export default function AboutSection() {
  const easing = [0.16, 1, 0.3, 1] as const

  const stats = [
    {
      number: "10K+",
      label: "Alunos ativos",
      icon: Users,
    },
    {
      number: "35+",
      label: "Unidades",
      icon: MapPin,
    },
    {
      number: "4.9",
      label: "Avaliação média",
      icon: Star,
    },
    {
      number: "10+",
      label: "Anos de experiência",
      icon: Award,
    },
  ]

  return (
    <section id="sobre" className="relative py-24 px-6 lg:px-12 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0f0f10] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,203,0,0.16),_transparent_55%)]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-black/80 backdrop-blur-md rounded-3xl shadow-[0_40px_120px_-60px_rgba(255,203,0,0.6)] overflow-hidden"
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="px-8 lg:px-14 py-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: easing }}
                viewport={{ once: true }}
                className="mb-10 flex items-center gap-3"
              >
                <span className="h-2 w-10 rounded-full bg-[#ffcb00]" />
                <span className="text-xs font-semibold tracking-[0.3em] text-white/60 uppercase">
                  Sobre a Live Academia
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.18, ease: easing }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl lg:text-4xl font-semibold text-white leading-tight">
                  Fitness sem barreiras: estrutura premium, planos flexíveis e acompanhamento real
                </h2>
                <p className="text-base leading-relaxed text-white/70">
                  Estamos há mais de uma década transformando a rotina de quem busca saúde e performance em Manaus. Na
                  Live Academia você encontra equipamentos de ponta, metodologias exclusivas e profissionais dedicados a
                  guiar cada conquista.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl border border-white/10 px-5 py-4 bg-white/5 backdrop-blur-sm">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/60">Nossa essência</span>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">
                      Flexibilidade total: treine sem fidelidade, com liberdade para usar qualquer unidade da rede.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 px-5 py-4 bg-white/5 backdrop-blur-sm">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/60">Experiência</span>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">
                      Aulas especiais, avaliações frequentes e tecnologia de monitoramento em todas as modalidades.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease: easing }}
                viewport={{ once: true }}
                className="mt-12 grid grid-cols-2 gap-6"
              >
                {stats.map(({ number, label, icon: Icon }) => (
                  <div key={label} className="rounded-2xl border border-white/10 px-5 py-4 bg-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-2xl bg-[#ffcb00]/10 text-[#ffcb00] flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-2xl font-semibold text-white tracking-tight">
                          {number}
                        </span>
                        <p className="text-sm text-white/60 leading-snug">{label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: easing }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="h-full w-full rounded-3xl overflow-hidden">
                <Image
                  src="/images/academia-2.webp"
                  alt="Estrutura Live Academia"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 80vw"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
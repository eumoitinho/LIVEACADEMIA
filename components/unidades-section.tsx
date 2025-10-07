"use client"
import Image from "next/image"
import { motion } from "framer-motion"

import UnidadeCard from "./unidade-card"

const unidades = [
  {
    nome: "Live Academia - Centro",
    endereco: "Av. Getúlio Vargas, 1234 - Centro, Manaus/AM",
    imagem: "/images/academia-1.webp",
    badge: { text: "Centro", variant: "orange" as const },
    link: "https://maps.google.com/?q=Live+Academia+Centro",
  },
  {
    nome: "Live Academia - Adrianópolis",
    endereco: "Rua Salvador, 567 - Adrianópolis, Manaus/AM",
    imagem: "/images/academia-2.webp",
    badge: { text: "Adrianópolis", variant: "indigo" as const },
    link: "https://maps.google.com/?q=Live+Academia+Adrianopolis",
  },
  {
    nome: "Live Academia - Cidade Nova",
    endereco: "Av. Noel Nutels, 890 - Cidade Nova, Manaus/AM",
    imagem: "/images/academia-3.webp",
    badge: { text: "Cidade Nova", variant: "pink" as const },
    link: "https://maps.google.com/?q=Live+Academia+Cidade+Nova",
  },
  {
    nome: "Live Academia - Ponta Negra",
    endereco: "Av. Coronel Teixeira, 456 - Ponta Negra, Manaus/AM",
    imagem: "/images/academia-4.webp",
    badge: { text: "Ponta Negra", variant: "orange" as const },
    link: "https://maps.google.com/?q=Live+Academia+Ponta+Negra",
  },
]

export default function UnidadesSection() {
  const easing = [0.16, 1, 0.3, 1] as const

  return (
    <section
      className="relative -mt-32 pt-40 pb-24 px-6 lg:px-12 bg-black overflow-hidden"
      /* -mt-* puxa a seção para cima para que o background comece atrás da barra de stats anterior */
    >
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/images/fachada.jpg"
          alt="Fachada da Live Premium"
          fill
          sizes="100vw"
          priority={false}
          className="object-cover object-center scale-105 blur-md"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      {/* Camada base de background ocupando toda a área inclusive a parte sobreposta */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-black via-[#0d0d0d] to-black" />
      {/* Glow / radial accent deslocado à direita */}
      <div className="pointer-events-none absolute -top-10 bottom-0 right-[-25%] w-[65%] -z-5 bg-[radial-gradient(circle_at_center,_rgba(255,74,23,0.30),_transparent_70%)] opacity-70" />
      {/* Grade sutil / texture opcional */}
      <div className="pointer-events-none absolute inset-0 -z-5 opacity-[0.08] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" style={{backgroundImage:'repeating-linear-gradient(45deg,rgba(255,255,255,0.25)_0_2px,transparent_2px_10px)'}} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-neutral-950/70 backdrop-blur-md border border-white/5 rounded-3xl px-8 lg:px-14 py-12 shadow-[0_40px_120px_-60px_rgba(255,74,23,0.45)] relative"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 mb-12">
            <div className="max-w-xl space-y-4">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: easing }}
                viewport={{ once: true }}
                className="text-xs uppercase tracking-[0.3em] text-white/40"
              >
                Explore nossas unidades
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: easing }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-semibold text-white leading-tight"
              >
                Viva a experiência Live em diferentes bairros de Manaus
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.16, ease: easing }}
                viewport={{ once: true }}
                className="text-base text-white/60 leading-relaxed"
              >
                Cada unidade é pensada para entregar infraestrutura premium, aulas exclusivas e atendimento próximo. Escolha
                a que mais combina com a sua rotina ou circule livremente entre elas sem fidelidade.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easing }}
              viewport={{ once: true }}
              className="min-w-[240px] rounded-3xl bg-white text-neutral-900 px-6 py-5 shadow-[0_25px_80px_-40px_rgba(255,74,23,0.6)]"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Rede monitorada</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-semibold">99%</span>
                <span className="pb-1 text-sm text-neutral-500">de satisfação</span>
              </div>
              <div className="mt-5 h-2 w-full rounded-full bg-neutral-200 overflow-hidden">
                <div className="h-full w-[82%] bg-gradient-to-r from-[#ff4a17] via-amber-400 to-yellow-300 rounded-full" />
              </div>
              <p className="mt-4 text-sm text-neutral-600 leading-snug">
                Mais de 10 mil alunos avaliando positivamente a experiência Live Academia.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8"
          >
            {unidades.map((unidade, index) => (
              <motion.div
                key={unidade.nome}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.08, ease: easing },
                  },
                }}
              >
                <UnidadeCard {...unidade} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
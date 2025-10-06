"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { portableComponents, urlFor } from "@/lib/sanity"
import type { AboutSectionData } from "@/types/cms-sections"

interface Props { data?: AboutSectionData }

export default function AboutSection({ data }: Props) {
  const easing = [0.16, 1, 0.3, 1] as const
  const heading = data?.heading || "Transformamos treino em rotina sustentável e resultado real"
  const richBody = data?.body
  const bullets = data?.bullets?.length ? data.bullets : [
    'Planos flexíveis sem fidelidade e acesso multiunidade',
    'Profissionais presentes e acompanhamento periódico',
    'Estrutura moderna, tecnologia e modalidades variadas',
    'Foco em consistência: não é só começar, é manter',
  ]
  const highlight = data?.highlightCard
  const stats = data?.stats?.length
    ? data.stats
    : [
        { number: '10K+', label: 'Alunos ativos', _key: 's1' },
        { number: '35+', label: 'Unidades', _key: 's2' },
        { number: '4.9', label: 'Avaliação média', _key: 's3' },
        { number: '10+', label: 'Anos de experiência', _key: 's4' },
      ]
  const sideImage = data?.sideImage
  return (
    <section id="sobre" className="relative py-28 px-6 lg:px-12 overflow-hidden bg-black">
      {/* Minimal textured background (no slideshow) */}
      <div className="absolute inset-0 -z-10 opacity-[0.12] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.15)_0_2px,transparent_2px_10px)" }} />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_20%,rgba(255,203,0,0.18),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.85))]" />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Grid principal */}
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start">
          {/* Coluna texto */}
          <div className="flex flex-col">
            <div className="sr-only">Sobre a Live Academia</div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: easing }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.05] mb-8"
            >
              {heading}
            </motion.h2>
            {richBody ? (
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: easing }}
                viewport={{ once: true }}
                className="prose prose-invert max-w-none text-white/80 prose-p:leading-relaxed"
              >
                <PortableText value={richBody} components={portableComponents} />
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: easing }}
                viewport={{ once: true }}
                className="text-lg text-white/70 max-w-2xl leading-relaxed"
              >
                Somos uma rede criada em Manaus focada em experiência premium acessível: liberdade para treinar em qualquer unidade, avaliação constante e suporte humano de verdade — sem enrolação e sem barreiras.
              </motion.p>
            )}
            <motion.ul
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: easing }}
              viewport={{ once: true }}
              className="mt-10 space-y-4"
            >
              {bullets.map(item => (
                <li key={item} className="group flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-sm bg-yellow-400 shadow-[0_0_0_3px_rgba(255,204,0,0.25)] group-hover:scale-110 transition" />
                  <p className="text-sm sm:text-base text-white/75 group-hover:text-white/90 transition leading-relaxed">{item}</p>
                </li>
              ))}
            </motion.ul>
          </div>
          {/* Coluna lateral: imagem + highlight card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easing }}
            viewport={{ once: true }}
            className="relative flex flex-col gap-6"
          >
            <div className="relative h-[360px] sm:h-[440px] lg:h-[500px] w-full overflow-hidden rounded-3xl ring-1 ring-white/10 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black">
              <Image
                src={sideImage ? urlFor(sideImage).width(900).height(1100).quality(80).url() : "/images/academia-1.webp"}
                alt={data?.heading || "Estrutura Live Academia"}
                fill
                className="object-cover object-center opacity-[0.9]"
                sizes="(min-width:1024px) 40vw, 90vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.7),rgba(0,0,0,0.15))]" />
              <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[radial-gradient(circle_at_70%_30%,rgba(255,203,0,0.4),transparent_60%)]" />
            </div>
            {(highlight?.title || highlight?.text) && (
              <div className="relative rounded-2xl p-6 bg-gradient-to-br from-zinc-900/90 to-black/90 ring-1 ring-white/10 border border-white/5 overflow-hidden">
                <div className="absolute -top-14 -right-10 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />
                {highlight?.title && <h3 className="text-white text-lg font-medium mb-2 tracking-tight">{highlight.title}</h3>}
                {highlight?.text && <p className="text-sm text-white/65 leading-relaxed">{highlight.text}</p>}
              </div>
            )}
          </motion.div>
        </div>
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easing }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map(({ number, label, _key }) => (
            <div key={_key || label} className="group relative rounded-2xl px-6 py-7 bg-gradient-to-b from-zinc-900/80 to-black/80 ring-1 ring-white/10 border border-white/5 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_70%_30%,rgba(255,203,0,0.22),transparent_65%)]" />
              <span className="relative text-3xl font-semibold text-white tracking-tight leading-none mb-1 flex">{number}</span>
              <p className="relative text-xs sm:text-sm text-white/55 group-hover:text-white/75 transition leading-snug">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { useState, useRef } from "react"
import { urlFor } from "@/lib/sanity"
import type { TestimonialsSectionData, TestimonialItemData } from "@/types/cms-sections"

interface Props { data?: TestimonialsSectionData }

const fallbackTestimonials: (TestimonialItemData & { role?: string })[] = [
  { name: "Ana Silva", text: "A Live transformou minha rotina. Sem fidelidade, consigo treinar no meu ritmo e os resultados são incríveis. Melhor escolha!", rating: 5 },
  { name: "Carlos Mendes", text: "App fantástico, profissionais qualificados e equipamentos modernos. Tudo que preciso para manter minha saúde em dia.", rating: 5 },
  { name: "Juliana Costa", text: "As aulas coletivas são motivadoras! A transparência nos planos e o respeito ao cliente fazem toda a diferença.", rating: 5 },
  { name: "Ricardo Almeida", text: "Estrutura impecável, espaços exclusivos no plano Diamante. Supera qualquer academia que já frequentei.", rating: 5 },
  { name: "Patrícia Santos", text: "A liberdade de cancelar a qualquer momento me deu segurança para começar. Hoje não consigo mais viver sem!", rating: 5 },
  { name: "Fernando Lima", text: "Preço justo, atendimento excelente e resultados garantidos. A Live Academia é simplesmente a melhor de Manaus.", rating: 5 },
]

export default function TestimonialSection({ data }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hover, setHover] = useState(false)
  const stackRef = useRef<HTMLDivElement | null>(null)

  const testimonials = (data?.items?.length ? data.items : fallbackTestimonials).map((t, i) => ({
    ...t,
    id: i + 1,
    rating: t.rating || 5,
    avatarUrl: t.avatar ? urlFor(t.avatar).width(160).height(160).quality(80).url() : `/images/academia-${(i % 4) + 1}.webp`,
  }))

  const next = () => setCurrentIndex(p => (p + 3) % testimonials.length)
  const prev = () => setCurrentIndex(p => (p - 3 + testimonials.length) % testimonials.length)

  const visible = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ]

  // Rotação base mais suave e maior tamanho / afastamento (~10% menos overlap)
  const plates = [
    { rotate: -4, tint: "rgba(255,255,255,0.20)" },
    { rotate: -1, tint: "rgba(255,255,255,0.30)" },
    { rotate: -2, tint: "rgba(255,255,255,0.06)" },
  ]

  return (
    <section className="relative py-28 bg-black overflow-hidden">
      {/* Glow ambiente */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,213,0,0.07),transparent_70%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <div className="inline-flex items-center rounded-full border border-zinc-800/80 px-5 py-2 mb-6 bg-zinc-900/40 backdrop-blur">
            <span className="text-sm font-medium tracking-wide text-zinc-400">Depoimentos reais</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {data?.heading || (
              <>O que dizem nossos <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">alunos</span></>
            )}
          </h2>
          <p className="text-lg text-zinc-400">{data?.heading ? '' : 'Histórias de evolução e motivação para você entrar agora.'}</p>
        </motion.div>

        {/* Stack Desktop */}
        <div
          ref={stackRef}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="hidden md:flex items-center justify-center relative h-[500px] select-none"
          aria-label="Depoimentos em destaque"
        >
          {visible.map((t, i) => {
            const cfg = plates[i]
            const rotate = hover ? cfg.rotate * 0.35 : cfg.rotate // alinhamento parcial
            // Overlap controlado: margens negativas menores => mais afastados (~10% extra)
            const ml = hover ? -28 : -44
            const mr = hover ? -28 : -44
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 32, rotate: cfg.rotate }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{ rotate, marginLeft: ml, marginRight: mr }}
                transition={{ type: "spring", stiffness: 120, damping: 18, delay: i * 0.08 }}
                style={{ background: `linear-gradient(${cfg.tint}, transparent)`, boxShadow: "0 30px 30px -10px rgba(0,0,0,0.45)" }}
                className="glass relative w-[400px] h-[430px] rounded-2xl border border-white/10 backdrop-blur-xl flex items-center justify-center px-2 will-change-transform"
              >
                <div className="absolute inset-4 rounded-xl bg-neutral-900 text-white shadow-2xl ring-1 ring-black/5 backdrop-blur flex flex-col overflow-hidden">
                  <div className="p-8 flex flex-col h-full">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-r from-yellow-100 to-amber-300 ring-1 ring-black/5 mb-6">
                      <Quote className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-lg leading-relaxed text-white-900/90 mb-8 flex-1 italic">"{(t as any).text}"</p>
                    <div className="pt-4 border-t border-black flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden ring-1 ring-black/5">
                          <Image src={(t as any).avatarUrl} alt={t.name || 'Aluno'} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-white tracking-wide leading-tight">{t.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span className="text-[11px] font-medium text-white">{t.rating?.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
          <div className="pointer-events-none absolute -z-10 w-[820px] h-[820px] rounded-full bg-gradient-to-tr from-yellow-500/5 via-transparent to-transparent blur-3xl" />
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-6">
          {visible.map(t => (
            <div key={t.id} className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
              <div className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-white/15 ring-1 ring-white/20 mb-4">
                <Quote className="w-4 h-4 text-white/80" />
              </div>
              <p className="text-sm leading-relaxed text-zinc-100/90 mb-6 italic">"{(t as any).text || (t as any).content}"</p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden ring-1 ring-white/20">
                    <Image src={(t as any).avatarUrl} alt={t.name || 'Aluno'} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white leading-tight">{t.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  {Array.from({ length: Math.round(t.rating || 5) }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navegação */}
        <div className="flex justify-center gap-4 mt-16">
          <button
            onClick={prev}
            className="p-3 rounded-full bg-zinc-900/70 border border-zinc-800 hover:bg-zinc-800/80 hover:border-zinc-700 text-zinc-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="p-3 rounded-full bg-zinc-900/70 border border-zinc-800 hover:bg-zinc-800/80 hover:border-zinc-700 text-zinc-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50"
            aria-label="Próximo"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="mt-20 flex flex-wrap justify-center gap-8 text-center"
        >
          {testimonials.length > 2 && (
            <div className="flex items-center gap-8 bg-zinc-900/60 border border-zinc-800 rounded-full px-10 py-6 backdrop-blur">
              <div>
                <div className="text-2xl font-bold text-white">{(
                  testimonials.reduce((a, b) => a + (b.rating || 5), 0) / testimonials.length
                ).toFixed(1)}</div>
                <div className="text-[10px] uppercase tracking-wide text-zinc-500">Avaliação média</div>
              </div>
              <div className="w-px h-10 bg-zinc-800" />
              <div>
                <div className="text-2xl font-bold text-white">{testimonials.length.toString().padStart(2, '0')}+</div>
                <div className="text-[10px] uppercase tracking-wide text-zinc-500">Depoimentos</div>
              </div>
              <div className="w-px h-10 bg-zinc-800" />
              <div>
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-[10px] uppercase tracking-wide text-zinc-500">Recomendariam</div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .glass { transition: transform .65s cubic-bezier(.19,1,.22,1), margin .65s cubic-bezier(.19,1,.22,1); }
        }
      `}</style>
    </section>
  )
}
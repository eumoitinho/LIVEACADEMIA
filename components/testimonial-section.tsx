"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Aluna há 2 anos",
    content: "A Live transformou minha rotina. Sem fidelidade, consigo treinar no meu ritmo e os resultados são incríveis. Melhor escolha!",
    avatar: "/images/academia-1.webp",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Aluno há 1 ano",
    content: "App fantástico, profissionais qualificados e equipamentos modernos. Tudo que preciso para manter minha saúde em dia.",
    avatar: "/images/academia-2.webp",
    rating: 5,
  },
  {
    id: 3,
    name: "Juliana Costa",
    role: "Aluna há 3 anos",
    content: "As aulas coletivas são motivadoras! A transparência nos planos e o respeito ao cliente fazem toda a diferença.",
    avatar: "/images/academia-3.webp",
    rating: 5,
  },
  {
    id: 4,
    name: "Ricardo Almeida",
    role: "Aluno há 6 meses",
    content: "Estrutura impecável, espaços exclusivos no plano Diamante. Supera qualquer academia que já frequentei.",
    avatar: "/images/academia-4.webp",
    rating: 5,
  },
  {
    id: 5,
    name: "Patrícia Santos",
    role: "Aluna há 4 anos",
    content: "A liberdade de cancelar a qualquer momento me deu segurança para começar. Hoje não consigo mais viver sem!",
    avatar: "/images/academia-1.webp",
    rating: 5,
  },
  {
    id: 6,
    name: "Fernando Lima",
    role: "Aluno há 8 meses",
    content: "Preço justo, atendimento excelente e resultados garantidos. A Live Academia é simplesmente a melhor de Manaus.",
    avatar: "/images/academia-2.webp",
    rating: 5,
  },
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonials = () => {
    setCurrentIndex((prev) => (prev + 3) % testimonials.length)
  }

  const prevTestimonials = () => {
    setCurrentIndex((prev) => (prev - 3 + testimonials.length) % testimonials.length)
  }

  // Get 3 testimonials to show
  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ]

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-500/5 to-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 mb-6">
            <span className="text-zinc-400 text-sm font-medium">Depoimentos reais</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            O que dizem nossos <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">alunos</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
            Histórias reais de transformação e superação. Junte-se a milhares de pessoas satisfeitas.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-zinc-800 p-8 h-full hover:border-zinc-700 transition-all duration-300">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-10 h-10 text-yellow-500/20" />
                  </div>

                  {/* Content */}
                  <p className="text-zinc-300 mb-8 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-zinc-800">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-zinc-500">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prevTestimonials}
              className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextTestimonials}
              className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300"
              aria-label="Próximo"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-8 px-8 py-4 rounded-full bg-zinc-900/50 border border-zinc-800">
              <div>
                <div className="text-2xl font-bold text-white">4.9</div>
                <div className="text-xs text-zinc-500">Avaliação média</div>
              </div>
              <div className="w-px h-10 bg-zinc-800" />
              <div>
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-xs text-zinc-500">Alunos satisfeitos</div>
              </div>
              <div className="w-px h-10 bg-zinc-800" />
              <div>
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-xs text-zinc-500">Recomendariam</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
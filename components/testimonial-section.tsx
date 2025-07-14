"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Membro há 2 anos",
    content: "A Live Academia transformou minha rotina. Com planos flexíveis e sem fidelidade, consigo treinar no meu ritmo e já vejo resultados incríveis.",
    image: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Membro há 1 ano",
    content: "O app é fantástico para acompanhar treinos. As unidades são modernas e os profissionais, muito qualificados. Recomendo demais!",
    image: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Juliana Costa",
    role: "Membro há 3 anos",
    content: "As aulas coletivas são super motivadoras e a estrutura climatizada faz toda a diferença. A transparência nos planos é um grande diferencial.",
    image: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Ricardo Almeida",
    role: "Membro há 6 meses",
    content: "Melhor rede de Manaus! Equipamentos de ponta, espaços exclusivos no plano Diamante e um suporte que realmente acelera os ganhos.",
    image: "/placeholder-user.jpg",
    rating: 5,
  },
]

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-live-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-live-textPrimary mb-4">O que nossos alunos dizem</h2>
          <p className="text-lg text-live-textSecondary">Histórias reais de quem vive a transformação todos os dias.</p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="bg-live-border/10 p-8 rounded-2xl border border-live-border/30 h-full flex flex-col">
                    <Quote className="h-10 w-10 text-live-accent mb-4" />
                    <p className="text-live-textSecondary italic mb-6 flex-grow">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-14 w-14 rounded-full object-cover border-2 border-live-accent"
                      />
                      <div>
                        <h4 className="font-bold text-live-textPrimary">{testimonial.name}</h4>
                        <p className="text-sm text-live-textTernary">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-live-bg bg-live-accent border-none" />
          <CarouselNext className="text-live-bg bg-live-accent border-none" />
        </Carousel>
      </div>
    </section>
  )
}
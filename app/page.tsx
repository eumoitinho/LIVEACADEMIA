"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Shield, DollarSign, CheckCircle, Star, Users, Award } from "lucide-react"
import HeroSection from "@/components/hero-section"
import LocationCarousel from "@/components/location-carousel"
import TestimonialSection from "@/components/testimonial-section"
import FloatingButton from "@/components/floating-button"
import PlanosSection from "@/components/planos-section"
import AboutSection from "@/components/about-section"
import UnidadesCarousel from "@/components/unidades-carousel"
import BeneficiosSection from "@/components/beneficios-section"
import AppSection from "@/components/app-section"
import ModalidadesSection from "@/components/modalidades-section"
import ContatoSection from "@/components/contato-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      <AboutSection />

      <UnidadesCarousel />

      <BeneficiosSection />

      <ModalidadesSection />

      {/* Units Section 
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">
              Nossas <span className="text-gradient">Unidades</span>
            </h2>
            <p className="section-subtitle">
              Estamos presentes em diversos pontos de Manaus para facilitar seu acesso à atividade física.
            </p>
            <Link
              href="/unidades"
              className="inline-flex items-center mt-4 text-[#ffcb00] hover:text-[#ffd740] transition-colors font-semibold group"
            >
              Ver todas as unidades
              <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <LocationCarousel />
        </div>
      </section>*/}

      {/* Plans Section */}
      <PlanosSection />

      <AppSection />

      <ContatoSection />

      {/* Testimonials */}
      <TestimonialSection />

      <FloatingButton />
    </main>
  )
}

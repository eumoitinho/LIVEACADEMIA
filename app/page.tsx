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
import WellhubSection from "@/components/wellhub-section"
import BioimpedanciaSection from "@/components/bioimpedancia-section"
import EstruturaSection from "@/components/estrutura-section"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <HeroSection />

      <AboutSection />

      <UnidadesCarousel />

      <BeneficiosSection />

      <EstruturaSection />

      <ModalidadesSection />

      {/* Plans Section */}
      <PlanosSection />

      <AppSection />

      {/* INSERIR AS DUAS NOVAS SEÇÕES AQUI */}
   

      {/* Testimonials */}
      <TestimonialSection />

      <FloatingButton />
    </main>
  )
}

export const dynamic = 'force-dynamic'

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
import EstruturaSection from "@/components/estrutura-section"
// (Wellhub / Bioimpedancia poderão virar seções CMS futuramente)

// TODO: Substituir este layout estatico por renderer dinâmico baseado em Sanity (getHomePage + map de sections)

export default function Home() {
  // Por enquanto mantendo render estático até hook de CMS ser conectado.
  return (
    <main className="min-h-screen relative">
      <HeroSection />
      <AboutSection />
      <UnidadesCarousel />
      <BeneficiosSection />
      <EstruturaSection />
      <ModalidadesSection />
      <PlanosSection />
      <AppSection />
      <TestimonialSection />
      <FloatingButton />
    </main>
  )
}

export const dynamic = 'force-dynamic'

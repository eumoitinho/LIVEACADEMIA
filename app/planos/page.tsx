"use client"

import PlanosSection from "@/components/planos-section"

export default function Planos() {
  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-12">Escolha seu plano</h1>
          <p className="text-center text-zinc-400 mb-12">Temos opções para todos os objetivos e necessidades. Escolha o plano que melhor se adapta a você.</p>
          <PlanosSection />
        </div>
      </section>
    </main>
  )
}
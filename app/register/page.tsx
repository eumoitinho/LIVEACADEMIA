import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const RegisterPage = () => {
  const BEZIER = [0.22, 1, 0.36, 1] as const

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: BEZIER, delay },
  })

  const fadeRight = (delay = 0) => ({
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: BEZIER, delay },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f10] via-black to-[#0a0a0a] text-white flex items-center justify-center px-6">
      <div
        className="max-w-5xl w-full mx-auto bg-white rounded-3xl overflow-hidden shadow-[0_30px_100px_-40px_rgba(255,74,23,0.35)] grid grid-cols-1 lg:grid-cols-2"
      >
        {/* Left: Form */}
        <div className="px-10 py-12 lg:px-16">
          {/* Logo */}
          <div className="mb-12 flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-[#ff4a17]" />
            <span className="font-semibold text-lg text-neutral-900">LIVEACADEMIA</span>
          </div>

          <div>
            <p className="text-sm text-neutral-400 mb-2">SIGN UP</p>
            <h1 className="text-2xl lg:text-3xl font-semibold mb-10 tracking-tight text-neutral-900">
              Entre para a comunidade que vive o fitness todos os dias
            </h1>
          </div>

          <form className="space-y-6">
            {/* Name */}
            <label className="block">
              <span className="text-sm font-medium text-neutral-600">Nome completo</span>
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full text-sm bg-white border border-neutral-200 rounded-lg mt-1 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#ff4a17] focus:border-[#ff4a17]"
              />
            </label>

            {/* Email */}
            <label className="block">
              <span className="text-sm font-medium text-neutral-600">Email</span>
              <input
                type="email"
                placeholder="voce@email.com"
                className="w-full text-sm bg-white border border-neutral-200 rounded-lg mt-1 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#ff4a17] focus:border-[#ff4a17]"
              />
            </label>

            {/* Password */}
            <label className="block">
              <span className="text-sm font-medium text-neutral-600">Crie uma senha</span>
              <input
                type="password"
                placeholder="Crie uma senha segura"
                className="w-full text-sm bg-white border border-neutral-200 rounded-lg mt-1 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#ff4a17] focus:border-[#ff4a17]"
              />
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#ff4a17] hover:bg-[#ff6a3c] text-white font-medium py-3 rounded-lg transition-colors duration-200"
            >
              Criar conta agora
            </button>

            <p className="text-center text-[11px] leading-snug text-neutral-400">
              Ao criar sua conta você concorda com os nossos <a href="#" className="underline">Termos de Serviço</a> e
              <a href="#" className="underline ml-1">Política de Privacidade</a>.
            </p>
          </form>

          <hr className="my-8 border-neutral-200" />

          <div>
            <p className="text-center text-sm text-neutral-600">Já treina com a gente?</p>
            <Link
              href="/login"
              className="block w-full text-center py-3 border border-neutral-200 rounded-lg text-sm font-medium hover:bg-neutral-50 mt-4 text-neutral-900"
            >
              Entrar na minha conta
            </Link>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="lg:px-16 flex flex-col justify-center bg-neutral-950 pt-12 pr-10 pb-12 pl-10 relative overflow-hidden">
          <div className="flex gap-2 mb-10">
            <span className="h-2 w-10 rounded-full bg-[#ff4a17]" />
            <span className="h-2 w-10 rounded-full bg-neutral-800" />
            <span className="h-2 w-10 rounded-full bg-neutral-800" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">Tecnologia para potencializar seus resultados</h2>
            <p className="text-sm text-neutral-400 max-w-xs mb-8">
              Cadastre-se e acompanhe seus treinos, agende avaliações de performance e desbloqueie experiências exclusivas
              nas nossas unidades premium.
            </p>
          </div>

          <div className="relative max-w-xs mx-auto">
            <div className="h-40 w-64 absolute top-12 left-4 rounded-2xl bg-[#ff4a17] shadow-[0_25px_80px_-40px_rgba(255,74,23,0.5)]" />
            <div className="h-44 w-72 relative z-10 flex items-end font-medium text-white bg-gradient-to-br from-neutral-800 to-black border border-neutral-800 rounded-2xl py-6 px-6 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.6)]">
              <div>
                <p className="text-xs text-neutral-400">Plano sem fidelidade</p>
                <p className="text-lg font-semibold">Flex Premium</p>
              </div>
            </div>

            <div className="absolute -bottom-24 -right-4 flex flex-col bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 shadow-lg backdrop-blur">
              <span className="text-xs text-neutral-400">Benefícios exclusivos</span>
              <span className="font-semibold text-white">Avaliação + Aulas ilimitadas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

export const dynamic = 'force-dynamic'
"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import LiveLogo from "./live-logo"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-full blur-3xl" />
      </div>
      
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.jpg')",
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-black/60" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-full blur-[100px]"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[150%] bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full blur-[100px]"
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <LiveLogo className="w-32 h-32 mx-auto mb-6" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight"
        >
          Transforme seu corpo
          <br />
          <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">e sua vida</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-zinc-300 mb-6 max-w-3xl mx-auto"
        >
          A maior rede de academias de Manaus, com planos flexíveis e sem fidelidade para você treinar do seu jeito.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center rounded-full border border-yellow-500/30 px-6 py-3 bg-yellow-500/10 backdrop-blur-sm">
            <span className="text-yellow-400 text-lg font-semibold">Planos a partir de R$ 119,90</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/planos">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(255, 193, 7, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
            >
              MATRICULE-SE AGORA
              <ArrowRight size={22} />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-8 h-12 rounded-full border-2 border-zinc-700 flex justify-center p-2">
          <motion.div
            className="w-1 h-3 bg-zinc-400 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </section>
  )
}

"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-live-bg text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.jpg')",
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-black/50" />
      
      {/* Original Background with Blur */}
      <div className="absolute inset-0 z-0 bg-live-bg/30 backdrop-blur-sm" />
      
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-live-accent/10 rounded-full blur-[100px]"
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
          className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[150%] bg-white/5 rounded-full blur-[100px]"
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
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight"
        >
          SEU TREINO,
          <br />
          <span className="text-live-accent">SUAS REGRAS!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-live-textSecondary mb-10 max-w-2xl mx-auto"
        >
          Sem fidelidade, sem anuidade, sem pegadinha. A academia que respeita seu bolso e seu tempo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/planos">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 74, 23, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-live-accent text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Comece agora
              <ArrowRight size={22} />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-8 h-12 rounded-full border-2 border-live-border flex justify-center p-2">
          <motion.div
            className="w-1 h-3 bg-live-textSecondary rounded-full"
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

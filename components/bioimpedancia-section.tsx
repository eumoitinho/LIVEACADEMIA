"use client"

import { motion } from "framer-motion"
import { Activity, BarChart3, Eye, Zap, ArrowRight, CheckCircle, Sparkles, Target, TrendingUp, Droplets } from "lucide-react"
import type { BioimpedanciaSectionData } from "@/types/cms-sections"

interface Props { data?: BioimpedanciaSectionData }

const fallbackDados = [
  {
    icon: Activity,
    titulo: "Peso e IMC",
    descricao: "Dados completos sobre seu peso corporal e índice de massa corporal",
    color: "from-yellow-400 to-amber-500"
  },
  {
    icon: BarChart3,
    titulo: "Gordura Corporal",
    descricao: "Percentual de gordura corporal e taxa de gordura visceral",
    color: "from-amber-500 to-yellow-600"
  },
  {
    icon: Zap,
    titulo: "Massa Magra",
    descricao: "Quantidade de massa magra, proteínas e minerais",
    color: "from-yellow-500 to-amber-600"
  },
  {
    icon: Droplets,
    titulo: "Água Corporal",
    descricao: "Quantidade de água no organismo para hidratação ideal",
    color: "from-amber-400 to-yellow-500"
  }
]

const fallbackBeneficios = [
  "É um exame fundamental para traçar metas realistas e acompanhar sua evolução de forma objetiva",
  "Disponível em diversas unidades Diamante",
  "Acompanhe sua evolução de forma objetiva e personalizada"
]

const iconMap: Record<string, any> = {
  activity: Activity,
  barchart: BarChart3,
  zap: Zap,
  agua: Droplets,
}

export default function BioimpedanciaSection({ data }: Props) {
  const easing = [0.16, 1, 0.3, 1] as const
  const heading = data?.heading || 'Bioimpedância e análise 3D: monitore o progresso do seu corpo'
  const subheading = data?.subheading || 'Com o exame de bioimpedância, disponível em diversas unidades Diamante, você tem acesso a dados completos sobre sua composição corporal.'
  const beneficiosBioimpedancia = (data?.beneficiosIntro?.length ? data.beneficiosIntro : fallbackBeneficios)
  const dadosBioimpedancia = (data?.dados?.length ? data.dados.map(d => ({
    icon: iconMap[d.icon || 'activity'] || Activity,
    titulo: d.titulo || 'Item',
    descricao: d.descricao || '',
    color: `from-yellow-400 to-amber-500`
  })) : fallbackDados)
  const cta3dLabel = data?.cta3dLabel || 'AGENDAR ANÁLISE 3D'
  const highlightPrice = data?.highlightPrice || 'R$ 100'
  const bottomPrimary = { label: data?.bottomPrimaryCtaLabel || 'SAIBA MAIS!', href: data?.bottomPrimaryCtaHref || '#' }
  const bottomSecondary = { label: data?.bottomSecondaryCtaLabel || 'VER UNIDADES DIAMANTE', href: data?.bottomSecondaryCtaHref || '#' }

  return (
    <section className="relative py-24 px-6 lg:px-12 overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-black">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-400/15 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s' }} />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-32 right-20 w-20 h-20 bg-gradient-to-r from-amber-500/15 to-yellow-600/15 rounded-full blur-sm"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easing }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 backdrop-blur-xl mb-6"
          >
            <Target className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium">Monitoramento avançado</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easing }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight"
          >
            {heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: easing }}
            viewport={{ once: true }}
            className="text-lg text-zinc-300 max-w-4xl mx-auto"
          >
            {subheading}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Dados da Bioimpedância */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easing }}
            viewport={{ once: true }}
          >
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easing }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Dados Completos da Bioimpedância</h3>
              <div className="space-y-4 mb-6">
                {beneficiosBioimpedancia.map((beneficio, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3, ease: easing }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckCircle className="w-4 h-4 text-black" />
                    </motion.div>
                    <span className="text-zinc-300 text-sm leading-relaxed">{beneficio}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {dadosBioimpedancia.map((dado, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: easing }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 rounded-2xl p-4 backdrop-blur-xl border border-zinc-700/50 hover:border-yellow-500/30 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10"
                >
                  {/* Animated background glow */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${dado.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                    whileHover={{ opacity: 0.15 }}
                  />

                  <motion.div
                    className="w-10 h-10 mb-3 bg-gradient-to-r from-zinc-800/70 to-zinc-900/70 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <dado.icon className={`w-5 h-5 ${index % 2 === 0 ? 'text-yellow-400' : 'text-amber-400'} group-hover:text-yellow-300 transition-colors duration-300`} />
                  </motion.div>
                  <motion.h4
                    className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors duration-300"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {dado.titulo}
                  </motion.h4>
                  <motion.p
                    className="text-zinc-400 text-xs group-hover:text-zinc-300 transition-colors duration-300"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {dado.descricao}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Análise 3D */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easing }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 rounded-3xl p-8 lg:p-10 backdrop-blur-xl border border-zinc-700/50 hover:border-yellow-500/30 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10"
            whileHover={{ scale: 1.02 }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(45deg, transparent, rgba(251, 191, 36, 0.1), transparent)`,
                padding: '1px'
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 rounded-3xl" />
            </motion.div>

            <div className="relative z-10 text-center mb-8">
              <motion.div
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Eye className="w-10 h-10 text-black" />
              </motion.div>
              <motion.h3
                className="text-2xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: easing }}
                viewport={{ once: true }}
              >
                Análise Corporal 3D
              </motion.h3>
              <motion.p
                className="text-zinc-300 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: easing }}
                viewport={{ once: true }}
              >
                Para uma experiência ainda mais inovadora, a unidade Flores Diamante conta com a exclusiva
                Análise Corporal 3D da Bodygee. Esta tecnologia representa uma evolução da bioimpedância tradicional, criando um modelo de avatar 3D fotorrealista do seu corpo.
              </motion.p>
              <motion.p
                className="text-zinc-400 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: easing }}
                viewport={{ once: true }}
              >
                Com ela, você pode visualizar seu progresso de forma detalhada e tridimensional por apenas
                <span className="text-yellow-400 font-bold animate-pulse"> {highlightPrice}</span>.
              </motion.p>
            </div>

            <div className="relative z-10 text-center">
              <motion.a
                href={data?.cta3dHref || '#'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: easing }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
              >
                {cta3dLabel}
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Sparkle effect */}
            <motion.div
              className="absolute top-4 right-4 opacity-60"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced CTA Geral */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: easing }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-yellow-500/15 to-amber-500/15 border border-yellow-500/30 rounded-3xl p-8 lg:p-12 backdrop-blur-xl text-center shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500"
          whileHover={{ scale: 1.01 }}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute top-4 left-4 w-8 h-8 bg-yellow-400/20 rounded-full blur-sm"
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-4 right-4 w-6 h-6 bg-amber-400/20 rounded-full blur-sm"
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1, ease: easing }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <TrendingUp className="w-8 h-8 text-black" />
          </motion.div>

          <motion.h3
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: easing }}
            viewport={{ once: true }}
          >
            Monitore seu progresso com <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent animate-pulse">precisão científica</span>
          </motion.h3>
          <motion.p
            className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: easing }}
            viewport={{ once: true }}
          >
            Disponível em diversas unidades Diamante para você acompanhar sua evolução de forma objetiva e personalizada.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease: easing }}
            viewport={{ once: true }}
          >
            <motion.a
              href={bottomPrimary.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
            >
              {bottomPrimary.label}
            </motion.a>
            <motion.a
              href={bottomSecondary.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-zinc-700 text-zinc-300 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-zinc-800/50 backdrop-blur-sm hover:border-yellow-500/30"
            >
              {bottomSecondary.label}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
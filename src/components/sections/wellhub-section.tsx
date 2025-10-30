"use client"

import { motion } from "framer-motion"
import { Award, Gift, Users, Star, ArrowRight, CheckCircle, Calendar, Shield } from "lucide-react"
import Image from "next/image"
import { useWellhubSection } from "../../hooks/use-homepage-sections"

export default function WellhubSection() {
  const { data: sectionData, loading } = useWellhubSection()

  if (loading) {
    return (
      <section className="relative py-20 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-zinc-800 rounded w-96 mx-auto mb-4"></div>
            <div className="h-4 bg-zinc-800 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  const { header, benefits, detailedBenefits, primaryCTA, banner, displaySettings } = sectionData

  if (!displaySettings?.showOnHomepage) {
    return null
  }

  // Icon mapping
  const getIcon = (iconName: string) => {
    const iconMap = {
      Award: Award,
      Gift: Gift,
      Users: Users,
      Star: Star,
      CheckCircle: CheckCircle,
      Calendar: Calendar,
      Shield: Shield
    }
    return iconMap[iconName as keyof typeof iconMap] || CheckCircle
  }

  return (
    <section
      className={`relative py-20 px-6 lg:px-12 overflow-hidden ${displaySettings?.backgroundColor || ''}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 mb-6">
            <span className="text-zinc-400 text-sm font-medium">{header.badge}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {header.title.includes('Wellhub') ? (
              <>
                {header.title.split('Wellhub')[0]}
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Wellhub</span>
                {header.title.split('Wellhub')[1]}
              </>
            ) : (
              header.title
            )}
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            {header.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Benefícios */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-6">
              {benefits.map((beneficio: any, index: number) => {
                const IconComponent = getIcon(beneficio.icon)
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl border border-zinc-700 text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{beneficio.title}</h4>
                    <p className="text-zinc-400 text-sm">{beneficio.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Wellhub Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-zinc-800/50 rounded-3xl p-8 lg:p-10 backdrop-blur-xl border border-zinc-700"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center">
                <Award className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Benefícios Exclusivos</h3>
              <div className="space-y-3 text-left">
                {detailedBenefits.map((beneficio: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-yellow-500" />
                    </div>
                    <span className="text-zinc-300 text-sm leading-relaxed">{beneficio}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              {primaryCTA.url ? (
                <a
                  href={primaryCTA.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-300 transition-colors duration-200 inline-flex items-center gap-3"
                >
                  {primaryCTA.text}
                  <ArrowRight className="w-5 h-5" />
                </a>
              ) : (
                <button className="bg-amber-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-300 transition-colors duration-200 inline-flex items-center gap-3">
                  {primaryCTA.text}
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Banner Wellhub */}
        {displaySettings?.showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-3xl p-8 lg:p-12 backdrop-blur-xl text-center"
          >
            <div className="max-w-3xl mx-auto">
              {banner.image?.asset?.url && (
                <div className="mb-6">
                  <Image
                    src={banner.image.asset.url}
                    alt={banner.image.alt || "Wellhub"}
                    width={200}
                    height={80}
                    className="mx-auto"
                  />
                </div>
              )}
              <h3 className="text-3xl font-bold text-white mb-4">
                {banner.title.includes('Wellhub') ? (
                  <>
                    {banner.title.split('Wellhub')[0]}
                    <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Wellhub</span>
                    {banner.title.split('Wellhub')[1]}
                  </>
                ) : (
                  banner.title
                )}
              </h3>
              <p className="text-zinc-400 text-lg mb-8">
                {banner.description}
              </p>
              {banner.cta?.text && (
                <div className="text-center">
                  {banner.cta.url ? (
                    <a
                      href={banner.cta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-400 text-black px-8 py-3 rounded-full font-bold hover:bg-amber-300 transition-colors duration-200 inline-flex items-center gap-2"
                    >
                      {banner.cta.text}
                    </a>
                  ) : (
                    <button className="bg-amber-400 text-black px-8 py-3 rounded-full font-bold hover:bg-amber-300 transition-colors duration-200 inline-flex items-center gap-2">
                      {banner.cta.text}
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
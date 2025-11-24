"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Download, Zap, Users, BarChart3, Calendar, MessageCircle, CheckCircle } from "lucide-react"
import { useAppPageData } from "@/hooks/use-app-page-data"
import { useAppFeaturesData } from "@/hooks/use-sanity-data"
import { urlFor } from "@/lib/sanity"

const featureIconMap = {
  Zap,
  Users,
  BarChart3,
  Calendar,
  MessageCircle,
  Download,
  CheckCircle
}

const fallbackPageData = {
  hero: {
    title: "App Live Academia",
    highlight: "palma da mão",
    description: "Tenha a academia na palma da sua mão. Baixe o app e transforme sua experiência fitness.",
    subtitle: "Disponível no Google Play e na App Store.",
    downloadBadges: [
      { store: "playstore", label: "Disponível no", subLabel: "Google Play", url: "#" },
      { store: "appstore", label: "Baixar na", subLabel: "App Store", url: "#" }
    ],
    ctaButtons: [
      { text: "Baixar agora", href: "#", variant: "primary" },
      { text: "Conhecer recursos", href: "#video", variant: "secondary" }
    ]
  },
  videoSection: {
    title: "Veja como funciona",
    description: "Assista ao vídeo demonstrativo e conheça todas as funcionalidades do App Live Academia."
  },
  interfaceShowcase: {
    title: "Conheça a interface",
    description: "Uma experiência de usuário intuitiva e moderna para facilitar sua rotina.",
    screenshots: ["/app.jpeg", "/app.jpeg", "/app.jpeg"]
  },
  ctaSection: {
    title: "Baixe agora e transforme sua experiência fitness",
    description: "Junte-se a milhares de alunos que já transformaram sua rotina com o App Live Academia.",
    buttons: [
      { text: "Google Play", href: "#" },
      { text: "App Store", href: "#" }
    ]
  }
}

const fallbackFeatures = [
  { title: "Check-in Facial", description: "Entre na academia sem carteirinha, apenas com reconhecimento facial.", icon: "Zap", color: "from-blue-500 to-blue-600" },
  { title: "Treinos Personalizados", description: "Receba treinos personalizados diretamente no seu celular.", icon: "BarChart3", color: "from-green-500 to-green-600" },
  { title: "Agendamento de Aulas", description: "Reserve sua vaga nas aulas coletivas com antecedência.", icon: "Calendar", color: "from-amber-500 to-yellow-600" },
  { title: "Histórico de Treinos", description: "Acompanhe sua evolução e histórico completo de treinos.", icon: "BarChart3", color: "from-orange-500 to-orange-600" },
  { title: "Avaliações Físicas", description: "Visualize os resultados das suas avaliações físicas.", icon: "Users", color: "from-red-500 to-red-600" },
  { title: "Comunicação com Personal", description: "Chat direto com seu personal trainer para tirar dúvidas.", icon: "MessageCircle", color: "from-pink-500 to-pink-600" }
]

export default function AppPage() {
  const { data: appPageData } = useAppPageData()
  const { data: featuresData } = useAppFeaturesData()

  const hero = appPageData?.hero ?? fallbackPageData.hero
  const downloadBadges = hero.downloadBadges?.length ? hero.downloadBadges : fallbackPageData.hero.downloadBadges
  const heroButtons = hero.ctaButtons?.length ? hero.ctaButtons : fallbackPageData.hero.ctaButtons
  const videoSection = appPageData?.videoSection ?? fallbackPageData.videoSection
  const interfaceSection = appPageData?.interfaceShowcase ?? fallbackPageData.interfaceShowcase
  const ctaSection = appPageData?.ctaSection ?? fallbackPageData.ctaSection

  const features = (featuresData?.filter((feature) => feature.active) ?? fallbackFeatures).map((feature, index) => ({
    title: feature.title,
    description: feature.description,
    icon: feature.icon,
    color: feature.color || fallbackFeatures[index % fallbackFeatures.length].color || "from-blue-500 to-blue-600"
  }))

  const heroImage = hero.image ? urlFor(hero.image).url() : "/images/app.jpeg"
  const screenshots = interfaceSection?.screenshots?.length
    ? interfaceSection.screenshots.map((shot) => (typeof shot === "string" ? shot : urlFor(shot).url()))
    : fallbackPageData.interfaceShowcase.screenshots

  return (
    <main className="min-h-screen bg-live-bg text-live-textPrimary pt-20">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">
            {hero.title?.replace(hero.highlight || "", "").trim()} {" "}
            <span className="text-live-accent">{hero.highlight}</span>
          </h1>
          <p className="text-xl text-live-textSecondary max-w-3xl mx-auto">
            {hero.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-live-border/10 p-8 rounded-2xl border border-live-border/30">
              <h2 className="text-3xl font-bold text-live-textPrimary mb-6">{hero.title}</h2>
              <p className="text-live-textSecondary text-lg mb-8 leading-relaxed">
                {hero.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                {downloadBadges.map((badge, index) => (
                  <a key={`${badge.store}-${index}`} href={badge.url || "#"} className="hover:scale-105 transition-transform">
                    <div className="flex flex-col justify-center rounded-lg border border-live-accent/40 px-6 py-3 bg-black">
                      <span className="text-xs text-live-textSecondary uppercase tracking-wide">{badge.label}</span>
                      <span className="text-lg font-semibold text-white">{badge.subLabel}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex items-center flex-wrap gap-4">
                <div className="bg-live-border/10 p-4 w-24 h-24 rounded-2xl border border-live-border/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-live-accent mb-1">QR</div>
                    <div className="text-xs text-live-textTernary">Escaneie</div>
                  </div>
                </div>
                <div className="text-live-textPrimary">
                  <p className="font-medium">Escaneie o QR Code para</p>
                  <p className="text-sm text-live-textTernary">baixar o aplicativo</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                {heroButtons.map((button, index) => (
                  <a
                    key={`${button.text}-${index}`}
                    href={button.href || "#"}
                    className={`px-6 py-3 rounded-full font-semibold transition ${
                      button.variant === "secondary"
                        ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                        : "bg-live-accent text-black hover:bg-yellow-400"
                    }`}
                  >
                    {button.text}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative floating-element">
              <div className="absolute -inset-8 bg-live-accent/10 rounded-3xl blur-2xl" />
              <div className="relative bg-live-border/10 p-8 rounded-2xl border border-live-border/30">
                <Image
                  src={heroImage}
                  alt="App Live Academia"
                  width={300}
                  height={600}
                  className="rounded-2xl shadow-2xl mx-auto"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
          id="video"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-live-textPrimary mb-4">{videoSection?.title}</h2>
            <p className="text-live-textSecondary text-lg max-w-3xl mx-auto">
              {videoSection?.description}
            </p>
          </div>

          <div className="bg-live-border/10 p-6 rounded-2xl border border-live-border/30">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src={videoSection?.thumbnail ? urlFor(videoSection.thumbnail).url() : "/images/app-video-placeholder.jpg"}
                alt="Vídeo demonstrativo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border-2 border-live-accent"
                >
                  <div className="w-16 h-16 rounded-full bg-live-accent flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-live-bg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-live-textPrimary mb-4">Funcionalidades</h2>
            <p className="text-live-textSecondary text-lg max-w-3xl mx-auto">
              Conheça os recursos exclusivos que tornam o App Live Academia essencial para sua rotina fitness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent =
                featureIconMap[feature.icon as keyof typeof featureIconMap] || Zap
              return (
                <motion.div
                  key={`${feature.title}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-live-border/10 p-6 rounded-2xl border border-live-border/30 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-live-textPrimary mb-2">{feature.title}</h3>
                  <p className="text-live-textSecondary leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-live-textPrimary mb-4">
              {interfaceSection?.title || "Conheça a interface"}
            </h2>
            <p className="text-live-textSecondary text-lg max-w-3xl mx-auto">
              {interfaceSection?.description || "Uma experiência de usuário intuitiva e moderna para facilitar sua jornada fitness."}
            </p>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
            {screenshots?.map((shot, index) => (
              <div key={`${shot}-${index}`} className="min-w-[250px] snap-center">
                <div className="bg-live-border/10 p-4 rounded-2xl border border-live-border/30">
                  <Image
                    src={shot}
                    alt={`Screenshot ${index + 1}`}
                    width={250}
                    height={500}
                    className="rounded-2xl w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-live-border/10 p-12 rounded-3xl border border-live-border/30">
            <h2 className="text-3xl font-bold text-live-textPrimary mb-4">{ctaSection?.title}</h2>
            <p className="text-live-textSecondary text-lg max-w-3xl mx-auto mb-8">
              {ctaSection?.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {(ctaSection?.buttons || fallbackPageData.ctaSection.buttons).map((button, index) => (
                <a
                  key={`${button.text}-${index}`}
                  href={button.href || "#"}
                  className="px-8 py-3 rounded-full bg-live-accent text-black font-semibold hover:bg-yellow-400 transition"
                >
                  {button.text}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

export const dynamic = 'force-dynamic'

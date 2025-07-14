import Image from "next/image"
import { CheckCircle } from "lucide-react"

const funcionalidades = [
  "Check-in facial",
  "Treinos personalizados",
  "Agendamento de aulas",
  "Histórico de treinos",
  "Avaliações físicas",
  "Comunicação com personal",
]

export default function AppSection() {
  return (
    <section className="relative py-20 px-6 lg:px-12 overflow-hidden bg-live-bg" id="app">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-live-textPrimary mb-6">
              App <span className="bg-gradient-to-r from-live-accent to-live-yellowLight bg-clip-text text-transparent">Live Academia</span>
            </h2>
            <p className="text-live-textSecondary text-lg mb-8 leading-relaxed">
              Tenha a academia na palma da sua mão. Acompanhe seus treinos, agende aulas, monitore sua evolução e muito mais com nossa tecnologia de ponta.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {funcionalidades.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-live-accent flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={16} className="text-live-bg" />
                  </div>
                  <span className="text-live-textSecondary font-medium">{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {/* Google Play Store SVG */}
              <a href="#" className="hover:scale-105 transition-transform">
                <svg width="150" height="50" viewBox="0 0 150 50" className="rounded-lg">
                  <rect width="150" height="50" rx="6" fill="#000000" />
                  <rect width="150" height="50" rx="6" fill="none" stroke="#ffd740" strokeWidth="1" />
                  <g transform="translate(8, 8)">
                    <path d="M2 2v24l6-6L2 2z" fill="#ffd740" />
                    <path d="M8 20L16 12L8 4v16z" fill="#ffd740" />
                    <path d="M16 12l6-3.5L16 5v7z" fill="#ffd740" />
                    <path d="M16 12v7l6-3.5L16 12z" fill="#ffd740" />
                  </g>
                  <text x="40" y="16" fill="white" fontSize="8" fontWeight="300">
                    Disponível no
                  </text>
                  <text x="40" y="28" fill="white" fontSize="12" fontWeight="600">
                    Google Play
                  </text>
                </svg>
              </a>
              {/* Apple App Store SVG */}
              <a href="#" className="hover:scale-105 transition-transform">
                <svg width="150" height="50" viewBox="0 0 150 50" className="rounded-lg">
                  <rect width="150" height="50" rx="6" fill="#000000" />
                  <rect width="150" height="50" rx="6" fill="none" stroke="#ffd740" strokeWidth="1" />
                  <g transform="translate(8, 8)">
                    <path
                      d="M16 8c-1.2 0-2.8-1.2-2.8-2.8s1.6-2.8 2.8-2.8 2.8 1.2 2.8 2.8-1.6 2.8-2.8 2.8zm-2.4 16.8c-1.6 0-3.2-1.6-3.2-3.2s1.6-3.2 3.2-3.2h4.8c1.6 0 3.2 1.6 3.2 3.2s-1.6 3.2-3.2 3.2h-4.8z"
                      fill="#ffd740"
                    />
                    <circle cx="16" cy="5.6" r="1.6" fill="#ffd740" />
                  </g>
                  <text x="40" y="16" fill="white" fontSize="8" fontWeight="300">
                    Baixar na
                  </text>
                  <text x="40" y="28" fill="white" fontSize="12" fontWeight="600">
                    App Store
                  </text>
                </svg>
              </a>
            </div>
          </div>
          {/* Mockup do app */}
          <div className="relative flex justify-center">
            <div className="relative floating-element">
              <div className="absolute -inset-8 bg-live-accent/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-live-border/20 p-8 rounded-2xl shadow-xl">
                <Image
                  src="/images/academia-1.webp"
                  alt="App Live Academia"
                  width={250}
                  height={500}
                  className="max-w-full rounded-2xl shadow-xl max-h-[500px] mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
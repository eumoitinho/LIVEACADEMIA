import { Dumbbell, ShieldCheck, Smartphone, Users, CheckCircle, Star } from "lucide-react"

const beneficios = [
  {
    icon: Dumbbell,
    title: "Estrutura Moderna",
    description: "Equipamentos de última geração e ambiente climatizado para seu conforto.",
    color: "from-live-accent to-live-yellowLight",
  },
  {
    icon: ShieldCheck,
    title: "Sem Fidelidade",
    description: "Treine sem contratos longos, sem taxas de cancelamento ou anuidade.",
    color: "from-live-bg to-live-accent",
  },
  {
    icon: Smartphone,
    title: "App Exclusivo",
    description: "Acompanhe treinos, agende aulas e monitore sua evolução pelo app.",
    color: "from-live-accent to-live-bg",
  },
  {
    icon: Users,
    title: "Equipe Qualificada",
    description: "Profissionais prontos para te ajudar a alcançar seus objetivos.",
    color: "from-live-bg to-live-accent",
  },
  {
    icon: CheckCircle,
    title: "Aulas Coletivas",
    description: "Diversas modalidades para você treinar com motivação e diversão.",
    color: "from-live-accent to-live-yellowLight",
  },
  {
    icon: Star,
    title: "Avaliação Excelente",
    description: "Nota média 4.8 nas avaliações dos nossos alunos.",
    color: "from-live-bg to-live-accent",
  },
]

export default function BeneficiosSection() {
  return (
    <section className="relative py-20 px-6 lg:px-12 overflow-hidden bg-live-bg">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-0.5 bg-live-accent"></div>
            <span className="text-live-accent text-sm font-medium">Por que escolher a Live Academia?</span>
            <div className="w-12 h-0.5 bg-live-accent"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-live-textPrimary mb-6 leading-tight">
            Benefícios <span className="bg-gradient-to-r from-live-accent to-live-yellowLight bg-clip-text text-transparent">exclusivos</span>
          </h2>
          <p className="text-xl text-live-textSecondary max-w-3xl mx-auto">
            Tudo o que você precisa para transformar seu corpo e sua vida, com liberdade e tecnologia.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficios.map((beneficio, idx) => (
            <div
              key={idx}
              className="group relative bg-live-border/10 backdrop-blur-md rounded-3xl p-8 border border-live-border/30 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
            >
              <div className="relative mb-6">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${beneficio.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <beneficio.icon className="h-10 w-10 text-live-textPrimary" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-live-textPrimary text-xl group-hover:text-live-accent transition-colors duration-300">
                  {beneficio.title}
                </h3>
                <p className="text-live-textSecondary leading-relaxed">{beneficio.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
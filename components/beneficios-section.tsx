import { Dumbbell, ShieldCheck, Smartphone, Users, CheckCircle, Star, Zap, Snowflake } from "lucide-react"
import Image from "next/image"

const beneficios = [
  {
    icon: ShieldCheck,
    title: "Planos flexíveis",
    description: "Em qualquer plano, você treina sem fidelidade, taxas de cancelamento, manutenção ou anuidade.",
    color: "from-yellow-400 to-amber-500",
    image: "https://drive.google.com/file/d/1ywRiPc4U94rz8KxwYthYSoiaQxBXVTTX/view?usp=sharing",
  },
  {
    icon: Star,
    title: "Espaços exclusivos",
    description: "Desfrute de áreas como Espaço Relax, Espaço Bodybuilding e o maior Studio de Bike Indoor da região Norte com o plano Diamante.",
    color: "from-amber-500 to-yellow-600",
    image: "https://www.icloud.com/sharedalbum/pt-br/#B1e5ON9t3HQdTpy;327E145B-2088-4BFD-95D2-6B18072B1744",
  },
  {
    icon: Users,
    title: "Aulas coletivas",
    description: "Diversifique seu treino com uma grade variada de aulas e aproveite o ambiente coletivo para socializar e manter a disciplina.",
    color: "from-yellow-500 to-amber-600",
    image: "https://elements.envato.com/pt-br/young-women-in-training-clothes-and-shoes-are-doin-SM2AYY5",
  },
  {
    icon: Snowflake,
    title: "Climatização",
    description: "Treine com mais conforto nos ambientes climatizados disponíveis nas unidades Diamante, Premium e Tradicional Climatizada.",
    color: "from-yellow-400 to-amber-500",
    image: "https://drive.google.com/file/d/1E2hF9Une3Jy0_71Iy_fxUDEIFIvJl9zv/view?usp=sharing",
  },
]

export default function BeneficiosSection() {
  return (
    <section className="relative py-20 px-6 lg:px-12 overflow-hidden bg-black">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 mb-6">
            <span className="text-zinc-400 text-sm font-medium">Por que escolher a Live Academia?</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Benefícios <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">exclusivos</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Tudo o que você precisa para transformar seu corpo e sua vida, com liberdade e tecnologia.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {beneficios.map((beneficio, idx) => (
            <div
              key={idx}
              className="group relative bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2 overflow-hidden h-[350px]"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-4">
                  <Image
                    src={beneficio.image}
                    alt={beneficio.title}
                    fill
                    className="object-cover rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                    quality={85}
                  />
                </div>
              </div>
              
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${beneficio.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
              
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${beneficio.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <beneficio.icon className="h-8 w-8 text-black" />
                  </div>
                </div>
                <h3 className="font-bold text-white text-xl mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                  {beneficio.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed flex-grow">
                  {beneficio.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
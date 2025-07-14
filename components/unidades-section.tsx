import UnidadeCard from "./unidade-card"

const unidades = [
  {
    nome: "Live Academia - Centro",
    endereco: "Av. Getúlio Vargas, 1234 - Centro, Manaus/AM",
    imagem: "/images/academia-1.webp",
    badge: { text: "Centro", variant: "orange" as const },
    link: "https://maps.google.com/?q=Live+Academia+Centro",
  },
  {
    nome: "Live Academia - Adrianópolis",
    endereco: "Rua Salvador, 567 - Adrianópolis, Manaus/AM",
    imagem: "/images/academia-2.webp",
    badge: { text: "Adrianópolis", variant: "indigo" as const },
    link: "https://maps.google.com/?q=Live+Academia+Adrianopolis",
  },
  {
    nome: "Live Academia - Cidade Nova",
    endereco: "Av. Noel Nutels, 890 - Cidade Nova, Manaus/AM",
    imagem: "/images/academia-3.webp",
    badge: { text: "Cidade Nova", variant: "pink" as const },
    link: "https://maps.google.com/?q=Live+Academia+Cidade+Nova",
  },
  {
    nome: "Live Academia - Ponta Negra",
    endereco: "Av. Coronel Teixeira, 456 - Ponta Negra, Manaus/AM",
    imagem: "/images/academia-4.webp",
    badge: { text: "Ponta Negra", variant: "orange" as const },
    link: "https://maps.google.com/?q=Live+Academia+Ponta+Negra",
  },
]

export default function UnidadesSection() {
  return (
    <section className="py-20 px-6 lg:px-12 bg-live-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-live-textPrimary mb-6">
            Nossas <span className="text-live-accent">Unidades</span>
          </h2>
          <p className="text-xl text-live-textSecondary">
            Escolha a unidade mais próxima e venha treinar com a gente!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
          {unidades.map((unidade) => (
            <UnidadeCard key={unidade.nome} {...unidade} />
          ))}
        </div>
      </div>
    </section>
  )
} 
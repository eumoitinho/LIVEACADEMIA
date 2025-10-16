import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export const metadata = {
  title: 'Sobre a Live Academia',
}

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white antialiased scroll-smooth overflow-x-hidden font-inter">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pb-24 pt-20">
          {/* Header Section */}
          <section className="pt-10 md:pt-20">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
              <h1 className="text-[60px] md:text-[96px] lg:text-[120px] leading-none font-semibold tracking-tight">
                Sobre
              </h1>
              <div className="max-w-sm">
                <p className="text-sm md:text-base leading-relaxed opacity-80 mb-6">
                  Conheça nossa jornada: consistência, acolhimento e evolução mensurável em cada treino.
                </p>
                <div className="flex items-center space-x-4 text-sm opacity-60">
                  {/* Replace with lucide-react MapPin icon if available */}
                  <span>Manaus, Brasil</span>
                </div>
              </div>
            </div>
            <div className="border-t border-white/20 mt-12 lg:mt-16" />
          </section>

          {/* Main Grid Section */}
          <section className="grid lg:grid-cols-[300px_1fr] gap-12 lg:gap-16 mt-12 lg:mt-20">
            {/* Left Column - Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8">
                  Live<br />Academia
                </h2>
                <p className="text-base leading-relaxed opacity-80 mb-6">
                  Transformamos treino em rotina sustentável e resultado real com um sistema premium acessível.
                </p>
                <div className="flex items-center space-x-2 text-sm opacity-60">
                  {/* Replace with lucide-react calendar icon if available */}
                  <span>Disponible para novas unidades</span>
                </div>
              </div>

              {/* Skills / Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium opacity-90">Destaques</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <span className="block w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-sm opacity-80">Foco em consistência e evolução</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="block w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-sm opacity-80">Mais de 10 anos de experiência</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="block w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-sm opacity-80">Rede de +35 unidades</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="block w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-sm opacity-80">Avaliação média de 4.9 estrelas</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Stats Cards or Image if desired */}
            <div className="space-y-8">
              {/* You can insert a HighlightImage or stats grid here */}
              {/* ...existing code for right column (e.g., <HighlightImage /> or cards) ... */}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
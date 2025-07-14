import { Link } from "lucide-react";

export default function DayUse() {
    return (
      <main className="min-h-screen bg-black text-white pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-center mb-12">DAY USE</h1>
            <p className="text-center text-gray-300 mb-12">Acesso exclusivo para você experimentar a Live Academia.</p>
            <Link href="#" className="block text-center bg-[#ffcb00] text-black px-6 py-3 rounded-lg font-bold max-w-xs mx-auto">
              ADQUIRA SEU ACESSO!
            </Link>
          </div>
        </section>
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Use quando e onde quiser</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Acesso Diamante</h3>
                <p className="text-gray-300">Acesse todas as unidades da rede Live em Manaus.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Serviços completos</h3>
                <p className="text-gray-300">Aproveite toda a estrutura e grade de aulas da Live.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Flexibilidade de horário</h3>
                <p className="text-gray-300">Utilize seu acesso em dias de semana, domingos e feriados.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Bike Indoor</h3>
                <p className="text-gray-300">Acesse o maior Studio de Ciclismo Indoor da Região Norte.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Perguntas frequentes e pacotes */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Perguntas frequentes</h2>
            {/* Lista de FAQs */}
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <h3 className="text-xl font-bold mb-2">Esse serviço é uma assinatura?</h3>
                <p className="text-gray-300">Não! O Day Use da Live Academia é a compra de um acesso individual e intransferível...</p>
              </div>
              {/* Adicione as outras FAQs */}
            </div>
          </div>
        </section>
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">Conquiste seu acesso na melhor academia de Manaus</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-black p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold mb-4">1 acesso - R$ 50,00</h3>
                <p className="text-gray-300 mb-4">Ideal para quem quer experimentar pela primeira vez ou precisa de um treino avulso.</p>
                <Link href="#" className="bg-[#ffcb00] text-black px-6 py-3 rounded-lg font-bold block">
                  COMPRE AGORA
                </Link>
              </div>
              <div className="bg-black p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold mb-4">4 acessos - R$ 200,00</h3>
                <p className="text-gray-300 mb-4">Perfeito para quem busca mais flexibilidade e quer ter opções para treinar ao longo do mês.</p>
                <Link href="#" className="bg-[#ffcb00] text-black px-6 py-3 rounded-lg font-bold block">
                  COMPRE AGORA
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }
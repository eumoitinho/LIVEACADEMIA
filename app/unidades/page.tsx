"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import locations from "@/components/location-carousel" // Importar o array de locations
import { CheckCircle, Link } from "lucide-react"

export default function Unidades() {
  const [filterType, setFilterType] = useState("todos")
  const [filterService, setFilterService] = useState("todos")
  const [filterRegion, setFilterRegion] = useState("todos")

  const filteredLocations = (Array.isArray(locations) ? locations : []).filter((loc: any) => {
    if (filterType !== "todos" && loc.type !== filterType) return false
    if (filterService !== "todos" && !loc.features.includes(filterService)) return false
    if (filterRegion !== "todos" && !loc.address.includes(filterRegion)) return false
    return true
  })


  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-12">Nossas Unidades</h1>
          <p className="text-center text-gray-300 mb-12">Estamos presentes em diversos pontos de Manaus para facilitar seu acesso à atividade física.</p>
          {/* Filtros */}
          <div className="flex gap-4 mb-12 justify-center">
            <select onChange={(e) => setFilterType(e.target.value)} className="bg-gray-900 p-2 rounded">
              <option value="todos">Tipo: Todos</option>
              <option value="tradicional">Tradicional</option>
              <option value="premium">Premium</option>
              <option value="diamante">Diamante</option>
            </select>
            <select onChange={(e) => setFilterService(e.target.value)} className="bg-gray-900 p-2 rounded">
              <option value="todos">Serviço: Todos</option>
              <option value="Climatização">Climatização</option>
              <option value="Espaço Relax">Espaço Relax</option>
              {/* Adicione mais opções baseadas em features */}
            </select>
            <select onChange={(e) => setFilterRegion(e.target.value)} className="bg-gray-900 p-2 rounded">
              <option value="todos">Região: Todos</option>
              <option value="Adrianópolis">Adrianópolis</option>
              {/* Adicione regiões únicas */}
            </select>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {filteredLocations.map((location: any) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-800"
              >
                <h3 className="text-xl font-bold mb-2">{location.name}</h3>
                <p className="text-gray-300 mb-2">{location.address}</p>
                <p className="text-gray-400 mb-4">{location.hours}</p>
                <ul className="space-y-1 mb-4">
                  {location.features.map((feature: string) => (
                    <li key={feature} className="text-gray-300 flex gap-2">
                      <CheckCircle className="h-4 w-4 text-[#ffcb00]" /> {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/planos" className="text-[#ffcb00] font-bold">
                  Compare os planos | MATRICULE-SE AQUI
                </Link>
                {location.tourUrl && (
                  <Link href={location.tourUrl} className="block mt-2 text-[#ffcb00] font-bold">
                    Faça um tour virtual
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
"use client"

import { useEffect, useState } from "react"
import UnidadeCard, { UnidadeCardProps } from "./unidade-card"
import Link from "next/link"

// Função para calcular distância entre dois pontos (Haversine)
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371 // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Exemplo de unidades com coordenadas (adicione todas depois)
const unidades: (UnidadeCardProps & { lat: number; lon: number })[] = [
  {
    nome: "Live Academia - Centro",
    endereco: "Av. Getúlio Vargas, 773, Centro",
    imagem: "/images/academia-1.webp",
    badge: { text: "Centro", variant: "orange" },
    link: "https://maps.google.com/?q=Live+Academia+Centro",
    lat: -3.131633,
    lon: -60.023444,
  },
  {
    nome: "Live Academia - Cachoeirinha",
    endereco: "Av. Ajuricaba, 660, Cachoeirinha",
    imagem: "/images/academia-2.webp",
    badge: { text: "Cachoeirinha", variant: "indigo" },
    link: "https://maps.google.com/?q=Live+Academia+Cachoeirinha",
    lat: -3.110000,
    lon: -60.010000,
  },
  {
    nome: "Live Academia - Cidade Nova",
    endereco: "Av. Noel Nutels, 890, Cidade Nova",
    imagem: "/images/academia-3.webp",
    badge: { text: "Cidade Nova", variant: "pink" },
    link: "https://maps.google.com/?q=Live+Academia+Cidade+Nova",
    lat: -2.990000,
    lon: -59.980000,
  },
  {
    nome: "Live Academia - Ponta Negra",
    endereco: "Rua Raul Pompéia, 37, Ponta Negra",
    imagem: "/images/academia-4.webp",
    badge: { text: "Ponta Negra", variant: "orange" },
    link: "https://maps.google.com/?q=Live+Academia+Ponta+Negra",
    lat: -3.0962455,
    lon: -60.0512277,
  },
]

type UnidadeComDistancia = (UnidadeCardProps & { lat: number; lon: number; distancia?: number })

export default function UnidadesCarousel() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [sortedUnidades, setSortedUnidades] = useState<UnidadeComDistancia[]>(unidades)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    if (userLocation) {
      const unidadesComDistancia = unidades.map((u) => ({
        ...u,
        distancia: getDistanceFromLatLonInKm(userLocation.lat, userLocation.lon, u.lat, u.lon),
      }))
      setSortedUnidades(
        unidadesComDistancia.sort((a, b) => (a.distancia ?? 0) - (b.distancia ?? 0))
      )
    } else {
      setSortedUnidades(unidades)
    }
  }, [userLocation])

  function solicitarLocalizacao() {
    if (!navigator.geolocation) {
      setLocationError("Seu navegador não suporta geolocalização.")
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        setLocationError(null)
      },
      () => setLocationError("Não foi possível obter sua localização."),
      { enableHighAccuracy: true }
    )
  }

  return (
    <section className="py-12 bg-live-bg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <h2 className="text-2xl md:text-3xl font-bold text-live-textPrimary">
            Unidades próximas de você
          </h2>
          <button
            onClick={solicitarLocalizacao}
            className="px-4 py-2 rounded-full bg-live-accent text-live-bg font-semibold shadow hover:bg-live-yellowLight transition"
          >
            {userLocation ? "Atualizar localização" : "Usar minha localização"}
          </button>
        </div>
        {locationError && (
          <div className="text-red-400 mb-4">{locationError}</div>
        )}
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-6 min-w-[340px]">
            {sortedUnidades.slice(0, 5).map((unidade) => (
              <div key={unidade.nome} className="flex-shrink-0 w-[320px]">
                <UnidadeCard {...unidade} />
                {unidade.distancia !== undefined && userLocation && (
                  <div className="text-xs text-live-textTernary mt-2 text-center">
                    {unidade.distancia.toFixed(1)} km de você
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Link
            href="/unidades"
            className="inline-block px-6 py-2 rounded-full bg-live-bg text-live-textPrimary font-semibold shadow hover:bg-live-accent hover:text-live-bg transition border border-live-border"
          >
            Ver todas as unidades
          </Link>
        </div>
      </div>
    </section>
  )
} 
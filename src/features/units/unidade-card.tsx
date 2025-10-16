import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from '@/lib/utils/utils'

export interface UnidadeCardProps {
  nome: string
  endereco: string
  imagem?: string
  badge?: {
    text: string
    variant: "pink" | "indigo" | "orange"
  }
  link: string
}

export default function UnidadeCard({
  nome,
  endereco,
  imagem = "/images/academia-1.webp",
  badge = { text: "Unidade", variant: "orange" },
  link,
}: UnidadeCardProps) {
  return (
    <Link href={link} target="_blank" className="block w-full max-w-[320px] group">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-live-border/10",
          "backdrop-blur-xl",
          "border border-live-border/30",
          "shadow-xs",
          "transition-all duration-300",
          "hover:shadow-md",
          "hover:border-live-border/50"
        )}
      >
        <div className="relative h-[320px] overflow-hidden">
          <Image
            src={imagem}
            alt={nome}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          {/* Degradê de baixo para cima para garantir leitura */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        <div className="absolute top-3 right-3">
          <span
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-medium",
              "bg-live-bg/90 text-live-textPrimary",
              "backdrop-blur-md",
              "shadow-xs",
              "border border-live-border/30"
            )}
          >
            {badge.text}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1.5">
              <h3 className="text-lg font-semibold text-live-textPrimary leading-snug tracking-tighter">
                {nome}
              </h3>
              <p className="text-sm text-live-textSecondary line-clamp-2 tracking-tight">{endereco}</p>
            </div>
            <div
              className={cn(
                "p-2 rounded-full",
                "bg-live-border/20",
                "backdrop-blur-md",
                "group-hover:bg-live-accent/20",
                "transition-colors duration-300 group"
              )}
            >
              <ArrowUpRight className="w-4 h-4 text-live-textPrimary group-hover:-rotate-12 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
} 
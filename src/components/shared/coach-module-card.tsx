"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Bookmark, Clock } from "lucide-react"

export interface CoachModuleCardProps {
  imageUrl: string
  coachName: string
  coachAvatar: string
  quote: string
  moduleTitle: string
  duration: string
  progress?: number // 0 a 1
  onPlay?: () => void
  onBookmark?: (bookmarked: boolean) => void
  className?: string
}

export default function CoachModuleCard({
  imageUrl,
  coachName,
  coachAvatar,
  quote,
  moduleTitle,
  duration,
  progress = 0.5,
  onPlay,
  onBookmark,
  className = ""
}: CoachModuleCardProps) {
  const [bookmarked, setBookmarked] = useState(false)

  const handleBookmark = () => {
    setBookmarked(prev => !prev)
    onBookmark?.(!bookmarked)
  }

  const handlePlay = () => {
    onPlay?.()
  }

  const pct = Math.max(0, Math.min(1, progress))

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 110, damping: 18 }}
      className={`relative overflow-hidden w-80 h-80 sm:h-[28rem] rounded-3xl shadow-[0_2.8px_2.2px_rgba(0,0,0,0.034),_0_6.7px_5.3px_rgba(0,0,0,0.048),_0_12.5px_10px_rgba(0,0,0,0.06),_0_22.3px_17.9px_rgba(0,0,0,0.072),_0_41.8px_33.4px_rgba(0,0,0,0.086),_0_100px_80px_rgba(0,0,0,0.12)] ${className}`}
    >
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={moduleTitle || coachName}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 320px, 400px"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Coach Info + Quote */}
      <div className="absolute top-4 left-4 text-white max-w-[220px]">
        <div className="flex items-center gap-2 mb-2">
          <Image
            src={coachAvatar}
            alt={coachName}
            width={24}
            height={24}
            className="w-6 h-6 rounded-full border-2 border-white object-cover"
          />
          <span className="text-xs font-medium tracking-tight">{coachName}</span>
        </div>
        <p className="text-[11px] leading-4 backdrop-blur-sm rounded-lg p-2 bg-black/25">
          “{quote}”
        </p>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={handlePlay}
          aria-label="Reproduzir"
          className="backdrop-blur-sm rounded-full p-2 transition-colors bg-white/20 hover:bg-white/30 text-white"
        >
          <Play className="w-4 h-4" strokeWidth={1.7} />
        </button>
        <button
          onClick={handleBookmark}
          aria-label={bookmarked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className={`backdrop-blur-sm rounded-full p-2 transition-colors ${bookmarked ? 'bg-yellow-400 text-black' : 'bg-white/20 hover:bg-white/30 text-white'}`}
        >
          <Bookmark className="w-4 h-4" strokeWidth={1.7} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Bottom Module Info */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="backdrop-blur-sm rounded-lg p-3 bg-white/10">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-white">
            <span className="font-medium tracking-tight line-clamp-1 pr-2">
              {moduleTitle}
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Clock className="w-3 h-3" strokeWidth={1.7} />
              {duration}
            </span>
          </div>
          <div className="mt-2 rounded-full h-1 bg-white/20 overflow-hidden">
            <div
              className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-[width] duration-500"
              style={{ width: `${pct * 100}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

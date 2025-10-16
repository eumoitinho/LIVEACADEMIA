"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface BackgroundSlideshowProps {
  images?: string[]
  intervalMs?: number
  fadeDurationMs?: number
  className?: string
  overlay?: boolean
}

const DEFAULT_IMAGES = [
  "/images/woman.jpeg",
  "/images/work.jpeg",
  "/images/heronovo.jpeg",
  "/images/academia-1.webp",
]

export default function BackgroundSlideshow({
  images = DEFAULT_IMAGES,
  intervalMs = 8000,
  fadeDurationMs = 1400,
  className = "",
  overlay = true,
}: BackgroundSlideshowProps) {
  const [index, setIndex] = useState(0)
  const [reduced, setReduced] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reduced || images.length <= 1) return
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndex(i => (i + 1) % images.length)
    }, intervalMs)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [reduced, images, intervalMs])

  return (
    <div className={`pointer-events-none fixed inset-0 -z-20 overflow-hidden ${className}`} aria-hidden>
      {images.map((src, i) => (
        <motion.div
          key={src}
          initial={false}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: fadeDurationMs / 1000, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt="background"
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center select-none pointer-events-none opacity-70"
          />
        </motion.div>
      ))}
      {overlay && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.35),rgba(0,0,0,0.85))]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.85))]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.65),rgba(0,0,0,0.15),rgba(0,0,0,0.65))]" />
          <div className="absolute inset-0 mix-blend-overlay opacity-25 bg-[radial-gradient(circle_at_30%_20%,rgba(255,203,0,0.22),transparent_70%)]" />
        </>
      )}
    </div>
  )
}

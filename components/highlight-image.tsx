import Image from 'next/image'

export default function HighlightImage() {
  return (
    <div className="relative h-[360px] sm:h-[440px] lg:h-[500px] w-full overflow-hidden rounded-3xl ring-1 ring-white/10 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black">
      <Image
        src="/hero.jpg"
        alt="Frente da Live Academia"
        fill
        className="object-cover object-center opacity-[0.9]"
        sizes="(min-width:1024px) 40vw, 90vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.7),rgba(0,0,0,0.15))]" />
      <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[radial-gradient(circle_at_70%_30%,rgba(255,203,0,0.4),transparent_60%)]" />
    </div>
  )
}

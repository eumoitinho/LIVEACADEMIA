import Image from "next/image"

export default function LiveLogo({ className = "h-10 w-auto" }) {
  return (
    <Image
      src="/images/logo-live-premium.svg"
      alt="Live Academia"
      width={154}
      height={53}
      className={className}
      priority
    />
  )
}
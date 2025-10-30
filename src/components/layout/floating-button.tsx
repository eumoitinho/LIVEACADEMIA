"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Phone, Instagram, Mail } from "lucide-react"
import { useFloatingButtons } from "../../hooks/use-global-settings"

export default function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { buttons: sanityButtons, loading } = useFloatingButtons()

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
      if (window.scrollY <= 300) setIsOpen(false)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleOpen = () => setIsOpen(!isOpen)

  // Icon mapping
  const getIcon = (iconName: string) => {
    const iconMap = {
      Phone: <Phone className="h-5 w-5" />,
      MessageCircle: <MessageCircle className="h-5 w-5" />,
      Instagram: <Instagram className="h-5 w-5" />,
      Mail: <Mail className="h-5 w-5" />
    }
    return iconMap[iconName as keyof typeof iconMap] || <MessageCircle className="h-5 w-5" />
  }

  // Color mapping based on type
  const getButtonColor = (type: string) => {
    const colorMap = {
      phone: "bg-green-600 hover:bg-green-500",
      whatsapp: "bg-green-600 hover:bg-green-500",
      instagram: "bg-live-accent hover:bg-live-yellowLight text-live-bg",
      email: "bg-blue-600 hover:bg-blue-500"
    }
    return colorMap[type as keyof typeof colorMap] || "bg-gray-600 hover:bg-gray-500"
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col items-end space-y-2 mb-4"
              >
                {!loading && sanityButtons.map((button: any, index: number) => (
                  <motion.a
                    key={index}
                    href={button.url}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-live-bg font-medium ${getButtonColor(button.type)}`}
                  >
                    {button.label} {getIcon(button.icon)}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={toggleOpen}
            className="w-14 h-14 rounded-full bg-live-accent text-live-bg flex items-center justify-center shadow-lg hover:shadow-xl transition hover:bg-live-yellowLight"
          >
            {isOpen ? <X className="h-6 w-6" /> : '+'}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
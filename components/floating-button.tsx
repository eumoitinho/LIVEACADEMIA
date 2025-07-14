"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Phone, Instagram } from "lucide-react"

export default function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
      if (window.scrollY <= 300) setIsOpen(false)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleOpen = () => setIsOpen(!isOpen)

  const buttons = [
    { icon: <Phone className="h-5 w-5" />, label: "Ligar", color: "bg-green-600 hover:bg-green-500", link: "tel:+559233456789" },
    { icon: <MessageCircle className="h-5 w-5" />, label: "WhatsApp", color: "bg-green-600 hover:bg-green-500", link: "https://wa.me/5592999999999" },
    { icon: <Instagram className="h-5 w-5" />, label: "Instagram", color: "bg-[#ffcb00] hover:bg-[#ffd740] text-black", link: "https://instagram.com/liveacademiamanaus" },
  ]

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
                {buttons.map((button, index) => (
                  <motion.a
                    key={index}
                    href={button.link}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium ${button.color}`}
                  >
                    {button.label} {button.icon}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={toggleOpen}
            className="w-14 h-14 rounded-full bg-[#ffcb00] text-black flex items-center justify-center shadow-lg hover:shadow-xl transition"
          >
            {isOpen ? <X className="h-6 w-6" /> : '+'}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
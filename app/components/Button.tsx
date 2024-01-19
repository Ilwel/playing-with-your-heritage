'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { type ButtonHTMLAttributes } from 'react'

interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  delay?: number
  href?: string
}

export default function Button({
  children,
  delay = 0.25,
  href,
}: ButtonInterface) {
  const router = useRouter()

  const handleHref = () => {
    if (href != null) router.push(href)
  }

  return (
    <AnimatePresence>
      <motion.button
        onClick={href != null ? handleHref : () => {}}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay, duration: 0.2 }}
      >
        {children}
      </motion.button>
    </AnimatePresence>
  )
}

import { motion } from 'framer-motion'
import { type HTMLAttributes } from 'react'

interface DownAnimInterface extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  delay?: number
}

export default function DownAnim({
  children,
  delay = 0.5,
  className,
}: DownAnimInterface) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { type HTMLAttributes } from 'react'

interface RightAnimInterface extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  delay?: number
}

export default function RightAnim({
  children,
  delay = 0.5,
  className,
  onClick,
}: RightAnimInterface) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

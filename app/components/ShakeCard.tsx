import { motion } from 'framer-motion'

interface ShakeCardInterface {
  children: React.ReactNode
  trigger: boolean
}

const variants = {
  error: {
    x: [20, 0, -20, 0, -20, 0, 20, 0],
    y: [-20, 0, 20, 0, -20, 0, 20, 0],
  },
  init: {
    x: 0,
    y: 0,
  },
}

export default function ShakeCard({ children, trigger }: ShakeCardInterface) {
  return (
    <motion.div
      animate={trigger ? 'error' : 'init'}
      transition={{
        duration: 0.1,
      }}
      variants={variants}
      className={`card flex flex-col gap-6 ${trigger ? 'border-red-500 text-red-500' : ''}`}
    >
      {children}
    </motion.div>
  )
}

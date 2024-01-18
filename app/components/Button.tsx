"use client"
import { AnimatePresence, motion } from "framer-motion";

interface ButtonInterface{
  children: React.ReactNode
  delay?: number 
}

export default function Button({ children, delay=0.25 }: ButtonInterface){
  return(
    <AnimatePresence>
      <motion.button
        initial={{opacity: 0, y: 15}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0}}
        transition={{delay, duration: .2}}
      >
        {children}
      </motion.button>
    </AnimatePresence>
  )
}
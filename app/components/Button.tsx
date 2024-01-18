"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ButtonInterface{
  children: React.ReactNode
  delay?: number 
  href?: string
}

export default function Button({ children, delay=0.25, href }: ButtonInterface){

  const { push } = useRouter()

  const handleHref = () => {
    if(href) push(href)
  }

  return(
    <AnimatePresence>
      <motion.button
        onClick={href ? handleHref : () => {}}
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
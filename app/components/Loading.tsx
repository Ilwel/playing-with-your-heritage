'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppSelector } from '../utils/redux/store'

export default function Loading() {
  const open = useAppSelector((state) => state.loadingReducer.value.open)
  return open ? (
    <div className="flex items-center justify-center absolute w-full h-full  backdrop-blur-sm z-10">
      <div className="grid grid-cols-3 grid-rows-3">
        <AnimatePresence>
          <motion.div
            key={1}
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              delay: 0,
              duration: 1,
              repeat: Infinity,
            }}
            className="h-10 w-10 bg-black"
          />
          <motion.div
            key={2}
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              delay: 0.1,
              duration: 1,
              repeat: Infinity,
            }}
            className="h-10 w-10 bg-black"
          />
          <motion.div
            key={3}
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              delay: 0.4,
              duration: 1,
              repeat: Infinity,
            }}
            className="h-10 w-10 bg-black"
          />
          <motion.div
            key={4}
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              delay: 0.6,
              duration: 1,
              repeat: Infinity,
            }}
            className="h-10 w-10 bg-black"
          />
          <motion.div
            key={5}
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              delay: 0.8,
              duration: 1,
              repeat: Infinity,
            }}
            className="h-10 w-10 bg-black"
          />
          <motion.div
            key={6}
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              delay: 1,
              duration: 1,
              repeat: Infinity,
            }}
            className="h-10 w-10 bg-black"
          />
          <motion.div
            key={7}
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              delay: 1.2,
              duration: 1,
              repeat: Infinity,
            }}
            className="h-10 w-10 bg-black"
          />
          <motion.div
            key={8}
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              delay: 1.4,
              duration: 1,
              repeat: Infinity,
            }}
            className="h-10 w-10 bg-black"
          />
          <motion.div
            key={9}
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              delay: 1.6,
              duration: 1,
              repeat: Infinity,
            }}
            className="h-10 w-10 bg-black"
          />
        </AnimatePresence>
      </div>
    </div>
  ) : (
    <></>
  )
}

import { AnimatePresence, motion } from 'framer-motion'

export default function MiniLoading() {
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-[90px] h-[90px] mt-4">
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
          className="h-[30px] w-[30px] bg-black"
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
          className="h-[30px] w-[30px] bg-black"
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
          className="h-[30px] w-[30px] bg-black"
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
          className="h-[30px] w-[30px] bg-black"
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
          className="h-[30px] w-[30px] bg-black"
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
          className="h-[30px] w-[30px] bg-black"
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
          className="h-[30px] w-[30px] bg-black"
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
          className="h-[30px] w-[30px] bg-black"
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
          className="h-[30px] w-[30px] bg-black"
        />
      </AnimatePresence>
    </div>
  )
}

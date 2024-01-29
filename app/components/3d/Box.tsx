import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion-3d'
import { useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Box({ color = '#ef4444', ...rest }: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion
  const meshRef = useRef<any>(null!)
  // useFrame((_, delta) => (meshRef.current.rotation.x += delta))
  return (
    <AnimatePresence>
      <motion.mesh
        {...rest}
        ref={meshRef}
        animate={{
          rotateY: [0, 1, 2, 3, 4, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={color} />
      </motion.mesh>
    </AnimatePresence>
  )
}

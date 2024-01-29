import { useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Pawn({ color = '#fb7185', ...rest }: any) {
  const { nodes } = useGLTF('/models/pawn/scene.gltf')
  return (
    <group {...rest} dispose={null}>
      <motion.mesh
        geometry={nodes.Object_4.geometry}
        position={[2, -0.5, 3]}
        animate={{
          rotateY: [0, 1, 2, 3, 4, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <meshStandardMaterial color={color} />
      </motion.mesh>
    </group>
  )
}

useGLTF.preload('/scene.gltf')

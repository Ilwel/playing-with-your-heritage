'use client'
import { Box } from '@/app/components/3d/Box'
import { Canvas } from '@react-three/fiber'

export default function Game() {
  return (
    <Canvas camera={{ position: [4, -4, 4] }}>
      <ambientLight intensity={Math.PI} />
      <spotLight
        position={[3, 3, 3]}
        angle={-5}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-50, -50, -50]} decay={0} intensity={Math.PI} />
      <Box position={[0, 0, 0]} />
    </Canvas>
  )
}

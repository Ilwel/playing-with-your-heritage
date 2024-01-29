import { Canvas } from '@react-three/fiber'

interface ExpositorInterface {
  children: React.ReactNode
}

export default function Expositor({ children }: ExpositorInterface) {
  return (
    <Canvas camera={{ position: [4, 2, 6] }}>
      <ambientLight intensity={Math.PI} />
      <spotLight
        position={[3, 3, 3]}
        angle={-5}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-50, -50, -50]} decay={0} intensity={Math.PI} />
      {children}
    </Canvas>
  )
}

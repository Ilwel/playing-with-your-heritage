'use client'
import { Box } from '@/app/components/3d/Box'
import { Html } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useGame } from '@/app/utils/hooks/useGame'
import Hud from './components/Hud'
import { useSession } from '@/app/utils/hooks/useSession'
import { ReduxProvider } from '@/app/utils/redux/provider'

export default function Game() {
  const { game } = useGame()
  const { username } = useSession()

  return (
    <Canvas camera={{ position: [4, -4, 4] }}>
     
      <Html
        fullscreen
      > 
       <ReduxProvider>
       <Hud game={game} username={username} />
        </ReduxProvider>
        
      </Html>
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

'use client'
import { Box } from '@/app/components/3d/Box'
import { Canvas } from '@react-three/fiber'
import Hud from './components/Hud'
import { useState } from 'react'
export default function Game() {

  const [color, setColor] = useState('red')

  return (
    <div>
      <div className='relative w-screen h-screen'>
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
          <Box
            onClick={() => {
            
              setColor('blue')
              
            }}
            color={color}
          position={[0, 0, 0]} />
        </Canvas>
        <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
          <Hud/>
        </div>
      </div>
    </div>
  )
}

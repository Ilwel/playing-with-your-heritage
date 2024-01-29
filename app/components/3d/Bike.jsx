import { useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Bike({ color = '#fb7185', ...rest }) {
  const { nodes, materials } = useGLTF('/models/bike/scene.gltf')
  return (
    <group {...rest} dispose={null}>
      <motion.group
        rotation={[-1.5, 0, 0]}
        position={[0.5, -1, 0]}
        scale={0.02}
        animate={{
          rotateZ: [0, 6.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, 100, 0]}>
            <group
              position={[-4.909, -57.779, -6.639]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={1.077}
            >
              <mesh
                geometry={nodes.Pedals_Grey_Metal_0.geometry}
                material={materials.Grey_Metal}
              />
              <mesh
                geometry={nodes.Pedals_BlackRubber_0.geometry}
                material={materials.BlackRubber}
              />
            </group>
            <group
              position={[0.335, -53.821, -76.473]}
              rotation={[-Math.PI, 0, -Math.PI]}
            >
              <mesh
                geometry={nodes.Wheel_back_Grey_Metal_0.geometry}
                material={materials.Grey_Metal}
              />
              <mesh
                geometry={nodes.Wheel_back_BlackRubber_0.geometry}
                material={materials.BlackRubber}
              />
            </group>
            <group
              position={[0.069, 31.872, 35.121]}
              rotation={[-Math.PI, 0, -Math.PI]}
            >
              <mesh
                geometry={nodes.Stuur_Red_Metal_0.geometry}
                material={materials.Red_Metal}
              >
                <meshStandardMaterial color={color} />
              </mesh>
              <mesh
                geometry={nodes.Stuur_BrownLeather_0.geometry}
                material={materials.BrownLeather}
              >
                <meshStandardMaterial color={color} />
              </mesh>
            </group>
            <group position={[-0.335, -53.821, 75.895]}>
              <mesh
                geometry={nodes.Wheel_front_Grey_Metal_0.geometry}
                material={materials.Grey_Metal}
              />
              <mesh
                geometry={nodes.Wheel_front_BlackRubber_0.geometry}
                material={materials.BlackRubber}
              />
            </group>
            <mesh
              geometry={nodes.Frame_Red_Metal_0.geometry}
              material={materials.Red_Metal}
            >
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh
              geometry={nodes.Frame_Basket_0.geometry}
              material={materials.Basket}
            >
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh
              geometry={nodes.Frame_BrownLeather_0.geometry}
              material={materials.BrownLeather}
            />
            <mesh
              geometry={nodes.Frame_Grey_Metal_0.geometry}
              material={materials.Grey_Metal}
            />
          </group>
        </group>
      </motion.group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')

import RightAnim from '@/app/components/RightAnim'
import { PlusSquare, Settings } from 'lucide-react'

export default function MainMenu() {
  return (
    <div>
      <h1>Main Menu</h1>
      <div className="mt-4 flex flex-col gap-4">
        <RightAnim
          delay={1}
          className="button w-52 flex justify-between cursor-pointer"
        >
          Start A Board
          <PlusSquare />
        </RightAnim>
        <RightAnim
          delay={1.5}
          className="button w-52 flex justify-between cursor-pointer"
        >
          Settings
          <Settings />
        </RightAnim>
      </div>
    </div>
  )
}

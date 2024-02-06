import Button from '@/app/components/Button'
import DownAnim from '@/app/components/DownAnim'
import { useGame } from '@/app/utils/hooks/useGame'

export default function Chat() {
  const { handleChat } = useGame()

  return (
    <DownAnim className="absolute top-0 right-0">
      <div>
        <Button
          onClick={() => {
            handleChat({
              msg: 'hello world',
              username: 'ilwel',
              createdAt: new Date().toString(),
            })
          }}
        >
          Enviar
        </Button>
      </div>
    </DownAnim>
  )
}

import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useGame } from '@/app/utils/hooks/useGame'
import { useSession } from '@/app/utils/hooks/useSession'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircleMore, XOctagon } from 'lucide-react'
import { type KeyboardEvent, useState, useRef, useEffect } from 'react'

export default function Chat() {
  const { username } = useSession()
  const { handleChat, game } = useGame()
  const [open, setOpen] = useState(true)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    const input = document.getElementById('msg-input') as HTMLInputElement
    if (input.value !== '') {
      handleChat({
        msg: input.value,
        username,
        createdAt: new Date().toLocaleTimeString(),
      })
      input.value = ''
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [game.chat])

  const scrollToBottom = () => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (sentinelRef.current) {
      sentinelRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            onKeyDown={(e) => {
              handleKeyDown(e)
            }}
            animate={{ x: [100, 0], opacity: [0, 1] }}
            exit={{ x: [0, 320], opacity: [1, 0] }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 right-0"
          >
            <div className="p-3 flex flex-col gap-4">
              <div className="flex items-center justify-between w-full">
                <p>Chat:</p>
                <div
                  onClick={() => {
                    setOpen(false)
                  }}
                  className="border border-black p-2 cursor-pointer"
                >
                  <XOctagon />
                </div>
              </div>
              <div className="flex flex-col p-3 border border-black h-[300px] min-w-[400px] max-w-[400px] overflow-y-scroll">
                {game.chat.map((msg, index) => (
                  <div
                    className="flex gap-1 text-sm"
                    key={`${msg.msg}-${msg.createdAt}-${msg.username}`}
                  >
                    <p className="font-bold">{msg.createdAt}</p>
                    <p>{msg.username}:</p>
                    <p>{msg.msg}</p>
                  </div>
                ))}
                <div
                  style={{ float: 'left', clear: 'both' }}
                  ref={sentinelRef}
                />
              </div>
              <div className="flex gap-1 w-full">
                <Input
                  id="msg-input"
                  className="w-full"
                  label="Send A Message"
                />
                <Button
                  delay={0.3}
                  className="mt-4"
                  onClick={handleSendMessage}
                >
                  Enviar
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!open && (
          <motion.div
            animate={{ opacity: [0, 1], scale: [0, 1] }}
            transition={{ delay: 0.7 }}
            onClick={() => {
              setOpen(true)
            }}
            className="absolute top-0 right-0 border border-black p-2 cursor-pointer m-3"
          >
            <MessageCircleMore />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

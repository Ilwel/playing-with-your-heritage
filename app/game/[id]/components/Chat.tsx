import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useGame } from '@/app/utils/hooks/useGame'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircleMore, XOctagon } from 'lucide-react'
import { useState } from 'react'

export default function Chat() {
  const { handleChat } = useGame()
  const [open, setOpen] = useState(true)

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
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
              <div className="card"></div>
              <div className="flex gap-1">
                <Input label="Send A Message" />
                <Button
                  delay={0.3}
                  className="mt-4"
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

'use client'
import Button from '@/app/components/Button'
import { useGame } from '@/app/utils/hooks/useGame'
import { useSession } from '@/app/utils/hooks/useSession'
import { Dice6, Coins } from 'lucide-react'
import { useState } from 'react'
import Chat from './Chat'

export default function Hud() {
  const { game, handleOut, handleUpdate } = useGame()
  const { username } = useSession()
  const { players, turnPlayer } = game
  const currentPlayer = players[turnPlayer]
  const [rollingDice, setRollingDice] = useState(false)

  const handleRollDice = () => {
    if (!rollingDice) {
      setRollingDice(true)
      const rollDice = Math.floor(Math.random() * 6) + 1
      const updatedPlayers = players.map((player, index) =>
        index === turnPlayer
          ? { ...player, money: player.money + rollDice }
          : player
      )

      handleUpdate({
        ...game,
        players: updatedPlayers,
        turnPlayer: (turnPlayer + 1) % players.length,
      })

      setTimeout(() => {
        setRollingDice(false)
      }, 1000)
    }
  }

  return (
    <div className="p-2 m-2 rounded-lg pointer-events-auto">
      <div>gameStatus::{game?.status}</div>
      {game.players.map((player, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <div className="border-2 p-2 m-2 rounded-lg ">
            <div className="flex space-x-2">
              <span>{player.user.username}</span>
              {player.user.username === username && (
                <span className="font-bold text-green-300">( you )</span>
              )}
            </div>
            <div className="flex space-x-2">
              <Coins />
              <span className="font-bold">{player.money}</span>
            </div>
          </div>
        </div>
      ))}
      {currentPlayer?.user.username === username && !rollingDice && (
        <div className="absolute bottom-0 right-0 m-4">
          <Button
            disabled={rollingDice}
            className="font-bold py-2 px-4 rounded"
            onClick={handleRollDice}
          >
            <Dice6 />
          </Button>
        </div>
      )}
      <Chat />
      <Button onClick={handleOut}>Out</Button>
    </div>
  )
}

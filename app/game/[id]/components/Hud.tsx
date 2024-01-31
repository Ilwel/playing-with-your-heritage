'use client'
import { setGame, type GameState } from "@/app/utils/redux/features/gameSlice";
import { type AppDispatch } from "@/app/utils/redux/store";
import { Dice6 } from "lucide-react";
import { useDispatch } from "react-redux";

export default function Hud (props : {game : GameState, username : string}) {
  
  const dispatch = useDispatch<AppDispatch>()


  return (

    <main>
      <div className="absolute top-0 left-0">
        {props.game?.players.map((player, index) => (
          <div key={player.user.id} className="flex flex-col gap-2">
            <div className="flex gap-2 border-2 rounded-lg m-2 p-2">
              <span className="font-bold">{player.user.username}</span>
              <span className="font-bold">{player.money}</span>
              {player.user.username === props.username && <span className="font-bold text-green-300">( you )</span>}
            </div>
          </div>
        ))}
      </div>
      {props.game?.players[props.game?.turnPlayer]?.user.username === props.username && (
        <div className="absolute bottom-0 right-0 ">
          <button
            className="m-2 p-2 rounded-lg"
            onClick={() => {
              const rolldice = Math.floor(Math.random() * 6) + 1
              const actualPlayer = props.game.turnPlayer
              const players = props.game.players.map(player => ({...player}))
              players[actualPlayer].money += rolldice

              dispatch(setGame({
                ...props.game,
                players,
                turnPlayer: ((actualPlayer + 1)% (props.game.players.length))
              }))
              
            }}
          >
            <Dice6 />
          </button>

        </div>
        
      )}
    </main>
  )
}
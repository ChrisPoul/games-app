import { useEffect, useState } from "react"
import Overlay from "../../components/Overlay"

export default function GameOverScreenComponent(gameIsOver: boolean, gameScore: number) {
  function tryAgain() { location.reload() }

  return (
    <div>
      <Overlay isOpen={gameIsOver}>
        <div className="lg:h-[50%] xs:h-[70%] lg:w-[50%] xs:w-[80%] bg-white rounded-2xl m-auto lg:pt-16 xs:pt-16 relative text-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Game Over
          </h1>
          <h2>{gameScore}</h2>
          <div className="flex-col space-y-4 p-6">
            <button className="bg-blue-400 p-4 rounded block m-auto w-28" onClick={tryAgain}>
              Try Again?
            </button>
          </div>
          <button className="bg-red-600 p-4 rounded block m-auto w-28">
            Exit
          </button>
        </div>
      </Overlay>
    </div>
  )
  return (
    <div>

    </div>
  )
}
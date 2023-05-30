import GameMenuComponent from "@/app/components/GameMenu"

export default function GameOverScreenComponent(gameIsOver: boolean, gameScore: number) {
  function tryAgain() { location.reload() }

  return (
    <GameMenuComponent isOpen={gameIsOver}>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Game Over
      </h1>
      <h2>Score: {gameScore}</h2>
      <button className="bg-blue-400 p-4 rounded block m-auto w-28" onClick={tryAgain}>
        Try Again?
      </button>
    </GameMenuComponent>
  )
}
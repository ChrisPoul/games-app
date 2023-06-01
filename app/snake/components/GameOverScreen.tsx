import GameMenu from "@/app/components/GameMenu"

export default function GameOverScreenComponent(gameIsOver: boolean, gameScore: number) {
  function tryAgain() { location.reload() }

  return (
    <GameMenu isOpen={gameIsOver} title="Game Over">
      <h2>Score: {gameScore}</h2>
      <button className="bg-blue-400 p-4 rounded block m-auto w-28" onClick={tryAgain}>
        Try Again?
      </button>
    </GameMenu>
  )
}
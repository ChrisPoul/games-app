export default function GameOverScreenComponent(gameOverScreenStatus: string) {
  let display = "hidden"
  if (gameOverScreenStatus == "game-over") { display = "flex" }
  return (
    <div className={`
      ${display}
      items-center 
      w-full h-screen
      top-0 left-0 fixed 
      bg-black bg-opacity-70 
      `}
    >
      <div className="h-[50%] w-[50%] bg-white rounded m-auto relative">
        Game Over
      </div>
    </div>
  )
}
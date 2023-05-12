export default function GameOverScreenComponent(gameIsOver: boolean, gameScore: number) {
  let display = "hidden"
  if (gameIsOver) { display = "flex" }

  function handleTryAgain() {
    location.reload()
  }
  function handleExit() {
    display = "hidden"
  }

  return (
    <div>
      <div className={`
      ${display}
      items-center 
      w-full h-screen
      top-0 left-0 fixed 
      bg-black bg-opacity-70 
      `}
      >
        <div className="h-[50%] w-[50%] bg-white rounded m-auto p-16 relative text-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Game Over
          </h1>
          <h2>{gameScore}</h2>
          <div className="flex-col space-y-4 p-6">
            <button className="bg-blue-400 p-4 rounded block m-auto w-28" onClick={handleTryAgain}>
              Try Again?
            </button>
          </div>
          <button
            className="bg-red-600 p-4 rounded block m-auto w-28"
            onClick={handleExit}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  )
  return (
    <div>

    </div>
  )
}
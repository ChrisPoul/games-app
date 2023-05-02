export default function GameOverScreenComponent(gameScore: number) {

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Game Over
      </h1>
      <h2>{gameScore}</h2>
      <div className="flex-col space-y-4 p-6">
        <button className="bg-blue-400 p-4 rounded block m-auto w-28" onClick={location.reload}>
          Try Again?
        </button>
        <button className="bg-red-600 p-4 rounded block m-auto w-28">
          Exit
        </button>
      </div>
    </div>
  )
}
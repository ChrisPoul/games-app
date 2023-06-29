import Link from 'next/link'

interface Game {
  route: string
  title: string
  description: string
}

const games: Game[] = [
  {
    route: "/snake",
    title: "Snake",
    description: "Un juego de snake"
  },
  {
    route: "/movie-generator",
    title: "Movie Generator",
    description: `
    Generador de peliculas al azar, 
    puedes configurar el genero y el
    año de las peliculas.
    `
  }
]

export default function Home() {

  return (
    <main className=' dark:bg-black h-screen w-screen text-center absolute'>
      <h1 className=' text-8xl m-16'>Games App</h1>
      <div className='grid grid-cols-2 gap-4 m-auto w-[70vw]'>
        {games.map((game) => (
          <Link className='border' href={game.route}>
            <h2>
              {game.title} <span>-&gt;</span>
            </h2>
            <p>{game.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}

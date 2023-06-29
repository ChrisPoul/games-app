import Image from 'next/image'
import Link from 'next/link'

interface Game {
  route: string
  title: string
  image: string
}

const games: Game[] = [
  {
    route: "/snake",
    title: "Snake",
    image: "/snake-thumbnail.png"
  },
  {
    route: "/movie-generator",
    title: "Movie Generator",
    image: "/movie-generator-thumbnail.png"
  },
  {
    route: "#",
    title: "Tetris",
    image: "/No-Image-Placeholder.svg.png"
  }
]

export default function Home() {

  return (
    <main className='dark:bg-black min-h-screen w-screen text-center absolute'>
      <h1 className='text-7xl m-16'>Games App</h1>
      <div className='grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 2xs:grid-cols-1 gap-4 m-6 2xs:m-8'>
        {games.map((game) => (
          <Link className='flex flex-col border rounded-xl p-4 aspect-square'
            href={game.route}
            key={game.title}
          >
            <h2 className='text-xl font-bold text-center w-full mb-3'>
              {game.title}
            </h2>
            <div className='relative grow text-center'>
              <Image className='object-contain'
                src={game.image}
                alt={game.title}
                fill
                sizes='(max-width: 760px) 35vw, 25vw'
              />
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

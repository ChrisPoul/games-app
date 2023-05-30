import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <Image
          className="m-auto mt-9 animate-bounce"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <Link
          href="/snake"
          className={styles.card + " animate-pulse"}
        >
          <h2 className={inter.className}>
            Snake <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Un juego de snake
          </p>
        </Link>

        <Link
          href="/tetris"
          className={styles.card}
        >
          <h2 className={inter.className}>
            Tetris <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Un juego de tetris
          </p>
        </Link>

        <Link
          href="/movie-generator"
          className={styles.card + " animate-pulse"}
        >
          <h2 className={inter.className}>
            Movie Generator <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Un generador de peliculas al azar
          </p>
        </Link>
      </div>
    </main>
  )
}

"use client"
import { useEffect, useRef, useState } from "react";
import { getRandomInt } from "../common";
import { getMoviesRequest } from "./requests";
import Image from "next/image";

export default function Page() {
  const movies = useRef<Movie[]>([])
  const [movie, setMovie] = useState<Movie>({
    titleText: { text: "" },
    primaryImage: { width: 490, height: 750, url: "/default_image.png" },
    releaseDate: { day: 0, month: 0, year: 0 }
  })

  useEffect(() => {
    getMoviesRequest().then((newMovies) => {
      movies.current = newMovies
      setNewMovie()
    })
  }, [])

  function setNewMovie() {
    const randomIndex = getRandomInt(9)
    const movie = movies.current[randomIndex]
    setMovie(movie)
  }

  return (
    <div className=" bg-violet-400 h-screen">
      <h3 className=" font-extrabold text-5xl p-5">
        ¡Actúalo!
      </h3>
      <div className="text-center p-3">
        <Image className="max-w-full m-auto mt-7"
          width={movie.primaryImage.width} height={movie.primaryImage.height}
          src={movie.primaryImage.url} alt={movie.titleText.text} />
        <h1 className=" font-semibold text-xl m-3">{movie.titleText?.text}</h1>
        <h2>{movie.releaseDate?.year}</h2>
        <button className=" bg-pink-600 rounded m-3 p-3" onClick={setNewMovie}>
          Otra Pelicula
        </button>
      </div>
    </div>
  )
}
"use client"
import { useEffect, useState } from "react";
import { getRandomInt } from "../common";
import { getMoviesRequest } from "./game";

export default function Page() {
  const [movie, setMovie] = useState<Movie>({
    titleText: null,
    primaryImage: null,
    releaseDate: null
  })

  useEffect(() => {
    setNewMovie()
  }, [])
  function setNewMovie() {
    getMoviesRequest().then((movies) => {
      const randomIndex = getRandomInt(49)
      const newMovie = movies[randomIndex]
      setMovie(newMovie)
    })
  }

  return (
    <div className=" bg-violet-400 h-screen pt-32">
      <h3 className=" font-extrabold text-5xl fixed top-5 left-9">¡Actúalo!</h3>
      <div className=" bg-pink-200 border-2 shadow-lg m-auto relative rounded-3xl w-[60%] h-[70vh] text-center">
        <img className=" max-h-[65%] max-w-full m-auto mt-7" src={movie.primaryImage?.url} />
        <h1 className=" font-semibold text-xl m-3">{movie.titleText?.text}</h1>
        <h2>{movie.releaseDate?.year}</h2>
        <button className=" bg-violet-400 rounded m-3 p-3" onClick={setNewMovie}>
          Otra Pelicula
        </button>
      </div>
    </div>
  )
}
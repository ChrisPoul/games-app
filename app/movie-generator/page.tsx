"use client"
import { useEffect, useRef, useState } from "react";
import { getMoviesRequest } from "./requests";
import MovieImageComponent from "./components/MovieImage";
import SettingsMenuComponent from "./components/SettingsMenu";

export default function Page() {
  const moviesCache = useRef<Movie[]>([])
  const index = useRef(0)
  const [movie, setMovie] = useState<Movie>({
    titleText: { text: "" },
    primaryImage: { width: 0, height: 0, url: null },
    releaseDate: { day: 0, month: 0, year: 0 }
  })
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    refreshMoviesCache()
  }, [])

  function refreshMoviesCache() {
    getMoviesRequest().then((newMovies) => {
      moviesCache.current = newMovies
      setNewMovie()
    })
  }
  function setNewMovie() {
    if (index.current == 49) {
      refreshMoviesCache()
      index.current = 0
      return
    }
    const movie = moviesCache.current[index.current]
    index.current += 1
    setMovie(movie)
    setImageLoading(true)
  }

  return (
    <div className=" text-center bg-violet-400 h-screen">
      <h3 className=" font-extrabold text-5xl p-6">
        ¡Actúalo!
      </h3>
      <MovieImageComponent
        image={movie.primaryImage}
        loading={imageLoading}
        setLoading={setImageLoading} />
      <div className="text-center p-3">
        <h1 className=" font-semibold text-xl m-3">{movie.titleText.text}</h1>
        <h2>{movie.releaseDate.year}</h2>
        <button className=" bg-pink-600 rounded m-3 p-3" onClick={setNewMovie}>
          Otra Pelicula
        </button>
      </div>
      {SettingsMenuComponent()}
    </div>
  )
}
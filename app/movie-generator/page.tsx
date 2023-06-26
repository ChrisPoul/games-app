"use client"
import { useEffect, useRef, useState } from "react";
import { getMoviesRequest } from "./api";
import MovieImageComponent from "./components/MovieImage";
import SettingsMenuComponent from "./components/SettingsMenu";

export default function Page() {
  const moviesCacheRef = useRef<Movie[]>([])
  const filtersRef = useRef<MovieFilters>({ startYear: 1990 })
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
    getMoviesRequest(filtersRef.current).then((newMovies) => {
      console.log(filtersRef.current)
      moviesCacheRef.current = newMovies
      setNewMovie()
    })
  }
  function setNewMovie() {
    if (index.current == moviesCacheRef.current.length - 1) {
      refreshMoviesCache()
      index.current = 0
      return
    }
    const movie = moviesCacheRef.current[index.current]
    index.current += 1
    setMovie(movie)
    setImageLoading(true)
  }

  return (
    <div className=" text-center bg-violet-400 h-screen">
      <h3 className=" font-extrabold text-5xl p-6">
        Movie Generator
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
      {SettingsMenuComponent(filtersRef, refreshMoviesCache)}
    </div>
  )
}
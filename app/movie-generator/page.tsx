"use client"
import { useEffect, useRef, useState } from "react";
import { getMoviesRequest } from "./api";
import SettingsMenuComponent from "./components/SettingsMenu";
import MovieComponent from "./components/Movie";

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
    <div className="text-center bg-violet-400 dark:bg-black h-screen pt-10 flex flex-col">
      <MovieComponent
        movie={movie}
        imageLoading={imageLoading}
        setImageLoading={setImageLoading}
      />
      <button className=" bg-pink-600 rounded p-3 m-auto mb-6" onClick={setNewMovie}>
        Otra Pelicula
      </button>
      {SettingsMenuComponent(filtersRef, refreshMoviesCache)}
    </div>
  )
}
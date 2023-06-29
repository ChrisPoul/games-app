import { useEffect, useRef, useState } from "react";
import MovieImageComponent from "./MovieImage";
import { getMoviesRequest } from "../api";
import SettingsMenuComponent from "./SettingsMenu";

export default function MovieComponent() {
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
    <div className="grow flex flex-col m-3">
      <MovieImageComponent
        image={movie.primaryImage}
        loading={imageLoading}
        setLoading={setImageLoading}
      />
      <h1 className="font-semibold text-2xl m-3">{movie.titleText.text}</h1>
      <h2 className="text-lg font-medium">{movie.releaseDate.year}</h2>
      <button className=" bg-pink-600 rounded p-3 m-auto my-3" onClick={setNewMovie}>
        Otra Pelicula
      </button>
      {SettingsMenuComponent(filtersRef, refreshMoviesCache)}
    </div>
  )
}
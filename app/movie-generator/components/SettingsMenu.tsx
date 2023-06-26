import { MutableRefObject, useEffect, useRef, useState } from "react";
import SettingsMenu from "@/app/components/SettingsMenu";
import { getMovieGenresRequest } from "../api";

export default function SettingsMenuComponent(filtersRef: MutableRefObject<MovieFilters>, refreshMoviesCache: () => void) {
  const [isOpen, setIsOpen] = useState(false)
  const [genre, setGenre] = useState("All")
  const [startYear, setStartYear] = useState(filtersRef.current.startYear)
  const genresRef = useRef([genre])

  useEffect(() => {
    getMovieGenresRequest().then((genres) => {
      genres[0] = "All"
      genresRef.current = genres
      console.log(genres)
    })
  }, [])

  function openMenu() { setIsOpen(true) }
  function closeMenu() {
    setIsOpen(false)
    refreshMoviesCache()
  }
  function changeGenre(event: any) {
    let newGenre: string = event.target.value
    if (newGenre == "All") {
      filtersRef.current.genre = null
    } else {
      filtersRef.current.genre = newGenre
    }
    setGenre(newGenre)
  }
  function changeStartYear(event: any) {
    const newStartYear: number = event.target.value
    filtersRef.current.startYear = newStartYear
    setStartYear(newStartYear)
  }

  return (
    <SettingsMenu isOpen={isOpen} openMenu={openMenu} closeMenu={closeMenu}>
      <div>
        <h3>Starting Year:</h3>
        <p>{startYear}</p>
        <input type="range"
          value={startYear}
          min={1950}
          max={2022}
          onChange={changeStartYear}
        />
      </div>
      <div>
        <h1>Genre:</h1>
        <select value={genre} onChange={changeGenre}>
          {genresRef.current.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
    </SettingsMenu >
  )
}


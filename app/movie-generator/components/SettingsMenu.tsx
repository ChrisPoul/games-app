import { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from "react";
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
    })
  }, [])

  function openMenu() { setIsOpen(true) }
  function closeMenu() {
    setIsOpen(false)
    refreshMoviesCache()
  }
  function changeGenre(event: ChangeEvent<HTMLSelectElement>) {
    let newGenre: string = event.currentTarget.value
    if (newGenre == "All") {
      filtersRef.current.genre = null
    } else {
      filtersRef.current.genre = newGenre
    }
    setGenre(newGenre)
  }
  function changeStartYear(event: ChangeEvent<HTMLInputElement>) {
    const newStartYear = +event.target.value
    filtersRef.current.startYear = newStartYear
    setStartYear(newStartYear)
  }

  return (
    <SettingsMenu isOpen={isOpen} openMenu={openMenu} closeMenu={closeMenu}>
      <div>
        <h1 className="font-bold text-lg">Starting Year:</h1>
        <p>{startYear}</p>
        <input className="h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 dark:accent-pink-600"
          type="range"
          value={startYear}
          min={1950}
          max={2022}
          onChange={changeStartYear}
        />
      </div>
      <div>
        <h1 className="font-bold text-lg">Genre:</h1>
        <select className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-violet-100 dark:focus:border-violet-500"
          value={genre}
          onChange={changeGenre}
        >
          {genresRef.current.map((genre) => (
            <option className=""
              key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </SettingsMenu >
  )
}


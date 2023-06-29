"use client"
import MovieComponent from "./components/Movie";

export default function Page() {
  return (
    <div className="text-center bg-violet-400 dark:bg-black h-screen pt-10 flex flex-col">
      <MovieComponent />
    </div>
  )
}
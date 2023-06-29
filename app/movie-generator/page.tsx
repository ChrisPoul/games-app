"use client"
import MovieComponent from "./components/Movie";

export default function Page() {
  return (
    <div className="text-center h-screen pt-10 flex flex-col">
      <MovieComponent />
    </div>
  )
}
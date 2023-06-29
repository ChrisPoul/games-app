import { Dispatch, SetStateAction } from "react";
import MovieImageComponent from "./MovieImage";

interface MovieProps {
  movie: Movie
  imageLoading: boolean
  setImageLoading: Dispatch<SetStateAction<boolean>>
}

export default function MovieComponent({ movie, imageLoading, setImageLoading }: MovieProps) {
  return (
    <div className="grow flex flex-col m-3">
      <MovieImageComponent
        image={movie.primaryImage}
        loading={imageLoading}
        setLoading={setImageLoading}
      />
      <h1 className="font-semibold text-2xl m-3">{movie.titleText.text}</h1>
      <h2 className="text-lg font-medium">{movie.releaseDate.year}</h2>
    </div>
  )
}
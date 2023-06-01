import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import LoadingSpinnerComponent from "./LoadingSpinner";

interface MovieImageProps {
  image: PrimaryImage
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

export default function MovieImageComponent({ image, loading, setLoading }: MovieImageProps) {
  return (
    <div className="relative h-full max-h-[65vh] max-w-[96vw] m-auto">
      {LoadingSpinnerComponent(loading)}
      {image.url &&
        <Image className="object-contain"
          src={image.url}
          alt="Movie Image"
          fill
          onLoad={() => setLoading(false)}
          priority
          style={{ display: loading ? "none" : "block" }}
        />
      }
    </div>
  )
}
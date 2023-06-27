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
    <div className="relative h-full max-h-[70vh] max-w-[96vw] m-auto">
      {loading && LoadingSpinnerComponent()}
      <Image className="object-contain"
        src={image.url ? image.url : "/No-Image-Placeholder.svg.png"}
        alt="Movie Image"
        fill
        onLoad={() => setLoading(false)}
        priority
        style={loading ? { display: "none" } : { display: "block" }}
        sizes="(max-width: 768px) 20vw, 25vw"
      />
    </div>
  )
}
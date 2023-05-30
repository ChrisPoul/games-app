import Image from "next/image";
import { useState } from "react";

export default function MovieImageComponent(image: PrimaryImage) {
  const [imageIsLoaded, setImageLoaded] = useState(false)

  function onImageLoad() {
    setImageLoaded(true)
    console.log("loaded")
  }

  return (
    <div className="relative h-full max-h-[65vh] max-w-[96vw] m-auto">
      <Image className="object-contain"
        src={image.url}
        alt="Movie Image"
        fill
        onLoad={onImageLoad}
        placeholder="blur"
        blurDataURL="/default_image.png"
      />
    </div>
  )
}
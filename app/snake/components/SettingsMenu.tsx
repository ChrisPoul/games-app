import { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io"
import { config } from "../config";
import Overlay from "../../components/Overlay";

export default function SettingsMenuComponent() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == "Escape") { setIsOpen(false) }
      else if (event.key == "s") { setIsOpen(true) }
    }
    document.addEventListener("keydown", handleKeyDown)
  }, [])
  function toggleMenu() { setIsOpen(!isOpen) }
  function updateMilisecondsPerFrame(event: any) {
    config.milisecondsPerFrame = +event.target.value
  }

  return (
    <div>
      <Overlay isOpen={isOpen}>
        <div className="lg:h-[50%] xs:h-[70%] lg:w-[50%] xs:w-[80%] bg-white rounded-2xl m-auto pt-20 space-y-3 relative text-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Settings
          </h1>
          <input
            type="range"
            min={1}
            max={160}
            value={config.milisecondsPerFrame}
            step={2}
            onChange={updateMilisecondsPerFrame}
            onClick={updateMilisecondsPerFrame}
          />
          <button
            className="bg-red-600 p-4 rounded block m-auto w-28"
            onClick={toggleMenu}
          >
            Exit
          </button>
        </div>
      </Overlay>
      {
        !isOpen &&
        <button className="absolute top-0 right-0 bg-gray-400 p-2 rounded mt-1 mr-1"
          onClick={toggleMenu}
        >
          <IoMdSettings />
        </button>
      }
    </div>
  )
}
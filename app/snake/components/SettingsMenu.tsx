import { useEffect, useState } from "react";
import { config } from "../config";
import GameMenuComponent from "@/app/components/GameMenu";

export default function SettingsMenuComponent(toggleGameIsRunning: () => void) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == "Escape") { setIsOpen(false) }
      else if (event.key == "s") { setIsOpen(true) }
    }
    document.addEventListener("keydown", handleKeyDown)
  }, [])
  function updateMilisecondsPerFrame(event: any) {
    config.milisecondsPerFrame = +event.target.value
  }
  function toggleMenu() {
    toggleGameIsRunning()
    setIsOpen(!isOpen)
  }

  return (
    <GameMenuComponent isOpen={isOpen} toggleMenu={toggleMenu}>
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
        className="bg-gray-400 p-4 rounded block m-auto w-28"
        onClick={toggleMenu}
      >
        Continue
      </button>
    </GameMenuComponent>
  )
}


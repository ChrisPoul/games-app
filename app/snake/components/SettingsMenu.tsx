import { useEffect, useState } from "react";
import { BsFillPauseFill } from "react-icons/bs"
import { config } from "../config";
import GameMenuComponent from "@/app/components/GameMenu";

export default function SettingsMenuComponent(toggleGameIsRunning: () => void, gameScore: number) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == "Escape") { toggleMenu() }
    }
    document.addEventListener("keydown", handleKeyDown)

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen])

  function updateMilisecondsPerFrame(event: any) {
    config.milisecondsPerFrame = +event.target.value
  }
  function toggleMenu() {
    toggleGameIsRunning()
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <GameMenuComponent isOpen={isOpen}>
        <h1 className="text-5xl font-extrabold leading-none pb-6">
          Settings
        </h1>
        <h2 className="font-bold text-lg">Score: {gameScore}</h2>
        <div>
          <h2 className="font-bold text-lg">Configure Miliseconds Per Frame:</h2>
          <input
            type="range"
            min={1}
            max={160}
            step={2}
            defaultValue={config.milisecondsPerFrame}
            onChange={updateMilisecondsPerFrame}
            onClick={updateMilisecondsPerFrame}
          />
        </div>
        <button
          className="bg-gray-400 p-4 rounded block m-auto w-28"
          onClick={toggleMenu}
        >
          Continue
        </button>
      </GameMenuComponent>
      {
        !isOpen &&
        <button className="absolute top-0 right-0 bg-gray-400 p-2 rounded mt-1 mr-1"
          onClick={toggleMenu}
        >
          <BsFillPauseFill />
        </button>
      }
    </div>
  )
}


import { useState } from "react";
import SettingsMenu from "@/app/components/SettingsMenu";
import { config } from "../config";


export default function SettingsMenuComponent(toggleGameIsRunning: () => void) {
  const [isOpen, setIsOpen] = useState(false)

  function toggleMenu() {
    toggleGameIsRunning()
    setIsOpen(!isOpen)
  }

  return (
    <SettingsMenu isOpen={isOpen} toggleMenu={toggleMenu}>
      {DifficultySettingsComponent()}
    </SettingsMenu>
  )
}

const difficulties: Difficulty[] = ["Easy", "Normal", "Hard", "Extreme"]

function DifficultySettingsComponent() {
  const [currentDifficulty, setCurrentDifficulty] = useState(config.difficulty)

  function changeDificulty(event: any) {
    setCurrentDifficulty(event.target.value)
    config.difficulty = currentDifficulty
  }

  return (
    <div>
      <h2 className="font-bold text-lg">Difficulty:</h2>
      <div className=" space-x-2 m-3">
        {difficulties.map((difficulty) => (
          <input className=" bg-zinc-400 px-3 py-2 border-black rounded-md"
            type="button"
            key={difficulty}
            onClick={changeDificulty}
            value={difficulty}
            style={{ borderWidth: difficulty == currentDifficulty ? 2 : 0 }}
          />
        ))}
      </div>
    </div>
  )
}




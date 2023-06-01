import { useState } from "react";
import { config } from "../config";
import SettingsMenu from "@/app/components/SettingsMenu";

export default function SettingsMenuComponent(toggleGameIsRunning: () => void, gameScore: number) {
  const [isOpen, setIsOpen] = useState(false)

  function updateMilisecondsPerFrame(event: any) {
    config.milisecondsPerFrame = +event.target.value
  }
  function toggleMenu() {
    toggleGameIsRunning()
    setIsOpen(!isOpen)
  }

  return (
    <SettingsMenu isOpen={isOpen} toggleMenu={toggleMenu}>
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
    </SettingsMenu>
  )
}


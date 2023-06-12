import { useState } from "react";
import SettingsMenu from "@/app/components/SettingsMenu";
import DifficultySettingsComponent from "./DifficultySettings";


export default function SettingsMenuComponent(toggleGameIsRunning: () => void, gameScore: number) {
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


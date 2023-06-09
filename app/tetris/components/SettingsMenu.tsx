import { useState } from "react";
import SettingsMenu from "@/app/components/SettingsMenu";

export default function SettingsMenuComponent(toggleGameIsRunning: () => void) {
  const [isOpen, setIsOpen] = useState(false)

  function toggleMenu() {
    toggleGameIsRunning()
    setIsOpen(!isOpen)
  }

  return (
    <SettingsMenu isOpen={isOpen} openMenu={toggleMenu} closeMenu={toggleMenu}>
      <div>

      </div>
    </SettingsMenu>
  )
}


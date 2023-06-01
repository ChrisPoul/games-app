import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi"
import GameMenuComponent from "@/app/components/GameMenu";
import GameMenuButtonComponent from "@/app/components/GameMenuButton";

export default function SettingsMenuComponent() {
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

  function toggleMenu() {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <GameMenuComponent isOpen={isOpen}>
        <button className="bg-gray-400 p-4 rounded block m-auto w-28"
          onClick={toggleMenu}
        >
          Continue
        </button>
      </GameMenuComponent>
      <GameMenuButtonComponent isOpen={isOpen} toggleMenu={toggleMenu}>
        <FiSettings />
      </GameMenuButtonComponent>
    </div>
  )
}


import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi"
import GameMenuComponent from "@/app/components/GameMenu";

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
        <h1 className="text-5xl font-extrabold leading-none pb-6">Configuración</h1>
        <button className="bg-gray-400 p-4 rounded block m-auto w-28"
          onClick={toggleMenu}
        >
          Continue
        </button>
      </GameMenuComponent>
      {!isOpen &&
        <button className="absolute top-0 right-0 bg-gray-400 p-2 rounded mt-1 mr-1"
          onClick={toggleMenu}
        >
          <FiSettings />
        </button>
      }
    </div >
  )
}


import { ReactNode, useEffect } from "react";
import { FiSettings } from "react-icons/fi"
import GameMenu from "@/app/components/GameMenu";

interface SettingsMenuProps {
  isOpen: boolean
  toggleMenu: () => void
  children: ReactNode
}

export default function SettingsMenu({ isOpen, toggleMenu, children }: SettingsMenuProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == "Escape") { toggleMenu() }
    }
    document.addEventListener("keydown", handleKeyDown)

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen])

  return (
    <div>
      <GameMenu isOpen={isOpen} title="Settings">
        {children}
        <button
          className="bg-gray-400 p-4 rounded block m-auto w-28"
          onClick={toggleMenu}
        >
          Continue
        </button>
      </GameMenu>
      {
        !isOpen &&
        <button className="absolute top-0 right-0 bg-gray-400 p-2 rounded mt-1 mr-1"
          onClick={toggleMenu}
        >
          <FiSettings />
        </button>
      }
    </div>
  )
}


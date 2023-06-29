import { ReactNode, useEffect } from "react";
import { FiSettings } from "react-icons/fi"
import GameMenu from "@/app/components/GameMenu";

interface SettingsMenuProps {
  isOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  children: ReactNode
}

export default function SettingsMenu({ isOpen, openMenu, closeMenu, children }: SettingsMenuProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == "Escape") {
        toggleMenu()
      }
    }
    document.addEventListener("keydown", handleKeyDown)

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen])

  function toggleMenu() {
    if (isOpen) { closeMenu() }
    else { openMenu() }
  }

  return (
    <div>
      <GameMenu isOpen={isOpen} title="Settings">
        {children}
        <button
          className=" bg-green-500 p-4 rounded block m-auto w-28"
          onClick={closeMenu}
        >
          Continue
        </button>
      </GameMenu>
      {
        !isOpen &&
        <button className="absolute top-0 right-0 bg-gray-500 p-2 rounded mt-1 mr-1"
          onClick={openMenu}
        >
          <FiSettings />
        </button>
      }
    </div>
  )
}


import { useEffect, useState } from "react"
import SettingsMenuComponent from "./SettingsMenu"

export default function GameMenuComponent() {
  const [currentMenu, setCurrentMenu] = useState("none")
  let display = "flex"
  if (currentMenu === "none") { display = "hidden" }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
  }, [])

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key == "Escape") { setCurrentMenu("none") }
    else if (event.key == "s") { setCurrentMenu("settings") }
  }
  function handleExit() {
    setCurrentMenu("none")
    display = "hidden"
  }
  function openSettingsMenu() {
    setCurrentMenu("settings")
  }

  return (
    <div>
      <div className={`
      ${display}
      items-center 
      w-full h-screen
      top-0 left-0 fixed 
      bg-black bg-opacity-70 
      `}
      >
        <div className="h-[50%] w-[50%] bg-white rounded m-auto p-16 relative text-center">
          {currentMenu === "settings" && SettingsMenuComponent()}
          <button
            className="bg-red-600 p-4 rounded block m-auto w-28"
            onClick={handleExit}
          >
            Exit
          </button>
        </div>
      </div>
      {
        currentMenu == "none" &&
        <button className="absolute top-0 right-0 bg-gray-400 p-2 rounded mt-1 mr-1"
          onClick={openSettingsMenu}
        >
          settings
        </button>
      }
    </div>
  )
}
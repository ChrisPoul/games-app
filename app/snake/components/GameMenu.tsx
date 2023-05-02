import GameOverScreenComponent from "./GameOverScreen"
import SettingsComponent from "./Settings"

export default function GameMenuComponent(menuOn: boolean, gameScore: number) {
  let display = "hidden"
  if (menuOn) { display = "flex" }

  return (
    <div className={`
      ${display}
      items-center 
      w-full h-screen
      top-0 left-0 fixed 
      bg-black bg-opacity-70 
      `}
    >
      <div className="h-[50%] w-[50%] bg-white rounded m-auto p-16 relative text-center">
        {GameOverScreenComponent(gameScore)}
        {SettingsComponent()}
      </div>
    </div>
  )
}
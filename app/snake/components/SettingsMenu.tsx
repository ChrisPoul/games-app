import { config } from "../config";

export default function SettingsMenuComponent() {

  function updateMilisecondsPerFrame(event: any) {
    config.milisecondsPerFrame = +event.target.value
  }

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Settings
      </h1>
      <input
        type="range"
        min={1}
        max={160}
        value={config.milisecondsPerFrame}
        step={2}
        onChange={updateMilisecondsPerFrame}
        onClick={updateMilisecondsPerFrame}
      />
    </div>
  )
}
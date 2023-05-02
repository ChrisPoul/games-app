import { config } from "@/app/config";
import { ChangeEvent, useState } from "react";

export default function SettingsComponent() {
  let [milisecondsPerFrame, setMilisecondsPerFrame] = useState(config.milisecondsPerFrame)

  function updateMilisecondsPerFrame(event: ChangeEvent<HTMLInputElement>) {
    setMilisecondsPerFrame(+event.target.value)
    config.milisecondsPerFrame = milisecondsPerFrame
  }

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Settings
      </h1>
      <input type="range" min={1} max={160} value={milisecondsPerFrame} step={2} onChange={updateMilisecondsPerFrame} />
    </div>
  )
}
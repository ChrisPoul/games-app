import { GameObject } from "../gameObject";
import { config } from "@/app/config";

export default function GameObjectComponent(gameObject: GameObject, gameObjectColor: string) {
  return (
    <button
      className={"rounded absolute " + gameObjectColor}
      style={{
        left: gameObject.positionX * config.gameSizeScale + config.gameSizeUnit,
        top: gameObject.positionY * config.gameSizeScale + config.gameSizeUnit,
        padding: config.gameSizeScale / 2 + config.gameSizeUnit
      }}
    ></button>
  )
}
import { GameObject } from "../gameObject";
import { config } from "../config";

export default function GameObjectComponent(gameObject: GameObject, gameObjectColor: string) {
  return (
    <button
      className={"rounded absolute " + gameObjectColor}
      style={{
        left: gameObject.X * config.gameSizeScale + config.gameSizeUnit,
        top: gameObject.Y * config.gameSizeScale + config.gameSizeUnit,
        padding: config.gameSizeScale / 2 + config.gameSizeUnit
      }}
    ></button>
  )
}
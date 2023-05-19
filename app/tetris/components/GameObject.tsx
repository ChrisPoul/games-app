import { GameObject } from "../gameObject";
import { config } from "../config";

export default function GameObjectComponent(gameObject: GameObject) {
  return (
    <button
      className={"rounded absolute " + gameObject.color}
      style={{
        left: gameObject.X * config.gameSizeScale + config.gameSizeUnit,
        top: gameObject.Y * config.gameSizeScale + config.gameSizeUnit,
        padding: config.gameSizeScale / 2 + config.gameSizeUnit
      }}
    ></button>
  )
}
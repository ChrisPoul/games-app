import { GameObject } from "../gameObject";
import { config } from "../config";

export default function GameObjectComponent(gameObject: GameObject) {
  const backgroudColor = "bg-" + gameObject.color
  return (
    <button
      className={"rounded absolute " + (backgroudColor)}
      style={{
        left: gameObject.X * config.gameSizeScale + config.gameSizeUnit,
        top: gameObject.Y * config.gameSizeScale + config.gameSizeUnit,
        padding: config.gameSizeScale / 2 + config.gameSizeUnit
      }}
    ></button>
  )
}
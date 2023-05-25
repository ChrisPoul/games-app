import { GameObject } from "../gameObject";
import { config } from "../config";

export default function GameObjectComponent(gameObject: GameObject, gameObjectColor: string) {
  return (
    <button
      className={"rounded absolute " + gameObjectColor}
      style={{
        left: gameObject.X * config.gameSizeScale + "vw",
        top: gameObject.Y * 2 * config.gameSizeScale + "vh",
        paddingTop: "3vh",
        paddingBottom: "3vh",
        paddingRight: "1.5vw",
        paddingLeft: "1.5vw"
      }}
    ></button>
  )
}
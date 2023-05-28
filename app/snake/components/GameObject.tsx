import { GameObject } from "../gameObject";
import { config } from "../config";

export default function GameObjectComponent(gameObject: GameObject, gameObjectColor: string) {
  return (
    <button
      className={"rounded absolute " + gameObjectColor}
      style={{
        left: gameObject.X * config.horizontalScaling + "vw",
        top: gameObject.Y * config.verticalScaling + "vh",
        paddingTop: config.verticalScaling / 2 + "vh",
        paddingBottom: config.verticalScaling / 2 + "vh",
        paddingRight: config.horizontalScaling / 2 + "vw",
        paddingLeft: config.horizontalScaling / 2 + "vw"
      }}
    ></button>
  )
}
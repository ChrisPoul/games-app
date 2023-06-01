import { GameObject } from "../gameObject";
import { config } from "../config";

interface GameObjectProps {
  gameObject: GameObject
  className: string
}

export default function GameObjectComponent({ gameObject, className }: GameObjectProps) {
  return (
    <button className={"rounded absolute " + className}
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
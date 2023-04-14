import { GameObject } from "../models";
import { config } from "@/app/config";

export default function GameObjectComponent(gameObject: GameObject, gameObjectId: string, gameObjectColor: string) {
  return (
    <button
      className={"rounded absolute " + gameObjectColor}
      style={{
        left: gameObject.positionX * config.gameObjectSize + config.gameObjectSizeUnit,
        top: gameObject.positionY * config.gameObjectSize + config.gameObjectSizeUnit,
        padding: config.gameObjectSize / 2 + config.gameObjectSizeUnit
      }}
      id={gameObjectId}
      key={gameObjectId}
    ></button>
  )
}
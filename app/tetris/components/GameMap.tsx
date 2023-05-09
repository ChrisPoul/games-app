import { config } from "../config";
import { GameObject } from "../gameObject";
import GameObjectComponent from "./GameObject";

export default function GameMapComponent(figure: GameObject[]) {
  return (
    <div
      className="bg-black m-auto relative rounded"
      style={{
        width: config.gameMapWidth * config.gameSizeScale + config.gameSizeUnit,
        height: config.gameMapHeight * config.gameSizeScale + config.gameSizeUnit
      }}
    >
      <div>
        {figure.map((figurePart, index) => (
          <div key={index}>
            {GameObjectComponent(figurePart, "bg-yellow-500")}
          </div>
        ))}
      </div >
    </div>
  )
}
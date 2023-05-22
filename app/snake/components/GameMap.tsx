import { GameObject } from "../gameObject";
import { config } from "../config";
import GameObjectComponent from "./GameObject";

export default function GameMapComponent(snake: Figure, food: Figure) {
  return (
    <div
      className="bg-black m-auto relative rounded"
      style={{
        width: config.gameMapWidth * config.gameSizeScale + config.gameSizeUnit,
        height: config.gameMapHeight * config.gameSizeScale + config.gameSizeUnit
      }}
    >
      <div>
        {food.map((foodItem, index) => (
          <div key={"food-" + index}>
            {GameObjectComponent(foodItem, "bg-red-500")}
          </div>
        ))}
      </div >
      <div>
        {snake.map((snakeBodyPart, index) => (
          <div key={"snake-" + index}>
            {GameObjectComponent(snakeBodyPart, "bg-green-500")}
          </div>
        ))}
      </div >
    </div>
  )
}
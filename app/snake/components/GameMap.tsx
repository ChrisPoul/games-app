import { GameObject } from "../gameObject";
import GameObjectComponent from "./GameObject";

export default function GameMapComponent(snake: GameObject[], food: GameObject[]) {
  return (
    <div
      className="bg-black m-auto relative rounded w-screen h-screen"
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
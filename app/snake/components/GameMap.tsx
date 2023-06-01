import { GameObject } from "../gameObject";
import GameObjectComponent from "./GameObject";

export default function GameMapComponent(snake: GameObject[], food: GameObject[]) {
  return (
    <div className="bg-black m-auto relative w-screen h-screen">
      {food.map((foodItem, index) => (
        <div key={"food-" + index}>
          <GameObjectComponent className="bg-gray-500"
            gameObject={foodItem} />
        </div>
      ))}
      {snake.map((snakeBodyPart, index) => (
        <div key={"snake-" + index}>
          <GameObjectComponent className="bg-green-500"
            gameObject={snakeBodyPart} />
        </div>
      ))}
    </div>
  )
}
import Snake from "../models/snake";
import { config } from "@/app/config";
import GameObjectComponent from "./GameObject";

export default function SnakeComponent(snake: Snake) {
  return (
    <div>
      {snake.map((snakeBodyPart, index) => (
        <div>
          {GameObjectComponent(snakeBodyPart, "snake-" + index, "bg-green-500")}
        </div>
      ))}
    </div >
  )
}
import Snake from "../snake";
import { config } from "@/app/config";
import GameObjectComponent from "./GameObject";

export default function SnakeComponent(snake: Snake) {
  return (
    <div>
      {snake.map((snakeBodyPart, index) => (
        <div key={"snake-" + index}>
          {GameObjectComponent(snakeBodyPart, "bg-green-500")}
        </div>
      ))}
    </div >
  )
}
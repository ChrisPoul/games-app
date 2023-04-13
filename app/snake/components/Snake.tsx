import Snake from "../models/snake";
import { config } from "@/app/config";

export default function SnakeComponent(snake: Snake) {
  return (
    <div>
      {snake.map((snakeBodyPart, index) => (
        <button
          className="bg-green-500 rounded absolute"
          style={{
            left: snakeBodyPart.positionX * config.gameObjectSize + config.gameObjectSizeUnit,
            top: snakeBodyPart.positionY * config.gameObjectSize + config.gameObjectSizeUnit,
            padding: config.gameObjectSize / 2 + config.gameObjectSizeUnit
          }}
          key={index}
        ></button>
      ))}
    </div >
  )
}
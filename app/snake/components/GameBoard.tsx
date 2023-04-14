import {
  useState, useEffect
} from "react"
import { config } from "@/app/config";
import Food from "../models/food";
import Snake from "../models/snake";
import FoodComponent from "./Food";
import SnakeComponent from "./Snake";
import { GameObject } from "../models";
import GameBoard from "../models/gameBoard";

export default function GameBoardComponent() {
  let [food, setFood] = useState(new Food(
    new GameObject(6, 4)
  ))
  const [snake, setSnake] = useState(new Snake(
    new GameObject(0, 0)
  ))
  const gameBoard = new GameBoard(snake, food)
  let newDirection = snake.head.direction

  useEffect(() => {
    function handleKeyDown(event: any) {
      const keyPressed: string = event.key
      if (gameBoard.keyPressedIsValid(keyPressed)) {
        newDirection = keyPressed
      }
    }
    const interval = setInterval(() => {
      gameBoard.handleSnakeEatingFood()
      snake.handleColitionWithItsSelf()
      snake.update()
      snake.head.direction = newDirection
      snake.head.move()
      setSnake(snake => new Snake(...snake))
    }, config.milisecondsPerFrame)
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval)
    }
  }, [snake])

  return (
    <div
      className="bg-black m-auto relative rounded"
      style={{
        width: config.gameMapWidth * config.gameObjectSize + config.gameObjectSizeUnit,
        height: config.gameMapHeight * config.gameObjectSize + config.gameObjectSizeUnit
      }}
    >
      {FoodComponent(food)}
      {SnakeComponent(snake)}
    </div>
  )
}
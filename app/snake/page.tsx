'use client';

import {
  useState, useEffect
} from "react"
import Snake from "./models/snake";
import Food from "./models/food";
import GameBoard from "./models/gameBoard";
import { GameObject } from "./models";
import GameBoardComponent from "./components/GameBoard";
import { config } from "../config";

export default function Page() {
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
    <div>
      {GameBoardComponent(snake, food)}
    </div>
  )
}

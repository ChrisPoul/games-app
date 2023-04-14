'use client';

import { useState, useEffect } from "react"
import { config } from "@/app/config";
import Food from "./models/food";
import Snake from "./models/snake";
import { GameObject } from "./models";
import GameBoard from "./models/gameBoard";
import GameBoardComponent from "./components/GameBoard";

export default function Page() {
  let [food, setFood] = useState(new Food(
    new GameObject(
      Math.floor(config.gameMapWidth / 2),
      Math.floor(config.gameMapHeight / 2)
    )
  ))
  const [snake, setSnake] = useState(new Snake(
    new GameObject(
      Math.floor(config.gameMapWidth / 2),
      0
    )
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
      snake.update()
      snake.head.direction = newDirection
      snake.head.move()
      snake.handleColitionWithItsSelf()
      setSnake(snake => new Snake(...snake))
    }, config.milisecondsPerFrame)
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval)
    }
  }, [snake])

  return (
    <div className="bg-amber-300 h-screen pt-6">
      {GameBoardComponent(snake, food)}
    </div>
  )
}
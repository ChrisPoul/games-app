'use client';

import { useState, useEffect } from "react"
import { config } from "@/app/config";
import Food from "./food";
import Snake from "./snake";
import { GameObject } from "./gameObject";
import { handleGameCicle, keyPressedIsValid, endGame } from "./game";
import GameMapComponent from "./components/GameMap";
import GameOverScreenComponent from "./components/GameOverScreen";

export default function Page() {
  const [food, setFood] = useState(new Food(
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
  const [gameOverScreenStatus, setGameOverScreenStatus] = useState("hidden")
  let newDirection = snake.head.direction

  useEffect(() => {
    function handleKeyDown(event: any) {
      const keyPressed: string = event.key
      if (keyPressedIsValid(snake, keyPressed)) {
        newDirection = keyPressed
      }
    }
    const interval = setInterval(() => {
      snake.head.direction = newDirection
      handleGameCicle(snake, food, snake.head.direction)
      if (snake.collidesWithItsSelf()) {
        endGame(snake, food)
        console.log(snake.head.direction)
        if (snake.tail.direction === "") {
          setGameOverScreenStatus("flex")
        }
      }
      setSnake(snake => new Snake(...snake))
    }, config.milisecondsPerFrame)
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval)
    }
  }, [snake])

  return (
    <div className="bg-amber-300 h-screen pt-6 z--10">
      {GameMapComponent(snake, food)}
      {GameOverScreenComponent(gameOverScreenStatus)}
    </div>
  )
}
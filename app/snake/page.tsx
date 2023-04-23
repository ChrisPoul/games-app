'use client';

import { useState, useEffect } from "react"
import { config } from "@/app/config";
import Food from "./food";
import { GameObject } from "./gameObject";
import {
  handleGameCicle, keyPressedIsValid,
  endGame, snakeCollidesWithItsSelf
} from "./game";
import GameMapComponent from "./components/GameMap";
import GameOverScreenComponent from "./components/GameOverScreen";

export default function Page() {
  const [food, setFood] = useState(new Food(
    new GameObject(
      Math.floor(config.gameMapWidth / 2),
      Math.floor(config.gameMapHeight / 2)
    )
  ))
  const [snake, setSnake] = useState([
    new GameObject(
      Math.floor(config.gameMapWidth / 2),
      0
    )
  ])
  const [gameOverScreenStatus, setGameOverScreenStatus] = useState("hidden")
  let newDirection = snake[0].direction

  useEffect(() => {
    function handleKeyDown(event: any) {
      const keyPressed: string = event.key
      if (keyPressedIsValid(snake, keyPressed)) {
        newDirection = keyPressed
      }
    }
    const interval = setInterval(() => {
      snake[0].direction = newDirection
      handleGameCicle(snake, food, snake[0].direction)
      if (snakeCollidesWithItsSelf(snake)) {
        endGame(snake, food)
        setGameOverScreenStatus("flex")
      }
      setSnake(snake => [...snake])
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
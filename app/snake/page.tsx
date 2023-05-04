'use client';

import { useState, useEffect } from "react"
import { config } from "@/app/config";
import { GameObject } from "@/app/gameObject";
import {
  snakeDirectionIsValid, getGameStatus, doInterval
} from "./game";
import GameMenuComponent from "./components/GameMenu";
import GameMapComponent from "./components/GameMap";

let snakeDirection: string
let newSnakeDirection = "Down"

export default function Page() {
  const [food, setFood] = useState([
    new GameObject(
      Math.floor(config.gameMapWidth / 2), 4
    ),
    new GameObject(
      Math.floor(config.gameMapWidth / 2), 1
    )
  ])
  const [snake, setSnake] = useState([
    new GameObject(Math.floor(config.gameMapWidth / 2), 0)
  ])

  useEffect(() => {
    let gameStatus = getGameStatus(snake)
    switch (gameStatus) {
      case "ending":
        config.milisecondsPerFrame = 100
        break
      case "game-over":
        return
    }
    const interval = setInterval(() => {
      if (snakeDirectionIsValid(snakeDirection, newSnakeDirection) || snake.length == 1) {
        snakeDirection = newSnakeDirection
      }
      doInterval(gameStatus, snakeDirection, snake, food)
      setSnake(snake => [...snake])
    }, config.milisecondsPerFrame)
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval)
    }
  }, [snake])

  function handleKeyDown(event: any) {
    const keyPressed: string = event.key
    if (keyPressed.includes("Arrow")) {
      newSnakeDirection = keyPressed.replace("Arrow", "")
    }
  }
  return (
    <div className="bg-amber-300 h-screen pt-6 z--10">
      {GameMapComponent(snake, food)}
      {GameMenuComponent(snake.length)}
    </div>
  )
}
'use client';
import { useState, useEffect, useRef } from "react"
import { config } from "@/app/config";
import { GameObject } from "@/app/gameObject";
import {
  snakeDirectionIsValid, getGameStatus, handleSnakeEatingFood, updateSnakePosition
} from "./game";
import GameMenuComponent from "./components/GameMenu";
import GameMapComponent from "./components/GameMap";
import GameOverScreenComponent from "./components/GameOverScreen";

export default function Page() {
  const snakeDirection = useRef("Down")
  const newSnakeDirection = useRef("Down")
  const [food, setFood] = useState([
    new GameObject(Math.floor(config.gameMapWidth / 2), 10),
    new GameObject(Math.floor(config.gameMapWidth / 2), 14)
  ])
  const [snake, setSnake] = useState([
    new GameObject(Math.floor(config.gameMapWidth / 2), 0)
  ])
  const [gameIsOver, setGameIsOver] = useState(false)

  // handle user input
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const keyPressed = event.key
      if (keyPressed.includes("Arrow")) {
        newSnakeDirection.current = keyPressed.replace("Arrow", "")
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

  // run game logic
  useEffect(() => {
    const gameStatus = getGameStatus(snake)
    setTimeout(() => {
      if (snakeDirectionIsValid(snakeDirection.current, newSnakeDirection.current)) {
        snakeDirection.current = newSnakeDirection.current
      }
      switch (gameStatus) {
        case "game-running":
          handleSnakeEatingFood(snake, food)
          updateSnakePosition(snake)
          const snakeHead = snake[0]
          snakeHead.updatePosition(snakeDirection.current)
          break
        case "game-ending":
          updateSnakePosition(snake)
          config.milisecondsPerFrame = 100
          break
        case "game-over":
          setGameIsOver(true)
          return
      }
      setSnake(snake => [...snake])
    }, config.milisecondsPerFrame)
  }, [snake])

  return (
    <div className="bg-amber-300 h-screen pt-6 z--10">
      {GameMapComponent(snake, food)}
      {GameMenuComponent()}
      {GameOverScreenComponent(gameIsOver, snake.length)}
    </div>
  )
}
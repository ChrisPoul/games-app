'use client';
import { useState, useEffect, useRef } from "react"
import { config } from "@/app/config";
import { GameObject } from "@/app/gameObject";
import {
  playerDirectionIsValid, updatePlayer, playerLosses
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
    setTimeout(() => {
      if (playerDirectionIsValid(snakeDirection.current, newSnakeDirection.current)) {
        snakeDirection.current = newSnakeDirection.current
      }
      if (playerLosses(snake)) {
        setTimeout(() => {
          setGameIsOver(true)
        }, 1000)
        return
      }
      updatePlayer(snake, food, snakeDirection.current)
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
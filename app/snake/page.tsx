'use client';
import { useState, useEffect, useRef } from "react"
import { config } from "./config";
import { GameObject } from "./gameObject";
import {
  playerDirectionIsValid, updatePlayer,
  playerLosses, getMapWidth, addNewFoodItem
} from "./game";
import GameMapComponent from "./components/GameMap";
import GameOverScreenComponent from "./components/GameOverScreen";
import SettingsMenuComponent from "./components/SettingsMenu";

export default function Page() {
  const snakeDirection = useRef("Down")
  const newSnakeDirection = useRef("Down")
  const [food, setFood] = useState<GameObject[]>([])
  const [snake, setSnake] = useState<GameObject[]>([
    new GameObject(Math.floor(getMapWidth() / 2), 0)
  ])
  const [gameIsOver, setGameIsOver] = useState(false)

  // initial setup
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)")
    if (mediaQuery.matches) {
      config.horizontalScaling = 7
      config.verticalScaling = 4
    }
    setSnake([new GameObject(Math.floor(getMapWidth() / 2), 0)])
    addNewFoodItem(food, snake)
    addNewFoodItem(food, snake)
    setFood(food)
  }, [])
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
    <div className="overflow-hidden">
      {GameMapComponent(snake, food)}
      {SettingsMenuComponent()}
      {GameOverScreenComponent(gameIsOver, snake.length)}
    </div>
  )
}
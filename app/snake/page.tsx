'use client';
import { useState, useEffect, useRef, TouchEvent } from "react"
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
  const [touchStart, setTouchStart] = useState<[number, number] | null>(null)
  const [touchEnd, setTouchEnd] = useState<[number, number] | null>(null)

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 40

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    const x = event.targetTouches[0].clientX
    const y = event.targetTouches[0].clientY
    setTouchStart([x, y])
  }
  function onTouchMove(event: TouchEvent<HTMLDivElement>) {
    const x = event.targetTouches[0].clientX
    const y = event.targetTouches[0].clientY
    setTouchEnd([x, y])
  }
  function onTouchEnd() {
    if (!touchStart || !touchEnd) return
    const xDistance = touchStart[0] - touchEnd[0]
    const yDistance = touchStart[1] - touchEnd[1]
    if (xDistance > minSwipeDistance) { newSnakeDirection.current = "Left" }
    else if (xDistance < -minSwipeDistance) { newSnakeDirection.current = "Right" }
    if (yDistance > minSwipeDistance) { newSnakeDirection.current = "Up" }
    else if (yDistance < -minSwipeDistance) { newSnakeDirection.current = "Down" }
  }

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
    const interval = setInterval(() => {
      if (playerDirectionIsValid(snakeDirection.current, newSnakeDirection.current) || snake.length == 1) {
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
      setFood(food => [...food])
    }, config.milisecondsPerFrame)

    return () => clearInterval(interval);
  }, [snake])

  return (
    <div className="overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {GameMapComponent(snake, food)}
      {SettingsMenuComponent()}
      {GameOverScreenComponent(gameIsOver, snake.length)}
    </div>
  )
}
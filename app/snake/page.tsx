'use client';

import { useState, useEffect } from "react"
import { config } from "@/app/config";
import { GameObject } from "@/app/gameObject";
import {
  keyPressedIsValid, getGameStatus, doInterval
} from "./game";
import GameObjectComponent from "./components/GameObject";

export default function Page() {
  const [food, setFood] = useState([
    new GameObject(
      Math.floor(config.gameMapWidth / 2),
      Math.floor(config.gameMapHeight / 2)
    )
  ])
  const [snake, setSnake] = useState([
    new GameObject(
      Math.floor(config.gameMapWidth / 2),
      0
    )
  ])
  const [gameOverScreenStatus, setGameOverScreenStatus] = useState("hidden")

  useEffect(() => {
    let gameStatus = getGameStatus(snake)
    if (gameStatus === "game-over") {
      setGameOverScreenStatus("flex")
      return
    }
    const interval = setInterval(() => {
      doInterval(gameStatus, snake, food)
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
    if (keyPressedIsValid(snake, keyPressed)) {
      snake[0].direction = keyPressed
    }
  }

  return (
    <div className="bg-amber-300 h-screen pt-6 z--10">
      <div
        className="bg-black m-auto relative rounded"
        style={{
          width: config.gameMapWidth * config.gameSizeScale + config.gameSizeUnit,
          height: config.gameMapHeight * config.gameSizeScale + config.gameSizeUnit
        }}
      >
        <div>
          {food.map((foodItem, index) => (
            <div key={"food-" + index}>
              {GameObjectComponent(foodItem, "bg-red-500")}
            </div>
          ))}
        </div >
        <div>
          {snake.map((snakeBodyPart, index) => (
            <div key={"snake-" + index}>
              {GameObjectComponent(snakeBodyPart, "bg-green-500")}
            </div>
          ))}
        </div >
      </div>
      <div className={`
      ${gameOverScreenStatus}
      items-center 
      w-full h-screen
      top-0 left-0 fixed 
      bg-black bg-opacity-70 
      `}
      >
        <div className="h-[50%] w-[50%] bg-white rounded m-auto relative">
          Game Over
        </div>
      </div>
    </div>
  )
}
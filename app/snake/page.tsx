'use client';

import { useState, useEffect } from "react"
import { config } from "@/app/config";
import { GameObject } from "@/app/gameObject";
import {
  snakeDirectionIsValid, getGameStatus, doInterval
} from "./game";
import GameObjectComponent from "./components/GameObject";
import GameOverScreenComponent from "./components/GameOverScreen";

let snakeDirection = "Down"
let newSnakeDirection: string

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
  const [gameOverScreenStatus, setGameOverScreenStatus] = useState("running")

  useEffect(() => {
    let gameStatus = getGameStatus(snake)
    switch (gameStatus) {
      case "ending":
        config.milisecondsPerFrame = 100
      case "game-over":
        setTimeout(() => {
          setGameOverScreenStatus("game-over")
        }, 1000)
        console.log("game-over")
        return
    }
    const interval = setInterval(() => {
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
      if (snakeDirectionIsValid(snakeDirection, newSnakeDirection) || snake.length == 1) {
        snakeDirection = newSnakeDirection
      }
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
      {GameOverScreenComponent(gameOverScreenStatus)}
    </div>
  )
}
'use client';

import {
  useState, useEffect, Dispatch, SetStateAction
} from "react"
import { GameObject, Snake } from "../models";

export default function SnakeComponent(food: GameObject[]) {
  const [snake, setSnake] = useState(new Snake(
    new GameObject(0, 0)
  ))
  let newDirection = snake[0].direction

  useEffect(() => {
    function handleKeyDown(event: any) {
      const keyPressed: string = event.key
      if (keyPressedIsValid(keyPressed)) {
        newDirection = keyPressed
      }
    }
    const interval = setInterval(() => {
      snake.handleEatingFood(food)
      snake.handleColitionWithItsSelf()
      snake.update()
      snake[0].direction = newDirection
      snake[0].move()
      setSnake(snake => new Snake(...snake))
    }, 140)
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval)
    }
  }, [snake])

  function keyPressedIsValid(keyPressed: string) {
    if (!keyPressed.includes("Arrow")) {
      return false
    }
    if (snake.length === 1) {
      return true
    }
    if (snake.keyDirectionIsOpositeToCurrentDirection(keyPressed)) {
      return false
    }

    return true
  }

  return (
    <div>
      {snake.map((snakeBodyPart, index) => (
        <button
          className="bg-green-500 p-4 rounded absolute"
          style={{
            left: snakeBodyPart.positionX * 2 + "em",
            top: snakeBodyPart.positionY * 2 + "em"
          }}
          key={index}
        ></button>
      ))}
    </div >
  )
}
'use client';
import { useState, useEffect } from "react"
import { GameObject, Snake } from "../models";

export default function SnakeComponent() {
  let snake = new Snake([
    new GameObject(0, 0),
    new GameObject(0, 0),
    new GameObject(0, 0),
    new GameObject(0, 0)
  ])
  const [snakeBody, setSnakeBodyParts] = useState(snake.body);
  let movementSpeed = 2

  useEffect(() => {
    function handleKeyDown(event: any) {
      snake.updateBody()
      if (event.key === "ArrowRight") {
        snake.head.moveRight(movementSpeed)
      }
      else if (event.key === "ArrowLeft") {
        snake.head.moveLeft(movementSpeed)
      }
      else if (event.key === "ArrowUp") {
        snake.head.moveUp(movementSpeed)
      }
      else if (event.key === "ArrowDown") {
        snake.head.moveDown(movementSpeed)
      }
      setSnakeBodyParts(snakeBody => [...snakeBody])
    }
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, snakeBody);

  return (
    <div>
      {snakeBody.map((snakeBodyPart, index) => (
        <button
          className="bg-red-500 p-4 rounded absolute"
          style={{ left: snakeBodyPart.positionX + "em", top: snakeBodyPart.positionY + "em" }}
          key={index}
        ></button>
      ))}
    </div >
  )
}
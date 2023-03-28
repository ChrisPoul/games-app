'use client';
import { useState, useEffect } from "react"
import { GameObject } from "../models";

function updateSnake(snake: GameObject[]) {
  for (let i = snake.length - 1; i > 0; i--) {
    let currentSnakeBodyPart = snake[i]
    let nextSnakeBodyPart = snake[i - 1]
    currentSnakeBodyPart.positionX = nextSnakeBodyPart.positionX
    currentSnakeBodyPart.positionY = nextSnakeBodyPart.positionY
  }
}

function snakeAteFood(snake: GameObject[], food: GameObject) {
  let snakeHead = snake[0]
  return (snakeHead.positionX === food.positionX && snakeHead.positionY === food.positionY)
}

function growSnake(snake: GameObject[]) {
  snake.push(new GameObject(0, 0))
}

export default function SnakeComponent(food: GameObject) {
  let initialSnakeHead = new GameObject(0, 0)
  const [snake, setSnake] = useState([
    initialSnakeHead
  ]);
  let movementSpeed = 2

  useEffect(() => {
    function handleKeyDown(event: any) {
      if (snakeAteFood(snake, food)) {
        growSnake(snake)
      }
      updateSnake(snake)
      let snakeHead = snake[0]
      if (event.key === "ArrowRight") {
        snakeHead.moveRight(movementSpeed)
      }
      else if (event.key === "ArrowLeft") {
        snakeHead.moveLeft(movementSpeed)
      }
      else if (event.key === "ArrowUp") {
        snakeHead.moveUp(movementSpeed)
      }
      else if (event.key === "ArrowDown") {
        snakeHead.moveDown(movementSpeed)
      }
      else return
      setSnake(snake => [...snake])
    }
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [snake]);

  return (
    <div>
      {snake.map((snakeBodyPart, index) => (
        <button
          className="bg-green-500 p-4 rounded absolute"
          style={{ left: snakeBodyPart.positionX + "em", top: snakeBodyPart.positionY + "em" }}
          key={index}
        ></button>
      ))}
    </div >
  )
}
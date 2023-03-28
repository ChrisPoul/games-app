'use client';
import { useState, useEffect } from "react"
import { GameBoard, GameObject } from "../models";

export default function SnakeComponent(gameBoard: GameBoard) {
  let initialSnakeHead = new GameObject(0, 0)
  const [snakeBody, setSnakeBody] = useState([
    initialSnakeHead
  ]);
  let movementSpeed = 2

  useEffect(() => {
    function handleKeyDown(event: any) {
      gameBoard.eat(snakeBody)
      gameBoard.updateSnakeBody(snakeBody)
      let snakeHead = snakeBody[0]
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
      setSnakeBody(snakeBody => [...snakeBody])
    }
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [snakeBody]);

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
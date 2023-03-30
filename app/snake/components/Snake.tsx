'use client';

import {
  useState, useEffect, Dispatch, SetStateAction
} from "react"
import { GameObject } from "../models";
import { getRandomInt } from "@/app/common";

export default function SnakeComponent(food: GameObject[], setFood: Dispatch<SetStateAction<GameObject[]>>) {
  let initialSnakeHead = new GameObject(0, 0)
  const [snake, setSnake] = useState([
    initialSnakeHead
  ]);
  let movementSpeed = 1

  useEffect(() => {
    function handleKeyDown(event: any) {
      handleSnakeEatingFood()
      updateSnake()
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

  function handleSnakeEatingFood() {
    for (let index = 0; index < food.length; index++) {
      let foodItem = food[index]
      if (snakeAteFoodItem(foodItem)) {
        growSnake(snake)
        deleteFoodItem(index)
        createNewFoodItem()
      }
    }
  }

  function snakeAteFoodItem(foodItem: GameObject) {
    let snakeHead = snake[0]
    if (snakeHead.positionX != foodItem.positionX) return false
    else if (snakeHead.positionY != foodItem.positionY) return false

    return true
  }

  function growSnake(snake: GameObject[]) {
    snake.push(new GameObject(0, 0))
  }

  function deleteFoodItem(foodItemIndex: number) {
    food.splice(foodItemIndex, 1)
    setFood(food => [...food])
  }

  function createNewFoodItem() {
    const positionX = getRandomInt(10)
    const positionY = getRandomInt(10)
    food.push(new GameObject(positionX, positionY))
    setFood(food => [...food])
  }

  function updateSnake() {
    for (let index = snake.length - 1; index > 0; index--) {
      let currentSnakeBodyPart = snake[index]
      let nextSnakeBodyPart = snake[index - 1]
      currentSnakeBodyPart.positionX = nextSnakeBodyPart.positionX
      currentSnakeBodyPart.positionY = nextSnakeBodyPart.positionY
    }
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
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

  useEffect(() => {
    function handleKeyDown(event: any) {
      const keyPressed: string = event.key
      if (!keyPressed.includes("Arrow")) return
      snake[0].direction = keyPressed
    }
    const interval = setInterval(() => {
      handleSnakeEatingFood()
      handleSnakeColition()
      updateSnake()
      snake[0].move()
      setSnake(snake => [...snake])
    }, 200)
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval)
    }
  }, [snake]);

  function handleSnakeEatingFood() {
    for (let index = 0; index < food.length; index++) {
      let foodItem = food[index]
      if (snakeAteFoodItem(foodItem)) {
        growSnake()
        deleteFoodItem(index)
        createNewFoodItem()
      }
    }
  }

  function handleSnakeColition() {
    for (let index = 1; index < snake.length; index++) {
      let snakeBodyPart = snake[index]
      if (snakeColided(snakeBodyPart)) {
        alert("Perdiste por tonto")
        location.reload()
      }
    }
  }

  function snakeColided(snakeBodyPart: GameObject) {
    if (snake[0].positionX != snakeBodyPart.positionX) return false
    else if (snake[0].positionY != snakeBodyPart.positionY) return false

    return true
  }

  function snakeAteFoodItem(foodItem: GameObject) {
    let snakeHead = snake[0]
    if (snakeHead.positionX != foodItem.positionX) return false
    else if (snakeHead.positionY != foodItem.positionY) return false

    return true
  }

  function growSnake() {
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
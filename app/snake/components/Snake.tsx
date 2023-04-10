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
      if (keyPressedIsValid(keyPressed)) {
        snake[0].direction = keyPressed
      }
    }
    const interval = setInterval(() => {
      handleSnakeEatingFood()
      handleSnakeColitionWithItsSelf()
      updateSnake()
      snake[0].move()
      setSnake(snake => [...snake])
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
    if (keyDirectionIsOpositeToCurrentDirection(keyPressed)) {
      return false
    }

    return true
  }

  function keyDirectionIsOpositeToCurrentDirection(keyPressed: string) {
    if (keyPressed.includes("Left") && snake[0].direction.includes("Right")) {
      return true
    }
    else if (keyPressed.includes("Right") && snake[0].direction.includes("Left")) {
      return true
    }
    else if (keyPressed.includes("Up") && snake[0].direction.includes("Down")) {
      return true
    }
    else if (keyPressed.includes("Down") && snake[0].direction.includes("Up")) {
      return true
    }
    return false
  }

  function handleSnakeEatingFood() {
    for (let index = 0; index < food.length; index++) {
      let foodItem = food[index]
      if (snakeAteFoodItem(foodItem)) {
        growSnake()
        deleteFoodItem(index)
        addNewFoodItem()
      }
    }
  }

  function handleSnakeColitionWithItsSelf() {
    let snakeHead = snake[0]
    for (let index = 1; index < snake.length; index++) {
      let snakeBodyPart = snake[index]
      if (gameObjectsColide(snakeHead, snakeBodyPart)) {
        alert("Perdiste por tonto")
        location.reload()
      }
    }
  }

  function gameObjectsColide(firstGameObject: GameObject, secondGameObject: GameObject) {
    if (firstGameObject.positionX != secondGameObject.positionX) {
      return false
    }
    else if (firstGameObject.positionY != secondGameObject.positionY) {
      return false
    }

    return true
  }

  function snakeAteFoodItem(foodItem: GameObject) {
    let snakeHead = snake[0]
    if (snakeHead.positionX != foodItem.positionX) {
      return false
    }
    else if (snakeHead.positionY != foodItem.positionY) {
      return false
    }

    return true
  }

  function growSnake() {
    snake.push(new GameObject(0, 0))
  }

  function deleteFoodItem(foodItemIndex: number) {
    food.splice(foodItemIndex, 1)
    setFood(food => [...food])
  }

  function addNewFoodItem() {
    const foodItem = getNewFoodItem()
    if (foodItemColides(foodItem)) {
      addNewFoodItem()
    }
    else {
      food.push(foodItem)
      setFood(food => [...food])
    }
  }

  function getNewFoodItem() {
    const positionX = getRandomInt()
    const positionY = getRandomInt()
    let foodItem = new GameObject(positionX, positionY)

    return foodItem
  }

  function foodItemColides(foodItem: GameObject) {
    if (foodItemColidesWithSnake(foodItem)) {
      return true
    }
    else if (foodItemColidesWithFood(foodItem)) {
      return true
    }

    return false
  }

  function foodItemColidesWithSnake(foodItem: GameObject) {
    for (let snakeBodyPart of snake) {
      if (gameObjectsColide(snakeBodyPart, foodItem)) {
        return true
      }
    }

    return false
  }

  function foodItemColidesWithFood(currentFoodItem: GameObject) {
    for (let foodItem of food) {
      if (gameObjectsColide(foodItem, currentFoodItem)) {
        return true
      }
    }

    return false
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
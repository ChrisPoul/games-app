import { GameObject, gameObjectsColide } from "@/app/gameObject";
import { getRandomInt } from "../common";
import { config } from "../config";

export function keyPressedIsValid(snake: GameObject[], keyPressed: string) {
  if (!keyPressed.includes("Arrow")) {
    return false
  }
  if (snake.length === 1) {
    return true
  }
  const snakeHead = snake[0]
  if (keyPressed.includes("Left") && snakeHead.direction.includes("Right")) {
    return false
  }
  else if (keyPressed.includes("Right") && snakeHead.direction.includes("Left")) {
    return false
  }
  else if (keyPressed.includes("Up") && snakeHead.direction.includes("Down")) {
    return false
  }
  else if (keyPressed.includes("Down") && snakeHead.direction.includes("Up")) {
    return false
  }
  return true
}

export function handleGameCicle(snake: GameObject[], food: GameObject[], direction: string) {
  handleSnakeEatingFood()
  const snakeHead = snake[0]
  const snakeBody = snake.slice(1)
  snakeHead.direction = direction
  // update snake body parts
  for (let index = snakeBody.length; index > 0; index--) {
    let currentBodyPart = snake[index]
    let nextBodyPart = snake[index - 1]
    currentBodyPart.positionX = nextBodyPart.positionX
    currentBodyPart.positionY = nextBodyPart.positionY
  }
  snakeHead.updatePosition(direction)
  const gameStatus = getGameStatus()

  return gameStatus

  function getGameStatus() {
    // handle snake colliding with its self
    let colitions = 0
    for (let snakeBodyPart of snakeBody) {
      if (gameObjectsColide(snakeHead, snakeBodyPart)) {
        snakeHead.direction = ""
        colitions += 1
      }
    }
    if (colitions === snakeBody.length && snakeBody.length > 0) {
      return "game-over"
    }

    return "running"
  }

  function handleSnakeEatingFood() {
    for (let index = 0; index < food.length; index++) {
      let foodItem = food[index]
      if (snakeAteFoodItem(foodItem)) {
        snake.push(new GameObject(0, 0))
        food.splice(index, 1)
        addNewFoodItem(foodItem)
      }
    }

    function snakeAteFoodItem(foodItem: GameObject) {
      const snakeHead = snake[0]
      if (snakeHead.positionX != foodItem.positionX) {
        return false
      }
      else if (snakeHead.positionY != foodItem.positionY) {
        return false
      }
      return true
    }
    function addNewFoodItem(foodItem: GameObject) {
      foodItem.positionX = getRandomInt(config.gameMapWidth)
      foodItem.positionY = getRandomInt(config.gameMapHeight)
      if (foodItemColides(foodItem)) {
        addNewFoodItem(foodItem)
      }
      else {
        food.push(foodItem)
      }

      function foodItemColides(foodItem: GameObject) {
        // check for food item colliding with snake
        for (let BodyPart of snake) {
          if (gameObjectsColide(BodyPart, foodItem)) {
            return true
          }
        }
        // check for food item colliding with food
        for (let currentFoodItem of food) {
          if (gameObjectsColide(foodItem, currentFoodItem)) {
            return true
          }
        }
        return false
      }
    }
  }
}

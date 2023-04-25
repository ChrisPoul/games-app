import { GameObject } from "@/app/gameObject";
import { getRandomInt } from "../common";
import { config } from "../config";

export function keyPressedIsValid(snake: GameObject[], keyPressed: string) {
  if (!keyPressed.includes("Arrow")) { return false }
  if (snake.length === 1) { return true }
  const snakeHead = snake[0]
  const direction = snakeHead.direction
  if (keyPressed.includes("Left") && direction.includes("Right")) { return false }
  else if (keyPressed.includes("Right") && direction.includes("Left")) { return false }
  else if (keyPressed.includes("Up") && direction.includes("Down")) { return false }
  else if (keyPressed.includes("Down") && direction.includes("Up")) { return false }
  return true
}

export function doInterval(gameStatus: string, snake: GameObject[], food: GameObject[]) {
  if (gameStatus === "game-running") {
    handleSnakeEatingFood(snake, food)
    updateSnakePosition(snake)
  }
  else if (gameStatus == "game-ending") {
    snake[0].direction = ""
    updateSnakePosition(snake)
  }

  function handleSnakeEatingFood(snake: GameObject[], food: GameObject[]) {
    const snakeHead = snake[0]
    for (let index = 0; index < food.length; index++) {
      let foodItem = food[index]
      if (snakeHead.collidesWith([foodItem])) {
        snake.push(new GameObject(0, 0))
        addNewFoodItem(foodItem)
        return
      }
    }
    function addNewFoodItem(foodItem: GameObject) {
      foodItem.positionX = getRandomInt(config.gameMapWidth)
      foodItem.positionY = getRandomInt(config.gameMapHeight)
      if (foodItem.collidesWith(snake)) { addNewFoodItem(foodItem) }
      else if (foodItem.collidesWith(food)) { addNewFoodItem(foodItem) }
      else return
    }
  }
  function updateSnakePosition(snake: GameObject[]) {
    const snakeHead = snake[0]
    const snakeBody = snake.slice(1)
    for (let index = snakeBody.length; index > 0; index--) {
      let currentBodyPart = snake[index]
      let nextBodyPart = snake[index - 1]
      currentBodyPart.positionX = nextBodyPart.positionX
      currentBodyPart.positionY = nextBodyPart.positionY
    }
    snakeHead.updatePosition(snakeHead.direction)
  }
}

export function getGameStatus(snake: GameObject[]) {
  const snakeHead = snake[0]
  const snakeBody = snake.slice(1)
  let collitions = 0
  for (let snakeBodyPart of snakeBody) {
    if (snakeHead.collidesWith([snakeBodyPart])) {
      collitions += 1
    }
  }
  if (collitions > 0 && collitions < snakeBody.length) {
    config.milisecondsPerFrame = 200
    return "game-ending"
  }
  if (collitions > 1 && collitions === snakeBody.length) {
    return "game-over"
  }

  return "game-running"
}


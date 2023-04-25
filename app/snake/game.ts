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

export function handleGameCicle(snake: GameObject[], food: GameObject[], direction: string) {
  handleSnakeEatingFood(snake, food)
  updateSnakePosition(snake)
  const gameStatus = getGameStatus(snake)

  return gameStatus

  function handleSnakeEatingFood(snake: GameObject[], food: GameObject[]) {
    for (let index = 0; index < food.length; index++) {
      let foodItem = food[index]
      if (snakeAteFoodItem(foodItem)) {
        snake.push(new GameObject(0, 0))
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
      if (foodItem.collidesWith(snake)) { addNewFoodItem(foodItem) }
      else if (foodItem.collidesWith(food)) { addNewFoodItem(foodItem) }
      else return
    }
  }

  function updateSnakePosition(snake: GameObject[]) {
    const snakeHead = snake[0]
    snakeHead.direction = direction
    const snakeBody = snake.slice(1)
    for (let index = snakeBody.length; index > 0; index--) {
      let currentBodyPart = snake[index]
      let nextBodyPart = snake[index - 1]
      currentBodyPart.positionX = nextBodyPart.positionX
      currentBodyPart.positionY = nextBodyPart.positionY
    }
    snakeHead.updatePosition(direction)
  }

  function getGameStatus(snake: GameObject[]) {
    // handle snake colliding with its self
    const snakeHead = snake[0]
    const snakeBody = snake.slice(1)
    let colitions = 0
    for (let snakeBodyPart of snakeBody) {
      if (snakeHead.collidesWith([snakeBodyPart])) {
        snakeHead.direction = ""
        colitions += 1
      }
    }
    if (colitions === snakeBody.length && snakeBody.length > 0) {
      return "game-over"
    }

    return "running"
  }
}

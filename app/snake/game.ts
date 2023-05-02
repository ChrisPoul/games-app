import { GameObject } from "@/app/gameObject";
import { getRandomInt } from "../common";
import { config } from "../config";

export function snakeDirectionIsValid(oldDirection: string, newDirection: string) {
  if (newDirection == "Left" && oldDirection == "Right") return false
  else if (newDirection == "Right" && oldDirection == "Left") return false
  else if (newDirection == "Up" && oldDirection == "Down") return false
  else if (newDirection == "Down" && oldDirection == "Up") return false

  return true
}

export function doInterval(
  gameStatus: string,
  snakeDirection: string,
  snake: GameObject[],
  food: GameObject[]
) {
  switch (gameStatus) {
    case "game-running":
      handleSnakeEatingFood(snake, food)
      updateSnakePosition(snake)
      const snakeHead = snake[0]
      snakeHead.updatePosition(snakeDirection)
      break
    case "game-ending":
      updateSnakePosition(snake)
      break
  }

  function handleSnakeEatingFood(snake: GameObject[], food: GameObject[]) {
    const snakeHead = snake[0]
    for (const foodItem of food) {
      if (snakeHead.collidesWith([foodItem])) {
        snake.push(new GameObject(0, 0))
        addNewFoodItem(snake, foodItem)
        config.milisecondsPerFrame -= 1
        return
      }
    }
    function addNewFoodItem(snake: GameObject[], foodItem: GameObject) {
      foodItem.positionX = getRandomInt(config.gameMapWidth)
      foodItem.positionY = getRandomInt(config.gameMapHeight)
      if (foodItem.collidesWith(snake)) { addNewFoodItem(snake, foodItem) }
      else if (foodItem.collidesWith(food)) { addNewFoodItem(snake, foodItem) }
      else return
    }
  }
  function updateSnakePosition(snake: GameObject[]) {
    const snakeBody = snake.slice(1)
    for (let index = snakeBody.length; index > 0; index--) {
      let currentBodyPart = snake[index]
      let nextBodyPart = snake[index - 1]
      currentBodyPart.positionX = nextBodyPart.positionX
      currentBodyPart.positionY = nextBodyPart.positionY
    }
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
    return "game-ending"
  }
  else if (collitions > 1 && collitions === snakeBody.length) {
    return "game-over"
  }
  return "game-running"
}


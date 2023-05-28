import { GameObject } from "./gameObject";
import { getRandomInt } from "../common";
import { config } from "./config";

export function getMapWidth() {
  return Math.floor(100 / config.horizontalScaling) + 1
}

function getMapHeight() {
  return Math.floor(100 / config.verticalScaling) + 1
}

export function playerDirectionIsValid(oldDirection: string, newDirection: string) {
  if (newDirection == "Left" && oldDirection == "Right") return false
  else if (newDirection == "Right" && oldDirection == "Left") return false
  else if (newDirection == "Up" && oldDirection == "Down") return false
  else if (newDirection == "Down" && oldDirection == "Up") return false

  return true
}

export function updatePlayer(snake: GameObject[], food: GameObject[], playerDirection: string) {
  const mapWidth = getMapWidth()
  const mapHeight = getMapHeight()
  handleSnakeEatingFood(snake, food)
  updateSnakeBody(snake)
  updateSnakeHead(snake[0])

  function handleSnakeEatingFood(snake: GameObject[], food: GameObject[]) {
    const snakeHead = snake[0]
    for (let i = 0; i < food.length; i++) {
      const foodItem = food[i]
      if (snakeHead.collidesWith([foodItem])) {
        snake.push(new GameObject(0, 0))
        food.splice(i, 1)
        addNewFoodItem(food, snake)
        config.milisecondsPerFrame -= config.speedIncrease
        return
      }
    }
  }
  function updateSnakeBody(snake: GameObject[]) {
    const snakeBody = snake.slice(1)
    for (let index = snakeBody.length; index > 0; index--) {
      let currentBodyPart = snake[index]
      let nextBodyPart = snake[index - 1]
      currentBodyPart.X = nextBodyPart.X
      currentBodyPart.Y = nextBodyPart.Y
    }
  }
  function updateSnakeHead(snakeHead: GameObject) {
    snakeHead.move(playerDirection)
    if (snakeHead.X >= mapWidth) { snakeHead.X = 0 }
    else if (snakeHead.X < 0) { snakeHead.X = mapWidth - 1 }
    if (snakeHead.Y < 0) { snakeHead.Y = mapHeight - 1 }
    else if (snakeHead.Y >= mapHeight) { snakeHead.Y = 0 }
  }
}

export function addNewFoodItem(food: GameObject[], snake: GameObject[]) {
  const foodItem = new GameObject(
    getRandomInt(getMapWidth()), getRandomInt(getMapHeight())
  )
  if (foodItem.collidesWith(snake)) { addNewFoodItem(food, snake) }
  else if (foodItem.collidesWith(food)) { addNewFoodItem(food, snake) }
  else { food.push(foodItem); return }
}

export function playerLosses(player: GameObject[]) {
  const snakeHead = player[0]
  const playerBody = player.slice(1)
  if (snakeHead.collidesWith(playerBody)) { return true }
  return false
}


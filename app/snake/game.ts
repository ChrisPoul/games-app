import { GameObject } from "./gameObject";
import { getRandomInt } from "../common";
import { config } from "./config";

export function getMapWidth() {
  return Math.floor(100 / config.horizontalScaling)
}

function getMapHeight() {
  return Math.floor(100 / config.verticalScaling)
}

export function playerDirectionIsValid(oldDirection: string, newDirection: string) {
  if (newDirection == "Left" && oldDirection == "Right") return false
  else if (newDirection == "Right" && oldDirection == "Left") return false
  else if (newDirection == "Up" && oldDirection == "Down") return false
  else if (newDirection == "Down" && oldDirection == "Up") return false

  return true
}

export function updatePlayer(player: GameObject[], food: GameObject[], playerDirection: string) {
  const mapWidth = getMapWidth()
  const mapHeight = getMapHeight()
  handleSnakeEatingFood(player, food)
  updateSnakePosition(player)
  const playerHead = player[0]
  playerHead.move(playerDirection)
  if (playerHead.X >= mapWidth) {
    playerHead.X = 0
  }
  else if (playerHead.X < 0) {
    playerHead.X = mapWidth - 1
  }
  if (playerHead.Y < 0) {
    playerHead.Y = mapHeight - 1
  }
  if (playerHead.Y >= mapHeight) {
    playerHead.Y = 0
  }

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
  function updateSnakePosition(snake: GameObject[]) {
    const snakeBody = snake.slice(1)
    for (let index = snakeBody.length; index > 0; index--) {
      let currentBodyPart = snake[index]
      let nextBodyPart = snake[index - 1]
      currentBodyPart.X = nextBodyPart.X
      currentBodyPart.Y = nextBodyPart.Y
    }
  }
}

export function addNewFoodItem(food: GameObject[], snake: GameObject[]) {
  const foodItem = new GameObject(
    getRandomInt(getMapWidth()), getRandomInt(getMapWidth())
  )
  if (foodItem.collidesWith(snake)) { addNewFoodItem(food, snake) }
  else if (foodItem.collidesWith(food)) { addNewFoodItem(food, snake) }
  else { food.push(foodItem); return }
}

export function playerLosses(player: GameObject[]) {
  const playerHead = player[0]
  const playerBody = player.slice(1)
  if (playerHead.collidesWith(playerBody)) { return true }
  return false
}


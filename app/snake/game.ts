import { GameObject } from "@/app/gameObject";
import { getRandomInt } from "../common";
import { config } from "../config";

export function playerDirectionIsValid(oldDirection: string, newDirection: string) {
  if (newDirection == "Left" && oldDirection == "Right") return false
  else if (newDirection == "Right" && oldDirection == "Left") return false
  else if (newDirection == "Up" && oldDirection == "Down") return false
  else if (newDirection == "Down" && oldDirection == "Up") return false

  return true
}

export function updatePlayer(player: GameObject[], food: GameObject[], playerDirection: string) {
  handleSnakeEatingFood(player, food)
  updateSnakePosition(player)
  const playerHead = player[0]
  playerHead.updatePosition(playerDirection)

  function handleSnakeEatingFood(snake: GameObject[], food: GameObject[]) {
    const snakeHead = snake[0]
    for (const foodItem of food) {
      if (snakeHead.collidesWith([foodItem])) {
        snake.push(new GameObject(0, 0))
        addNewFoodItem(snake, foodItem)
        config.milisecondsPerFrame -= config.speedIncrease
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

export function playerLosses(player: GameObject[]) {
  const playerHead = player[0]
  const playerBody = player.slice(1)
  if (playerHead.collidesWith(playerBody)) { return true }
  return false
}


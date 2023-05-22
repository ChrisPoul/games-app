import { GameObject } from "./gameObject";
import { getRandomInt } from "../common";
import { config } from "./config";

export function playerDirectionIsValid(oldDirection: string, newDirection: string) {
  if (newDirection == "Left" && oldDirection == "Right") return false
  else if (newDirection == "Right" && oldDirection == "Left") return false
  else if (newDirection == "Up" && oldDirection == "Down") return false
  else if (newDirection == "Down" && oldDirection == "Up") return false

  return true
}

export function updatePlayer(player: Figure, food: Figure, playerDirection: string) {
  handleSnakeEatingFood(player, food)
  updateSnakePosition(player)
  const playerHead = player[0]
  playerHead.updatePosition(playerDirection)

  function handleSnakeEatingFood(snake: Figure, food: Figure) {
    const snakeHead = snake[0]
    for (const foodItem of food) {
      if (snakeHead.collidesWith([foodItem])) {
        snake.push(new GameObject(0, 0))
        addNewFoodItem(snake, foodItem)
        config.milisecondsPerFrame -= config.speedIncrease
        return
      }
    }
    function addNewFoodItem(snake: Figure, foodItem: GameObject) {
      foodItem.X = getRandomInt(config.gameMapWidth)
      foodItem.Y = getRandomInt(config.gameMapHeight)
      if (foodItem.collidesWith(snake)) { addNewFoodItem(snake, foodItem) }
      else if (foodItem.collidesWith(food)) { addNewFoodItem(snake, foodItem) }
      else return
    }
  }

  function updateSnakePosition(snake: Figure) {
    const snakeBody = snake.slice(1)
    for (let index = snakeBody.length; index > 0; index--) {
      let currentBodyPart = snake[index]
      let nextBodyPart = snake[index - 1]
      currentBodyPart.X = nextBodyPart.X
      currentBodyPart.Y = nextBodyPart.Y
    }
  }
}

export function playerLosses(player: Figure) {
  const playerHead = player[0]
  const playerBody = player.slice(1)
  if (playerHead.collidesWith(playerBody)) { return true }
  return false
}


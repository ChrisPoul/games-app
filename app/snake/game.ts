import Food from "./food";
import Snake from "./snake";
import { GameObject } from "./gameObject";

export function gameObjectsColide(firstGameObject: GameObject, secondGameObject: GameObject) {
  if (firstGameObject.positionX != secondGameObject.positionX) {
    return false
  }
  else if (firstGameObject.positionY != secondGameObject.positionY) {
    return false
  }

  return true
}

export function keyPressedIsValid(snake: Snake, keyPressed: string) {
  if (!keyPressed.includes("Arrow")) {
    return false
  }
  if (snake.length === 1) {
    return true
  }
  if (keyDirectionIsOpositeToCurrentDirection()) {
    return false
  }
  function keyDirectionIsOpositeToCurrentDirection() {
    const snakeHead = snake[0]
    if (keyPressed.includes("Left") && snakeHead.direction.includes("Right")) {
      return true
    }
    else if (keyPressed.includes("Right") && snakeHead.direction.includes("Left")) {
      return true
    }
    else if (keyPressed.includes("Up") && snakeHead.direction.includes("Down")) {
      return true
    }
    else if (keyPressed.includes("Down") && snakeHead.direction.includes("Up")) {
      return true
    }
    return false
  }
  return true
}

export function handleGameCicle(snake: Snake, food: Food, direction: string) {
  const snakeHead = snake[0]
  handleSnakeEatingFood()
  snake.update()
  snakeHead.updatePosition(direction)
  function handleSnakeEatingFood() {
    for (let index = 0; index < food.length; index++) {
      let foodItem = food[index]
      if (snake.ateFoodItem(foodItem)) {
        snake.grow()
        food.deleteFoodItem(index)
        food.addNewFoodItem(snake)
      }
    }
  }
}



export function endGame(snake: Snake, food: Food) {
  const snakeHead = snake[0]
  snakeHead.direction = ""
}
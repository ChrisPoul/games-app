import Food from "./food";
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

export function keyPressedIsValid(snake: GameObject[], keyPressed: string) {
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

export function handleGameCicle(snake: GameObject[], food: Food, direction: string) {
  const snakeHead = snake[0]
  handleSnakeEatingFood()
  updateSnakeBody()
  snakeHead.updatePosition(direction)
  function handleSnakeEatingFood() {
    for (let index = 0; index < food.length; index++) {
      let foodItem = food[index]
      if (snakeAteFoodItem(foodItem)) {
        growSnake()
        food.deleteFoodItem(index)
        food.addNewFoodItem(snake)
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
    function growSnake() {
      snake.push(new GameObject(0, 0))
    }
  }
  function updateSnakeBody() {
    for (let index = snake.length - 1; index > 0; index--) {
      let currentBodyPart = snake[index]
      let nextBodyPart = snake[index - 1]
      currentBodyPart.positionX = nextBodyPart.positionX
      currentBodyPart.positionY = nextBodyPart.positionY
    }
  }
}

export function snakeCollidesWithItsSelf(snake: GameObject[]) {
  const snakeBody = snake.slice(1)
  const snakeHead = snake[0]
  for (let bodyPart of snakeBody) {
    if (gameObjectsColide(snakeHead, bodyPart)) {
      return true
    }
  }
  return false
}

export function endGame(snake: GameObject[], food: Food) {
  const snakeHead = snake[0]
  snakeHead.direction = ""
}
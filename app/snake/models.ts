export class GameObject {
  positionX: number
  positionY: number
  constructor(positionX: number, positionY: number) {
    this.positionX = positionX
    this.positionY = positionY
  }

  moveRight(distance: number) {
    this.positionX = this.positionX + distance
  }
  moveLeft(distance: number) {
    this.positionX = this.positionX - distance
  }
  moveUp(distance: number) {
    this.positionY = this.positionY - distance
  }
  moveDown(distance: number) {
    this.positionY = this.positionY + distance
  }
}

export class GameBoard {
  food: GameObject
  constructor(food: GameObject) {
    this.food = food
  }

  updateSnakeBody(snakeBody: GameObject[]) {
    for (let i = snakeBody.length - 1; i > 0; i--) {
      let currentSnakeBodyPart = snakeBody[i]
      let nextSnakeBodyPart = snakeBody[i - 1]
      currentSnakeBodyPart.positionX = nextSnakeBodyPart.positionX
      currentSnakeBodyPart.positionY = nextSnakeBodyPart.positionY
    }
  }

  eat(snakeBody: GameObject[]) {
    let snakeHead = snakeBody[0]
    if (snakeHead.positionX === this.food.positionX && snakeHead.positionY === this.food.positionY) {
      snakeBody.push(new GameObject(0, 0))
    }
  }
}
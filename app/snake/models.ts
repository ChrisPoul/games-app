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

export class Snake {
  body: GameObject[]
  head: GameObject
  constructor(body: GameObject[]) {
    this.body = body
    this.head = body[0]
  }

  updateBody() {
    for (let i = this.body.length - 1; i > 0; i--) {
      let currentSnakeBodyPart = this.body[i]
      let nextSnakeBodyPart = this.body[i - 1]
      currentSnakeBodyPart.positionX = nextSnakeBodyPart.positionX
      currentSnakeBodyPart.positionY = nextSnakeBodyPart.positionY
    }
  }
}
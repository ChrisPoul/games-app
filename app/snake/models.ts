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

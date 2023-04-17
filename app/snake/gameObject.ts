import { config } from "@/app/config"

const distance = 1

export class GameObject {
  positionX: number
  positionY: number
  direction: string
  constructor(positionX: number, positionY: number) {
    this.positionX = positionX
    this.positionY = positionY
    this.direction = "Down"
  }

  updatePosition(direction: string) {
    if (direction.includes("Right")) {
      this.positionX = this.positionX + distance
    }
    else if (direction.includes("Left")) {
      this.positionX = this.positionX - distance
    }
    if (direction.includes("Up")) {
      this.positionY = this.positionY - distance
    }
    else if (direction.includes("Down")) {
      this.positionY = this.positionY + distance
    }
    if (this.positionX >= config.gameMapWidth) {
      this.positionX = 0
    }
    else if (this.positionX < 0) {
      this.positionX = config.gameMapWidth - 1
    }
    if (this.positionY < 0) {
      this.positionY = config.gameMapHeight - 1
    }
    if (this.positionY >= config.gameMapHeight) {
      this.positionY = 0
    }
  }
}
import { getRandomInt } from "@/app/common";

const distance = 1

export class GameObject {
  positionX: number
  positionY: number
  direction: string
  constructor(positionX: number, positionY: number) {
    this.positionX = positionX
    this.positionY = positionY
    this.direction = "Right"
  }

  move() {
    if (this.direction.includes("Right")) {
      this.positionX = this.positionX + distance
    }
    if (this.direction.includes("Left")) {
      this.positionX = this.positionX - distance
    }
    if (this.direction.includes("Up")) {
      this.positionY = this.positionY - distance
    }
    if (this.direction.includes("Down")) {
      this.positionY = this.positionY + distance
    }
  }
}

export function gameObjectsColide(firstGameObject: GameObject, secondGameObject: GameObject) {
  if (firstGameObject.positionX != secondGameObject.positionX) {
    return false
  }
  else if (firstGameObject.positionY != secondGameObject.positionY) {
    return false
  }

  return true
}
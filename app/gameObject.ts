import { config } from "@/app/config"

const distance = 1

export class GameObject {
  positionX: number
  positionY: number
  constructor(positionX: number, positionY: number) {
    this.positionX = positionX
    this.positionY = positionY
  }
  /**
   * @param gameObjects Should be a list of instances of {@link GameObject}.
   * We assert if the object colides with any of the objects contained
   * in the list.
   */
  collidesWith(gameObjects: GameObject[]) {
    for (const gameObject of gameObjects) {
      const yAxisMatches = this.positionY === gameObject.positionY
      const xAxisMatches = this.positionX === gameObject.positionX
      if (yAxisMatches && xAxisMatches && this != gameObject) { return true }
    }
    return false
  }

  updatePosition(direction: string) {
    switch (direction) {
      case "Right":
        this.positionX = this.positionX + distance
        break
      case "Left":
        this.positionX = this.positionX - distance
        break
      case "Up":
        this.positionY = this.positionY - distance
        break
      case "Down":
        this.positionY = this.positionY + distance
        break
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

import { config } from "./config"

const distance = 1

export class GameObject {
  X: number
  Y: number
  constructor(X: number, Y: number) {
    this.X = X
    this.Y = Y
  }
  /**
   * @param gameObjects Should be a list of instances of {@link GameObject}.
   * We assert if the object colides with any of the objects contained
   * in the list.
   */
  collidesWith(gameObjects: GameObject[]) {
    for (const gameObject of gameObjects) {
      const yAxisMatches = this.Y === gameObject.Y
      const xAxisMatches = this.X === gameObject.X
      if (yAxisMatches && xAxisMatches && this != gameObject) { return true }
    }
    return false
  }

  move(direction: string) {
    switch (direction) {
      case "Right":
        this.X = this.X + distance
        break
      case "Left":
        this.X = this.X - distance
        break
      case "Up":
        this.Y = this.Y - distance
        break
      case "Down":
        this.Y = this.Y + distance
        break
    }
  }
}

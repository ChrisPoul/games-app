import { config } from "./config"

const DEFAULT_DISTANCE = 1

export class GameObject {
  X: number
  Y: number
  constructor(X: number, Y: number) {
    this.X = X
    this.Y = Y
  }
  getCoordenates() { return [this.X, this.Y] }
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

  moveRight(distance: number = DEFAULT_DISTANCE) {
    this.X = this.X + distance
  }
  moveLeft(distance: number = DEFAULT_DISTANCE) {
    this.X = this.X - distance
  }
  moveUp(distance: number = DEFAULT_DISTANCE) {
    this.Y = this.Y - distance
  }
  moveDown(distance: number = DEFAULT_DISTANCE) {
    this.Y = this.Y + distance
  }
}

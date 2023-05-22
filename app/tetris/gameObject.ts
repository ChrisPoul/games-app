const DEFAULT_DISTANCE = 1

export type Direction = "Up" | "Left" | "Right" | "Down"

export class GameObject {
  X: number
  Y: number
  color: string
  constructor(X: number, Y: number, color: string) {
    this.X = X
    this.Y = Y
    this.color = color
  }
  getCoordenates() { return [this.X, this.Y] }
  /**
   * @param gameObjects Should be a list of instances of {@link GameObject}.
   * We assert if the object colides with any of the objects contained
   * in the list.
   */
  collidesWith(gameObjects: Figure) {
    for (const gameObject of gameObjects) {
      const yAxisMatches = this.Y === gameObject.Y
      const xAxisMatches = this.X === gameObject.X
      if (yAxisMatches && xAxisMatches && this != gameObject) { return true }
    }
    return false
  }

  move(direction: Direction, distance: number = DEFAULT_DISTANCE) {
    switch (direction) {
      case "Up": this.Y = this.Y - distance; break
      case "Down": this.Y = this.Y + distance; break
      case "Right": this.X = this.X + distance; break
      case "Left": this.X = this.X - distance; break
    }
  }
}

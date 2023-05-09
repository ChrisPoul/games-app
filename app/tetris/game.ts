import { GameObject } from "./gameObject";

export function updateFigurePosition(figure: GameObject[], direction: string) {
  for (let figurePart of figure) {
    figurePart.updatePosition(direction)
  }
}
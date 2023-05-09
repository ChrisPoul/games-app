import { GameObject } from "./gameObject"

export function createIFigure() {
  let initialXPosition = 0
  let initialYPosition = 0
  let figure = [
    new GameObject(initialXPosition, initialYPosition),
    new GameObject(initialXPosition + 1, initialYPosition),
    new GameObject(initialXPosition + 2, initialYPosition),
    new GameObject(initialXPosition + 3, initialYPosition)
  ]
  return figure
}

export function createLFigure() {
  let figure = []
}
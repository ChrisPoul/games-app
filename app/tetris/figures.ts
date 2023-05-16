import { config } from "./config"
import { GameObject } from "./gameObject"

const initialX = Math.floor(config.gameMapWidth / 2)
const initialY = 0

export function getFigure(figureName: "I" | "L" | "T" | "O" | "S" | "Z") {
  switch (figureName) {
    case "I": return getIFigure()
    case "L": return getLFigure()
    case "T": return getTFigure()
    case "O": return getOFigure()
    case "S": return getSFigure()
    case "Z": return getZFigure()
  }

  function getIFigure() {
    let figure = [
      new GameObject(initialX, initialY),
      new GameObject(initialX + 1, initialY),
      new GameObject(initialX + 2, initialY),
      new GameObject(initialX + 3, initialY)
    ]
    return figure
  }
  function getLFigure() {
    let figure = [
      new GameObject(initialX, initialY),
      new GameObject(initialX + 1, initialY),
      new GameObject(initialX + 2, initialY),
      new GameObject(initialX + 3, initialY),
      new GameObject(initialX + 3, initialY + 1),
    ]
    return figure
  }
  function getTFigure() {
    let figure = [
      new GameObject(initialX, initialY),
      new GameObject(initialX + 1, initialY),
      new GameObject(initialX + 1, initialY + 1),
      new GameObject(initialX + 2, initialY),
    ]
    return figure
  }
  function getOFigure() {
    let figure = [
      new GameObject(initialX, initialY),
      new GameObject(initialX, initialY + 1),
      new GameObject(initialX + 1, initialY),
      new GameObject(initialX + 1, initialY + 1),
    ]
    return figure
  }
  function getSFigure() {
    let figure = [
      new GameObject(initialX, initialY + 1),
      new GameObject(initialX + 1, initialY + 1),
      new GameObject(initialX + 1, initialY),
      new GameObject(initialX + 2, initialY + 1),
    ]
    return figure
  }
  function getZFigure() {
    let figure = [
      new GameObject(initialX, initialY),
      new GameObject(initialX + 1, initialY),
      new GameObject(initialX + 1, initialY + 1),
      new GameObject(initialX + 2, initialY + 1),
    ]
    return figure
  }
}

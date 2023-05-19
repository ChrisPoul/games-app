import { config } from "./config"
import { GameObject } from "./gameObject"

const initialX = Math.floor(config.gameMapWidth / 2)
const initialY = 0

export type FigureName = "I" | "L" | "T" | "O" | "S" | "Z"

export function getFigure(figureName: FigureName) {
  switch (figureName) {
    case "I": return getIFigure()
    case "L": return getLFigure()
    case "T": return getTFigure()
    case "O": return getOFigure()
    case "S": return getSFigure()
    case "Z": return getZFigure()
  }

  function getIFigure() {
    const figureColor = "bg-red-600"
    let figure = [
      new GameObject(initialX, initialY, figureColor),
      new GameObject(initialX + 1, initialY, figureColor),
      new GameObject(initialX + 2, initialY, figureColor),
      new GameObject(initialX + 3, initialY, figureColor),
    ]
    return figure
  }
  function getLFigure() {
    const figureColor = "bg-yellow-300"
    let figure = [
      new GameObject(initialX, initialY, figureColor),
      new GameObject(initialX + 1, initialY, figureColor),
      new GameObject(initialX + 2, initialY, figureColor),
      new GameObject(initialX + 2, initialY + 1, figureColor),
    ]
    return figure
  }
  function getTFigure() {
    const figureColor = "bg-green-600"
    let figure = [
      new GameObject(initialX, initialY, figureColor),
      new GameObject(initialX + 1, initialY, figureColor),
      new GameObject(initialX + 1, initialY + 1, figureColor),
      new GameObject(initialX + 2, initialY, figureColor),
    ]
    return figure
  }
  function getOFigure() {
    const figureColor = "bg-blue-800"
    let figure = [
      new GameObject(initialX, initialY, figureColor),
      new GameObject(initialX, initialY + 1, figureColor),
      new GameObject(initialX + 1, initialY, figureColor),
      new GameObject(initialX + 1, initialY + 1, figureColor),
    ]
    return figure
  }
  function getSFigure() {
    const figureColor = "bg-purple-800"
    let figure = [
      new GameObject(initialX, initialY + 1, figureColor),
      new GameObject(initialX + 1, initialY + 1, figureColor),
      new GameObject(initialX + 1, initialY, figureColor),
      new GameObject(initialX + 2, initialY, figureColor),
    ]
    return figure
  }
  function getZFigure() {
    const figureColor = "bg-gray-400"
    let figure = [
      new GameObject(initialX, initialY, figureColor),
      new GameObject(initialX + 1, initialY, figureColor),
      new GameObject(initialX + 1, initialY + 1, figureColor),
      new GameObject(initialX + 2, initialY + 1, figureColor),
    ]
    return figure
  }
}

import { config } from "./config"
import { Direction, GameObject } from "./gameObject"

const INITIAL_X = Math.floor(config.gameMapWidth / 2)
const INITIAL_Y = 0

export type FigureName = "I" | "L" | "T" | "O" | "S" | "Z"

export class Figure extends Array<GameObject> {
  // constructor(...figureBlocks: Figure) {
  //   super(...figureBlocks)
  // }
  move(direction: Direction) {
    for (let figurePart of this) {
      figurePart.move(direction)
    }
  }
}

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
    const figureColor = "red-600"
    return new Figure(
      new GameObject(INITIAL_X, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 2, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 3, INITIAL_Y, figureColor),
    )
  }
  function getLFigure() {
    const figureColor = "yellow-300"
    return new Figure(
      new GameObject(INITIAL_X, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 2, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 2, INITIAL_Y + 1, figureColor),
    )
  }
  function getTFigure() {
    const figureColor = "green-600"
    return new Figure(
      new GameObject(INITIAL_X, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y + 1, figureColor),
      new GameObject(INITIAL_X + 2, INITIAL_Y, figureColor),
    )
  }
  function getOFigure() {
    const figureColor = "blue-800"
    return new Figure(
      new GameObject(INITIAL_X, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X, INITIAL_Y + 1, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y + 1, figureColor),
    )
  }
  function getSFigure() {
    const figureColor = "purple-800"
    return new Figure(
      new GameObject(INITIAL_X, INITIAL_Y + 1, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y + 1, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 2, INITIAL_Y, figureColor),
    )
  }
  function getZFigure() {
    const figureColor = "gray-400"
    return new Figure(
      new GameObject(INITIAL_X, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y + 1, figureColor),
      new GameObject(INITIAL_X + 2, INITIAL_Y + 1, figureColor),
    )
  }
}

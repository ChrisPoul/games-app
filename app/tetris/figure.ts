import { config } from "./config"
import { GameObject } from "./gameObject"

const INITIAL_X = Math.floor(config.gameMapWidth / 2)
const INITIAL_Y = -1

export class Figure extends Array<GameObject> {
  constructor(...figureBlocks: GameObject[]) {
    super(...figureBlocks)
  }
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
    const figureColor = "red"
    return new Figure(
      new GameObject(INITIAL_X, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 2, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 3, INITIAL_Y, figureColor),
    )
  }
  function getLFigure() {
    const figureColor = "yellow"
    return new Figure(
      new GameObject(INITIAL_X, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 2, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 2, INITIAL_Y + 1, figureColor),
    )
  }
  function getTFigure() {
    const figureColor = "green"
    return new Figure(
      new GameObject(INITIAL_X, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y + 1, figureColor),
      new GameObject(INITIAL_X + 2, INITIAL_Y, figureColor),
    )
  }
  function getOFigure() {
    const figureColor = "blue"
    return new Figure(
      new GameObject(INITIAL_X, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X, INITIAL_Y + 1, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y + 1, figureColor),
    )
  }
  function getSFigure() {
    const figureColor = "purple"
    return new Figure(
      new GameObject(INITIAL_X, INITIAL_Y + 1, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y + 1, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 2, INITIAL_Y, figureColor),
    )
  }
  function getZFigure() {
    const figureColor = "aqua"
    return new Figure(
      new GameObject(INITIAL_X, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y, figureColor),
      new GameObject(INITIAL_X + 1, INITIAL_Y + 1, figureColor),
      new GameObject(INITIAL_X + 2, INITIAL_Y + 1, figureColor),
    )
  }
}

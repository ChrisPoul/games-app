import { getRandomInt } from "../common";
import { config } from "./config";
import { FigureName, getFigure } from "./figures";
import { Direction, GameObject } from "./gameObject";

export function updateFigurePosition(placedFigures: GameObject[][], currentFigure: GameObject[], direction: Direction) {
  moveFigure(currentFigure, direction)
  switch (direction) {
    case "Right":
      if (figureCollides(currentFigure, placedFigures)) { moveFigure(currentFigure, "Left") }; break
    case "Left":
      if (figureCollides(currentFigure, placedFigures)) { moveFigure(currentFigure, "Right") }; break
  }

  function moveFigure(figure: GameObject[], direction: Direction) {
    for (let figurePart of figure) {
      figurePart.move(direction)
    }
  }
}

export function generateRandomFigure() {
  const figureNames: FigureName[] = ["I", "L", "T", "O", "S", "Z"]
  const randomIndex = getRandomInt(figureNames.length - 1)
  const randomFigureName = figureNames[randomIndex]

  return getFigure(randomFigureName)
}

export function figureReachesTop(figure: GameObject[]) {
  for (const figurePart of figure) {
    if (figurePart.Y < 0) { return true }
  }
  return false
}

export function figureCollides(currentFigure: GameObject[], placedFigures: GameObject[][]) {
  for (let figurePart of currentFigure) {
    if (figurePartExitsMap(figurePart)) { return true }
    if (figurePartCollidesWithPlacedFigures(figurePart, placedFigures)) { return true }
  }
  return false

  function figurePartExitsMap(figurePart: GameObject) {
    if (figurePart.X == -1) { return true }
    if (figurePart.X == config.gameMapWidth) { return true }
    if (figurePart.Y == config.gameMapHeight) { return true }
    return false
  }
  function figurePartCollidesWithPlacedFigures(figurePart: GameObject, placedFigures: GameObject[][]) {
    for (const placedFigure of placedFigures) {
      if (figurePart.collidesWith(placedFigure)) { return true }
    }
    for (const placedFigure of placedFigures) {
      if (figurePart.collidesWith(placedFigure)) { return true }
    }
    return false
  }
}

export function updateFigureRotation(placedFigures: GameObject[][], currentFigure: GameObject[], direction: "right" | "left") {
  if (direction == "right") {
    rotateFigure(currentFigure, direction)
    if (figureCollides(currentFigure, placedFigures)) { rotateFigure(currentFigure, "left") }
  }
  if (direction == "left") {
    rotateFigure(currentFigure, direction)
    if (figureCollides(currentFigure, placedFigures)) { rotateFigure(currentFigure, "right") }
  }

  function rotateFigure(figure: GameObject[], direction: "right" | "left") {
    const centerFigurePart = figure[Math.floor(figure.length / 2)]
    const posX = centerFigurePart.X
    const posY = centerFigurePart.Y
    if (direction == "right") { rotateFigureRight() }
    else if (direction == "left") { rotateFigureLeft() }

    function rotateFigureRight() {
      for (let figurePart of figure) {
        figurePart.X -= posX
        figurePart.Y -= posY
        const newX = figurePart.Y * -1
        const newY = figurePart.X
        figurePart.X = newX + posX
        figurePart.Y = newY + posY
      }
    }
    function rotateFigureLeft() {
      for (let figurePart of figure) {
        figurePart.X -= posX
        figurePart.Y -= posY
        const newX = figurePart.Y
        const newY = figurePart.X * -1
        figurePart.X = newX + posX
        figurePart.Y = newY + posY
      }
    }
  }
}

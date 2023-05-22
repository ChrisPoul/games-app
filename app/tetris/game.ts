import { getRandomInt } from "../common";
import { config } from "./config";
import { FigureName, getFigure } from "./figures";
import { Direction, GameObject } from "./gameObject";
import { Figure } from "./figures";

export function updateFigurePosition(placedFigures: Figure[], currentFigure: Figure, direction: Direction) {
  currentFigure.move(direction)
  switch (direction) {
    case "Right":
      if (figureCollides(currentFigure, placedFigures)) { currentFigure.move("Left") }; break
    case "Left":
      if (figureCollides(currentFigure, placedFigures)) { currentFigure.move("Right") }; break
  }
}

export function handleFigureGoingDown(placedFigures: Figure[], figure: Figure): [Figure[], Figure] {
  updateFigurePosition(placedFigures, figure, "Down")
  if (figureCollides(figure, placedFigures)) {
    placedFigures = updatePlacedFigures(placedFigures, figure)
    figure = generateRandomFigure()
  }
  return [placedFigures, figure]
}

export function updatePlacedFigures(placedFigures: Figure[], figure: Figure) {
  placedFigures.push(figure)
  let horizontalLines: { [lineNumber: number]: number } = {};
  for (const placedFigure of placedFigures) {
    for (const figurePart of placedFigure) {
      if (horizontalLines.hasOwnProperty(figurePart.Y)) {
        horizontalLines[figurePart.Y] += 1
      }
      else { horizontalLines[figurePart.Y] = 0 }
    }
  }
  // remove horizontal lines
  for (const lineNumber in horizontalLines) {
    if (horizontalLines[lineNumber] == config.gameMapWidth - 1) {
      let updatedPlacedFigures: Figure[] = []
      for (const placedFigure of placedFigures) {
        let updatedPlacedFigure = new Figure()
        for (const figurePart of placedFigure) {
          if (figurePart.Y == +lineNumber) { continue }
          if (figurePart.Y < +lineNumber) { figurePart.Y += 1 }
          updatedPlacedFigure.push(figurePart)
        }
        updatedPlacedFigures.push(updatedPlacedFigure)
      }
      return updatedPlacedFigures
    }
  }
  return [...placedFigures]
}

export function generateRandomFigure() {
  const figureNames: FigureName[] = ["I", "L", "T", "O", "S", "Z"]
  const randomIndex = getRandomInt(figureNames.length - 1)
  const randomFigureName = figureNames[randomIndex]

  return getFigure(randomFigureName)
}

export function figureReachesTop(figure: Figure) {
  for (const figurePart of figure) {
    if (figurePart.Y < 0) { return true }
  }
  return false
}

export function figureCollides(currentFigure: Figure, placedFigures: Figure[]) {
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
  function figurePartCollidesWithPlacedFigures(figurePart: GameObject, placedFigures: Figure[]) {
    for (const placedFigure of placedFigures) {
      if (figurePart.collidesWith(placedFigure)) { return true }
    }
    for (const placedFigure of placedFigures) {
      if (figurePart.collidesWith(placedFigure)) { return true }
    }
    return false
  }
}

export function updateFigureRotation(placedFigures: Figure[], currentFigure: Figure, direction: "right" | "left") {
  if (direction == "right") {
    rotateFigure(currentFigure, direction)
    if (figureCollides(currentFigure, placedFigures)) { rotateFigure(currentFigure, "left") }
  }
  if (direction == "left") {
    rotateFigure(currentFigure, direction)
    if (figureCollides(currentFigure, placedFigures)) { rotateFigure(currentFigure, "right") }
  }

  function rotateFigure(figure: Figure, direction: "right" | "left") {
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

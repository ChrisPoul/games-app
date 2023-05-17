import { getRandomInt } from "../common";
import { config } from "./config";
import { FigureName, getFigure } from "./figures";
import { GameObject } from "./gameObject";

export function generateRandomFigure() {
  const figureNames: FigureName[] = ["I", "L", "T", "O", "S", "Z"]
  const randomIndex = getRandomInt(figureNames.length - 1)
  const randomFigureName = figureNames[randomIndex]

  return getFigure(randomFigureName)
}

export function updateFigurePosition(figure: GameObject[], direction: string) {
  let collition_left_wall = false
  let collition_right_wall = false
  for (let figurePart of figure) {
    switch (direction) {
      case "Right":
        if (figurePart.X == config.gameMapWidth - 1) { collition_right_wall = true }
        figurePart.moveRight()
        break
      case "Left":
        if (figurePart.X == 0) { collition_left_wall = true }
        figurePart.moveLeft()
        break
      case "Down":
        figurePart.moveDown()
        break
      case "Up":
        figurePart.moveUp()
        break
    }
  }
  if (collition_left_wall == true) {
    for (let figurePart of figure) {
      figurePart.moveRight()
    }
  }
  if (collition_right_wall == true) {
    for (let figurePart of figure) {
      figurePart.moveLeft()
    }
  }
}

export function rotateFigure(placedFigures: GameObject[][], figure: GameObject[], direction: "right" | "left") {
  const centerFigurePart = figure[Math.floor(figure.length / 2)]
  const posX = centerFigurePart.X
  const posY = centerFigurePart.Y
  if (direction == "right") {
    rotateFigureRight()
    if (figureColidesWithWall(figure) || figureCollidesWithPlacedFigure(figure, placedFigures)) { rotateFigureLeft() }
  }
  else if (direction == "left") {
    rotateFigureLeft()
    if (figureColidesWithWall(figure) || figureCollidesWithPlacedFigure(figure, placedFigures)) { rotateFigureRight() }
  }

  function figureColidesWithWall(figure: GameObject[]) {
    for (let figurePart of figure) {
      if (figurePart.X == config.gameMapWidth) { return true }
      else if (figurePart.X < 0) { return true }
      else if (figurePart.Y == config.gameMapHeight) { return true }
    }
    return false
  }
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
  function figureCollidesWithPlacedFigure(figure: GameObject[], placedFigures: GameObject[][]) {
    for (const placedFigure of placedFigures) {
      for (let figurePart of figure) {
        if (figurePart.collidesWith(placedFigure)) { return true }
      }
    }
    return false
  }
}


export function figureReachesBottom(currentFigure: GameObject[], placedFigures: GameObject[][]) {
  for (const figurePart of currentFigure) {
    if (figurePart.Y == config.gameMapHeight) { return true }
    for (const placedFigure of placedFigures) {
      if (figurePart.collidesWith(placedFigure)) { return true }
    }
  }
  return false
}
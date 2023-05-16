import { config } from "./config";
import { GameObject } from "./gameObject";

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
        if (figurePart.Y == config.gameMapHeight) { figurePart.moveUp() }
        break
    }
  }
  if (collition_left_wall == true) {
    for (let figurePart of figure) {
      figurePart.moveRight()
    }
  }
  else if (collition_right_wall == true) {
    for (let figurePart of figure) {
      figurePart.moveLeft()
    }
  }
}

export function rotateFigure(figure: GameObject[]) {
  const centerFigurePart = figure[Math.floor(figure.length / 2)]
  const posX = centerFigurePart.X
  const posY = centerFigurePart.Y
  for (let figurePart of figure) {
    figurePart.X -= posX
    figurePart.Y -= posY
    const newX = figurePart.Y * -1
    const newY = figurePart.X
    figurePart.X = newX + posX
    figurePart.Y = newY + posY
  }
}
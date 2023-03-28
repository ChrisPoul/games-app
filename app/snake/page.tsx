'use client'
import SnakeComponent from "./components/snake"
import GameBoardComponent from "./components/board";
import { GameBoard, GameObject } from "./models";

export default function Page() {
  let food = new GameObject(8, 8)
  let gameBoard = new GameBoard(food)

  return (
    <div>
      {GameBoardComponent(gameBoard)}
      {SnakeComponent(gameBoard)}
    </div >
  )
}
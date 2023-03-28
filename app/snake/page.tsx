'use client'
import SnakeComponent from "./components/Snake"
import FoodComponent from "./components/Food";
import { GameBoard, GameObject } from "./models";

export default function Page() {
  let food = new GameObject(8, 8)
  let gameBoard = new GameBoard(food)

  return (
    <div>
      {FoodComponent(gameBoard)}
      {SnakeComponent(gameBoard)}
    </div >
  )
}
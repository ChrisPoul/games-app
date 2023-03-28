'use client'
import SnakeComponent from "./components/Snake"
import FoodComponent from "./components/Food";
import { GameObject } from "./models";

export default function Page() {
  let food = new GameObject(8, 8)

  return (
    <div>
      {FoodComponent(food)}
      {SnakeComponent(food)}
    </div >
  )
}
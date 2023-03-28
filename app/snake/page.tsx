'use client'
import SnakeComponent from "./components/Snake"
import FoodComponent from "./components/Food";
import { GameObject } from "./models";
import { useState } from "react";

export default function GameMap() {
  const [food, setFood] = useState([
    new GameObject(8, 8),
    new GameObject(14, 24)
  ])

  return (
    <div>
      {FoodComponent(food, setFood)}
      {SnakeComponent(food, setFood)}
    </div >
  )
}
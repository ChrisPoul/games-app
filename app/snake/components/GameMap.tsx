'use client'
import SnakeComponent from "./Snake"
import FoodComponent from "./Food";
import { GameObject } from "../models";
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
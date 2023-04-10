'use client'

import { useEffect, useState } from "react";
import SnakeComponent from "./components/Snake"
import FoodComponent from "./components/Food";
import { GameObject } from "./models";
import { getRandomInt } from "@/app/common";

export default function GameMap() {
  let [food, setFood] = useState([
    new GameObject(2, 10),
    new GameObject(3, 6),
    new GameObject(2, 4),
  ])

  return (
    <div>
      {FoodComponent(food, setFood)}
      {SnakeComponent(food, setFood)}
    </div >
  )
}
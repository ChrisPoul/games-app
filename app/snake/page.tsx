'use client'

import { useEffect, useState } from "react";
import SnakeComponent from "./components/Snake"
import FoodComponent from "./components/Food";
import { GameObject } from "./models";
import { getRandomInt } from "@/app/common";

export default function GameMap() {
  let [food, setFood] = useState([
    new GameObject(0, 0)
  ])

  useEffect(() => {
    let initialFoodItem = food[0]
    initialFoodItem.positionX = getRandomInt(10)
    initialFoodItem.positionY = getRandomInt(10)
    setFood([initialFoodItem])
  }, [])

  return (
    <div>
      {FoodComponent(food, setFood)}
      {SnakeComponent(food, setFood)}
    </div >
  )
}
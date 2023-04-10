'use client'

import { useEffect, useState } from "react";
import SnakeComponent from "./components/Snake"
import FoodComponent from "./components/Food";
import { GameObject } from "./models";
import { getRandomInt } from "@/app/common";

export default function GameMap() {
  let [food, setFood] = useState([
    new GameObject(6, 3)
  ])

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      let foodItem = new GameObject(
        getRandomInt(), getRandomInt()
      )
      food.push(foodItem)
    }
    setFood(food)
  }, [])

  return (
    <div>
      {FoodComponent(food, setFood)}
      {SnakeComponent(food, setFood)}
    </div >
  )
}
import { useState } from "react";
import { GameObject } from "../models";

export default function FoodComponent(food: GameObject) {
  return (
    <div>
      <button
        className="bg-red-500 p-4 rounded absolute"
        style={{ top: food.positionY + "em", left: food.positionX + "em" }}
      ></button>
    </div >
  )
}
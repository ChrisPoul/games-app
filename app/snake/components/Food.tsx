import { Dispatch, SetStateAction, useEffect } from "react";
import { GameObject } from "../models";

export default function FoodComponent(food: GameObject[], setFood: Dispatch<SetStateAction<GameObject[]>>) {

  return (
    <div>
      {food.map((foodItem, index) => (
        <button
          className="bg-red-500 p-4 rounded absolute"
          style={{ top: foodItem.positionY * 2 + "em", left: foodItem.positionX * 2 + "em" }}
          id={"food-" + index}
          key={index}
        ></button>
      ))}
    </div >
  )
}
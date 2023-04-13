import Food from "../models/food";
import { config } from "@/app/config";

export default function FoodComponent(food: Food) {

  return (
    <div>
      {food.map((foodItem, index) => (
        <button
          className="bg-red-500 rounded absolute"
          style={{
            left: foodItem.positionX * config.gameObjectSize + config.gameObjectSizeUnit,
            top: foodItem.positionY * config.gameObjectSize + config.gameObjectSizeUnit,
            padding: config.gameObjectSize / 2 + config.gameObjectSizeUnit
          }}
          id={"food-" + index}
          key={index}
        ></button>
      ))}
    </div >
  )
}
import Food from "../models/food";
import GameObjectComponent from "./GameObject";

export default function FoodComponent(food: Food) {

  return (
    <div>
      {food.map((foodItem, index) => (
        <div>
          {GameObjectComponent(foodItem, "food-" + index, "bg-red-500")}
        </div>
      ))}
    </div >
  )
}
import Food from "../food";
import GameObjectComponent from "./GameObject";

export default function FoodComponent(food: Food) {

  return (
    <div>
      {food.map((foodItem, index) => (
        <div key={"food-" + index}>
          {GameObjectComponent(foodItem, "bg-red-500")}
        </div>
      ))}
    </div >
  )
}
import Food from "../models/food";
import Snake from "../models/snake";
import FoodComponent from "./Food";
import SnakeComponent from "./Snake";

export default function GameBoardComponent(snake: Snake, food: Food) {

  return (
    <div className="content-center w-full bg-black h-screen">
      {FoodComponent(food)}
      {SnakeComponent(snake)}
    </div>
  )
}
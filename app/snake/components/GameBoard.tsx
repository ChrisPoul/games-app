import { config } from "@/app/config";
import Food from "../models/food";
import Snake from "../models/snake";
import FoodComponent from "./Food";
import SnakeComponent from "./Snake";

export default function GameBoardComponent(snake: Snake, food: Food) {

  return (
    <div
      className="content-center bg-black"
      style={{
        width: config.gameMapWidth * config.gameObjectSize + config.gameObjectSizeUnit,
        height: config.gameMapHeight * config.gameObjectSize + config.gameObjectSizeUnit
      }}
    >
      {FoodComponent(food)}
      {SnakeComponent(snake)}
    </div>
  )
}
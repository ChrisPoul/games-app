import { config } from "@/app/config";
import Food from "../food";
import Snake from "../snake";
import FoodComponent from "./Food";
import SnakeComponent from "./Snake";

export default function GameMapComponent(snake: Snake, food: Food) {

  return (
    <div
      className="bg-black m-auto relative rounded"
      style={{
        width: config.gameMapWidth * config.gameSizeScale + config.gameSizeUnit,
        height: config.gameMapHeight * config.gameSizeScale + config.gameSizeUnit
      }}
    >
      {FoodComponent(food)}
      {SnakeComponent(snake)}
    </div>
  )
}
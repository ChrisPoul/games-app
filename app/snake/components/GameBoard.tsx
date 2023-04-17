import { config } from "@/app/config";
import Food from "../models/food";
import Snake from "../models/snake";
import FoodComponent from "./Food";
import SnakeComponent from "./Snake";
import GameOverScreenComponent from "./GameOverScreen";

export default function GameBoardComponent(snake: Snake, food: Food) {

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
      {GameOverScreenComponent()}
    </div>
  )
}
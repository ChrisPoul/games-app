import { useState } from "react";
import { GameBoard } from "../models";

export default function GameBoardComponent(gameBoard: GameBoard) {
  return (
    <div>
      <button
        className="bg-red-500 p-4 rounded absolute"
        style={{ top: gameBoard.food.positionY + "em", left: gameBoard.food.positionX + "em" }}
      ></button>
    </div >
  )
}
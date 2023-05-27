'use-client'
import { config } from "../config";
import { Figure } from "../figure";
import FigureComponent from "./Figure";

export default function GameMapComponent(currentFigure: Figure, placedFigures: Figure[]) {
  return (
    <div
      className="bg-black m-auto relative rounded"
      style={{
        width: config.gameMapWidth * config.gameSizeScale + config.gameSizeUnit,
        height: config.gameMapHeight * config.gameSizeScale + config.gameSizeUnit
      }}
    >
      {FigureComponent(currentFigure)}
      <div>
        {placedFigures.map((figure, index) => (
          <div key={index}>
            {FigureComponent(figure)}
          </div>
        ))}
      </div>
    </div>
  )
}
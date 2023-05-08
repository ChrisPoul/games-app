import { config } from "../config";

export default function GameMapComponent() {
  return (
    <div
      className="bg-black m-auto relative rounded"
      style={{
        width: config.gameMapWidth * config.gameSizeScale + config.gameSizeUnit,
        height: config.gameMapHeight * config.gameSizeScale + config.gameSizeUnit
      }}
    >
      {/* <div>
        {food.map((foodItem, index) => (
          <div key={"food-" + index}>
            pene
          </div>
        ))}
      </div > */}
    </div>
  )
}
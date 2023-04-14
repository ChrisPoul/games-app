interface Config {
  gameSizeScale: number
  gameSizeUnit: string
  gameMapWidth: number
  gameMapHeight: number
  snakeMovementSpead: string
  milisecondsPerFrame: number
}

export const config: Config = require('./config.json')
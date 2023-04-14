interface Config {
  gameObjectSize: number
  gameObjectSizeUnit: string
  gameMapWidth: number
  gameMapHeight: number
  snakeMovementSpead: string
  milisecondsPerFrame: number
}

export const config: Config = require('./config.json')
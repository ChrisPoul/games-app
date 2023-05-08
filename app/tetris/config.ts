interface Config {
  gameSizeScale: number
  gameSizeUnit: string
  gameMapWidth: number
  gameMapHeight: number
  milisecondsPerFrame: number
  speedIncrease: number
}

export const config: Config = require('./config.json')
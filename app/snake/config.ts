interface Config {
  horizontalScaling: number
  verticalScaling: number
  milisecondsPerFrame: number
  speedIncrease: number
}

export const config: Config = require('./config.json')
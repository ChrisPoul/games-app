interface Config {
  gameObjectSize: number;
  gameObjectSizeUnit: string;
  snakeMovementSpead: string;
  milisecondsPerFrame: number;
}

export const config: Config = require('./config.json')
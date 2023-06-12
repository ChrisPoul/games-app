import _config from "./config.json"

interface Config {
  horizontalScaling: number
  verticalScaling: number
  milisecondsPerFrame: number
  difficulty: Difficulty
}

export const config = _config as Config
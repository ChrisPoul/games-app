import { GameObject } from "./gameObject"
import { gameObjectsColide } from "./game"
import { getRandomInt } from "@/app/common"
import Snake from "./snake"
import { config } from "@/app/config"

export default class Food extends Array<GameObject> {
  addNewFoodItem(snake: Snake) {
    const foodItem = this.getNewFoodItem()
    if (this.foodItemColides(foodItem, snake)) {
      this.addNewFoodItem(snake)
    }
    else {
      this.push(foodItem)
    }
  }

  getNewFoodItem() {
    const positionX = getRandomInt(config.gameMapWidth)
    const positionY = getRandomInt(config.gameMapHeight)
    let foodItem = new GameObject(positionX, positionY)

    return foodItem
  }

  foodItemColides(foodItem: GameObject, snake: Snake) {
    if (this.foodItemColidesWithSnake(foodItem, snake)) {
      return true
    }
    else if (this.foodItemColidesWithFood(foodItem)) {
      return true
    }

    return false
  }

  foodItemColidesWithSnake(foodItem: GameObject, snake: Snake) {
    for (let BodyPart of snake) {
      if (gameObjectsColide(BodyPart, foodItem)) {
        return true
      }
    }

    return false
  }

  foodItemColidesWithFood(currentFoodItem: GameObject) {
    for (let foodItem of this) {
      if (gameObjectsColide(foodItem, currentFoodItem)) {
        return true
      }
    }

    return false
  }

  deleteFoodItem(foodItemIndex: number) {
    this.splice(foodItemIndex, 1)
  }
}
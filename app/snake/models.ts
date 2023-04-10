import { getRandomInt } from "@/app/common";

const distance = 1

export class GameObject {
  positionX: number
  positionY: number
  direction: string
  constructor(positionX: number, positionY: number) {
    this.positionX = positionX
    this.positionY = positionY
    this.direction = "Right"
  }

  move() {
    if (this.direction.includes("Right")) {
      this.positionX = this.positionX + distance
    }
    if (this.direction.includes("Left")) {
      this.positionX = this.positionX - distance
    }
    if (this.direction.includes("Up")) {
      this.positionY = this.positionY - distance
    }
    if (this.direction.includes("Down")) {
      this.positionY = this.positionY + distance
    }
  }
}

export class Snake extends Array<GameObject> {

  constructor(...bodyParts: GameObject[]) {
    super(...bodyParts)
  }

  keyDirectionIsOpositeToCurrentDirection(keyPressed: string) {
    if (keyPressed.includes("Left") && this[0].direction.includes("Right")) {
      return true
    }
    else if (keyPressed.includes("Right") && this[0].direction.includes("Left")) {
      return true
    }
    else if (keyPressed.includes("Up") && this[0].direction.includes("Down")) {
      return true
    }
    else if (keyPressed.includes("Down") && this[0].direction.includes("Up")) {
      return true
    }
    return false
  }

  handleEatingFood(food: GameObject[]) {
    for (let index = 0; index < food.length; index++) {
      let foodItem = food[index]
      if (this.ateFoodItem(foodItem)) {
        this.grow()
        this.deleteFoodItem(index, food)
        this.addNewFoodItem(food)
      }
    }
  }

  handleColitionWithItsSelf() {
    let Head = this[0]
    for (let index = 1; index < this.length; index++) {
      let BodyPart = this[index]
      if (this.gameObjectsColide(Head, BodyPart)) {
        alert("Perdiste por tonto")
        location.reload()
      }
    }
  }

  gameObjectsColide(firstGameObject: GameObject, secondGameObject: GameObject) {
    if (firstGameObject.positionX != secondGameObject.positionX) {
      return false
    }
    else if (firstGameObject.positionY != secondGameObject.positionY) {
      return false
    }

    return true
  }

  ateFoodItem(foodItem: GameObject) {
    let Head = this[0]
    if (Head.positionX != foodItem.positionX) {
      return false
    }
    else if (Head.positionY != foodItem.positionY) {
      return false
    }

    return true
  }

  grow() {
    this.push(new GameObject(0, 0))
  }

  deleteFoodItem(foodItemIndex: number, food: GameObject[]) {
    food.splice(foodItemIndex, 1)
  }

  addNewFoodItem(food: GameObject[]) {
    const foodItem = this.getNewFoodItem()
    if (this.foodItemColides(foodItem, food)) {
      this.addNewFoodItem(food)
    }
    else {
      food.push(foodItem)
    }
  }

  getNewFoodItem() {
    const positionX = getRandomInt()
    const positionY = getRandomInt()
    let foodItem = new GameObject(positionX, positionY)

    return foodItem
  }

  foodItemColides(foodItem: GameObject, food: GameObject[]) {
    if (this.foodItemColidesWith(foodItem)) {
      return true
    }
    else if (this.foodItemColidesWithFood(foodItem, food)) {
      return true
    }

    return false
  }

  foodItemColidesWith(foodItem: GameObject) {
    for (let BodyPart of this) {
      if (this.gameObjectsColide(BodyPart, foodItem)) {
        return true
      }
    }

    return false
  }

  foodItemColidesWithFood(currentFoodItem: GameObject, food: GameObject[]) {
    for (let foodItem of food) {
      if (this.gameObjectsColide(foodItem, currentFoodItem)) {
        return true
      }
    }

    return false
  }

  update() {
    for (let index = this.length - 1; index > 0; index--) {
      let currentBodyPart = this[index]
      let nextBodyPart = this[index - 1]
      currentBodyPart.positionX = nextBodyPart.positionX
      currentBodyPart.positionY = nextBodyPart.positionY
    }
  }

}

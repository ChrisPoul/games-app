import { GameObject, gameObjectsColide } from "."
import { getRandomInt } from "@/app/common"

export default class Snake extends Array<GameObject> {
  head: GameObject
  body: GameObject[]
  constructor(...bodyParts: GameObject[]) {
    super(...bodyParts)
    this.head = bodyParts[0]
    this.body = bodyParts.slice(1)
  }

  keyDirectionIsOpositeToCurrentDirection(keyPressed: string) {
    if (keyPressed.includes("Left") && this.head.direction.includes("Right")) {
      return true
    }
    else if (keyPressed.includes("Right") && this.head.direction.includes("Left")) {
      return true
    }
    else if (keyPressed.includes("Up") && this.head.direction.includes("Down")) {
      return true
    }
    else if (keyPressed.includes("Down") && this.head.direction.includes("Up")) {
      return true
    }
    return false
  }

  handleColitionWithItsSelf() {
    for (let bodyPart of this.body) {
      if (gameObjectsColide(this.head, bodyPart)) {
        alert("Perdiste por tonto")
        location.reload()
      }
    }
  }

  ateFoodItem(foodItem: GameObject) {
    if (this.head.positionX != foodItem.positionX) {
      return false
    }
    else if (this.head.positionY != foodItem.positionY) {
      return false
    }

    return true
  }

  grow() {
    this.push(new GameObject(0, 0))
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

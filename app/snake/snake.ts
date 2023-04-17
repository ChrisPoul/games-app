import { GameObject } from "./gameObject"
import { gameObjectsColide } from "./game"

export default class Snake extends Array<GameObject> {
  head: GameObject
  body: GameObject[]
  tail: GameObject
  constructor(...bodyParts: GameObject[]) {
    super(...bodyParts)
    this.head = bodyParts[0]
    this.body = bodyParts.slice(1)
    this.tail = bodyParts[this.length - 1]
  }

  collidesWithItsSelf() {
    for (let bodyPart of this.body) {
      if (gameObjectsColide(this.head, bodyPart)) {
        return true
      }
    }
    return false
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

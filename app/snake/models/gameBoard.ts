import Food from "./food";
import Snake from "./snake";

export default class GameBoard {
  snake: Snake
  food: Food
  constructor(snake: Snake, food: Food) {
    this.snake = snake
    this.food = food
  }

  handleSnakeEatingFood() {
    for (let index = 0; index < this.food.length; index++) {
      let foodItem = this.food[index]
      if (this.snake.ateFoodItem(foodItem)) {
        this.snake.grow()
        this.food.deleteFoodItem(index)
        this.food.addNewFoodItem(this.snake)
      }
    }
  }

  keyPressedIsValid(keyPressed: string) {
    if (!keyPressed.includes("Arrow")) {
      return false
    }
    if (this.snake.length === 1) {
      return true
    }
    if (this.snake.keyDirectionIsOpositeToCurrentDirection(keyPressed)) {
      return false
    }

    return true
  }
}
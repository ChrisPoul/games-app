import { GameObject } from "../gameObject";
import GameObjectComponent from "./GameObject";

export default function FigureComponent(figure: GameObject[]) {
  return (
    <div>
      {figure.map((figurePart, index) => (
        <div key={index}>
          {GameObjectComponent(figurePart)}
        </div>
      ))}
    </div >
  )
}
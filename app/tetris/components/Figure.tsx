import { Figure } from "../figures";
import GameObjectComponent from "./GameObject";

export default function FigureComponent(figure: Figure) {
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
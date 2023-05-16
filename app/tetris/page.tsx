'use client';
import { useState, useEffect, useRef } from "react"
import { config } from "./config";
import GameMapComponent from "./components/GameMap";
import { getFigure } from "./figures";
import { figureReachesFloor, rotateFigure, updateFigurePosition } from "./game";
import { GameObject } from "./gameObject";

export default function Page() {
  const [figure, setFigure] = useState(getFigure("Z"))
  const [placedFigures, setPlacedFigures] = useState<GameObject[][]>([])

  // handle user input
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const keyPressed = event.key
      if (keyPressed.includes("Arrow") && !keyPressed.includes("Up")) {
        const direction = keyPressed.replace("Arrow", "")
        updateFigurePosition(figure, direction)
        if (figureReachesFloor(figure, placedFigures)) {
          updateFigurePosition(figure, "Up")
          setPlacedFigures(placedFigures => [...placedFigures, figure])
          setFigure(getFigure("I"))
        }
      }
      if (keyPressed == "d") { rotateFigure(placedFigures, figure, "right") }
      else if (keyPressed == "a") { rotateFigure(placedFigures, figure, "left") }
      setFigure(figure => [...figure])
    }
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [placedFigures])

  // run game logic
  useEffect(() => {
    const interval = setInterval(() => {
      updateFigurePosition(figure, "Down")
      if (figureReachesFloor(figure, placedFigures)) {
        updateFigurePosition(figure, "Up")
        setPlacedFigures(placedFigures => [...placedFigures, figure])
        setFigure(getFigure("I"))
      }
      setFigure(figure => [...figure])
    }, config.milisecondsPerFrame);

    return () => clearInterval(interval);
  }, [placedFigures])

  return (
    <div className="bg-amber-300 h-screen pt-6 z--10">
      {GameMapComponent(figure, placedFigures)}
    </div>
  )
}
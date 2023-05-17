'use client';
import { useState, useEffect, useRef } from "react"
import { config } from "./config";
import GameMapComponent from "./components/GameMap";
import { figureReachesBottom, generateRandomFigure, rotateFigure, updateFigurePosition } from "./game";
import { GameObject } from "./gameObject";

export default function Page() {
  const [figure, setFigure] = useState(generateRandomFigure())
  const [placedFigures, setPlacedFigures] = useState<GameObject[][]>([])

  // handle user input
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const keyPressed = event.key
      if (keyPressed.includes("Arrow") && !keyPressed.includes("Up")) {
        const direction = keyPressed.replace("Arrow", "")
        runGameCicle(placedFigures, figure, direction)
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
      runGameCicle(placedFigures, figure, "Down")
      setFigure(figure => [...figure])
    }, config.milisecondsPerFrame);

    return () => clearInterval(interval);
  }, [placedFigures])

  function runGameCicle(placedFigures: GameObject[][], figure: GameObject[], direction: string) {
    updateFigurePosition(figure, direction)
    if (figureReachesBottom(figure, placedFigures)) {
      updateFigurePosition(figure, "Up")
      setPlacedFigures(placedFigures => [...placedFigures, figure])
      setFigure(generateRandomFigure())
    }
  }

  return (
    <div className="bg-amber-300 h-screen pt-6 z--10">
      {GameMapComponent(figure, placedFigures)}
    </div>
  )
}
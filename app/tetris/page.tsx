'use client';
import { useState, useEffect } from "react"
import { config } from "./config";
import GameMapComponent from "./components/GameMap";
import {
  figureCollides, moveFigure, generateRandomFigure,
  updateFigureRotation
} from "./game";
import { GameObject } from "./gameObject";
import { getFigure } from "./figures";

export default function Page() {
  const [figure, setFigure] = useState(getFigure("Z"))
  const [placedFigures, setPlacedFigures] = useState<GameObject[][]>([])

  // handle user directional input
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowUp": break
        case "ArrowDown": updateFigurePosition(placedFigures, figure, "Down"); break
        case "ArrowLeft": updateFigurePosition(placedFigures, figure, "Left"); break
        case "ArrowRight": updateFigurePosition(placedFigures, figure, "Right"); break
      }
      setFigure(figure => [...figure])
    }
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [placedFigures])

  // handle user rotational input
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == "a") { updateFigureRotation(placedFigures, figure, "left") }
      else if (event.key == "d") { updateFigureRotation(placedFigures, figure, "right") }
      else { return }
      setFigure(figure => [...figure])
    }
    document.addEventListener('keydown', handleKeyDown)

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [placedFigures])

  // run game cicle
  useEffect(() => {
    const interval = setInterval(() => {
      updateFigurePosition(placedFigures, figure, "Down")
      setFigure(figure => [...figure])
    }, config.milisecondsPerFrame);

    return () => clearInterval(interval);
  }, [placedFigures])

  function updateFigurePosition(placedFigures: GameObject[][], currentFigure: GameObject[], direction: string) {
    moveFigure(currentFigure, direction)
    switch (direction) {
      case "Up": moveFigure(currentFigure, "Down")
      case "Down":
        if (figureCollides(currentFigure, placedFigures)) {
          moveFigure(currentFigure, "Up")
          setPlacedFigures(placedFigures => [...placedFigures, currentFigure])
          setFigure(generateRandomFigure())
        } break
      case "Right":
        if (figureCollides(currentFigure, placedFigures)) { moveFigure(currentFigure, "Left") }; break
      case "Left":
        if (figureCollides(currentFigure, placedFigures)) { moveFigure(currentFigure, "Right") }; break
    }
  }

  return (
    <div className="bg-amber-300 h-screen pt-6 z--10">
      {GameMapComponent(figure, placedFigures)}
    </div>
  )
}
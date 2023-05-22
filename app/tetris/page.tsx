'use client';
import { useState, useEffect, useRef } from "react"
import { config } from "./config";
import GameMapComponent from "./components/GameMap";
import {
  figureCollides, generateRandomFigure,
  updateFigureRotation,
  figureReachesTop,
  updateFigurePosition,
  updatePlacedFigures
} from "./game";
import { Figure } from "./figures";
import { getFigure } from "./figures";

export default function Page() {
  let gameIsOver = useRef(false)
  let [figure, setFigure] = useState(getFigure("Z"))
  let [placedFigures, setPlacedFigures] = useState<Figure[]>([])

  // handle user input
  useEffect(() => {
    if (gameIsOver.current == true) { return }
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowUp": break
        case "ArrowDown": handleFigureGoingDown(); break
        case "ArrowLeft": updateFigurePosition(placedFigures, figure, "Left"); break
        case "ArrowRight": updateFigurePosition(placedFigures, figure, "Right"); break
        case "a": updateFigureRotation(placedFigures, figure, "left"); break
        case "d": updateFigureRotation(placedFigures, figure, "right"); break
      }
      setFigure(figure => new Figure(...figure))
    }
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [placedFigures])
  // run game cicle
  useEffect(() => {
    if (gameIsOver.current == true) { return }
    const interval = setInterval(() => {
      handleFigureGoingDown()
      setFigure(figure => new Figure(...figure))
      if (figureReachesTop(figure)) { gameIsOver.current = true }
    }, config.milisecondsPerFrame);

    return () => clearInterval(interval);
  }, [placedFigures])

  function handleFigureGoingDown() {
    updateFigurePosition(placedFigures, figure, "Down")
    if (figureCollides(figure, placedFigures)) {
      figure.move("Up")
      placedFigures = updatePlacedFigures(placedFigures, figure)
      setPlacedFigures(placedFigures)
      setFigure(generateRandomFigure())
    }
  }

  return (
    <div className="h-screen pt-6 z--10">
      {GameMapComponent(figure, placedFigures)}
    </div>
  )
}
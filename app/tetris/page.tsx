'use client';
import { useState, useEffect } from "react"
import { config } from "./config";
import GameMapComponent from "./components/GameMap";
import {
  figureCollides, generateRandomFigure,
  updateFigureRotation,
  figureReachesTop,
  updateFigurePosition,
  updatePlacedFigures
} from "./game";
import { Figure } from "./figure";
import { getFigure } from "./figure";

export default function Page() {
  const [gameIsOver, setGameIsOver] = useState(false)
  let [figure, setFigure] = useState(getFigure("Z"))
  let [placedFigures, setPlacedFigures] = useState<Figure[]>([])

  // handle user input
  useEffect(() => {
    if (gameIsOver) { return }
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
    if (gameIsOver) { return }
    const interval = setInterval(() => {
      handleFigureGoingDown()
      setFigure(figure => new Figure(...figure))
      if (figureReachesTop(figure)) { setGameIsOver(true) }
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
'use client';
import { useState, useEffect } from "react"
import { config } from "./config";
import GameMapComponent from "./components/GameMap";
import {
  figureCollides, generateRandomFigure,
  updateFigureRotation,
  updateFigurePosition,
  updatePlacedFigures
} from "./game";
import { Figure } from "./figure";
import { getFigure } from "./figure";
import SettingsMenuComponent from "./components/SettingsMenu";

export default function Page() {
  const [gameIsOver, setGameIsOver] = useState(false)
  const [gameIsRunning, setGameIsRunning] = useState(true)
  let [figure, setFigure] = useState(getFigure("Z"))
  let [placedFigures, setPlacedFigures] = useState<Figure[]>([])

  // handle user input
  useEffect(() => {
    if (!gameIsRunning) { return }
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
  }, [placedFigures, gameIsRunning])
  // run game cicle
  useEffect(() => {
    if (!gameIsRunning) { return }
    const interval = setInterval(() => {
      handleFigureGoingDown()
      setFigure(figure => new Figure(...figure))
    }, config.milisecondsPerFrame);

    return () => clearInterval(interval);
  }, [placedFigures, gameIsRunning])

  function handleFigureGoingDown() {
    updateFigurePosition(placedFigures, figure, "Down")
    if (figureCollides(figure, placedFigures)) {
      figure.move("Up")
      placedFigures = updatePlacedFigures(placedFigures, figure)
      setPlacedFigures(placedFigures)
      setFigure(generateRandomFigure())
    }
  }
  function toggleGameIsRunning() { setGameIsRunning(!gameIsRunning) }

  return (
    <div className="h-screen pt-6 z--10">
      {GameMapComponent(figure, placedFigures)}
      {SettingsMenuComponent(toggleGameIsRunning)}
    </div>
  )
}
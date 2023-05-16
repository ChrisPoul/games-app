'use client';
import { useState, useEffect, useRef } from "react"
import { config } from "./config";
import GameMapComponent from "./components/GameMap";
import { getFigure } from "./figures";
import { rotateFigure, updateFigurePosition } from "./game";

export default function Page() {
  const [figure, setFigure] = useState(getFigure("Z"))

  // handle user input
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const keyPressed = event.key
      if (keyPressed.includes("Arrow")) {
        const direction = keyPressed.replace("Arrow", "")
        updateFigurePosition(figure, direction)
      }
      if (keyPressed == "r") {
        rotateFigure(figure)
      }
      setFigure(figure => [...figure])
    }
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

  // run game logic
  useEffect(() => {
    const interval = setInterval(() => {
      updateFigurePosition(figure, "Down")
      setFigure(figure => [...figure])
    }, config.milisecondsPerFrame);

    return () => clearInterval(interval);
  }, [])

  return (
    <div className="bg-amber-300 h-screen pt-6 z--10">
      {GameMapComponent(figure)}
    </div>
  )
}
'use client';
import { useState, useEffect, useRef } from "react"
import { config } from "./config";
import GameMapComponent from "./components/GameMap";

export default function Page() {
  const [gameIsOver, setGameIsOver] = useState(false)

  // handle user input
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const keyPressed = event.key
      if (keyPressed.includes("Arrow")) {

      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

  // run game logic
  useEffect(() => {
    setTimeout(() => {

    }, config.milisecondsPerFrame)
  }, [])

  return (
    <div className="bg-amber-300 h-screen pt-6 z--10">
      {GameMapComponent()}
    </div>
  )
}
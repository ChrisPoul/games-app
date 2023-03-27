'use client';
import { useState, useEffect } from "react"

export default function Page() {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  useEffect(() => {
    let movement_speed = 2
    function moveRight() {
      setPositionX(positionX + movement_speed)
    }
    function moveLeft() {
      setPositionX(positionX - movement_speed)
    }
    function moveUp() {
      setPositionY(positionY - movement_speed)
    }
    function moveDown() {
      setPositionY(positionY + movement_speed)
    }
    function handleKeyDown(event: any) {
      if (event.key === "ArrowRight") {
        moveRight()
      }
      else if (event.key === "ArrowLeft") {
        moveLeft()
      }
      else if (event.key === "ArrowUp") {
        moveUp()
      }
      else if (event.key === "ArrowDown") {
        moveDown()
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [positionX, positionY]);

  return (
    <div>
      <button
        className="bg-red-500 p-4 rounded hover:bg-red-700 hover:text-white"
        style={{ marginLeft: positionX + "em", marginTop: positionY + "em" }}
      >
        pene
      </button>
    </div >
  )
}
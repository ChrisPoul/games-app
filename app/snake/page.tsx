'use client';

import GameBoardComponent from "./components/GameBoard";

export default function Page() {

  return (
    <div className="bg-amber-300 h-screen pt-20">
      {GameBoardComponent()}
    </div>
  )
}

import { ReactNode } from "react";
import Overlay from "./Overlay";
import Link from "next/link";

interface GameMenuProps {
  isOpen: boolean
  children: ReactNode
  title: string
}

export default function GameMenu({ isOpen, children, title }: GameMenuProps) {

  return (
    <Overlay isOpen={isOpen}>
      <div className="lg:h-[70%] xs:h-[70%] lg:w-[50%] xs:w-[80%] bg-white dark:bg-slate-900 rounded-2xl m-auto pt-16 space-y-4 relative text-center font-bold dark:text-violet-500">
        <h1 className="text-5xl font-extrabold leading-none pb-6">
          {title}
        </h1>
        {children}
        <div>
          <Link href="/">
            <button className="bg-red-600 p-4 rounded block m-auto w-28">
              Exit Game
            </button>
          </Link>
        </div>
      </div>
    </Overlay>
  )
}
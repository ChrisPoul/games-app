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
      <div className="lg:h-[70%] 2xs:h-[70%] lg:w-[50%] 2xs:w-[80%] bg-pink-100 dark:bg-slate-900 rounded-2xl m-auto pt-16 space-y-4 relative text-center font-bold dark:text-violet-600">
        <h1 className="text-5xl font-extrabold leading-none pb-6">
          {title}
        </h1>
        {children}
        <div>
          <Link href="/">
            <button className="bg-red-600 dark:bg-red-900 p-4 rounded block m-auto w-28">
              Exit Game
            </button>
          </Link>
        </div>
      </div>
    </Overlay>
  )
}
import { Fragment, ReactNode } from "react";
import { BsFillPauseFill } from "react-icons/bs"
import Overlay from "./Overlay";
import Link from "next/link";

interface GameMenuProps {
  isOpen: boolean
  toggleMenu: () => void
  children: ReactNode
}

export default function GameMenuComponent({ isOpen, toggleMenu, children }: GameMenuProps) {

  return (
    <Fragment>
      <Overlay isOpen={isOpen}>
        <div className="lg:h-[50%] xs:h-[70%] lg:w-[50%] xs:w-[80%] bg-white rounded-2xl m-auto pt-20 space-y-3 relative text-center">
          {children}
          <Link href="/">
            <button className="bg-red-600 p-4 rounded block m-auto w-28">
              Exit
            </button>
          </Link>
        </div>
      </Overlay>
      {
        !isOpen &&
        <button className="absolute top-0 right-0 bg-gray-400 p-2 rounded mt-1 mr-1"
          onClick={toggleMenu}
        >
          <BsFillPauseFill />
        </button>
      }
    </Fragment>
  )
}
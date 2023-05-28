import { Fragment, ReactNode } from "react";
import Overlay from "./Overlay";
import Link from "next/link";

interface GameMenuProps {
  isOpen: boolean
  children: ReactNode
}

export default function GameMenuComponent({ isOpen, children }: GameMenuProps) {

  return (
    <Fragment>
      <Overlay isOpen={isOpen}>
        <div className="lg:h-[50%] xs:h-[70%] lg:w-[50%] xs:w-[80%] bg-white rounded-2xl m-auto pt-20 space-y-4 relative text-center">
          {children}
          <div>
            <Link href="/">
              <button className="bg-red-600 p-4 rounded block m-auto w-28">
                Exit
              </button>
            </Link>
          </div>
        </div>
      </Overlay>

    </Fragment>
  )
}
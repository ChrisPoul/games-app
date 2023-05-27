import { Fragment, ReactNode } from "react"

interface OverlayProps {
  isOpen: boolean
  children: ReactNode
}

export default function Overlay({ isOpen, children }: OverlayProps) {
  let display = "hidden"
  if (isOpen) { display = "flex" }
  return (
    <Fragment>
      {isOpen && (
        <div className={`${display} items-center w-full h-screen top-0 left-0 fixed bg-black bg-opacity-70`}>
          {children}
        </div>
      )}
    </Fragment >
  );
}

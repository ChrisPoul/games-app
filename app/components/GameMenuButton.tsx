import { ReactNode } from "react";

interface ButtonProps {
  isOpen: boolean
  toggleMenu: () => void
  children: ReactNode
}

export default function GameMenuButtonComponent({ isOpen, toggleMenu, children }: ButtonProps) {
  if (isOpen) return null
  return (
    <button className="absolute top-0 right-0 bg-gray-400 p-2 rounded mt-1 mr-1"
      onClick={toggleMenu}
    >
      {children}
    </button>
  )
}
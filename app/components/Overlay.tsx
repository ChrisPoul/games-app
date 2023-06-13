import { ReactNode } from "react"

interface OverlayProps {
  isOpen: boolean
  children: ReactNode
}

export default function Overlay({ isOpen, children }: OverlayProps) {
  if (!isOpen) { return null }
  return (
    <div className="flex items-center w-full h-screen top-0 left-0 fixed bg-black bg-opacity-70">
      {children}
    </div>
  );
}

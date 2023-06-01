import { useState } from "react";
import SettingsMenu from "@/app/components/SettingsMenu";

export default function SettingsMenuComponent() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleMenu() {
    setIsOpen(!isOpen)
  }

  return (
    <SettingsMenu isOpen={isOpen} toggleMenu={toggleMenu}>
      <div></div>
    </SettingsMenu>
  )
}


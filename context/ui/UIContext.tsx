import { createContext } from 'react'

interface ContextProps {
  sidemenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean

  // Methods
  openSideMenu(): void
  closeSideMenu(): void
  setIsAddingEntry: (isAdding: boolean) => void
  setIsDraggingEntry: (isDragging: boolean) => void
}

export const UIContext = createContext({} as ContextProps)

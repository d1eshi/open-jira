import React, { FC } from 'react'
import { UIContext, uiReducer } from './'

export interface UIState {
  sidemenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
}

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(uiReducer, UI_INITIAL_STATE)

  const openSideMenu = () => dispatch({ type: 'UI - Open Sidebar' })

  const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' })

  const setIsAddingEntry = (isAdding: boolean) => dispatch({ type: 'UI - Is Adding Entry', payload: isAdding })

  const setIsDraggingEntry = (isDragging: boolean) => dispatch({ type: 'UI - Is Dragging Entry', payload: isDragging })

  return (
    <UIContext.Provider
      value={{
        ...state,

        // Methods
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        setIsDraggingEntry,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

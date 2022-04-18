import React, { FC } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { EntriesContext, entriesReducer } from './'
import { Entry } from './interfaces'

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Tempor cillum dolore ullamco magna aute ullamco commodo ea sunt officia sunt amet consequat.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'Fugiat dolore reprehenderit duis adipisicing veniam enim adipisicing officia veniam amet.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description: 'Voluptate nulla ad duis ipsum id sunt sint tempor.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
}

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending',
    }

    dispatch({ type: 'Entry - AddEntry', payload: newEntry })
  }

  const updateEntry = (entry: Entry) => {
    dispatch({ type: 'Entry - Entry Updated', payload: entry })
  }

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // methods
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}

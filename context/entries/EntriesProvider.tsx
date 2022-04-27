import React, { FC } from 'react'
import { entriesApi } from '../../api'
import { useSnackbar } from 'notistack'

import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'
import { dbEntries } from '../../database'

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()

  const [state, dispatch] = React.useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description })

    dispatch({ type: 'Entry - AddEntry', payload: data })
  }

  const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      })

      // TODO: show snackbar
      if (showSnackbar) {
        enqueueSnackbar('Entry updated', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      }

      dispatch({ type: 'Entry - Entry Updated', payload: data })
    } catch (error) {
      console.error({ error })
    }
  }

  const deleteEntry = async (id: string, showSnackbar = true) => {
    try {
      const { data } = await entriesApi.delete(`/entries/${id}`)
      console.log(data, 'let see data')
      if (showSnackbar) {
        enqueueSnackbar('Entry deleted', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      }
      dispatch({ type: 'Entry - Delete Entry', payload: id })
    } catch (error) {
      console.error({ error })
    }
    // const res = await dbEntries.deleteEntryById(id)
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: 'Entry - Load Inital Entries', payload: data })
  }

  React.useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // methods
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}

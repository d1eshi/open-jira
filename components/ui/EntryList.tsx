import { List, Paper } from '@mui/material'
import React, { DragEvent, FC } from 'react'
import { EntriesContext } from '../../context/entries'
import { EntryStatus } from '../../context/entries/interfaces'
import { UIContext } from '../../context/ui'
import { EntryCard } from './EntryCard'
import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  const { isDragging, setIsDraggingEntry } = React.useContext(UIContext)
  const { entries, updateEntry } = React.useContext(EntriesContext)

  const entriesByStatus = React.useMemo(() => entries.filter(entry => entry.status === status), [entries])

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text')
    console.log({ id })

    const entry = entries.find(e => e._id === id)!
    entry.status = status
    updateEntry(entry)
    setIsDraggingEntry(false)
  }

  return (
    // aquí haremos drop
    <div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? styles.dragging : ''}>
      <Paper
        sx={{ height: 'calc(100vh - 180px)', overflow: 'auto', backgroundColor: 'transparent', padding: '1px 5px' }}
      >
        {/* Todo: cambiará dependiendo si estoy haciendo drag */}
        <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all .3s' }}>
          {entriesByStatus.map(entry => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  )
}

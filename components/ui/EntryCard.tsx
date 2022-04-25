import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import React, { DragEvent, FC } from 'react'
import { Entry } from '../../context/entries/interfaces'
import { UIContext } from '../../context/ui'

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { setIsDraggingEntry } = React.useContext(UIContext)

  const onDragStart = (event: DragEvent) => {
    setIsDraggingEntry(true)
    event.dataTransfer.setData('text', entry._id)

    // modificar el estado para mostrar que estoy drag
  }

  const onDragEnd = (event: DragEvent) => {
    setIsDraggingEntry(false)
    console.log(event)

    // canceler el drag
  }

  return (
    <Card sx={{ marginBottom: 1 }} draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>{entry.createdAt.toLocaleString('es')}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}

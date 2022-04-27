import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { DragEvent, FC } from 'react'
import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui'
import { dateFunctions } from '../../utils'

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { setIsDraggingEntry } = React.useContext(UIContext)

  const router = useRouter()

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

  const handleClick = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card sx={{ marginBottom: 1 }} draggable onDragStart={onDragStart} onDragEnd={onDragEnd} onClick={handleClick}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>{dateFunctions.getFormatDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}

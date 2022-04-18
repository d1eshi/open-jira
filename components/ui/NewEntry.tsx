import { Button, TextField } from '@mui/material'
import React, { ChangeEvent, FC } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { Box } from '@mui/system'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'

interface Props {}

export const NewEntry: FC<Props> = () => {
  const { addNewEntry } = React.useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = React.useContext(UIContext)

  const [inputValue, setInputValue] = React.useState('')
  const [touched, setTouched] = React.useState(false)

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSave = () => {
    if (inputValue.length === 0) return

    addNewEntry(inputValue)
    setIsAddingEntry(false)
    setTouched(false)
    setInputValue('')
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder='Nueva entrada'
            autoFocus
            multiline
            error={inputValue.length <= 0 && touched}
            label='Nueva entrada'
            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
            value={inputValue}
            onChange={onTextFieldChange}
            onBlur={() => setTouched(true)}
          />

          <Box display='flex' justifyContent='space-between'>
            <Button variant='text' onClick={() => setIsAddingEntry(false)}>
              Cancelar
            </Button>
            <Button onClick={onSave} variant='outlined' color='secondary' endIcon={<SaveOutlinedIcon />}>
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          variant='outlined'
          fullWidth
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  )
}

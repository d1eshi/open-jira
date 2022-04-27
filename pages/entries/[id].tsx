import {
  capitalize,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  IconButton,
} from '@mui/material'
import { Layout } from '../../components/layouts'
import SaveIcon from '@mui/icons-material/SaveOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { Entry, EntryStatus } from '../../interfaces'
import React, { ChangeEvent, FC, useMemo } from 'react'
import { GetServerSideProps } from 'next'
import { isValidObjectId } from 'mongoose'
import { dbEntries } from '../../database'
import { EntriesContext } from '../../context/entries'
import { useRouter } from 'next/router'
import { dateFunctions } from '../../utils'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}

const EntryPage: FC<Props> = ({ entry }) => {
  const router = useRouter()

  const { updateEntry, deleteEntry } = React.useContext(EntriesContext)
  const [inputValue, setInputValue] = React.useState(entry.description)
  const [status, setStatus] = React.useState<EntryStatus>(entry.status)
  const [touched, setTouched] = React.useState(false)

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus)
  }

  const handleDeleteEntry = () => {
    // console.log('click to delete')
    deleteEntry(entry._id)
    router.push('/')
  }

  const onSave = () => {
    if (inputValue.trim().length === 0) return

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    }

    updateEntry(updatedEntry, true)

    router.push('/')
  }

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={'Entrada:'}
              subheader={`Creado ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='New entry'
                autoFocus
                multiline
                label='New entry'
                value={inputValue}
                onChange={onInputValueChange}
                onBlur={() => setTouched(true)}
                helperText={isNotValid && 'Enter a value'}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((opt, i) => (
                    <FormControlLabel key={i} value={opt} control={<Radio />} label={capitalize(opt)} />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveIcon />}
                variant='contained'
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <CardActions>
        <IconButton
          onClick={handleDeleteEntry}
          sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'red' }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }

  const entry = await dbEntries.getEntryById(id)

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { entry },
  }
}

export default EntryPage

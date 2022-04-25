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
import { EntryStatus } from '../../context/entries/interfaces'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

const EntryPage = () => {
  return (
    <Layout title='... . ... '>
      <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title='Entry:' subheader={`Ended  ... ago`} />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='New entry'
                autoFocus
                multiline
                label='New entry'
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row>
                  {validStatus.map((opt, i) => (
                    <FormControlLabel key={i} value={opt} control={<Radio />} label={capitalize(opt)} />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button startIcon={<SaveIcon />} variant='contained' fullWidth>
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'red' }}>
        <DeleteIcon />
      </IconButton>
    </Layout>
  )
}

export default EntryPage

import React, { useState } from 'react'
import { useTicketStore } from '../../store/StoreContext'
import TextField from '@material-ui/core/TextField'
import { MenuItem, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    marginTop: 10
  },
  field: {
    margin: 5
  }
})

export function NewTicketForm (props) {
  const [ticketText, setTicketText] = useState('')
  const [ticketTitle, setTicketTitle] = useState('')
  const [ticketPriority, setTicketPriority] = useState(null)

  const priorities = [1, 2, 3, 4, 5]

  const ticketStore = useTicketStore()
  const styles = useStyles()
  return (
    <>
      <div>
        <TextField
          className={styles.field}
          id='standard-basic'
          label='Title'
          value={ticketTitle}
          onChange={(evt) => setTicketTitle(evt.target.value)}
        />
        <TextField
          className={styles.field}
          label='Ticket Priority'
          select
          value={ticketPriority}
          onChange={(evt) => setTicketPriority(evt.target.value)}
          helperText='Please select the Priority'
        >
          {priorities.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

      </div>
      <br />
      <TextField
        id='outlined-basic'
        variant='outlined'
        fullWidth='True'
        label='Description'
        value={ticketText}
        onChange={(evt) => setTicketText(evt.target.value)}
      />
      <br />
      <Button
        className={styles.root}
        variant='contained'
        onClick={() => {
          ticketStore.addTicket(ticketTitle, ticketPriority, ticketText)
          setTicketText('')
          setTicketTitle('')
          setTicketPriority(null)
        }}
      >
        Add Ticket
      </Button>
    </>
  )
}

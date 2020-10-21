import { useObserver } from 'mobx-react'
import React from 'react'
import { makeStyles, Button } from '@material-ui/core'
import { useTicketStore } from '../../store/StoreContext'

const useStyles = makeStyles({
  items: {
    border: '1px solid black',
    borderRadius: 5,
    margin: 5,
    padding: 5
  },
  center: {
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

const DeletedTicket = () => {
  const ticketStore = useTicketStore()
  const styles = useStyles()
  return useObserver(() => (
    <div>
      {ticketStore.deletedTickets.map(ticket => (
        <div
          className={styles.items}
          key={ticket}
        >
          <header className={styles.head}>
            <h1 className={styles.center}>{ticket.title}</h1>
            <Button
              variant='outlined'
              onClick={() => ticketStore.removeTicket(ticket._id)}
            >
              Delete
            </Button>

          </header>
          <h3>Priority: {ticket.priority}</h3>
          <p>{ticket.text}</p>
        </div>
      ))}
    </div>

  ))
}

export default DeletedTicket

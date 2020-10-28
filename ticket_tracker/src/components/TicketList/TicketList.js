import React, { useEffect } from 'react'
import { useObserver } from 'mobx-react'
import { useTicketStore } from '../../store/StoreContext'
import { makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles({
  items: {
    border: '1px solid black',
    borderRadius: 5,
    margin: 5,
    padding: 5,
    color: 'black'
  },
  center: {
    textAlign: 'center',
    textTransform: 'capitalize',
    textDecoration: 'underline',
    color: '#0D7DD5'
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

function TicketList (props) {
  const ticketStore = useTicketStore()
  useEffect(() => {
    ticketStore.GetTickets()
  }, [ticketStore.loggedIn])

  const styles = useStyles()
  return useObserver(() => (
    <div>
      {ticketStore.loggedIn
        ? <ul>
          {ticketStore.tickets.sort((a, b) => a.priority - b.priority).map(ticket => <div
            className={styles.items}
            key={ticket._id}
          >
            <header>
              <h1 className={styles.center}>{ticket.title}</h1>
            </header>
            <h3>Priority: {ticket.priority}</h3>
            <p>{ticket.text}</p>
          </div>)}
        </ul>
        : <ul>
          {ticketStore.tickets.sort((a, b) => a.priority - b.priority).map(ticket => <div
            className={styles.items}
            key={ticket._id}
          >
            <header className={styles.head}>
              <h1 className={styles.center}>{ticket.title}</h1>
              <Button
                variant='outlined'
                onClick={() => ticketStore.addToWorking(ticket._id)}
              >
                Take Ticket
              </Button>
            </header>
            <h3>Priority: {ticket.priority}</h3>
            <p>{ticket.text}</p>
          </div>)}
        </ul>}
    </div>
  ))
}

export default TicketList

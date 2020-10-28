import React from 'react'
import { useObserver } from 'mobx-react'
import { Button, makeStyles } from '@material-ui/core'
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
    textTransform: 'capitalize',
    textDecoration: 'underline',
    color: '#0D7DD5'
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

function WorkingTicketList (props) {
  const ticketStore = useTicketStore()
  const styles = useStyles()
  const { history } = props
  return useObserver(() => (
    <div>

      <Button onClick={() => history.push('/WorkingTicketList/DeletedTicket')}>Done Tickets</Button>
      <ul>
        {ticketStore.workingTickets.sort((a, b) => a.priority - b.priority).map(ticket => <div className={styles.items} key={ticket._id}>
          <header className={styles.head}>
            <h1 className={styles.center}>{ticket.title}</h1>
            <Button
              variant='outlined'
              onClick={() => ticketStore.removeWorkingTicket(ticket._id)} key={ticket._id}
            >
                  Move To Done
            </Button>
          </header>
          <h3>Priority: {ticket.priority}</h3>
          <p>{ticket.text}</p>
        </div>)}
      </ul>
    </div>
  ))
}

export default WorkingTicketList

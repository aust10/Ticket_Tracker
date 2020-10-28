import React, { useState } from 'react'
import { useTicketStore } from '../../store/StoreContext'
import { NewTicketForm } from '../NewTicketForm/NewTicketForm'
import { useObserver } from 'mobx-react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import TicketList from '../TicketList/TicketList'
import WorkingTicketList from '../WorkingTickets/WorkingTicketList'
import { Container } from '@material-ui/core'

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

const useStyles = makeStyles({
  root: {
    width: '35%',
    height: '35%',
    padding: 10,
    margin: 5,
    backgroundColor: '#FCFCFC'

  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#063b64'
  },
  ticketListTitle: {
    flexDirection: 'row',
    fontWeight: 'bold',
    color: '#063b64',
    textDecoration: 'underline'
  },
  ticketListTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  ticketList: {
    width: '65%',
    padding: 10,
    margin: 5,
    height: '500px',
    overflow: 'auto',
    backgroundColor: '#FCFCFC'

  },
  body: {
    marginLeft: 20,
    marginBottom: 20
  },
  paragraph: {
    paddingTop: 40,
    paddingLeft: 20,
    fontFamily: 'Arial, Helvetica, sans-serif'
  },
  hr: {
    width: '95%',
    borderTop: '.5px solid black'
  },
  tickets: {
    marginTop: 10,
    height: '80%',
    overflow: 'auto'
  }
})

const Home = (props) => {
  const [active, setActive] = useState(false)
  const ticketStore = useTicketStore()
  const styles = useStyles()
  const { history } = props
  return useObserver(() => (
    <>
      <hr className={styles.hr} />
      <body className={styles.body}>
        <Container maxWidth={false} className={styles.container}>
          <ErrorBoundary>
            {ticketStore.loggedIn
              ? <>
                <Card className={styles.root}>
                  <Typography data-testid='title' className={styles.title} gutterBottom>
              Ticket Form
                  </Typography>
                  <NewTicketForm />
                </Card>
                <Card className={styles.ticketList}>
                  <Container className={styles.ticketListTitleContainer}>
                    <Typography variant='h4' onClick={() => setActive(true)} className={styles.ticketListTitle} gutterBottom>
              Active Tickets
                      <Typography variant='h6'>
                Login To see your Working Tickets
                      </Typography>
                    </Typography>
                  </Container>
                  <Container className={styles.tickets}>
                    <TicketList />
                  </Container>
                </Card>
              </>
              : <>
                <Card className={styles.root}>
                  <Typography data-testid='title' className={styles.title} gutterBottom>
              Ticket Form
                  </Typography>
                  <NewTicketForm />
                </Card>
                <Card className={styles.ticketList}>
                  <Container className={styles.ticketListTitleContainer}>
                    {active
                      ? <Typography variant='h4' onClick={() => setActive(false)} className={styles.ticketListTitle} gutterBottom>
                  Your Working Tickets
                        <Typography variant='h6'>
                  Click for all active Tickets
                        </Typography>
                      </Typography>
                      : <Typography variant='h4' onClick={() => setActive(true)} className={styles.ticketListTitle} gutterBottom>
                  Active Tickets
                        <Typography variant='h6'>
                  Click for your working Tickets
                        </Typography>
                      </Typography>}
                  </Container>
                  {active
                    ? <Container className={styles.tickets}>
                      <WorkingTicketList history={history} />
                    </Container>
                    : <Container className={styles.tickets}>
                      <TicketList />
                    </Container>}
                </Card>
              </>}
          </ErrorBoundary>
        </Container>
      </body>
    </>
  ))
}

export default Home

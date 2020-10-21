import React, { useState } from 'react'
import { useTicketStore, TicketProvider } from '../../store/StoreContext'
import { NewTicketForm } from '../NewTicketForm/NewTicketForm'
import { useObserver } from 'mobx-react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import TicketList from '../TicketList/TicketList'
import WorkingTicketList from '../WorkingTickets/WorkingTicketList'
import { Container } from '@material-ui/core'
import background from '../../Images/graphImg.png'

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

const useStyles = makeStyles({
  root: {
    width: '35%',
    height: '35%',
    padding: 10,
    margin: 5

  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#67000C'
  },
  ticketListTitle: {
    flexDirection: 'row',
    // fontSize: 25,
    fontWeight: 'bold',
    color: '#67000C',
    textDecoration: 'underline'
  },
  ticketListTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'fixed'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    // marginTop: 200
  },
  ticketList: {
    width: '65%',
    padding: 10,
    margin: 5,
    height: '500px',
    overflow: 'auto'
  },
  body: {
    // marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    // backgroundImage: `url(${background})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'auto 325px ',
    // backgroundPosition: 'top center'
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
    marginTop: 100,
    height: '80%',
    overflow: 'auto'
    // position: 'fixed'
  }
})

const Home = (props) => {
  const [active, setActive] = useState(false)
  const ticketStore = useTicketStore()
  const styles = useStyles()
  const { history } = props
  return useObserver(() => (
    <>
    <hr className={styles.hr}/>
      <body className={styles.body}>
        {/* <header className={styles.paragraph}>
          <h2><i>Maximize your customer <br /> support with TicketDesk!</i></h2>
          <img href={background} />
        </header> */}

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
                Loggin To see your Working Tickets
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

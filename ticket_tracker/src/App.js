import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Breadcrum from './components/Breadcrumb/Breadcrumb'
import Home from './components/Home/Home'
import About from './components/Settings/About'
import Footer from './components/Footer/Footer'
import DeletedTicket from './components/WorkingTickets/DeletedTicket'
import WorkingTicketList from './components/WorkingTickets/WorkingTicketList'
import SignUp from '../src/components/SignUp/SignUp'
import { useTicketStore } from '../src/store/StoreContext'
import { useObserver } from 'mobx-react'
import KanbanBoard from './components/KanbanBoard/KanbanBoard'

function App () {
  const ticketStore = useTicketStore()
  const styles = {
    home: {
      backgroundColor: '#F0F8FF',
      minHeight: '100vh'
    }
  }
  return useObserver(() => (
    <div className='App' style={styles.home}>
      {ticketStore.loginCheck
        ? <>
          <Breadcrum />
          <Switch>
            <Route exact from='/' render={props => <Home {...props} />} />
            <Route exact path='/KanbanBoard' render={props => <KanbanBoard {...props} />} />
            <Route exact path='/Settings' render={props => <About {...props} />} />
            <Route
              exact
              path='/WorkingTicketList'
              render={props => <WorkingTicketList {...props} />}
            />
            <Route
              exact
              path='/WorkingTicketList/DeletedTicket'
              render={props => <DeletedTicket {...props} />}
            />
          </Switch>
          <Footer />
        </>
        : <SignUp />}
    </div>
  )

  )
}

export default App

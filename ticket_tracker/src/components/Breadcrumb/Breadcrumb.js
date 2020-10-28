import React from 'react'
import Breadcrubs from '@material-ui/core/Breadcrumbs'
import HomeIcon from '@material-ui/icons/Home'
import { withStyles, emphasize, Chip } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import { useTicketStore } from '../../store/StoreContext'
import image from '../../Images/mountain.png'

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    height: theme.spacing(5),
    color: '#0D7DD5',
    fontWeight: theme.typography.fontWeightBold,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300]
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12)
    }
  }
}))(Chip)

const styles = {
  breadcrumb: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    paddingTop: '20px',
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 5
  },
  title: {
    margin: 0,
    color: '#0D7DD5'
  },
  img: {
    height: 5,
    width: 5
  },
  left: {
    display: 'flex',
    paddingLeft: 10
  }
}

const Breadcrumb = (props) => {
  const { history, location } = props
  const ticketStore = useTicketStore()
  const logOut = () => {
    ticketStore.logOut()
    history.push('/')
  }

  return useObserver(() => (
    <div style={styles.breadcrumb}>
      <div style={styles.left}>
        <img height='40px' width='40px' src={image} alt='image' />
        <h1 style={styles.title}>TicketDesk</h1>
      </div>
      <>
        <Breadcrubs aria-lable='My Tasks'>
          <StyledBreadcrumb
            data-testId='home'
            label='Home'
            icon={<HomeIcon fontSize='small' />}
            onClick={() => history.push('/')}
          />
          {ticketStore.loggedIn
            ? null
            : <Breadcrubs>
              <StyledBreadcrumb
                data-testId='KanbanBoard'
                label='Kanban Board'
                onClick={() => history.push('/KanbanBoard')}
              />
              <StyledBreadcrumb
                data-testId='settings'
                label='Settings'
                onClick={() => history.push('/Settings')}
              />
              </ Breadcrubs>
              }
          {ticketStore.loggedIn
            ? <StyledBreadcrumb
              data-testId='LogOut'
              label='Log in / Signup'
              onClick={() => ticketStore.changeLogin()}
            />
            : <StyledBreadcrumb
              data-testId='LogOut'
              label='Log Out'
              onClick={() => logOut()}
            />}
        </Breadcrubs>
      </>
    </div>
  ))
}

export default withRouter(Breadcrumb)

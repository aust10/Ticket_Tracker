import React from 'react'
import Typography from '@material-ui/core/Typography'
import Breadcrubs from '@material-ui/core/Breadcrumbs'
import HomeIcon from '@material-ui/icons/Home'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles, emphasize, Chip, Link } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import { useTicketStore } from '../../store/StoreContext'
import SignUp from '../SignUp/SignUp'

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[400],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
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
    backgroundColor: '#fff0cf'
  },
  title: {
    margin: 0
    // // justifyContent: 'flex-end',
    // padding: '10px'
  }
}

// function handleClick (evt) {
//   evt.preventDefault()
//   alert('You Clicked a breadcrumb')
// }
const Breadcrumb = (props) => {
  const { history, location } = props
  // const { pathname } = location/
  const ticketStore = useTicketStore()
  const logOut = () => {
    ticketStore.logOut()
    history.push('/')
  }

  // const pathnames = pathname.split('/').filter(x => x)
  return useObserver(() => (
    <div style={styles.breadcrumb}>
      <h1 style={styles.title}>TicketDesk</h1>
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
                data-testId='ticketList'
                label='TicketList'
                onClick={() => history.push('/TicketList')}
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

// Extra stuff not needed at the moment

/* {pathnames.map((name, index) => {
  const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
  console.log('******')
  console.log(name)
  console.log(routeTo)
  console.log.apply(pathnames)
  console.log('******')
  return (
    <StyledBreadcrumb
      key={index}
      label={name}
      onClick={() => history.push(routeTo)}
    />
  )
})} */

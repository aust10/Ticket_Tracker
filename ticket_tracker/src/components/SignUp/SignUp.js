import React, { useState } from 'react'
import { useTicketStore } from '../../store/StoreContext'
import TextField from '@material-ui/core/TextField'
import { Button, Card, Chip, emphasize } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'

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

const useStyles = makeStyles({
  root: {
    marginTop: 10
  },
  field: {
    margin: 5
  },
  card: {
    textAlign: 'center',
    width: '40%',
    padding: 10,
    backgroundColor: '#FCFCFC',

    border: '1px solid black'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5px'
  },
  breadcrumb: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px'
  }
})

function SignUp () {
  const [login, setLogin] = useState(true)
  const [user, setUser] = useState(
    {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  )

  const updateUser = (evt) => {
    evt.preventDefault()
    setUser({
      ...user,
      [evt.target.name]: evt.target.value
    })
  }
  const ticketstore = useTicketStore()
  const styles = useStyles()
  return (
    <>
      <Breadcrumbs className={styles.breadcrumb}>
        <StyledBreadcrumb
          data-testId='home'
          label='Login'
          onClick={() => setLogin(true)}
        />
        <StyledBreadcrumb
          data-testId='home'
          label='Sign Up'
          onClick={() => setLogin(false)}
        />
      </Breadcrumbs>
      <div className={styles.container}>
        <Card className={styles.card}>
          {login
            ? <>
              <TextField
                className={styles.field}
                id='outlined-basic'
                label='Email'
                name='email'
                variant='outlined'
                value={user.email}
                onChange={updateUser}
              />
              <TextField
                className={styles.field}
                id='standard-password-input'
                type='password'
                label='Password'
                name='password'
                variant='outlined'
                autoComplete='current-password'
                value={user.password}
                onChange={updateUser}
              />
              <br />
              <Button
                className={styles.root}
                varient='outlined'
                onClick={() => ticketstore.login(user.email, user.password)}
              >
            Log In
              </Button>
            </>
            : <>

              <TextField
                className={styles.field}
                id='outlined-basic'
                type='text'
                label='First Name'
                name='firstName'
                variant='outlined'
                value={user.firstName}
                onChange={updateUser}
              />
              <TextField
                className={styles.field}
                id='outlined-basic'
                type='text'
                label='Last Name'
                name='lastName'
                variant='outlined'
                value={user.lastName}
                onChange={updateUser}
              />
              <br />
              <TextField
                className={styles.field}
                id='outlined-basic'
                label='Email'
                name='email'
                variant='outlined'
                value={user.email}
                onChange={updateUser}
              />
              <TextField
                className={styles.field}
                id='standard-password-input'
                type='password'
                label='Password'
                name='password'
                variant='outlined'
                autoComplete='current-password'
                value={user.password}
                onChange={updateUser}
              />
              <br />
              <Button
                className={styles.root}
                varient='outlined'
                onClick={() => ticketstore.signUp(user.email, user.password, user.firstName, user.lastName)}
              >
          Sign Up
              </Button>
            </>}
        </Card>
      </div>
    </>
  )
}

export default SignUp

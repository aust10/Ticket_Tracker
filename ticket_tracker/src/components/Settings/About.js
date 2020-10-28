import React, { useState } from 'react'
import { Button, makeStyles, TextField } from '@material-ui/core'
import { useTicketStore } from '../../store/StoreContext'
import { useObserver } from 'mobx-react'

const useStyles = makeStyles({
  inputs: {
    textAlign: 'center',
    backgroundColor: '#FCFCFC',
    marginLeft: '20%',
    marginRight: '20%'
  },
  btn: {
    padding: '15px 14px',
    marginLeft: 5
  },
  box: {
    marginRight: 5
  }
})

function About (props) {
  const { history } = props
  const [name, setName] = useState({
    firstName: '',
    lastName: ''
  })
  const styles = useStyles()

  const ticketStore = useTicketStore()

  const updateName = (evt) => {
    evt.preventDefault()
    console.log(evt.target.name)
    setName({
      ...name,
      [evt.target.name]: evt.target.value
    })
  }

  return useObserver(() => (
    <>
      <div>
        <Button data-testid='button' onClick={() => history.push('/')}>Back</Button>
      </div>
      <div className={styles.inputs}>
        <h1 style={{ color: '#063b64' }}>Update User</h1>
        <TextField
          id='outlined-basic'
          className={styles.box}
          label={ticketStore.currentUser.firstName}
          name='firstName'
          value={name.firstName}
          variant='outlined'
          helperText='First Name'
          onChange={updateName}
        />
        <TextField
          id='outlined-basic'
          label={ticketStore.currentUser.lastName}
          name='lastName'
          value={name.lastName}
          variant='outlined'
          helperText='Last Name'
          onChange={updateName}
        />
        <Button
          className={styles.btn}
          onClick={() => ticketStore.UpdateCurrentUser(name.firstName, name.lastName)}
          variant='outlined'
        >Submit
        </Button>
      </div>
    </>
  ))
}

export default About

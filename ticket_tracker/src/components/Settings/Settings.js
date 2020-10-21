import React from 'react'
import { Button } from '@material-ui/core'

function Settings (props) {
  const { history } = props
  return (
    <>
      <Button data-testid='about' onClick={() => history.push('/Settings/About')}>About</Button>
      {/* <Button data-testid='main' onClick={() => history.push('/Settings/Main')}>Main</Button> */}
    </>
  )
}

export default Settings

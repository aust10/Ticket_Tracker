import React from 'react'
import { Button } from '@material-ui/core'
import KanbanBoard from '../KanbanBoard/KanbanBoard'

function Main (props) {
  const { history } = props
  return (
    <div>
      <Button data-testid='button' onClick={() => history.push('/Settings')}>Back</Button>
      <h1>Main sub section of Setting</h1>
      <KanbanBoard />
    </div>
  )
}

export default Main

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
  footer: {
    margin: 5,
    position: 'fixed',
    bottom: 5
  }
})

function Footer () {
  const styles = useStyles()
  return (
    <>
      <p className={styles.footer}>TicketDesk.com</p>
    </>
  )
}

export default Footer

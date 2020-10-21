import React from 'react'
import { createTicketStore } from './Store'
import { useLocalStore } from 'mobx-react'

const TicketContext = React.createContext(null)

export const TicketProvider = ({ children }) => {
  const ticketStore = useLocalStore(createTicketStore)

  return (
    <TicketContext.Provider value={ticketStore}>
      {children}
    </TicketContext.Provider>
  )
}

export const useTicketStore = () => React.useContext(TicketContext)

import React, { useEffect, useState } from 'react'
import { useObserver } from 'mobx-react'
import { useTicketStore } from '../../store/StoreContext'
import { makeStyles, Button } from '@material-ui/core'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const useStyles = makeStyles({
  items: {
    border: '1px solid black',
    borderRadius: 5,
    margin: 5,
    padding: 5
  },
  center: {
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

function DragDrop (props) {
  const ticketStore = useTicketStore()
  useEffect(() => {
    ticketStore.GetTickets()
  }, [ticketStore.loggedIn])

  const styles = useStyles()
  return useObserver(() => (
    <div>
      {ticketStore.loggedIn
        ? <DragDropContext onDragEnd={ticketStore.handleOnDragEnd}>
          <Droppable droppableId='tickets'>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {/* ticketStore.tickets.sort((a, b) => a.priority - b.priority) */}
                {ticketStore.tickets.map((ticket, index) =>
                  <Draggable key={ticket._id} draggableId={ticket._id} index={index}>
                    {(provided) => (
                      <div
                        className={styles.items}
                        {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                      >
                        <header>
                          <h1 className={styles.center}>{ticket.title}</h1>
                        </header>
                        <h3>Priority: {ticket.priority}</h3>
                        <p>{ticket.text}</p>
                      </div>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          </DragDropContext>
        : <DragDropContext onDragEnd={ticketStore.handleOnDragEnd}>
          <Droppable droppableId='tickets'>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {/* ticketStore.tickets.sort((a, b) => a.priority - b.priority) */}
                {ticketStore.tickets.map((ticket, index) =>
                  <Draggable key={ticket._id} draggableId={ticket._id} index={index}>
                    {(provided) => (
                      <div
                        className={styles.items}
                        {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                      >
                        <header>
                          <h1 className={styles.center}>{ticket.title}</h1>
                        </header>
                        <Button
                          variant='outlined'
                          onClick={() => ticketStore.addToWorking(ticket._id)}
                      >
                  Take Ticket
                        </Button>
                        <h3>Priority: {ticket.priority}</h3>
                        <p>{ticket.text}</p>
                      </div>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>}
    </div>
  ))
}

export default DragDrop

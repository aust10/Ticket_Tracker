import React, { useEffect, useState } from 'react'
import { useObserver } from 'mobx-react'
import { useTicketStore } from '../../store/StoreContext'
import { makeStyles, Button, unstable_createMuiStrictModeTheme } from '@material-ui/core'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuid } from 'uuid'

const useStyles = makeStyles({
  items: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 20,
    padding: 10
  }
})

function KanbanBoard () {
  const styles = useStyles()
  const ticketStore = useTicketStore()

  console.log(ticketStore.tickets)

  const columnsFromBackend =
    {
      [uuid()]: {
        // this is the column name
        name: 'Active',
        // this has to be an array of objects
        items: ticketStore.tickets
      },
      [uuid()]: {
        // this is the column name
        name: 'Taken Items',
        // this has to be an arry of objects
        items: ticketStore.workingTickets
      },
      [uuid()]: {
        name: 'Completed',
        items: ticketStore.deletedTickets
      },
      [uuid()]: {
        name: 'Delete',
        items: []
      }
    }

  const [columns, setColumns] = useState(columnsFromBackend)
  useEffect(() => {
    ticketStore.updateTicketLocation(columns)
    console.log(columns, 'hello')
  }, [columns, ticketStore.tickets, ticketStore.workingTickets, ticketStore.deletedTickets])

  return useObserver(() => (
    <div className={styles.items}>
      <DragDropContext onDragEnd={result => ticketStore.onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItmes: 'center' }} key={id}>
              <h2 style={{ textAlign: 'center', color: '#063b64' }}>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? 'lightBlue' : '#FCFCFC',
                          padding: 4,
                          width: 250,
                          height: 500,
                          border: '.25px solid black',
                          borderRadius: '5px',
                          overflow: 'auto'
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item._id} draggableId={item._id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: 'none',
                                      padding: 16,
                                      margin: '0 0 8px 0',
                                      minHeight: '50px',
                                      borderRadius: '2.5px',
                                      backgroundColor: snapshot.isDragging ? '#263B4A' : '#456CB6',
                                      color: 'white',
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <h3>{item.title}</h3>
                                    <h4>Priority: {item.priority}</h4>
                                    <p>{item.text}</p>
                                  </div>
                                )
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
              </div>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  ))
}

export default KanbanBoard

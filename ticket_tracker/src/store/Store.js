
import { nanoid } from 'nanoid'

export function createTicketStore () {
  return {
    loggedIn: true,
    loginCheck: true,
    tickets: [],
    workingTickets: [],
    deletedTickets: [],
    currentUser: null,
    error: null,
    errorInfo: null,
    signUp (email, password, firstName, lastName) {
      console.log(email, password, 'check it out')
      fetch(
        '/signUp',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
          })
        })
        .then(response => response.json())
        .then(data => {
          // need to work on getting what is needed into the store ie token for fetches and name for headers
          this.loggedIn = true
          this.loginCheck = false
          this.currentUser = data
          console.log('you got here')
        })
    },
    login (email, password) {
      fetch(
        '/login',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.errorMessage) { alert('invalid login credentials')}
          else {
            this.loggedIn = false
            this.loginCheck = true
            this.currentUser = data.currentUser
            this.workingTickets = data.currentUser.activeTickets
            this.deletedTickets = data.currentUser.completedTickets
            this.token = data.token
          }
        })
    },
    changeLogin () {
      this.loginCheck = false
    },
    logOut () {
      this.loggedIn = true
      this.tickets = []
      this.workingTickets = []
      this.deletedTickets = []
      this.currentUser = null
      this.error = null
      this.errorInfo = null
      this.loggedIn = true
      this.loginCheck = true
    },
    addTicket (title, priority, text) {
      fetch('/ticketSubmit',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: title,
            priority: priority,
            text: text
          })
        }
      )
        .then(this.GetTickets())
    },
    removeTicket (id) {
      this.deletedTickets.forEach(ticket => {
        if (ticket._id === id) {
          console.log('yep')
          this.deletedTickets.splice(this.deletedTickets.indexOf(ticket), 1)
          this.UpdateCurrentUser('', '', this.workingTickets)
        }
      })
    },
    addToWorking (id) {
      this.tickets.forEach(ticket => {
        if (ticket._id === id) {
          this.workingTickets.push(ticket)
          this.UpdateCurrentUser('', '', ticket)
          fetch('/removeTicketFromAll',
            {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: ticket._id
              })
            }
          )
            .then(response => response.json())
            .then(data => {
              this.tickets = data
            })
          this.tickets.splice(this.tickets.indexOf(ticket), 1)
        }
      })
    },
    removeWorkingTicket (id) {
      this.workingTickets.forEach(ticket => {
        if (ticket._id === id) {
          this.deletedTickets.push(ticket)
          this.workingTickets = this.workingTickets.filter(ticket => ticket._id !== id)
        }
      })
    },
    UpdateCurrentUser (firstName, lastName) {
      fetch('/updateUser',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.currentUser._id,
            firstName: firstName,
            lastName: lastName,
            activeTickets: this.workingTickets
          })
        })
        .then(response => response.json())
        .then(data => {
          this.currentUser = data
        })
    },
    GetTickets () {
      fetch('getTickets',
        {
          method: 'get'
        }
      )
        .then(response => response.json())
        .then(data => {
          this.tickets = data
        })
    },
    onDragEnd (result, columns, setColumns) {
      console.log(result.source, 'check')
      if (!result.destination) return
      const { source, destination } = result
      if (source.droppableId !== destination.droppableId) {
        const sourceClolumn = columns[source.droppableId]
        const destColumn = columns[destination.droppableId]
        const sourceItems = [...sourceClolumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1)
        destItems.splice(destination.index, 0, removed)
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...sourceClolumn,
            items: sourceItems
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems
          }
        })
      } else {
        const column = columns[source.droppableId]
        const coppiedItems = [...column.items]
        const [removed] = coppiedItems.splice(source.index, 1)
        coppiedItems.splice(destination.index, 0, removed)
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...column,
            items: coppiedItems
          }
        })
      }
    },
    updateTicketLocation (columns) {
      console.log(columns)
      const check = []
      for (const [key, value] of Object.entries(columns)) {
        check.push(value)
      }
      const active = check[0].items
      const currentWorkingTickets = check[1].items
      const completed = check[2].items
      const deleted = check[3].items
      console.log(check[3], 'check')

      fetch('/updateBackend',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            active: active,
            currentWorkingTickets: currentWorkingTickets,
            completed: completed,
            deleted: deleted,
            currentUser: this.currentUser
          })
        }
      )
        .then(response => response.json())
        .then(data => {
          this.workingTickets = data.activeTickets
          this.deletedTickets = data.completedTickets
          console.log(data, 'here is the data that is coming back')
        })
    }
  }
}

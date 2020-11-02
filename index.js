const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

const AuthController = require('./ticket_tracker/controllers/auth')
const ProtectedController = require('./ticket_tracker/controllers/protected')

const http = require('http').createServer(app)
const port = process.env.PORT || 8000

app.use(express.static(path.join(__dirname, 'ticket_tracker/build')))
app.use(express.json())
app.use(morgan('tiny'))
app.use('/', AuthController)
app.use('/', ProtectedController)

const connectDatabase = async (databaseName = 'ticketDB', hostname = 'localhost') => {
  const database = await mongoose.connect(process.env.MONGODB_URI || `mongodb://${hostname}/${databaseName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  console.log(`Database connected at mongodb://${hostname}/ ${databaseName}`)
  return database
}

const startServer = port => {
  http.listen(port, async () => {
    await connectDatabase()
    console.log(`Listining on port: ${port}`)
  })
}

startServer(port)

const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Ticket = require('../models/Ticket')

const express = require('express')
const router = express.Router()

router.post('/updateUser', (req, res) => {
  console.log(req.body.id)

  const objUpdate = {}

  if (req.body.firstName !== '') objUpdate.firstName = req.body.firstName
  if (req.body.lastName !== '') objUpdate.lastName = req.body.lastName
  const activeTickets = req.body.activeTickets
  if (req.body.activeTickets !== []) objUpdate.activeTickets = activeTickets
  const updates = {
    $set: objUpdate
    // $push: {
    //   activeTickets: activeTickets
    // }
  }

  User.updateOne({ _id: req.body.id }, updates, (err, user) => {
    if (err) return res.status(500).send(err)
    console.log('profile updated')
    User.findOne({ _id: req.body.id }, (err, newuser) => {
      if (err) return res.status(500).send(err)
      res.send(newuser)
    })
  })
})
// working on this section
router.post('/ticketSubmit', (req, res) => {
  console.log(req.body)

  Ticket.submit(req.body.title, req.body.priority, req.body.text)
})

router.post('/removeTicketFromAll', (req, res) => {
  console.log(req.body.id, 'req.body')
  Ticket.deleteOne({ _id: req.body.id }, (err, find) => {
    if (err) return res.status(500).send(err)
    console.log(find, 'find')
    Ticket.find({}, async (err, data) => {
      if (err) return res.status(500).send(err)
      if (data) {
        res.send(data)
        console.log(data, 'no regets')
      } else {
        console.log('no data to send')
      }
    })
  })
})

router.get('/getTickets', (req, res) => {
  Ticket.find({}, async (err, data) => {
    if (err) return res.status(500).send(err)
    if (data) {
      res.send(data)
      console.log(data)
    } else {
      console.log('no data to send')
    }
  })
})

router.post('/updateBackend', (req, res) => {
  console.log(req.body, 'body check')
  Ticket.deleteMany({}, async (err, data) => {
    if (err) return res.status(500).send(err)
    if (data) {
      console.log('hello')
    }
    console.log(req.body.active, '1')
    Ticket.insertMany(req.body.active, (err, stuff) => {
      if (err) return res.status(500).send(err)
      if (stuff) {
        console.log('got it')
        // res.send(stuff)
      }
    })
    const objUpdate = {}
    if (req.body.currentWorkingTickets !== []) objUpdate.activeTickets = req.body.currentWorkingTickets
    if (req.body.completed !== []) objUpdate.completedTickets = req.body.completed
    const updates = {
      $set: objUpdate
    }
    User.updateOne({ _id: req.body.currentUser._id }, updates, (err, user) => {
      if (err) return res.status(500).send(err)
      console.log('profile updated')
      User.findOne({ _id: req.body.currentUser._id }, (err, newuser) => {
        if (err) return res.status(500).send(err)
        res.send(newuser)
      })
    })
  })
})

module.exports = router

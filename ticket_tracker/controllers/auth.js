const jwt = require('jsonwebtoken')
const User = require('../models/User')

const express = require('express')
const router = express.Router()

router.post('/signUp', (req, res) => {
  console.log(req.body)
  User.findOne({ email: req.body.email }, async (err, userExist) => {
    if (err) return res.status(500).send(err)
    if (userExist) {return res.status(400).send({
      errorMessage: 'User already exists.'
    })}
    const user = await User.signUp(req.body.email, req.body.password, req.body.firstName, req.body.lastName)

    const token = jwt.sign({
      _id: user._id
    }, 'PROCESS')

    console.log(user, 'this is user')
    
    res.send({
      token,
      currentUser: user
    })
    res.status(201).send(user.sanitize())
  })
})

router.post('/login', (req, res) => {
  console.log(req.body)
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) return res.status(500).send(err)

    if (!user || !user.comparePassword(req.body.password)) return res.status(400).send({ errorMessage: 'Invalid credentials' })

    const token = jwt.sign({
      _id: user._id
    }, 'PROCESS')

    res.send({
      token: token,
      currentUser: user
    })
    // res.status(201).send(user.sanitize())
  })
})

module.exports = router

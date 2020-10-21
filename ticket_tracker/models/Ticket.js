const mongoose = require('mongoose')

const { Schema } = mongoose

const ticketSchema = Schema({
  title: {
    type: String,
    required: false
  },
  priority: {
    type: Number,
    required: false
  },
  text: {
    type: String,
    required: true
  }
})

ticketSchema.statics.submit = async function (title, priority, text) {
  const ticket = new this()
  ticket.title = title
  ticket.priority = priority
  ticket.text = text
  await ticket.save()
  return ticket
}

const Ticket = mongoose.model('ticket', ticketSchema)
module.exports = Ticket

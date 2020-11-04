const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose

const userSchema = Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  activeTickets: {
    type: Array,
    required: false
  },
  completedTickets: {
    type: Array,
    required: false
  }
})

userSchema.statics.signUp = async function (email, password, firstName, lastName) {
  const user = new this()
  user.email = email
  user.hashPassword(password)
  user.firstName = firstName
  user.lastName = lastName
  await user.save()
  return user
}

userSchema.methods.hashPassword = function (plainText) {
  this.password = bcrypt.hashSync(plainText, 4)
}

userSchema.methods.comparePassword = function (plainText) {
  return bcrypt.compareSync(plainText, this.password)
}

userSchema.methods.sanitize = function () {
  return {
    ...this._doc,
    password: undefined
  }
}

const User = mongoose.model('User', userSchema)
module.exports = User

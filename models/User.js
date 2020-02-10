require('dotenv').config()

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const capitalizeString = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  links: [{
    type: Schema.Types.ObjectId,
    ref: 'Link'
  }]
})

User.statics.newUser = async function(req, res) {
  const { name, email, password } = req.body

  user = await this.model('User').findOne({ email })
  
  if (user) {
    return res.status(400).json({ message: 'User already exists' })
  }
    
  const userData = {
    name: capitalizeString(name),
    email,
    password: await bcrypt.hash(password, 10)
  }
  
  const newUser = await this.model('User').create(userData)

  newUser.__v = undefined

  res.status(201).json(newUser)

}

User.statics.sendToken = async function(req, res) {
  const { email, password } = req.body

  const user = await this.model('User').findOne({ email })

  if (!user) {
    return res.status(400).json({ message: 'User with this email does not exist' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Wrong password' })
  }

  jwt.sign({ userId: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' }, (err, token) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' })
    }

    res.status(200).json({ token, userId: user._id })
  })

}

module.exports = mongoose.model('User', User)
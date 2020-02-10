const User = require('../models/User')
const { validationResult } = require('express-validator')

const mapErrors = errors => errors.reduce((target, err) => {
  target[err.param] = err.msg
  return target
}, {})

const authController = (action) => {
  return async (req, res) => {
    try {
      const errors = validationResult(req)
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: mapErrors(errors.array({ onlyFirstError: true })),
          message: 'Invalid input fields'
        })
      }
  
      if (action === 'login') {
        await User.sendToken(req, res)
      } else {
        await User.newUser(req, res)
      }
  
    } catch (err) {
      res.status(500).json({ message: 'Authorization failed' })
    }
  }
}

module.exports = authController
const { check } = require('express-validator')

const loginValidator = [
  check('email')
    .notEmpty().withMessage('Email should not be empty')
    .isEmail().withMessage('Invalid email address'),
  check('password')
    .notEmpty().withMessage('Password should not be empty')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters')
]

const registerValidator = [
  check('name', 'Name should not be empty').notEmpty(),
  check('email')
    .notEmpty().withMessage('Email should not be empty')
    .isEmail().withMessage('Invalid email address'),
  check('password')
    .notEmpty().withMessage('Password should not be empty')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters')
]

module.exports = { loginValidator, registerValidator }
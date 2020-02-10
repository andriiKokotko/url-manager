const router = require('express').Router()
const { loginValidator, registerValidator } = require('../validators')
const authController = require('../controllers/auth')

router.post('/login', loginValidator, authController('login'))

router.post('/register', registerValidator, authController('register'))

module.exports = router
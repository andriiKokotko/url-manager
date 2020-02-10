require('dotenv').config()

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Authorization failed' })
    }

    const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY)

    req.user = payload
    next()

  } catch (err) {
    res.status(401).json({ message: err.message })
  }
}
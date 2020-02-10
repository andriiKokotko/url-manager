require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const auth = require('./middleware/auth')
const Link = require('./models/Link')

const app = express()

app.use(express.json({ extended: true }))

app.get('/t/:code', async (req, res) => {
  const code = req.params.code

  const link = await Link.findOne({ code })

  if (!link) {
    res.status(404).json({ message: 'No link found' })
  }

  link.clicks++
  await link.save()

  res.redirect(link.from)
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/links', auth, require('./routes/links'))


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    console.log('Mongo connected...')
    app.listen(5000, () => console.log(`Listening on port ${PORT}...`))
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })

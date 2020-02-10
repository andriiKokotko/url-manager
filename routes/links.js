require('dotenv').config()

const shortid = require('shortid')
const router = require('express').Router()
const Link = require('../models/Link')

router.post('/generate', async (req, res) => {
  try {
    const baseURL = process.env.BASE_URL
    const { from } = req.body
    const code = shortid.generate()

    const existing = await Link.findOne({ from })

    if (existing) {
      return res.json({ link: existing })
    }

    const to = `${baseURL}/t/${code}`

    const link = await Link.create({
      from, to, code, owner: req.user.userId
    })

    res.status(201).json({ link })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/', async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    
    links.forEach(link => link.__v = undefined)
    res.json(links)
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }  
})

router.get('/:id', async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)

    link.__v = undefined
    res.json(link)
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }  
})

module.exports = router
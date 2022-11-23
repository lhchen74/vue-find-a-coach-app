const express = require('express')
const router = express.Router()
const Request = require('../models/Request')
const auth = require('./auth');

router.get('/:coachId', auth, async (req, res) => {
  const coachId = req.params.coachId
  const requests = await Request.findAll({ coachId })
  res.json({ requests })
})

router.post('/', async (req, res) => {
  const { coachId, userEmail, message } = req.body

  const requestData = {
    coachId, userEmail, message
  }

  const result = await Request.create(requestData)
  res.json(result)
})

module.exports = router
const express = require('express')
const router = express.Router()
const Coach = require('../models/Coach')
const auth = require('./auth');

router.get('/', async (req, res) => {
  const coaches = await Coach.findAll()
  res.json({ coaches })
})

router.post('/', auth, async (req, res) => {
  console.log(req.body);
  const { id, firstName, lastName, areas, description, hourRate } = req.body
  const coachData = {
    id, firstName, lastName, areas, description, hourRate
  }

  console.log(id);

  const coach = await Coach.findOne({ where: { id } })
  if (coach) {
    return res.status(400).json({ error: 'coach already exists.' })
  }
  await Coach.create(coachData)
  res.json({ success: 'coach create success.' })
})

module.exports = router
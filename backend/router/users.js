const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()
const User = require('../models/User')
const auth = require('./auth');


router.get('/', auth, async (req, res) => {
    const users = await User.findAll()
    res.json({ users })
})

router.post('/register', async (req, res) => {
    const { email, password } = req.body
    const userData = {
        email,
        password: bcrypt.hashSync(password, 10),
    }

    const user = await User.findOne({ where: { email } })
    if (user) {
        return res.status(400).json({ error: 'user already exists.' })
    }
    const { dataValues: { id } } = await User.create(userData)

    const token = jwt.sign({ id, email }, 'jwt-secret', {
        expiresIn: '3600s'
    })

    res.json({ token, id, expiresIn: 3600 })
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
        return res.status(400).json({ error: 'email or password error.' })
    }

    const checkPassword = bcrypt.compareSync(password, user.password)
    if (!checkPassword) {
        return res.status(400).json({ error: 'email or password error.' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'jwt-secret', {
        expiresIn: '3600s'
    })

    res.json({ token, id: user.id, expiresIn: 3600 })

})

module.exports = router
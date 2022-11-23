const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const usersRouter = require('./router/users')
const coachesRouter = require('./router/coaches')
const requestsRouter = require('./router/requests')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/users', usersRouter)
app.use('/coaches', coachesRouter)
app.use('/requests', requestsRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
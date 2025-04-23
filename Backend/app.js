const env = require('dotenv')
env.config()
const express = require('express')
const app = express()
const cors = require('cors')
const connectToDB = require('./db/db')
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const cookies = require('cookie-parser')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(cookies())

connectToDB()


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/user', userRoutes)
app.use('/captain',captainRoutes)



module.exports = app
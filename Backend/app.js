const env = require('dotenv')
env.config()
const express = require('express')
const app = express()
const cors = require('cors')
const connectToDB = require('./db/db')
const userRoute = require('./routes/user.routes')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

connectToDB()


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/user', userRoute)



module.exports = app
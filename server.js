express = require('express')
require('dotenv').config()
const bodyparser = require('body-parser')
const cors = require('cors')


const app = express()

// Middleware
app.use(
    bodyparser.json( { limit: "30mb", extended: true }),
    bodyparser.urlencoded( { limit: "30mb", extended: true }),
)
app.use(cors())

// Routes
const bandRoute = require('./routes/book')
app.use('/books', bandRoute)

const favoriteRoute = require('./routes/userbook')
app.use('/favorites', favoriteRoute)

const userRoute = require('./routes/user')
app.use('/users', userRoute)

const commentRoute = require('./routes/comment')
app.use('/comments', commentRoute)


PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`listening on port ${PORT}`))
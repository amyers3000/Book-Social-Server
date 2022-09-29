express = require('express')
require('dotenv').config()
const bodyparser = require('body-parser')
const cors = require('cors')


const app = express()

// Middleware
app.use(
    bodyparser.json( { limit: "30mb", extended: true }),
    bodyparser.urlencoded( { limit: "30mb", extended: true }),
    cors()
)

// Routes
const bandRoute = require('./routes/book')
app.use('/search', bandRoute)

const favoriteRoute = require('./routes/favorite')
app.use('/favorite', favoriteRoute)

const userRoute = require('./routes/user')
app.use('/user', userRoute)

const commentRoute = require('./routes/comment')
app.use('/comment', commentRoute)


PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`listening on port ${PORT}`))
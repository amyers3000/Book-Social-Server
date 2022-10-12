express = require('express')
require('dotenv').config()
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')


const app = express()

// Middleware
app.use(
    bodyparser.json( { limit: "30mb", extended: true }),
    bodyparser.urlencoded( { limit: "30mb", extended: true }),
)
app.use(cors())
// serve static front end in production mode
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
}


// Routes

const bandRoute = require('./routes/book')
app.use('/api/books', bandRoute)

const favoriteRoute = require('./routes/userbook')
app.use('/api/favorites', favoriteRoute)

const userRoute = require('./routes/user')
app.use('/api/users', userRoute)

const commentRoute = require('./routes/comment')
app.use('/api/comments', commentRoute)


PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`listening on port ${PORT}`))
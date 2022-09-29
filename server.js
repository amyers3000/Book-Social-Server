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


PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`listening on port ${PORT}`))
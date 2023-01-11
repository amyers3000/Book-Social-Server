const router = require('express').Router()
const { searchBooks, refinedBookSearch, saveBook } = require('../controllers/book')
const { validateJWT } = require('../middleware/auth')

router.get('/:title', searchBooks)
router.get('/:title/:author', validateJWT, refinedBookSearch)
router.post('/', validateJWT, saveBook)



module.exports = router
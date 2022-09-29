const router = require('express').Router()
const { searchBooks, refinedBookSearch, saveBook } = require('../controllers/book')

router.get('/:title', searchBooks)
router.get('/:title/:author', refinedBookSearch)
router.post('/:id', saveBook)



module.exports = router
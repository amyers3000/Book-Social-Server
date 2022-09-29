const router = require('express').Router()
const { editComment, addComment, deleteComment } = require('../controllers/comment')

router.post('/', addComment)
router.put('/:id', editComment)
router.delete('/:id', deleteComment)


module.exports = router
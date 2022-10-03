const router = require('express').Router()
const { editComment, addComment, deleteComment } = require('../controllers/comment')
const { validateJWT } = require('../middleware/auth')

router.post('/:bookId/comment', validateJWT, addComment)
router.delete('/:bookId/:commentId', validateJWT, deleteComment)
router.put('/:bookId/:commentId', editComment)



module.exports = router
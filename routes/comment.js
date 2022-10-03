const router = require('express').Router()
const { editComment, addComment, deleteComment, showComment } = require('../controllers/comment')
const { validateJWT } = require('../middleware/auth')

router.get('/:commentId', validateJWT, showComment)
router.post('/:bookId', validateJWT, addComment)
router.delete('/:commentId', validateJWT, deleteComment)
router.put('/:commentId', validateJWT, editComment)




module.exports = router
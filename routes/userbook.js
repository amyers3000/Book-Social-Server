const router = require('express').Router()
const { showAllFavorites, showFavorite, removeFavorite } = require('../controllers/userbook')
const { validateJWT } = require('../middleware/auth')

router.get('/:id', validateJWT, showFavorite)
router.delete('/:id',validateJWT, removeFavorite)




module.exports = router
const router = require('express').Router()
const { showAllFavorites, showFavorite, removeFavorite } = require('../controllers/userbook')
const { validateJWT } = require('../middleware/auth')

router.get('/', validateJWT, showAllFavorites)
router.get('/:id', showFavorite)
router.delete('/:id', removeFavorite)




module.exports = router
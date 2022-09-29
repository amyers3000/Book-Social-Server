const router = require('express').Router()
const { showAllFavorites, showFavorite, removeFavorite } = require('../controllers/favorite')

router.get('/', showAllFavorites)
router.delete('/:id', removeFavorite)
router.get('/:id', showFavorite)



module.exports = router
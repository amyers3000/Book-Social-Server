const router = require('express').Router()
const { signUp, showAllUsers, showUser, logIn, followUser} = require('../controllers/user')
const { validateJWT } = require('../middleware/auth')

router.get('/', validateJWT, showAllUsers)
router.get('/:username', showUser)
router.post('/signUp', signUp)
router.post('/login', logIn)
router.post('/follow/:id', validateJWT, followUser)




module.exports = router
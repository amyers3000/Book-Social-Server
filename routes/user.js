const router = require('express').Router()
const { signUp, showAllUsers, showUser, logIn} = require('../controllers/user')
const { validateJWT } = require('../middleware/auth')

router.get('/', validateJWT, showAllUsers)
router.get('/:username', showUser)
router.post('/signUp', signUp)
router.post('/login', logIn)




module.exports = router
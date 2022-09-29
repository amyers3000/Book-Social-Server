const router = require('express').Router()
const { signIn, logIn, showAllUsers, showUser, deleteUser } = require('../controllers/user')

router.get('/', showAllUsers)
router.get('/:id', showUser)
router.delete('/:id', deleteUser)
router.post('/login', logIn)
router.post('/signin', signIn)



module.exports = router
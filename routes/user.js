const router = require('express').Router()
const { Authentication, signUp, searchUsers, showUser, logIn, followUser, removeConnection} = require('../controllers/user')
const { validateJWT } = require('../middleware/auth')

router.get('/search/:term', validateJWT, searchUsers)
router.get('/check', validateJWT, Authentication)
router.get('/user/:username',validateJWT, showUser)
router.post('/signUp', signUp)
router.post('/login', logIn)
router.post('/follow/:id', validateJWT, followUser)
router.delete('/follow/:id', validateJWT, removeConnection)




module.exports = router
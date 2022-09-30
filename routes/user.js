const router = require('express').Router()
const { signUp, showAllUsers} = require('../controllers/user')

router.get('/', showAllUsers)
router.post('/', signUp)



module.exports = router
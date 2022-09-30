const db = require('../models')
const bcrypt = require('bcrypt')

const { User } =db

async function signUp(req, res){
    let { password, ...rest } = req.body
    console.log(password)
    const user = await User.create({
        ...rest,
        password_digest: await bcrypt.hash(password, 10)
    })
    res.json(user)
}

async function showAllUsers(req, res){
    const users = await User.findAll()
    res.json(users)
}


module.exports = { signUp, showAllUsers }
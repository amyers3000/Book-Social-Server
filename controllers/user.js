const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User, Book } =db

async function signUp(req, res){
    let { password, ...rest } = req.body
    const user = await User.create({
        ...rest,
        password_digest: await bcrypt.hash(password, 10)
    })

    const payload = {
        userId: user.userId
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn : '1d'})
    res.json(token)
}

async function logIn(req, res){
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where :{ username: username }})
        if(!user) {
            res.status(422).json({'message':'invalid credentials'})
            return
        }
        const validPassword = await bcrypt.compare(password, user.password_digest)
        if(!validPassword) {
            res.status(422).json({'message': 'invalid credentials'})
            return
        }

        const payload = {
            userId: user.userId
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h'})
        
        res.json(token)

    } catch (error) {
        res.status(500).json({'message' : error})
    }
}

async function showAllUsers(req, res){
    const users = await User.findAll()
    res.json(users)
}

async function showUser(req, res){
    const { username } = req.params
    const findUser = await User.findOne({
         where:{ 
            username: username
         },
         include:{ 
            model: Book,
            as: 'books',
            attributes: {exclude: [ "description", "link", "createdAt", "updatedAt", "bookId" ]}
         }
        })
    if(!findUser){
        res.status(404).json({ message: "user does not exist" })
        return
    }
    res.json(findUser)
}


module.exports = { signUp, showAllUsers, showUser, logIn }
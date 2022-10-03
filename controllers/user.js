const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const { User, Book, UserFollower } = db

async function signUp(req, res) {
    try {
        let { password, ...rest } = req.body
        const user = await User.create({
            ...rest,
            password_digest: await bcrypt.hash(password, 10)
        })

        const payload = {
            userId: user.userId
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.json(token)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

async function logIn(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username: username } })
        if (!user) {
            res.status(422).json({ 'message': 'invalid credentials' })
            return
        }
        const validPassword = await bcrypt.compare(password, user.password_digest)
        if (!validPassword) {
            res.status(422).json({ message: 'invalid credentials' })
            return
        }

        const payload = {
            userId: user.userId
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' })

        res.json(token)

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

async function showAllUsers(req, res) {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

async function showUser(req, res) {
    const { username } = req.params
    try {
        const findUser = await User.findOne({
            where: {
                username: username
            },
            include: [{
                model: Book,
                as: 'books',
                attributes: { exclude: ["description", "link", "createdAt", "updatedAt", "bookId"] },

            },
            {
                model: User,
                as: 'Following',
                attributes: { exclude: ["city", "state", "username", "createdAt", "updatedAt", "password_digest"] },
                through: { attributes: [] }


            },
            {
                model: User,
                as: 'Followers',
                attributes: { exclude: ["city", "state", "username", "createdAt", "updatedAt", "password_digest"] },
                through: { attributes: [] }

            }
            ]
        })
        if (!findUser) {
            res.status(404).json({ message: "user does not exist" })
            return
        }
        res.json(findUser)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

async function followUser(req, res) {
    const { id } = req.params
    try {
        if (req.user.userId == id) {
            res.status(404).json({ message: 'cannot add self as connecitons' })
        } else {
            const [match, added] = await UserFollower.findOrCreate({
                where: {
                    userId: id,
                    followingId: req.user.userId
                },
                userId: id,
                followingId: req.user.userId
            })

            if (added) {
                res.json({ message: "Connection saved" })
            } else if (match) {
                res.json({
                    message: "Connection already added",
                })
            }
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

async function removeConnection(req, res) {

    const { id } = req.params
    try {
        const deleteConnection = await UserFollower.findOne({
            where: {
                userId: id,
                followingId: req.user.userId
            }
        })
        if (deleteConnection) {
            await deleteConnection.destroy()
            res.json({ message: "connection succesfully deleted" })
        } else {
            res.status(404).json({ message: "connection does not exist" })
        }
    } catch (error) {

    }
}


module.exports = { signUp, showAllUsers, showUser, logIn, followUser, removeConnection }


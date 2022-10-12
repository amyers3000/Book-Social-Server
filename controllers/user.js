const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')


const { User, Book, UserFollower, Comment } = db

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
        res.json({ user: user, token: token })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

async function logIn(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username: username } })
        if (!user) {
            res.status(422).json({ 'message': 'Invalid credentials' })
            return
        }
        const validPassword = await bcrypt.compare(password, user.password_digest)
        if (!validPassword) {
            res.status(422).json({ message: 'Invalid credentials' })
            return
        }

        const payload = {
            userId: user.userId
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' })

        res.json({ user: user, token: token })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

async function searchUsers(req, res) {
    let { term } = req.params
    let termSplit = term.split(' ')
    try {
        const users = await User.findAll({
            where: {
                [Op.or]: {
                    username: {
                        [Op.substring]: `%${term}%`
                    },
                    firstName: {
                        [Op.substring]: `%${term}`
                    },
                    lastName: {
                        [Op.substring]: `%${term}`
                    },
                    [Op.and]: [
                        {
                            firstName: {
                                [Op.substring]: `%${termSplit[0]}`
                            }
                        },
                        {
                            lastName: {
                                [Op.substring]: `%${termSplit[1]}`
                            }
                        }
                    ]

                }
            }
        })
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
            attributes: { exclude: ["password_digest", "updatedAt"] },
            include: [{
                model: Book,
                as: 'books',
                attributes: { exclude: ["description", "link", "createdAt", "updatedAt"] },
                through: { attributes: [] }

            },
            {
                model: User,
                as: 'Following',
                attributes: { exclude: ["city", "state", "createdAt", "updatedAt", "password_digest"] },
                through: { attributes: [] }


            },
            {
                model: User,
                as: 'Followers',
                attributes: { exclude: ["city", "state", "createdAt", "updatedAt", "password_digest"] },
                through: { attributes: [] }

            },
            {
                model: Comment,
                as: 'comments',
                attributes: { exclude: ["userId", "bookId", "updatedAt"] },
                include: {
                    model: Book,
                    as: 'book',
                    attributes: { exclude: ["description", "image", "link",] },
                }
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
        res.status(500).json({ message: error })
    }


}
async function Authentication(req, res) {
    let id = req.user.userId
    console.log(id)
    try {
        let user = await User.findOne({
            where: {
                userId: id
            },
            include: {
                model: User,
                as: 'Following',
                attributes: { exclude: ["city", "state", "createdAt", "updatedAt", "password_digest"] },
                through: { attributes: [] }
            }
        })
        res.json({ user: user, valid: true })
    }
    catch (error) {
        res.status(404).json({ message: error })

    }
}




module.exports = { Authentication, signUp, searchUsers, showUser, logIn, followUser, removeConnection }


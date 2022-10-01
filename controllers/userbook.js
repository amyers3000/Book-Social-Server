const db = require('../models/index')
const { User, Book } = db

async function showAllFavorites(req, res) {
    const user = req.user.userId
    try {
        const findUser = await User.findOne({
            where: {
                userId: user
            },
            include: {
                model: Book,
                as: 'books',
                through: {
                    attributes: []
                }
            }
        })
        res.json(findUser)
    } catch (error) {
        res.status(500).json({ 'message': error })
    }
}

async function showFavorite(req, res) {
    const { id } = req.params
    try {
        const findBook = await Book.findOne({ where: { bookId: id } })
        if (findBook) {
            res.json(findBook)
        } else {
            res.json({ 'message': 'Book does not exist in favorites' })
        }
    } catch (error) {
        res.status(500).json({ 'message': error })
    }


}

async function removeFavorite(req, res) {
    const { id } = req.params
    try {
        const deleteBook = await Book.findOne({ where: { bookId: id } })
        if (deleteBook) {
            await deleteBook.destroy()
            res.json({'message': "Book deleted!"} )
        } else {
            res.status(400).json({ 'message': 'Book cannot be deleted. Book was not found in favorites' })
        }
    } catch (error) {
        res.status(500).json({ 'message': error })
    }
}

module.exports = { showAllFavorites, showFavorite, removeFavorite }
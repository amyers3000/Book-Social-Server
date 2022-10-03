const db = require('../models/index')
const { Book, Comment, User } = db



async function showFavorite(req, res) {
    const { id } = req.params
    try {
        const findBook = await Book.findOne({
            where: {
                bookId: id
            },
            include: {
                model: Comment,
                as: 'comments',
                attributes: { exclude: ["userId", "bookId", "updatedAt"] },
                include: {
                    model: User,
                    as: "user",
                    attributes: { exclude: ["bookId", "updatedAt", "createdAt", "city", "state", "password_digest", "firstName", "lastName"] }
                }
            }
        })
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
            res.json({ 'message': "Book deleted!" })
        } else {
            res.status(400).json({ 'message': 'Book cannot be deleted. Book was not found in favorites' })
        }
    } catch (error) {
        res.status(500).json({ 'message': error })
    }
}

module.exports = { showFavorite, removeFavorite }
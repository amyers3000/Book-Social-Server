const axios = require('axios')
const db = require('../models')

const { Book, UserBook } = db

const URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = process.env.API_KEY
let data = {}

async function searchBooks(req, res) {
    let { title } = req.params

    try {
        let response = await axios.get(`${URL}?q=intitle:${title}&${API_KEY}`)
        data = response.data.items
        console.log(data[0].volumeInfo.imageLinks.thumbnail)
        if (data) {
            res.json(data)
        } else {
            res.status(400).json({ message: "No books match search criteria" })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }

}

async function refinedBookSearch(req, res) {
    try {
        let { title, author } = req.params

        let response = await axios.get(`${URL}?q=intitle:${title}+inauthor:${author}&${API_KEY}&maxResults=5`)
        data = response.data.items
        if (data) {
            console.log(data)
            res.json(data)
        } else {
            res.status(400).json({ message: 'No books matched search criteria' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}



async function saveBook(req, res) {
    let { id } = req.params
    let response = await axios.get(`${URL}/${id}?${API_KEY}`)
    data = response.data



    const [foundBook, savedBook] = await Book.findOrCreate({
        where: { title: data.volumeInfo.title },
        defaults: {
            title: data.volumeInfo.title,
            image: data.volumeInfo.imageLinks.thumbnail,
            authors: data.volumeInfo.authors[0],
            description: data.volumeInfo.description,
            link: data.volumeInfo.canonicalVolumeLink
        }
    })
    const [match, added] = await UserBook.findOrCreate({
        where: {
            bookId: foundBook.bookId,
            userId: req.user.userId
        },
        bookId: foundBook.bookId,
        userId: req.user.userId
    })

    if (savedBook || added) {
        res.json({ message: "Book saved" })
    } else if (foundBook || match) {
        res.json({
            message: "Book already saved",
        })
    }










}

module.exports = { searchBooks, refinedBookSearch, saveBook }
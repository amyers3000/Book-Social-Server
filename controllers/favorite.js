const db = require('../models/index')
const { Favorite, Book } = db

async function showAllFavorites(req, res){
    try {
        const foundFavorites = await Book.findAll()
        if(foundFavorites){
            res.json(foundFavorites)
        }else{
            res.status(400).json({message: "No books saved"})
        }
    } catch (error) {
        console.log(error)
    }
}

function showFavorite(req, res){

}

function removeFavorite(req, res){

}

module.exports = { showAllFavorites, showFavorite, removeFavorite }
const db = require('../models')

const { Book, Comment } = db

async function addComment(req, res){
    let { bookId } = req.params

    let book = await Book.findOne({
        where: { bookId: bookId }
    })

    if(!book){
        res.status(404).json({message: `Cound not find book wiht id "${bookId}"`})
    }

    const comment = await Comment.create({
        ...req.body,
        userId: req.user.userId,
        bookId
    })

    res.json({message: "comment saved"})
}

function editComment(req, res){

}

function showAllComments(req, res){

}

async function deleteComment(req, res){
    let { bookId } = req.params
    let { commentId } = req.params

    const comment = await Comment.findOne({
        where:{
            commentId: commentId,
            bookId: bookId
        }
    })

    if(!comment) {
        res.status(404).json({message: "Could not find comment associated with book"})
    }else if(comment.userId !== req.user?.userId){
        res.status(403).json({message: "You do not have permission to delete comment"})
    }else {
        await comment.destroy()
        res.json({message: "comment deleted"})
    }
}


module.exports = { editComment, addComment, deleteComment }
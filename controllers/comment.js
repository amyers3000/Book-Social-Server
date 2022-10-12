const db = require('../models')

const { Book, Comment } = db

async function addComment(req, res){
    let { bookId } = req.params

    try {
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
        if(comment){
        res.json({message: "comment saved"})
        }else{
            res.status(404).json({message: "comment was not made"})
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

async function editComment(req, res){
    let { commentId } = req.params

    try {
        const comment = await Comment.findOne({
            where:{
                commentId: commentId,
            }
        })
    
        if(!comment) {
            res.status(404).json({message: "Could not find comment associated with book"})
        }else if(comment.userId !== req.user?.userId){
            res.status(403).json({message: "You do not have permission to edit comment"})
        }else{
            comment.set({
                ...req.body
            })
            await comment.save()
            res.json({message: "Comment updated"})
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

async function showComment(req, res){
    let { commentId } = req.params

    try {
        const comment = await Comment.findOne({
            where:{
                commentId: commentId,
            }
        })
        if(!comment) {
            res.status(404).json({message: "Could not find comment associated with book"})
        }else{
            res.json(comment)
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

async function deleteComment(req, res){
    let { commentId } = req.params

    try {
        const comment = await Comment.findOne({
            where:{
                commentId: commentId,
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
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


module.exports = { editComment, addComment, deleteComment, showComment }
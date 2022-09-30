
const jwt = require('jsonwebtoken')

function validateJWT(req, res, next) {
    const authHeader = req.headers['authorization']
    if(authHeader){
        try {
            const token = authHeader.split(' ')[1] // need to have bearer than token
            const validToken = jwt.verify(token, process.env.JWT_SECRET)
            req.user = validToken
            next()
            return
        } catch (error){
            res.status(401).json({'message': 'unauthorized'})
            return
        }
    }else{
        res.status(401).json({'message': 'unauthorized'})
        return
    }
}
module.exports = {
    validateJWT
}
const jwt = require('jsonwebtoken')

// Verify Token
function verifyToken(req, res, next) {
     const token = req.headers.token
     if (token) {

        try {

            const decoded = jwt.verify(token,process.env.SECRET_KEY)
            req.user = decoded
            next()
            
        } catch (error) {
            res.status(401).json({message: 'Token is invalid'})
        }
        
     } else {
        res.status(401).json({message: 'no token provided'})
     }
}

// verifyToken and authorization

function verifyTokenAndAuthorisation(req,res,next) {

    verifyToken(req,res,() => {
        if (req.user.id === req.params.id || req.user.isAdmi) {
            next()
            
        } else {
            return res.status(403).json({message:"You do not have permission to update this user , please try again"})

        }
    })
}

// verifyToken and Admin

function verifyTokenAndAdmin(req,res,next) {

    verifyToken(req,res,() => {
        if ( req.user.isAdmi) {
            next()
            
        } else {
            return res.status(403).json({message:"You are not allowed , only admin allowed"})

        }
    })
}

module.exports = {verifyToken,verifyTokenAndAuthorisation,verifyTokenAndAdmin}





























































































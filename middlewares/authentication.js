const CustomError = require('../errors/custom-error');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken')
const authenticationMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomError('Not Authorised', StatusCodes.UNAUTHORIZED);
    }
    const token = authHeader.split(' ')[1];
    try {
        const { playerId, username } = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {playerId, username}
        next()
    } catch (error) {
        throw new CustomError('Error Occured', StatusCodes.UNAUTHORIZED)
    }
}

module.exports = authenticationMiddleware
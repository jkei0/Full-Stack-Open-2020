const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error : 'invalid token'
        })
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error : 'token expired'
        })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    else {
        request.token = null
    }
    next()
}

const userExtractor = async (request, response, next) => {

    if(!request.token) {
      request.user = null
    }
    else {
        const token = jwt.verify(request.token, process.env.SECRET)
        const user = await User.findById(token.id)
        request.user = user
    }
    next()
}

module.exports = {
    requestLogger,
    errorHandler,
    tokenExtractor,
    userExtractor
} 
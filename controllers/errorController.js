const AppError = require('../utils/appError')

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
        stack: err.stack
    })
}


const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            statusCode: err.statusCode,
            message: err.message,

        })
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong'
        })
    }
}



module.exports = (err, req, res, next) => {
    err.status = err.status || 'Fail'
    err.stausCode = err.statusCode || 500

    if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        sendErrorProd(err, res)
    } else if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
};
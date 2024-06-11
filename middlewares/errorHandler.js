const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors/custom-error")

const errorHandler = async (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Wahallaaa wahalaa'
    }

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    if (err.code && err.code === 11000){
        customError.msg = "Username already exists";
        customError.statusCode = 400
    }
    return res.status(customError.statusCode).json({msg: customError.msg})
}

module.exports = errorHandler
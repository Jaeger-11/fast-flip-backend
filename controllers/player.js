const CustomError = require('../errors/custom-error')
const Player = require('../models/player')
const { StatusCodes } = require('http-status-codes')
// const bcrypt = require('bcryptjs');
// const jwt = require("jsonwebtoken");

const login = async (req,res) => {
    const { username, password } = req.body
    if(!username || !password){
        throw new CustomError("Email and Password are required", StatusCodes.BAD_REQUEST);
    }
    const player = await Player.findOne({username})
    if(!player){
        throw new CustomError("Invalid Credentials", StatusCodes.UNAUTHORIZED);
    }
    const isPasswordMatch = await player.comparePassword(password);
    if(!isPasswordMatch){
        throw new CustomError("Incorrect Password", StatusCodes.UNAUTHORIZED);
    }
    const token = player.createJWT();
    res.status(StatusCodes.OK).json({username: player.username, token})
}

const createAccount = async (req,res) => {
    const { username, password } = req.body
    // if(!email || !username || !password){
    //     throw new CustomError("Missing Required Field", StatusCodes.BAD_REQUEST)
    // }
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt) 
    const player = await Player.create({username, password})
    const token = player.createJWT();
    res.status(StatusCodes.CREATED).json({username: player.username, token})
}

module.exports = {login, createAccount}
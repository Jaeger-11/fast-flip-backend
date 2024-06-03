const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        maxlength: 20,
        minlength: 3,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide username"],
        minlength: 6
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true
    }
})

playerSchema.pre('save', async function (){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

playerSchema.methods.createJWT = function(){
    return jwt.sign({playerId: this._id, username: this.username}, process.env.JWT_SECRET, {expiresIn : process.env.EXPIRES_IN})
}

playerSchema.methods.comparePassword = async function(userpass) {
    const isMatch = await bcrypt.compare(userpass, this.password);
    return isMatch
}

module.exports = mongoose.model('Player', playerSchema);
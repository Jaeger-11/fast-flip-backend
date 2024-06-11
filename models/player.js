const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        maxlength: 20,
        minlength: 3,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please provide username"],
        minlength: 6
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
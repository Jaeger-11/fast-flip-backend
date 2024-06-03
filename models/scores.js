const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    timeTaken: {
        type: Number,
        required: true
    },
    score: {
        type: Number
    },
    playerId: {
        type: mongoose.Types.ObjectId,
        ref: 'Player'
    },
    username: {
        type: String
    }
},{timestamps:true})


module.exports = mongoose.model('Score', scoreSchema);
const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Image name required'],
        unique: true
    },
    imageUrl: {
        type: String,
        required: [true, 'ImageUrl must be provided'],
        unique: true
    },
    category: {
        type: String,
        enum: ['heroes', 'cars', 'celebrities', 'clothings', 'random'],
        default: 'random'
    }
})

module.exports = mongoose.model('FlipImages', imagesSchema);